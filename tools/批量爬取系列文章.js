// 批量爬取 iThome 系列文章
// 使用方法：node tools/批量爬取系列文章.js

const https = require('https');
const fs = require('fs');
const path = require('path');

// 系列頁面網址列表
const series_urls = [
  "https://ithelp.ithome.com.tw/users/20151593/ironman/5369",
  "https://ithelp.ithome.com.tw/users/20151593/ironman/5369?page=2",
  "https://ithelp.ithome.com.tw/users/20151593/ironman/5369?page=3",
  "https://ithelp.ithome.com.tw/users/20151593/ironman/5953",
  "https://ithelp.ithome.com.tw/users/20151593/ironman/5953?page=2",
  "https://ithelp.ithome.com.tw/users/20151593/ironman/5953?page=3",
  "https://ithelp.ithome.com.tw/users/20151593/ironman/7285",
  "https://ithelp.ithome.com.tw/users/20151593/ironman/7285?page=2",
  "https://ithelp.ithome.com.tw/users/20151593/ironman/7285?page=3"
];

// 延遲函數（避免請求過快）
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 抓取網頁內容（添加 User-Agent）
function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    };
    
    https.get(options, (res) => {
      let data = '';
      
      // 處理 gzip 壓縮
      const encoding = res.headers['content-encoding'];
      if (encoding && encoding.includes('gzip')) {
        const zlib = require('zlib');
        const gunzip = zlib.createGunzip();
        res.pipe(gunzip);
        gunzip.on('data', (chunk) => data += chunk.toString());
        gunzip.on('end', () => resolve(data));
        gunzip.on('error', reject);
      } else {
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => resolve(data));
      }
    }).on('error', reject);
  });
}

// 從系列頁面提取文章連結
function extractArticleLinks(html) {
  const links = [];
  
  // 方法 1: 匹配 qa-list__title-link 類的 a 標籤
  // HTML 格式：<a href="\n                https://ithelp.ithome.com.tw/articles/10287288\n                " class="qa-list__title-link">
  const titleLinkRegex = /<a[^>]*href="\s*(https:\/\/ithelp\.ithome\.com\.tw\/articles\/\d+)\s*"[^>]*class="qa-list__title-link"/gs;
  let match;
  
  while ((match = titleLinkRegex.exec(html)) !== null) {
    const articleUrl = match[1].trim();
    if (!links.includes(articleUrl)) {
      links.push(articleUrl);
    }
  }
  
  // 方法 2: 備用方案 - 匹配任何 /articles/ 連結
  if (links.length === 0) {
    const articleRegex = /href="\s*((?:https:\/\/ithelp\.ithome\.com\.tw)?\/articles\/\d+)\s*"/gs;
    while ((match = articleRegex.exec(html)) !== null) {
      let url = match[1].trim();
      if (!url.startsWith('http')) {
        url = 'https://ithelp.ithome.com.tw' + url;
      }
      if (!links.includes(url)) {
        links.push(url);
      }
    }
  }
  
  return links;
}

// 解析文章內容（從 爬取ithome文章.js 複製）
function parseArticle(html) {
  // 提取標題 - 從 <title> 標籤抓取
  let title = '未知標題';
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/s);
  if (titleMatch) {
    title = titleMatch[1]
      .replace(/<[^>]*>/g, '')
      .replace(/\s*-\s*iT\s*邦幫忙.*$/i, '')
      .replace(/\s*\|\s*iThome.*$/i, '')
      .trim();
  }
  
  if (title === '未知標題') {
    const h2Match = html.match(/<h2[^>]*class="[^"]*qa-list__title[^"]*"[^>]*>(.*?)<\/h2>/s);
    if (h2Match) {
      title = h2Match[1].replace(/<[^>]*>/g, '').trim();
    }
  }
  
  // 提取日期
  let date = new Date().toISOString().split('T')[0];
  const dateMatch = html.match(/<time[^>]*datetime="([^"]*)"[^>]*>/);
  if (dateMatch) {
    date = dateMatch[1].split('T')[0];
  } else {
    const metaDateMatch = html.match(/<meta[^>]*property="article:published_time"[^>]*content="([^"]*)"[^>]*>/);
    if (metaDateMatch) {
      date = metaDateMatch[1].split('T')[0];
    }
  }
  
  // 提取內容
  const contentMatch = html.match(/<div[^>]*class="[^"]*markdown__style[^"]*"[^>]*>(.*?)<\/div>/s) ||
                       html.match(/<div[^>]*class="[^"]*qa-markdown[^"]*"[^>]*>(.*?)<\/div>/s) ||
                       html.match(/<article[^>]*>(.*?)<\/article>/s);
  let content = contentMatch ? contentMatch[1] : '';
  
  // 轉換為 Markdown
  content = content
    .replace(/<pre><code[^>]*>(.*?)<\/code><\/pre>/gs, (match, code) => {
      return '\n```\n' + code.replace(/<[^>]*>/g, '').trim() + '\n```\n';
    })
    .replace(/<h1[^>]*>(.*?)<\/h1>/g, '\n# $1\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/g, '\n## $1\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/g, '\n### $1\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/g, '\n#### $1\n')
    .replace(/<ul[^>]*>(.*?)<\/ul>/gs, (match, list) => {
      return list.replace(/<li[^>]*>(.*?)<\/li>/g, '- $1\n');
    })
    .replace(/<ol[^>]*>(.*?)<\/ol>/gs, (match, list) => {
      let counter = 1;
      return list.replace(/<li[^>]*>(.*?)<\/li>/g, (m, item) => `${counter++}. ${item}\n`);
    })
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g, '[$2]($1)')
    .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/g, '![$2]($1)')
    .replace(/<img[^>]*src="([^"]*)"[^>]*>/g, '![]($1)')
    .replace(/<strong[^>]*>(.*?)<\/strong>/g, '**$1**')
    .replace(/<b[^>]*>(.*?)<\/b>/g, '**$1**')
    .replace(/<em[^>]*>(.*?)<\/em>/g, '*$1*')
    .replace(/<i[^>]*>(.*?)<\/i>/g, '*$1*')
    .replace(/<p[^>]*>(.*?)<\/p>/gs, '$1\n\n')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  
  // 提取標籤
  const tagsMatch = html.match(/<a[^>]*class="[^"]*tag[^"]*"[^>]*>(.*?)<\/a>/g);
  let tags = [];
  if (tagsMatch) {
    tags = tagsMatch
      .map(tag => tag.replace(/<[^>]*>/g, '').trim())
      .filter(tag => tag && tag.length > 0)
      .filter((tag, index, self) => self.indexOf(tag) === index)
      .filter(tag => !tag.match(/^\d+(th|st|nd|rd)鐵人賽$/))
      .filter(tag => !tag.match(/^20\d{2}鐵人賽$/))
      .filter(tag => tag !== '鐵人賽')
      .slice(0, 5);
  }
  
  return { title, date, content, tags };
}

