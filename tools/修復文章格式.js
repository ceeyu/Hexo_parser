// 修復已存在文章的格式問題
// 使用方法：node tools/修復文章格式.js

const fs = require('fs');
const path = require('path');

const postsDir = path.join(process.cwd(), 'source', '_posts');

console.log('\n🔧 開始修復文章格式問題...\n');

let fixedCount = 0;
let errorCount = 0;

// 讀取所有文章
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

console.log(`📋 找到 ${files.length} 篇文章\n`);

files.forEach((filename, index) => {
  const filepath = path.join(postsDir, filename);
  
  try {
    let content = fs.readFileSync(filepath, 'utf8');
    let modified = false;
    
    // 問題 1: 修復 YAML front-matter 中的冒號問題
    // 將 title: 標題: 副標題 改為 title: "標題: 副標題"
    const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (frontMatterMatch) {
      let frontMatter = frontMatterMatch[1];
      const titleMatch = frontMatter.match(/^title:\s*(.+)$/m);
      
      if (titleMatch) {
        const titleValue = titleMatch[1].trim();
        // 如果標題包含冒號且沒有被引號包圍
        if (titleValue.includes(':') && !titleValue.startsWith('"') && !titleValue.startsWith("'")) {
          const newTitle = `title: "${titleValue.replace(/"/g, '')}"`;
          frontMatter = frontMatter.replace(/^title:\s*.+$/m, newTitle);
          content = content.replace(/^---\n[\s\S]*?\n---/, `---\n${frontMatter}\n---`);
          modified = true;
        }
      }
    }
    
    // 問題 2: 修復內容中的刪除線問題（1~4 變成 1\~4）
    const contentMatch = content.match(/^---\n[\s\S]*?\n---\n\n([\s\S]*)$/);
    if (contentMatch) {
      let articleContent = contentMatch[1];
      const originalContent = articleContent;
      
      // 轉義數字範圍中的波浪號
      articleContent = articleContent.replace(/(\d+)~(\d+)/g, '$1\\~$2');
      
      if (articleContent !== originalContent) {
        content = content.replace(/^(---\n[\s\S]*?\n---\n\n)[\s\S]*$/, `$1${articleContent}`);
        modified = true;
      }
    }
    
    // 如果有修改，保存文件
    if (modified) {
      fs.writeFileSync(filepath, content, 'utf8');
      console.log(`✅ [${index + 1}/${files.length}] 已修復: ${filename}`);
      fixedCount++;
    } else {
      // console.log(`⏭️  [${index + 1}/${files.length}] 無需修復: ${filename}`);
    }
    
  } catch (error) {
    console.log(`❌ [${index + 1}/${files.length}] 錯誤: ${filename} - ${error.message}`);
    errorCount++;
  }
});

console.log('\n' + '='.repeat(50));
console.log('🎉 修復完成！\n');
console.log(`✅ 已修復: ${fixedCount} 篇`);
console.log(`⏭️  無需修復: ${files.length - fixedCount - errorCount} 篇`);
console.log(`❌ 錯誤: ${errorCount} 篇`);
console.log('='.repeat(50) + '\n');

console.log('📋 下一步：');
console.log('1. 運行: npm run server');
console.log('2. 檢查網站是否正常');
console.log('3. 部署: npm run clean && npm run build && npm run deploy\n');
