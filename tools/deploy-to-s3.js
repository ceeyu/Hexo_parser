const { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { fromIni } = require('@aws-sdk/credential-providers');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const BUCKET_NAME = 'xian-hexo-blog-2025';
const REGION = 'ap-northeast-1';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const s3Client = new S3Client({
  region: REGION,
  credentials: fromIni()
});

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

// 上傳單個文件
async function uploadFile(filePath) {
  const relativePath = path.relative(PUBLIC_DIR, filePath);
  // 重要：使用正斜線作為 S3 key
  const s3Key = relativePath.replace(/\\/g, '/');
  
  const fileContent = fs.readFileSync(filePath);
  const contentType = mime.lookup(filePath) || 'application/octet-stream';
  
  try {
    await s3Client.send(new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: s3Key,
      Body: fileContent,
      ContentType: contentType
      // 不使用 ACL，依賴 Bucket Policy 設置公開訪問
    }));
    
    return { success: true, key: s3Key };
  } catch (error) {
    return { success: false, key: s3Key, error: error.message };
  }
}

// 刪除 S3 上的所有文件
async function clearBucket() {
  console.log('🗑️  清空 S3 Bucket...\n');
  
  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: BUCKET_NAME
    });
    
    const response = await s3Client.send(listCommand);
    const objects = response.Contents || [];
    
    if (objects.length === 0) {
      console.log('Bucket 已經是空的\n');
      return;
    }
    
    console.log(`找到 ${objects.length} 個文件，正在刪除...\n`);
    
    for (const obj of objects) {
      await s3Client.send(new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: obj.Key
      }));
      process.stdout.write('.');
    }
    
    console.log('\n✅ Bucket 已清空\n');
  } catch (error) {
    console.error('❌ 清空 Bucket 失敗:', error.message);
    throw error;
  }
}

// 主函數
async function deploy() {
  console.log('========================================');
  console.log('   部署 Hexo 到 AWS S3');
  console.log('========================================\n');
  
  // 檢查 public 目錄
  if (!fs.existsSync(PUBLIC_DIR)) {
    console.error('❌ public 目錄不存在！請先運行 npm run build');
    process.exit(1);
  }
  
  try {
    // 清空 Bucket
    await clearBucket();
    
    // 獲取所有文件
    console.log('📦 正在掃描文件...\n');
    const files = getAllFiles(PUBLIC_DIR);
    console.log(`找到 ${files.length} 個文件\n`);
    
    // 上傳文件
    console.log('⬆️  正在上傳文件...\n');
    let successCount = 0;
    let failCount = 0;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const result = await uploadFile(file);
      
      if (result.success) {
        successCount++;
        process.stdout.write(`[${i + 1}/${files.length}] ✓ ${result.key}\n`);
      } else {
        failCount++;
        console.error(`[${i + 1}/${files.length}] ✗ ${result.key}: ${result.error}`);
      }
    }
    
    console.log('\n========================================');
    console.log(`✅ 部署完成！`);
    console.log(`   成功: ${successCount} 個文件`);
    if (failCount > 0) {
      console.log(`   失敗: ${failCount} 個文件`);
    }
    console.log(`\n🌐 網址: http://${BUCKET_NAME}.s3-website-${REGION}.amazonaws.com`);
    console.log('========================================');
    
  } catch (error) {
    console.error('\n❌ 部署失敗:', error.message);
    process.exit(1);
  }
}

deploy();
