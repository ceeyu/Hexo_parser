// iThome 文章導入輔助腳本
// 使用方法：node scripts/import-ithome.js

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

async function createPost() {
  console.log('=== iThome 文章導入工具 ===\n');
  
  const title = await question('文章標題: ');
  const date = await question('發布日期 (YYYY-MM-DD，留空使用今天): ') || 
               new Date().toISOString().split('T')[0];
  const tags = await question('標籤 (用逗號分隔): ');
  const category = await question('分類: ');
  
  const slug = slugify(title);
  const filename = `${date}-${slug}.md`;
  const filepath = path.join(process.cwd(), 'source', '_posts', filename);
  
  const frontMatter = `---
title: ${title}
date: ${date}
tags: [${tags.split(',').map(t => t.trim()).join(', ')}]
categories: ${category}
---

<!-- 在這裡貼上你的文章內容 -->

`;

  fs.writeFileSync(filepath, frontMatter, 'utf8');
  console.log(`\n✅ 文章已創建: ${filepath}`);
  console.log('請編輯文件並貼上內容，然後運行:');
  console.log('  npm run clean');
  console.log('  npm run build');
  console.log('  npm run deploy\n');
  
  rl.close();
}

// 批量創建模板
async function batchCreate() {
  console.log('=== 批量創建文章模板 ===\n');
  
  const count = parseInt(await question('要創建幾篇文章模板？ '));
  
  for (let i = 1; i <= count; i++) {
    console.log(`\n--- 第 ${i} 篇 ---`);
    await createPost();
  }
}

// 主程序
(async function main() {
  const mode = await question('選擇模式 (1: 單篇, 2: 批量): ');
  
  if (mode === '2') {
    await batchCreate();
  } else {
    await createPost();
  }
})();
