// iThome 文章爬蟲工具
// 使用方法：node tools/爬取ithome文章.js <文章網址>

const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchArticle(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parseArticle(html) {
  // 提取標題 - 從 <title> 標籤抓取
  let title = '未知標題';
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/s);
  if (titleMatch) {
    // 移除網站名稱部分（通常是 " - iT 邦幫忙" 之類的）
    title = titleMatch[1]
      .replace(/<[^>]*>/g, '')
      .replace(/\s*-\s*iT\s*邦幫忙.*$/i, '')
      .replace(/\s*\|\s*iThome.*$/i, '')
      .trim();
  }
  
  // 如果 title 標籤沒抓到，嘗試其他選擇器
  if (title === '未知標題') {
    const h2Match = html.match(/<h2[^>]*class="[^"]*qa-list__title[^"]*"[^>]*>(.*?)<\/h2>/s);
    if (h2Match) {
      title = h2Match[1].replace(/<[^>]*>/g, '').trim();
    }
  }
  
  // 提取日期 - 改進多種格式支持
  let date = new Date().toISOString().split('T')[0];
  const dateMatch = html.match(/<time[^>]*datetime="([^"]*)"[^>]*>/);
  if (dateMatch) {
    const dateStr = dateMatch[1].split('T')[0];
    date = dateStr;
  } else {
    // 嘗試從 meta 標籤抓取
    const metaDateMatch = html.match(/<meta[^>]*property="article:published_time"[^>]*content="([^"]*)"[^>]*>/);
    if (metaDateMatch) {
      date = metaDateMatch[1].split('T')[0];
    }
  }
  
  // 提取內容 - 改進選擇器
  const contentMatch = html.match(/<div[^>]*class="[^"]*markdown__style[^"]*"[^>]*>(.*?)<\/div>/s) ||
                       html.match(/<div[^>]*class="[^"]*qa-markdown[^"]*"[^>]*>(.*?)<\/div>/s) ||
                       html.match(/<article[^>]*>(.*?)<\/article>/s);
  let content = contentMatch ? contentMatch[1] : '';
  
  // 清理 HTML 標籤，轉換為 Markdown
  content = content
    // 保留代碼塊
    .replace(/<pre><code[^>]*>(.*?)<\/code><\/pre>/gs, (match, code) => {
      return '\n```\n' + code.replace(/<[^>]*>/g, '').trim() + '\n```\n';
    })
    // 轉換標題
    .replace(/<h1[^>]*>(.*?)<\/h1>/g, '\n# $1\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/g, '\n## $1\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/g, '\n### $1\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/g, '\n#### $1\n')
    // 轉換列表
    .replace(/<ul[^>]*>(.*?)<\/ul>/gs, (match, list) => {
      return list.replace(/<li[^>]*>(.*?)<\/li>/g, '- $1\n');
    })
    .replace(/<ol[^>]*>(.*?)<\/ol>/gs, (match, list) => {
      let counter = 1;
      return list.replace(/<li[^>]*>(.*?)<\/li>/g, () => `${counter++}. $1\n`);
    })
    // 轉換連結
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g, '[$2]($1)')
    // 轉換圖片
    .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/g, '![$2]($1)')
    .replace(/<img[^>]*src="([^"]*)"[^>]*>/g, '![]($1)')
    // 轉換粗體和斜體
    .replace(/<strong[^>]*>(.*?)<\/strong>/g, '**$1**')
    .replace(/<b[^>]*>(.*?)<\/b>/g, '**$1**')
    .replace(/<em[^>]*>(.*?)<\/em>/g, '*$1*')
    .replace(/<i[^>]*>(.*?)<\/i>/g, '*$1*')
    // 轉換段落
    .replace(/<p[^>]*>(.*?)<\/p>/gs, '$1\n\n')
    // 轉換換行
    .replace(/<br\s*\/?>/g, '\n')
    // 移除其他 HTML 標籤
    .replace(/<[^>]*>/g, '')
    // 解碼 HTML 實體
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    // 清理多餘空行
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  
  // 提取標籤 - 改進並過濾重複
  const tagsMatch = html.match(/<a[^>]*class="[^"]*tag[^"]*"[^>]*>(.*?)<\/a>/g);
  let tags = [];
  if (tagsMatch) {
    tags = tagsMatch
      .map(tag => tag.replace(/<[^>]*>/g, '').trim())
      .filter(tag => tag && tag.length > 0)
      // 移除重複標籤
      .filter((tag, index, self) => self.indexOf(tag) === index)
      // 過濾掉過於通用的標籤
      .filter(tag => !tag.match(/^\d+(th|st|nd|rd)鐵人賽$/))
      .filter(tag => !tag.match(/^20\d{2}鐵人賽$/))
      .filter(tag => tag !== '鐵人賽')
      // 限制標籤數量（最多5個）
      .slice(0, 5);
  }
  
  return { title, date, content, tags };
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function main() {
  const url = process.argv[2];
  
  if (!url) {
    console.log('\n❌ 請提供 iThome 文章網址\n');
    console.log('使用方法：');
    console.log('  node tools/爬取ithome文章.js https://ithelp.ithome.com.tw/articles/xxxxxxxx\n');
    console.log('範例：');
    console.log('  node tools/爬取ithome文章.js https://ithelp.ithome.com.tw/articles/10234567\n');
    process.exit(1);
  }
  
  if (!url.includes('ithelp.ithome.com.tw')) {
    console.log('\n❌ 請提供有效的 iThome 文章網址\n');
    process.exit(1);
  }
  
  console.log('\n🔍 正在抓取文章...\n');
  
  try {
    const html = await fetchArticle(url);
    const { title, date, content, tags } = parseArticle(html);
    
    console.log(`📝 標題: ${title}`);
    console.log(`📅 日期: ${date}`);
    console.log(`🏷️  標籤: ${tags.join(', ')}`);
    console.log(`📏 內容長度: ${content.length} 字元\n`);
    
    const slug = slugify(title);
    const filename = `${date}-${slug}.md`;
    const filepath = path.join(process.cwd(), 'source', '_posts', filename);
    
    const tagString = tags.length > 0 ? tags.join(', ') : '';
    
    const frontMatter = `---
title: ${title}
date: ${date}
tags: [${tagString}]
categories: 技術文章
source: ${url}
---

${content}
`;
    
    fs.writeFileSync(filepath, frontMatter, 'utf8');
    
    console.log('✅ 文章已保存！');
    console.log(`📄 文件位置: ${filepath}\n`);
    console.log('📋 下一步：');
    console.log('1. 檢查文章內容是否正確');
    console.log('2. 本地預覽: npm run server');
    console.log('3. 部署: npm run clean && npm run build && npm run deploy\n');
    
  } catch (error) {
    console.error('\n❌ 抓取失敗:', error.message);
    console.log('\n💡 建議：');
    console.log('1. 檢查網址是否正確');
    console.log('2. 檢查網路連線');
    console.log('3. 或使用手動複製方式\n');
  }
}

main();
