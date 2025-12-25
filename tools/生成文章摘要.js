// 為文章生成摘要
// 使用方法：node tools/生成文章摘要.js

const fs = require('fs');
const path = require('path');

const postsDir = path.join(process.cwd(), 'source', '_posts');

console.log('\n📝 開始為文章生成摘要...\n');

let processedCount = 0;
let skippedCount = 0;

// 讀取所有文章
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

console.log(`📋 找到 ${files.length} 篇文章\n`);

files.forEach((filename, index) => {
  const filepath = path.join(postsDir, filename);
  
  try {
    let content = fs.readFileSync(filepath, 'utf8');
    
    // 檢查是否已有 excerpt
    if (content.includes('<!-- more -->')) {
      skippedCount++;
      return;
    }
    
    // 分離 front-matter 和內容
    const match = content.match(/^---\n([\s\S]*?)\n---\n\n([\s\S]*)$/);
    if (!match) {
      console.log(`⚠️  [${index + 1}/${files.length}] 格式錯誤: ${filename}`);
      return;
    }
    
    const frontMatter = match[1];
    const articleContent = match[2];
    
    // 找到第一個段落或標題後的內容作為摘要
    let excerptContent = '';
    const lines = articleContent.split('\n');
    let foundContent = false;
    let lineCount = 0;
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      // 跳過空行和標題
      if (!trimmed || trimmed.startsWith('#')) {
        if (foundContent) break; // 如果已經找到內容，遇到標題就停止
        continue;
      }
      
      // 跳過代碼塊
      if (trimmed.startsWith('```')) {
        if (foundContent) break;
        continue;
      }
      
      // 收集內容
      excerptContent += line + '\n';
      foundContent = true;
      lineCount++;
      
      // 收集 3-5 行或達到 200 字符
      if (lineCount >= 3 || excerptContent.length >= 200) {
        break;
      }
    }
    
    // 如果沒有找到合適的摘要，使用默認文字
    if (!excerptContent.trim()) {
      excerptContent = '點擊查看完整內容...\n';
    }
    
    // 在摘要後添加 <!-- more --> 標記
    const newContent = `---\n${frontMatter}\n---\n\n${excerptContent}\n<!-- more -->\n\n${articleContent}`;
    
    fs.writeFileSync(filepath, newContent, 'utf8');
    console.log(`✅ [${index + 1}/${files.length}] 已處理: ${filename}`);
    processedCount++;
    
  } catch (error) {
    console.log(`❌ [${index + 1}/${files.length}] 錯誤: ${filename} - ${error.message}`);
  }
});

console.log('\n' + '='.repeat(50));
console.log('🎉 處理完成！\n');
console.log(`✅ 已處理: ${processedCount} 篇`);
console.log(`⏭️  已有摘要: ${skippedCount} 篇`);
console.log('='.repeat(50) + '\n');

console.log('📋 下一步：');
console.log('1. 運行: npm run clean');
console.log('2. 運行: npm run server');
console.log('3. 檢查網站是否正常\n');
