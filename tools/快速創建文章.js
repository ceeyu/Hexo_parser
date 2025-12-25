// 快速創建文章工具
// 使用方法：node scripts/快速創建文章.js

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

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function main() {
  console.log('\n=== 快速創建 Hexo 文章 ===\n');
  
  const title = await question('📝 文章標題: ');
  const date = await question('📅 發布日期 (YYYY-MM-DD，直接按 Enter 使用今天): ') || 
               new Date().toISOString().split('T')[0];
  const tags = await question('🏷️  標籤 (用逗號分隔，例如: python,AI,機器學習): ');
  const category = await question('📁 分類 (例如: 技術研究): ');
  
  console.log('\n正在創建文章...\n');
  
  const slug = slugify(title);
  const filename = `${date}-${slug}.md`;
  const filepath = path.join(process.cwd(), 'source', '_posts', filename);
  
  const tagArray = tags.split(',').map(t => t.trim()).filter(t => t);
  const tagString = tagArray.length > 0 ? tagArray.join(', ') : '';
  
  const frontMatter = `---
title: ${title}
date: ${date}
tags: [${tagString}]
categories: ${category}
---

## 簡介

在這裡寫文章簡介...

## 內容

### 小標題 1

內容...

### 小標題 2

內容...

## 結論

總結...

---

**參考資料**
- 連結 1
- 連結 2
`;

  fs.writeFileSync(filepath, frontMatter, 'utf8');
  
  console.log('✅ 文章已創建！');
  console.log(`📄 文件位置: ${filepath}`);
  console.log('\n📋 下一步：');
  console.log('1. 打開文件編輯內容');
  console.log('2. 從 iThome 複製你的文章內容貼上');
  console.log('3. 本地預覽: npm run server');
  console.log('4. 部署: npm run clean && npm run build && npm run deploy\n');
  
  rl.close();
}

main().catch(console.error);
