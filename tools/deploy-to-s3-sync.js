const { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectsCommand, HeadObjectCommand } = require('@aws-sdk/client-s3');
const { fromIni } = require('@aws-sdk/credential-providers');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const mime = require('mime-types');

const BUCKET_NAME = 'xian-hexo-blog-2025';
const REGION = 'ap-northeast-1';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const s3Client = new S3Client({
  region: REGION,
  credentials: fromIni()
});

// 計算文件的 MD5（用於比對）
function getFileMD5(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(fileBuffer).digest('hex');
}

// 遞歸獲取所有文件
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// 獲取 S3 上所有文件的 ETag（MD5）
async function getS3FileETags() {
  const s3Files = new Map();
  let continuationToken = null;
  
  do {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      ContinuationToken: continuationToken
    });
    
    const response = await s3Client.send(command);
    
    if (response.Contents) {
      response.Contents.forEach(item => {
        // 移除 ETag 的引號
        const etag = item.ETag.replace(/"/g, '');
        s3Files.set(item.Key, etag);
      });
    }
    
    continuationToken = response.NextContinuationToken;
  } while (continuationToken);
  
  return s3Files;
}

// 上傳單個文件
async function uploadFile(filePath) {
  const relativePath = path.relative(PUBLIC_DIR, filePath);
  const s3Key = relativePath.replace(/\\/g, '/');
  
  const fileContent = fs.readFileSync(filePath);
  const contentType = mime.lookup(filePath) || 'application/octet-stream';
  
  try {
    await s3Client.send(new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: s3Key,
      Body: fileContent,
      ContentType: contentType
    }));
    
    return { success: true, key: s3Key };
  } catch (error) {
    return { success: false, key: s3Key, error: error.message };
  }
}

// 刪除 S3 上的文件
async function deleteFiles(keys) {
  if (keys.length === 0) return;
  
  // S3 每次最多刪除 1000 個文件
  for (let i = 0; i < keys.length; i += 1000) {
    const batch = keys.slice(i, i + 1000);
    await s3Client.send(new DeleteObjectsCommand({
      Bucket: BUCKET_NAME,
      Delete: {
        Objects: batch.map(Key => ({ Key }))
      }
    }));
  }
}

// 主函數 - 增量同步
async function syncDeploy() {
  console.log('========================================');
  console.log('   增量同步部署到 AWS S3');
  console.log('========================================\n');
  
  if (!fs.existsSync(PUBLIC_DIR)) {
    console.error('❌ public 目錄不存在！請先運行 npm run build');
    process.exit(1);
  }
  
  try {
    // 1. 獲取本地文件
    console.log('📦 掃描本地文件...');
    const localFiles = getAllFiles(PUBLIC_DIR);
    const localFileMap = new Map();
    
    localFiles.forEach(filePath => {
      const relativePath = path.relative(PUBLIC_DIR, filePath);
      const s3Key = relativePath.replace(/\\/g, '/');
      const md5 = getFileMD5(filePath);
      localFileMap.set(s3Key, { filePath, md5 });
    });
    
    console.log(`✅ 找到 ${localFiles.length} 個本地文件\n`);
    
    // 2. 獲取 S3 文件
    console.log('☁️  獲取 S3 文件列表...');
    const s3Files = await getS3FileETags();
    console.log(`✅ 找到 ${s3Files.size} 個 S3 文件\n`);
    
    // 3. 比對差異
    const filesToUpload = [];
    const filesToDelete = [];
    
    // 找出需要上傳的文件（新文件或已修改）
    for (const [s3Key, { filePath, md5 }] of localFileMap) {
      const s3ETag = s3Files.get(s3Key);
      if (!s3ETag || s3ETag !== md5) {
        filesToUpload.push({ s3Key, filePath });
      }
    }
    
    // 找出需要刪除的文件（S3 有但本地沒有）
    for (const s3Key of s3Files.keys()) {
      if (!localFileMap.has(s3Key)) {
        filesToDelete.push(s3Key);
      }
    }
    
    console.log('📊 同步分析:');
    console.log(`   需要上傳: ${filesToUpload.length} 個文件`);
    console.log(`   需要刪除: ${filesToDelete.length} 個文件`);
    console.log(`   無需變更: ${localFiles.length - filesToUpload.length} 個文件\n`);
    
    // 4. 刪除舊文件
    if (filesToDelete.length > 0) {
      console.log('🗑️  刪除舊文件...');
      await deleteFiles(filesToDelete);
      console.log(`✅ 已刪除 ${filesToDelete.length} 個文件\n`);
    }
    
    // 5. 上傳新文件和修改的文件
    if (filesToUpload.length > 0) {
      console.log('⬆️  上傳文件...\n');
      let successCount = 0;
      let failCount = 0;
      
      for (let i = 0; i < filesToUpload.length; i++) {
        const { s3Key, filePath } = filesToUpload[i];
        const result = await uploadFile(filePath);
        
        if (result.success) {
          successCount++;
          process.stdout.write(`[${i + 1}/${filesToUpload.length}] ✓ ${result.key}\n`);
        } else {
          failCount++;
          console.error(`[${i + 1}/${filesToUpload.length}] ✗ ${result.key}: ${result.error}`);
        }
      }
      
      console.log(`\n✅ 上傳完成: ${successCount} 個文件`);
      if (failCount > 0) {
        console.log(`❌ 上傳失敗: ${failCount} 個文件`);
      }
    } else {
      console.log('✅ 所有文件都是最新的，無需上傳');
    }
    
    console.log('\n========================================');
    console.log('✅ 同步部署完成！');
    console.log(`🌐 網址: http://${BUCKET_NAME}.s3-website-${REGION}.amazonaws.com`);
    console.log('========================================');
    
  } catch (error) {
    console.error('\n❌ 部署失敗:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

syncDeploy();
