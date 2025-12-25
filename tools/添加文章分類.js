/**
 * 為文章添加正確的分類（categories）
 */

const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '..', 'source', '_posts');

// 定義系列分類
const seriesCategories = {
  'cpp': {
    pattern: /^2025-12-25-day\d+/,
    category: 'C++ 基礎教學',
    description: '從零開始學習 C++ 程式設計，涵蓋基礎語法、資料結構與演算法',
    icon: '💻'
  },
  'flutter': {
    pattern: /無職轉生.*flutter/i,
    category: 'Flutter 30天',
    description: '使用 Flutter 與 Dart 開發跨平台應用程式',
    icon: '📱'
  },
  'security': {
    pattern: /開局地端紅隊/i,
    category: '雲端資安',
    description: '雲端安全、滲透測試與資安防護實戰',
    icon: '🔐'
  }
};

const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

let updated = 0;

files.forEach(file => {
  const filePath = path.join(postsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // 跳過 hello-world
  if (file === 'hello-world.md') return;
  
  let category = null;
  
  // 檢查屬於哪個系列
  for (const [key, config] of Object.entries(seriesCategories)) {
    if (config.pattern.test(file)) {
      category = config.category;
      break;
    }
  }
  
  if (!category) {
    console.log(`⚠️  無法識別: ${file}`);
    return;
  }
  
  // 更新 front-matter
  const frontMatterRegex = /^---\n([\s\S]*?)\n---/;
  const frontMatterMatch = content.match(frontMatterRegex);
  
  if (frontMatterMatch) {
    let frontMatter = frontMatterMatch[1];
    
    // 移除舊的 categories
    frontMatter = frontMatter.replace(/categories:[\s\S]*?(?=\n\w|$)/g, '');
    
    // 添加新的 categories
    frontMatter = frontMatter.trim() + `\ncategories:\n  - ${category}`;
    
    content = content.replace(frontMatterRegex, `---\n${frontMatter}\n---`);
    
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ ${category}: ${file.substring(0, 40)}...`);
    updated++;
  }
});

console.log(`\n✅ 更新了 ${updated} 篇文章的分類`);