// 生成文件名
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// 保存文章
function saveArticle(articleData, url) {
  const { title, date, content, tags } = articleData;
  
  // 清理標題中的特殊字符
  const cleanTitle = title
    .replace(/:/g, '：')  // 替換英文冒號為中文冒號（避免 YAML 錯誤）
    .replace(/"/g, '')    // 移除雙引號
    .replace(/'/g, '')    // 移除單引號
    .trim();
  
  const slug = slugify(title);
  const filename = `${date}-${slug}.md`;
  const filepath = path.join(process.cwd(), 'source', '_posts', filename);
  
  // 檢查文件是否已存在
  if (fs.existsSync(filepath)) {
    console.log(`  ⚠️  文章已存在，跳過: ${filename}`);
    return false;
  }
  
  const tagString = tags.length > 0 ? tags.join(', ') : '';
  
  // 清理內容中的問題
  const cleanContent = content
    // 修復刪除線問題：將 1~4 這類格式改為 1\~4（轉義波浪號）
    .replace(/(\d+)~(\d+)/g, '$1\\~$2')
    // 移除多餘的空行
    .replace(/\n{4,}/g, '\n\n\n');
  
  const frontMatter = `---
title: "${cleanTitle}"
date: ${date}
tags: [${tagString}]
categories: 技術文章
source: ${url}
---

${cleanContent}
`;
  
  fs.writeFileSync(filepath, frontMatter, 'utf8');
  return true;
}

// 主程序
async function main() {
  console.log('\n🚀 開始批量爬取 iThome 系列文章\n');
  console.log(`📋 共有 ${series_urls.length} 個系列頁面\n`);
  
  let allArticleLinks = [];
  
  // 步驟 1: 從所有系列頁面提取文章連結
  console.log('📖 步驟 1: 提取文章連結...\n');
  
  for (let i = 0; i < series_urls.length; i++) {
    const url = series_urls[i];
    console.log(`[${i + 1}/${series_urls.length}] 正在處理: ${url}`);
    
    try {
      const html = await fetchPage(url);
      const links = extractArticleLinks(html);
      console.log(`  ✅ 找到 ${links.length} 篇文章`);
      allArticleLinks.push(...links);
      
      // 延遲 2 秒避免被封鎖
      await sleep(2000);
    } catch (error) {
      console.log(`  ❌ 失敗: ${error.message}`);
    }
  }
  
  // 去除重複連結
  allArticleLinks = [...new Set(allArticleLinks)];
  console.log(`\n✅ 總共找到 ${allArticleLinks.length} 篇不重複的文章\n`);
  
  // 步驟 2: 爬取每篇文章
  console.log('📝 步驟 2: 開始爬取文章內容...\n');
  
  let successCount = 0;
  let skipCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < allArticleLinks.length; i++) {
    const url = allArticleLinks[i];
    console.log(`[${i + 1}/${allArticleLinks.length}] ${url}`);
    
    try {
      const html = await fetchPage(url);
      const articleData = parseArticle(html);
      
      console.log(`  📝 ${articleData.title}`);
      console.log(`  📅 ${articleData.date}`);
      console.log(`  🏷️  ${articleData.tags.join(', ')}`);
      
      const saved = saveArticle(articleData, url);
      if (saved) {
        console.log(`  ✅ 已保存\n`);
        successCount++;
      } else {
        skipCount++;
        console.log('');
      }
      
      // 延遲 3 秒避免被封鎖
      await sleep(3000);
    } catch (error) {
      console.log(`  ❌ 失敗: ${error.message}\n`);
      failCount++;
    }
  }
  
  // 總結
  console.log('\n' + '='.repeat(50));
  console.log('🎉 批量爬取完成！\n');
  console.log(`✅ 成功: ${successCount} 篇`);
  console.log(`⚠️  跳過: ${skipCount} 篇（已存在）`);
  console.log(`❌ 失敗: ${failCount} 篇`);
  console.log(`📊 總計: ${allArticleLinks.length} 篇`);
  console.log('='.repeat(50) + '\n');
  
  console.log('📋 下一步：');
  console.log('1. 檢查文章內容: source/_posts/');
  console.log('2. 本地預覽: npm run server');
  console.log('3. 部署: npm run clean && npm run build && npm run deploy\n');
}

// 執行
main().catch(console.error);
