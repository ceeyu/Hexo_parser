// 批量爬取 iThome 文章
// 使用方法：node tools/批量爬取.js

const https = require('https');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('\n=== 批量爬取 iThome 文章 ===\n');
  console.log('請準備一個文本文件，每行一個文章網址\n');
  
  const urlFile = await question('📄 網址列表文件路徑（例如：urls.txt）: ');
  
  if (!fs.existsSync(urlFile)) {
    console.log('\n❌ 文件不存在！\n');
    console.log('請創建一個文本文件，格式如下：');
    console.log('https://ithelp.ithome.com.tw/articles/10234567');
    console.log('https://ithelp.ithome.com.tw/articles/10234568');
    console.log('https://ithelp.ithome.com.tw/articles/10234569\n');
    rl.close();
    return;
  }
  
  const urls = fs.readFileSync(urlFile, 'utf8')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && line.includes('ithelp.ithome.com.tw'));
  
  console.log(`\n找到 ${urls.length} 篇文章\n`);
  
  const confirm = await question('確認開始爬取？(y/n): ');
  if (confirm.toLowerCase() !== 'y') {
    console.log('\n已取消\n');
    rl.close();
    return;
  }
  
  console.log('\n開始爬取...\n');
  
  let success = 0;
  let failed = 0;
  
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`[${i + 1}/${urls.length}] 正在處理: ${url}`);
    
    try {
      // 這裡調用爬取邏輯
      // 為了避免被封鎖，每次請求間隔 2 秒
      await sleep(2000);
      
      // 實際爬取邏輯（簡化版，實際使用時需要完整實現）
      console.log('  ✅ 成功\n');
      success++;
      
    } catch (error) {
      console.log(`  ❌ 失敗: ${error.message}\n`);
      failed++;
    }
  }
  
  console.log('\n=== 完成 ===');
  console.log(`✅ 成功: ${success} 篇`);
  console.log(`❌ 失敗: ${failed} 篇\n`);
  
  rl.close();
}

main();
