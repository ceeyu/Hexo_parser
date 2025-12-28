// 修復文章日期腳本
// 從 iThome 重新抓取正確的發布日期

const https = require('https');
const fs = require('fs');
const path = require('path');

const postsDir = path.join(process.cwd(), 'source', '_posts');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractDate(html) {
  // 嘗試多種方式抓取日期
  
  // 方法1: time 標籤
  const timeMatch = html.match(/<time[^>]*datetime="([^"]*)"/);
  if (timeMatch) {
    return timeMatch[1].split('T')[0];
  }
  
  // 方法2: meta 標籤
  const metaMatch = html.match(/article:published_time[^>]*content="([^"]*)"/);
  if (metaMatch) {
    return metaMatch[1].split('T')[0];
  }
  
  // 方法3: 頁面中的日期文字 (格式: 2023-09-16)
  const textMatch = html.match(/(\d{4}-\d{2}-\d{2})/);
  if (textMatch) {
    return textMatch[1];
  }
  
  return null;
}

async function fixArticleDates() {
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  
  console.log(`\n📝 找到 ${files.length} 篇文章\n`);
  
  let fixed = 0;
  let failed = 0;
  
  for (const file of files) {
    const filepath = path.join(postsDir, file);
    const content = fs.readFileSync(filepath, 'utf8');
    
    // 提取 source URL
    const sourceMatch = content.match(/source:\s*(https:\/\/ithelp\.ithome\.com\.tw\/articles\/\d+)/);
    if (!sourceMatch) {
      console.log(`⏭️  跳過 (無 source): ${file}`);
      continue;
    }
    
    const sourceUrl = sourceMatch[1];
    
    try {
      console.log(`🔍 抓取: ${sourceUrl}`);
      const html = await fetchPage(sourceUrl);
      const newDate = extractDate(html);
      
      if (!newDate) {
        console.log(`❌ 無法抓取日期: ${file}`);
        failed++;
        continue;
      }
      
      // 更新 front matter 中的日期
      const updatedContent = content.replace(
        /date:\s*\d{4}-\d{2}-\d{2}/,
        `date: ${newDate}`
      );
      
      // 計算新檔名
      const oldDate = file.match(/^(\d{4}-\d{2}-\d{2})/);
      if (oldDate && oldDate[1] !== newDate) {
        const newFilename = file.replace(oldDate[1], newDate);
        const newFilepath = path.join(postsDir, newFilename);
        
        // 寫入新檔案
        fs.writeFileSync(newFilepath, updatedContent, 'utf8');
        
        // 刪除舊檔案
        fs.unlinkSync(filepath);
        
        console.log(`✅ ${oldDate[1]} → ${newDate}: ${newFilename}`);
        fixed++;
      } else {
        console.log(`⏭️  日期相同: ${file}`);
      }
      
      // 避免請求過快
      await new Promise(r => setTimeout(r, 500));
      
    } catch (error) {
      console.log(`❌ 錯誤: ${file} - ${error.message}`);
      failed++;
    }
  }
  
  console.log(`\n========================================`);
  console.log(`✅ 修復完成: ${fixed} 篇`);
  console.log(`❌ 失敗: ${failed} 篇`);
  console.log(`========================================\n`);
}

fixArticleDates();
