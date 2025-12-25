const { S3Client, ListObjectsV2Command, CopyObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { fromIni } = require('@aws-sdk/credential-providers');

const BUCKET_NAME = 'xian-hexo-blog-2025';
const REGION = 'ap-northeast-1';

const s3Client = new S3Client({
  region: REGION,
  credentials: fromIni()
});

async function fixPaths() {
  console.log('🔍 正在掃描 S3 Bucket 中的文件...\n');
  
  try {
    // 列出所有對象
    const listCommand = new ListObjectsV2Command({
      Bucket: BUCKET_NAME
    });
    
    const response = await s3Client.send(listCommand);
    const objects = response.Contents || [];
    
    console.log(`找到 ${objects.Length} 個文件\n`);
    
    let fixedCount = 0;
    
    for (const obj of objects) {
      const oldKey = obj.Key;
      
      // 檢查是否包含反斜線
      if (oldKey.includes('\\')) {
        const newKey = oldKey.replace(/\\/g, '/');
        
        console.log(`修復: ${oldKey} -> ${newKey}`);
        
        // 複製到新路徑
        await s3Client.send(new CopyObjectCommand({
          Bucket: BUCKET_NAME,
          CopySource: `${BUCKET_NAME}/${encodeURIComponent(oldKey)}`,
          Key: newKey,
          ACL: 'public-read'
        }));
        
        // 刪除舊路徑
        await s3Client.send(new DeleteObjectCommand({
          Bucket: BUCKET_NAME,
          Key: oldKey
        }));
        
        fixedCount++;
      }
    }
    
    console.log(`\n✅ 完成！修復了 ${fixedCount} 個文件路徑`);
    
  } catch (error) {
    console.error('❌ 錯誤:', error.message);
    process.exit(1);
  }
}

fixPaths();
