# Part 2：程式碼深度解析 - 爬蟲工具與 Cyberpunk 主題實作

## 前言

在 [Part 1](./AWS_Kiro_Hexo_部署指南.md) 中，我們完成了 Hexo 部落格的基礎架設、AWS S3 配置以及 CloudFront CDN 部署。本篇將深入解析專案中四個核心程式碼檔案的設計理念與實作細節：

1. **`tools/爬取ithome文章.js`** - 單篇文章爬蟲
2. **`tools/批量爬取系列文章.js`** - 批量系列爬蟲
3. **`themes/fast-theme/source/js/gsap-animations.js`** - GSAP 動畫系統
4. **`themes/fast-theme/source/css/style.css`** - Cyberpunk 主題樣式

---

## 一、單篇文章爬蟲 (`tools/爬取ithome文章.js`)

### 1.1 設計目標

這個工具的目的是：
- 從 iThome 網站爬取單篇技術文章
- 將 HTML 內容轉換為 Hexo 相容的 Markdown 格式
- 自動生成符合規範的 Front-matter 元資料

### 1.2 使用方式

```bash
node tools/爬取ithome文章.js https://ithelp.ithome.com.tw/articles/10234567
```

### 1.3 程式碼架構解析

#### 模組引入

```javascript
const https = require('https');  // Node.js 內建 HTTPS 模組，用於發送網路請求
const fs = require('fs');        // 檔案系統模組，用於讀寫檔案
const path = require('path');    // 路徑處理模組，用於跨平台路徑操作
```

**為什麼使用原生模組？**
- 零依賴：不需要安裝額外套件如 axios 或 node-fetch
- 輕量化：減少 node_modules 體積
- 穩定性：Node.js 內建模組經過長期驗證

#### 核心函數 1：`fetchArticle(url)` - 網頁抓取

```javascript
function fetchArticle(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);  // 串流接收資料
      res.on('end', () => resolve(data));        // 完成時回傳
    }).on('error', reject);                       // 錯誤處理
  });
}
```

**設計要點：**
- 使用 Promise 包裝回調式 API，支援 async/await 語法
- 串流處理：逐塊接收資料，適合處理大型網頁
- 錯誤傳播：將網路錯誤傳遞給呼叫者處理

#### 核心函數 2：`parseArticle(html)` - HTML 解析

這是整個爬蟲的核心，負責從 HTML 中提取結構化資料：

```javascript
function parseArticle(html) {
  // 1. 提取標題 - 優先從 <title> 標籤抓取
  let title = '未知標題';
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/s);
  if (titleMatch) {
    title = titleMatch[1]
      .replace(/<[^>]*>/g, '')                    // 移除 HTML 標籤
      .replace(/\s*-\s*iT\s*邦幫忙.*$/i, '')      // 移除網站名稱
      .replace(/\s*\|\s*iThome.*$/i, '')
      .trim();
  }
```

**標題提取策略：**
1. 首選 `<title>` 標籤（最可靠）
2. 備選 `.qa-list__title` class（iThome 特定選擇器）
3. 清理網站後綴如 "- iT 邦幫忙"

```javascript
  // 2. 提取日期 - 多重來源嘗試
  let date = new Date().toISOString().split('T')[0];  // 預設今天
  const dateMatch = html.match(/<time[^>]*datetime="([^"]*)"[^>]*>/);
  if (dateMatch) {
    date = dateMatch[1].split('T')[0];
  } else {
    // 備選：從 meta 標籤抓取
    const metaDateMatch = html.match(
      /<meta[^>]*property="article:published_time"[^>]*content="([^"]*)"[^>]*>/
    );
    if (metaDateMatch) {
      date = metaDateMatch[1].split('T')[0];
    }
  }
```

**日期提取策略：**
1. 首選 `<time datetime>` 標籤（語義化 HTML）
2. 備選 Open Graph `article:published_time` meta 標籤
3. 最終回退：使用當天日期

#### HTML 轉 Markdown 轉換引擎

這是最複雜的部分，使用正則表達式鏈式轉換：

```javascript
content = content
  // 程式碼區塊：<pre><code> → ```code```
  .replace(/<pre><code[^>]*>(.*?)<\/code><\/pre>/gs, (match, code) => {
    return '\n```\n' + code.replace(/<[^>]*>/g, '').trim() + '\n```\n';
  })
  // 標題轉換：<h1>~<h4> → #~####
  .replace(/<h1[^>]*>(.*?)<\/h1>/g, '\n# $1\n')
  .replace(/<h2[^>]*>(.*?)<\/h2>/g, '\n## $1\n')
  .replace(/<h3[^>]*>(.*?)<\/h3>/g, '\n### $1\n')
  .replace(/<h4[^>]*>(.*?)<\/h4>/g, '\n#### $1\n')
```

**轉換規則對照表：**

| HTML 元素 | Markdown 語法 | 說明 |
|-----------|---------------|------|
| `<pre><code>` | ` ```code``` ` | 程式碼區塊 |
| `<h1>~<h4>` | `#~####` | 標題層級 |
| `<ul><li>` | `- item` | 無序列表 |
| `<ol><li>` | `1. item` | 有序列表 |
| `<a href="url">` | `[text](url)` | 超連結 |
| `<img src="url">` | `![alt](url)` | 圖片 |
| `<strong>` | `**bold**` | 粗體 |
| `<em>` | `*italic*` | 斜體 |

```javascript
  // 列表轉換 - 需要特殊處理計數器
  .replace(/<ul[^>]*>(.*?)<\/ul>/gs, (match, list) => {
    return list.replace(/<li[^>]*>(.*?)<\/li>/g, '- $1\n');
  })
  .replace(/<ol[^>]*>(.*?)<\/ol>/gs, (match, list) => {
    let counter = 1;
    return list.replace(/<li[^>]*>(.*?)<\/li>/g, (m, item) => 
      `${counter++}. ${item}\n`
    );
  })
  // 連結與圖片
  .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g, '[$2]($1)')
  .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/g, '![$2]($1)')
  .replace(/<img[^>]*src="([^"]*)"[^>]*>/g, '![]($1)')
  // 文字格式
  .replace(/<strong[^>]*>(.*?)<\/strong>/g, '**$1**')
  .replace(/<em[^>]*>(.*?)<\/em>/g, '*$1*')
  // 段落與換行
  .replace(/<p[^>]*>(.*?)<\/p>/gs, '$1\n\n')
  .replace(/<br\s*\/?>/g, '\n')
  // 清理殘留 HTML
  .replace(/<[^>]*>/g, '')
  // HTML 實體解碼
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&nbsp;/g, ' ')
  // 清理多餘空行
  .replace(/\n{3,}/g, '\n\n')
  .trim();
```

**正則表達式技巧說明：**
- `/gs` 修飾符：`g` 全域匹配，`s` 讓 `.` 匹配換行符
- `[^>]*`：匹配任意非 `>` 字元，用於跳過 HTML 屬性
- `(.*?)`：非貪婪匹配，避免跨標籤匹配

#### 標籤提取與過濾

```javascript
const tagsMatch = html.match(/<a[^>]*class="[^"]*tag[^"]*"[^>]*>(.*?)<\/a>/g);
let tags = [];
if (tagsMatch) {
  tags = tagsMatch
    .map(tag => tag.replace(/<[^>]*>/g, '').trim())
    .filter(tag => tag && tag.length > 0)
    // 去重
    .filter((tag, index, self) => self.indexOf(tag) === index)
    // 過濾通用標籤
    .filter(tag => !tag.match(/^\d+(th|st|nd|rd)鐵人賽$/))
    .filter(tag => !tag.match(/^20\d{2}鐵人賽$/))
    .filter(tag => tag !== '鐵人賽')
    // 限制數量
    .slice(0, 5);
}
```

**過濾邏輯：**
1. 移除重複標籤
2. 過濾「第N屆鐵人賽」等通用標籤
3. 限制最多 5 個標籤，避免過度標記

#### 檔名生成：`slugify(text)`

```javascript
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')  // 保留英數字與中文
    .replace(/^-+|-+$/g, '');               // 移除首尾連字符
}
```

**設計考量：**
- 保留中文字元（`\u4e00-\u9fa5` 是 CJK 統一漢字範圍）
- 特殊字元轉為連字符，確保 URL 友善
- 移除首尾多餘連字符

#### 主程式流程

```javascript
async function main() {
  const url = process.argv[2];  // 從命令列取得 URL
  
  // 參數驗證
  if (!url || !url.includes('ithelp.ithome.com.tw')) {
    console.log('❌ 請提供有效的 iThome 文章網址');
    process.exit(1);
  }
  
  // 執行爬取
  const html = await fetchArticle(url);
  const { title, date, content, tags } = parseArticle(html);
  
  // 生成 Front-matter
  const frontMatter = `---
title: ${title}
date: ${date}
tags: [${tags.join(', ')}]
categories: 技術文章
source: ${url}
---

${content}
`;
  
  // 寫入檔案
  const filename = `${date}-${slugify(title)}.md`;
  const filepath = path.join(process.cwd(), 'source', '_posts', filename);
  fs.writeFileSync(filepath, frontMatter, 'utf8');
}
```

---

## 二、批量系列爬蟲 (`tools/批量爬取系列文章.js`)

### 2.1 設計目標

- 從 iThome 鐵人賽系列頁面批量爬取所有文章
- 實作防封鎖機制（請求間隔、User-Agent 偽裝）
- 支援斷點續傳（跳過已存在的文章）

### 2.2 使用方式

```bash
node tools/批量爬取系列文章.js
```

### 2.3 系列頁面配置

```javascript
const series_urls = [
  // C++ 基礎教學系列（3 頁）
  "https://ithelp.ithome.com.tw/users/20151593/ironman/5369",
  "https://ithelp.ithome.com.tw/users/20151593/ironman/5369?page=2",
  "https://ithelp.ithome.com.tw/users/20151593/ironman/5369?page=3",
  // Flutter 30天系列（3 頁）
  "https://ithelp.ithome.com.tw/users/20151593/ironman/5953",
  // ... 更多頁面
];
```

### 2.4 防封鎖機制

#### 延遲函數

```javascript
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 使用方式
await sleep(2000);  // 等待 2 秒
await sleep(3000);  // 等待 3 秒
```

#### 瀏覽器偽裝

```javascript
function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        // 模擬 Chrome 瀏覽器
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
                      'AppleWebKit/537.36 (KHTML, like Gecko) ' +
                      'Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9',
        'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    };
```

**為什麼需要這些 Headers？**

| Header | 用途 |
|--------|------|
| `User-Agent` | 告訴伺服器我們是「正常瀏覽器」而非爬蟲 |
| `Accept` | 表明我們接受的內容類型 |
| `Accept-Language` | 偏好語言，影響回傳內容 |
| `Accept-Encoding` | 支援壓縮，減少傳輸量 |

#### Gzip 壓縮處理

```javascript
https.get(options, (res) => {
  let data = '';
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
});
```

**為什麼要處理 Gzip？**
- 現代網站預設啟用 Gzip 壓縮
- 壓縮後的資料需要解壓才能讀取
- 使用 Node.js 內建 `zlib` 模組處理

### 2.5 文章連結提取

```javascript
function extractArticleLinks(html) {
  const links = [];
  
  // 方法 1: 匹配 iThome 特定的文章連結 class
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
```

**雙重提取策略：**
1. **精確匹配**：使用 `.qa-list__title-link` class 選擇器
2. **寬鬆匹配**：匹配所有 `/articles/` 路徑（備用方案）

### 2.6 斷點續傳機制

```javascript
function saveArticle(articleData, url) {
  const { title, date, content, tags } = articleData;
  
  // 清理標題中的特殊字符（避免 YAML 解析錯誤）
  const cleanTitle = title
    .replace(/:/g, '：')   // 英文冒號 → 中文冒號
    .replace(/"/g, '')     // 移除雙引號
    .replace(/'/g, '')     // 移除單引號
    .trim();
  
  const filename = `${date}-${slugify(title)}.md`;
  const filepath = path.join(process.cwd(), 'source', '_posts', filename);
  
  // 檢查檔案是否已存在 - 實現斷點續傳
  if (fs.existsSync(filepath)) {
    console.log(`  ⚠️  文章已存在，跳過: ${filename}`);
    return false;
  }
  
  // 清理內容中的問題字元
  const cleanContent = content
    .replace(/(\d+)~(\d+)/g, '$1\\~$2')  // 轉義波浪號，避免刪除線
    .replace(/\n{4,}/g, '\n\n\n');        // 限制最多 3 個連續空行
  
  fs.writeFileSync(filepath, frontMatter, 'utf8');
  return true;
}
```

**YAML Front-matter 安全處理：**
- 冒號 `:` 在 YAML 中有特殊意義，需轉換
- 引號可能導致解析錯誤，直接移除
- 波浪號 `~` 在 Markdown 中會變成刪除線

### 2.7 主程式流程

```javascript
async function main() {
  console.log('🚀 開始批量爬取 iThome 系列文章\n');
  
  let allArticleLinks = [];
  
  // 步驟 1: 從所有系列頁面提取文章連結
  for (let i = 0; i < series_urls.length; i++) {
    const url = series_urls[i];
    console.log(`[${i + 1}/${series_urls.length}] 正在處理: ${url}`);
    
    try {
      const html = await fetchPage(url);
      const links = extractArticleLinks(html);
      console.log(`  ✅ 找到 ${links.length} 篇文章`);
      allArticleLinks.push(...links);
      
      await sleep(2000);  // 防封鎖延遲
    } catch (error) {
      console.log(`  ❌ 失敗: ${error.message}`);
    }
  }
  
  // 去除重複連結
  allArticleLinks = [...new Set(allArticleLinks)];
  
  // 步驟 2: 逐篇爬取文章內容
  let successCount = 0, skipCount = 0, failCount = 0;
  
  for (let i = 0; i < allArticleLinks.length; i++) {
    const url = allArticleLinks[i];
    
    try {
      const html = await fetchPage(url);
      const articleData = parseArticle(html);
      const saved = saveArticle(articleData, url);
      
      if (saved) successCount++;
      else skipCount++;
      
      await sleep(3000);  // 較長延遲，避免被封鎖
    } catch (error) {
      failCount++;
    }
  }
  
  // 輸出統計
  console.log(`✅ 成功: ${successCount} 篇`);
  console.log(`⚠️  跳過: ${skipCount} 篇（已存在）`);
  console.log(`❌ 失敗: ${failCount} 篇`);
}
```

**執行流程圖：**

```
┌─────────────────────────────────────────────────────────┐
│                    批量爬取流程                          │
├─────────────────────────────────────────────────────────┤
│  1. 遍歷系列頁面 URL                                     │
│     ↓                                                   │
│  2. 提取每頁的文章連結 (extractArticleLinks)             │
│     ↓                                                   │
│  3. 去重合併所有連結                                     │
│     ↓                                                   │
│  4. 逐篇爬取文章 (fetchPage → parseArticle)             │
│     ↓                                                   │
│  5. 檢查是否已存在 → 跳過或保存                          │
│     ↓                                                   │
│  6. 輸出統計結果                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 三、GSAP 動畫系統 (`themes/fast-theme/source/js/gsap-animations.js`)

### 3.1 設計目標

- 實現專業級頁面動畫效果
- 支援滾動觸發動畫（ScrollTrigger）
- 尊重使用者的動畫偏好設定
- 提供流暢的使用者體驗

### 3.2 GSAP 簡介

[GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/) 是業界標準的 JavaScript 動畫庫，特點：
- 效能優異，比 CSS 動畫更流暢
- 跨瀏覽器相容性極佳
- 豐富的緩動函數（Easing）
- ScrollTrigger 插件支援滾動動畫

### 3.3 動畫配置系統

```javascript
// 註冊 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

// 統一配置常數
const CONFIG = {
  duration: {
    fast: 0.3,    // 快速動畫（hover 效果）
    normal: 0.6,  // 標準動畫
    slow: 1       // 慢速動畫（頁面載入）
  },
  ease: {
    smooth: 'power3.out',        // 平滑減速
    bounce: 'back.out(1.7)',     // 彈跳效果
    elastic: 'elastic.out(1, 0.5)' // 彈性效果
  }
};
```

**緩動函數說明：**

| 緩動函數 | 效果 | 適用場景 |
|----------|------|----------|
| `power3.out` | 快速開始，緩慢結束 | 一般動畫 |
| `back.out(1.7)` | 超出目標後回彈 | 標題進場 |
| `elastic.out(1, 0.5)` | 彈簧效果 | 按鈕互動 |

### 3.4 無障礙設計：尊重使用者偏好

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // 檢查使用者是否偏好減少動畫
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // 直接顯示所有內容，不播放動畫
    document.querySelectorAll('.post').forEach(p => p.style.opacity = 1);
    return;  // 提前結束，不初始化動畫
  }

  // 正常初始化動畫
  initPageTransition();
  initHeaderAnimation();
  initPostCardsAnimation();
  // ...
});
```

**為什麼這很重要？**
- 部分使用者對動畫敏感（前庭障礙）
- 作業系統提供「減少動態效果」設定
- 遵循 WCAG 無障礙指南

### 3.5 頁面載入過渡動畫

```javascript
function initPageTransition() {
  // 動態創建載入遮罩
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = `
    <div class="loader-content">
      <div class="loader-spinner"></div>
    </div>
  `;
  loader.style.cssText = `
    position: fixed;
    inset: 0;
    background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  document.body.appendChild(loader);

  // 頁面載入完成後，遮罩向上滑出
  window.addEventListener('load', () => {
    gsap.to(loader, {
      duration: 0.8,
      yPercent: -100,        // 向上移動 100%
      ease: 'power4.inOut',  // 對稱緩動
      onComplete: () => loader.remove()  // 動畫結束後移除 DOM
    });
  });
}
```

**動畫時間軸：**
```
頁面開始載入 → 顯示漸層遮罩 → 資源載入完成 → 遮罩向上滑出 → 移除遮罩
```

### 3.6 Header 滾動動畫

```javascript
function initHeaderAnimation() {
  const header = document.querySelector('.site-header');
  const title = document.querySelector('.site-title');
  const navLinks = document.querySelectorAll('.site-nav a');

  if (!header) return;

  // 標題彈跳進場
  gsap.from(title, {
    duration: CONFIG.duration.slow,
    y: -50,           // 從上方 50px 進入
    opacity: 0,
    ease: CONFIG.ease.bounce,
    delay: 0.5        // 等待頁面過渡完成
  });

  // 導航連結依序出現（stagger 效果）
  gsap.from(navLinks, {
    duration: CONFIG.duration.normal,
    y: -30,
    opacity: 0,
    stagger: 0.1,     // 每個元素間隔 0.1 秒
    ease: CONFIG.ease.smooth,
    delay: 0.7
  });

  // 滾動時 Header 隱藏/顯示
  let lastScroll = 0;
  
  ScrollTrigger.create({
    start: 'top top',
    end: 99999,       // 持續監聽
    onUpdate: (self) => {
      const scroll = self.scroll();
      
      // 滾動超過 50px 時添加 scrolled class
      if (scroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // 向下滾動時隱藏 Header，向上滾動時顯示
      if (scroll > lastScroll && scroll > 200) {
        gsap.to(header, { y: -100, duration: 0.3 });
      } else {
        gsap.to(header, { y: 0, duration: 0.3 });
      }
      
      lastScroll = scroll;
    }
  });
}
```

**Stagger 效果說明：**
```
時間軸：
0.7s  → 第 1 個導航連結開始動畫
0.8s  → 第 2 個導航連結開始動畫
0.9s  → 第 3 個導航連結開始動畫
...
```

### 3.7 文章卡片動畫

```javascript
function initPostCardsAnimation() {
  const posts = document.querySelectorAll('.post');
  
  posts.forEach((post, index) => {
    // 設置初始狀態（隱藏）
    gsap.set(post, { 
      opacity: 0, 
      y: 60,           // 向下偏移
      scale: 0.95,     // 略微縮小
      rotateX: 10      // 3D 旋轉
    });

    // 滾動觸發動畫
    ScrollTrigger.create({
      trigger: post,
      start: 'top 85%',  // 當卡片頂部進入視窗 85% 位置時觸發
      onEnter: () => {
        gsap.to(post, {
          duration: 0.8,
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          ease: CONFIG.ease.smooth,
          delay: index % 3 * 0.1  // 錯開動畫，避免同時觸發
        });
      }
    });
```

**ScrollTrigger 觸發點說明：**
```
┌─────────────────────────────────────┐
│           瀏覽器視窗                 │
│                                     │
│  ─────────────────────── 0%（頂部） │
│                                     │
│                                     │
│                                     │
│  ─────────────────────── 85%        │ ← 觸發點
│                                     │
│  ─────────────────────── 100%（底部）│
└─────────────────────────────────────┘
```

```javascript
    // 懸停效果
    post.addEventListener('mouseenter', () => {
      gsap.to(post, {
        duration: CONFIG.duration.fast,
        y: -8,                    // 向上浮起
        scale: 1.02,              // 略微放大
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
        ease: CONFIG.ease.smooth
      });
      
      // 標題顏色變化
      const title = post.querySelector('.post-title a');
      if (title) {
        gsap.to(title, {
          duration: CONFIG.duration.fast,
          color: '#6366f1'        // 變為主題色
        });
      }
    });

    post.addEventListener('mouseleave', () => {
      gsap.to(post, {
        duration: CONFIG.duration.fast,
        y: 0,
        scale: 1,
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        ease: CONFIG.ease.smooth
      });
      
      const title = post.querySelector('.post-title a');
      if (title) {
        gsap.to(title, {
          duration: CONFIG.duration.fast,
          color: '#1e293b'        // 恢復原色
        });
      }
    });
  });
}
```

### 3.8 磁性按鈕效果

```javascript
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.read-more, .pagination a');
  
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      // 計算滑鼠相對於按鈕中心的偏移
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // 按鈕跟隨滑鼠移動（30% 的偏移量）
      gsap.to(btn, {
        duration: 0.3,
        x: x * 0.3,
        y: y * 0.3,
        ease: 'power2.out'
      });
    });
    
    btn.addEventListener('mouseleave', () => {
      // 滑鼠離開時，彈性回到原位
      gsap.to(btn, {
        duration: 0.5,
        x: 0,
        y: 0,
        ease: 'elastic.out(1, 0.5)'  // 彈性效果
      });
    });
  });
}
```

**磁性效果原理：**
```
滑鼠位置 (clientX, clientY)
        ↓
計算相對於按鈕中心的偏移 (x, y)
        ↓
按鈕移動偏移量的 30% → 產生「被吸引」的感覺
        ↓
滑鼠離開 → 彈性回彈到原位
```

### 3.9 視差背景效果

```javascript
function initParallaxBackground() {
  // 動態創建背景裝飾元素
  const bgDecor = document.createElement('div');
  bgDecor.className = 'bg-decoration';
  bgDecor.innerHTML = `
    <div class="bg-circle bg-circle-1"></div>
    <div class="bg-circle bg-circle-2"></div>
    <div class="bg-circle bg-circle-3"></div>
  `;
  document.body.appendChild(bgDecor);

  // 視差滾動 - 不同圓形以不同速度移動
  const circles = document.querySelectorAll('.bg-circle');
  
  circles.forEach((circle, i) => {
    gsap.to(circle, {
      y: (i + 1) * -100,  // 第 1 個移動 -100px，第 2 個 -200px...
      ease: 'none',        // 線性移動
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1           // 與滾動同步，1 秒延遲
      }
    });
  });
}
```

**Scrub 參數說明：**
- `scrub: true` - 完全同步滾動
- `scrub: 1` - 1 秒延遲，更平滑
- `scrub: 0.5` - 0.5 秒延遲

### 3.10 效能優化：Debounce

```javascript
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 視窗大小改變時重新計算 ScrollTrigger
window.addEventListener('resize', debounce(() => {
  ScrollTrigger.refresh();
}, 250));
```

**為什麼需要 Debounce？**
- `resize` 事件在拖動視窗時會連續觸發數百次
- 每次觸發都重新計算會造成效能問題
- Debounce 確保只在停止拖動 250ms 後才執行

---

## 四、Cyberpunk 主題樣式 (`themes/fast-theme/source/css/style.css`)

### 4.1 設計理念

本主題靈感來自《Cyberpunk 2077》遊戲的視覺風格：
- 深色背景搭配霓虹色彩
- 發光效果（Glow）
- 網格背景
- 科技感字體

### 4.2 CSS 變數系統（Design Tokens）

```css
:root {
  /* 主色系 */
  --primary: #05d9e8;           /* 霓虹青 */
  --primary-dark: #01a7b5;
  --primary-light: #65f0ff;
  --accent: #ff2a6d;            /* 霓虹粉 */
  --accent-light: #ff6b9d;
  
  /* 文字色彩 */
  --text: #e0e0e0;              /* 主要文字 */
  --text-light: #a0a0a0;        /* 次要文字 */
  --text-muted: #707070;        /* 輔助文字 */
  
  /* 背景色彩 */
  --bg: #0d0221;                /* 深紫黑背景 */
  --bg-card: rgba(13, 2, 33, 0.95);  /* 卡片背景（半透明） */
  
  /* 邊框與陰影 */
  --border: rgba(5, 217, 232, 0.3);
  --shadow-sm: 0 0 5px rgba(5, 217, 232, 0.2);
  --shadow: 0 0 15px rgba(5, 217, 232, 0.3);
  --shadow-lg: 0 0 30px rgba(5, 217, 232, 0.4);
  
  /* 漸層 */
  --gradient: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  
  /* Cyberpunk 專用 */
  --cyber-cyan: #05d9e8;
  --cyber-pink: #ff2a6d;
  --cyber-yellow: #f9f002;
  --cyber-purple: #d300c5;
  --neon-glow: 0 0 10px var(--cyber-cyan), 0 0 20px var(--cyber-cyan);
  --pink-glow: 0 0 10px var(--cyber-pink), 0 0 20px var(--cyber-pink);
}
```

**為什麼使用 CSS 變數？**
1. **一致性**：所有元件使用相同的色彩
2. **可維護性**：修改一處即可全站生效
3. **主題切換**：未來可輕鬆實現淺色模式

### 4.3 賽博龐克網格背景

```css
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    /* 底部漸層 */
    radial-gradient(ellipse at bottom, #1b2735 0%, var(--bg) 100%),
    /* 水平網格線 */
    linear-gradient(rgba(5, 217, 232, 0.03) 1px, transparent 1px),
    /* 垂直網格線 */
    linear-gradient(90deg, rgba(5, 217, 232, 0.03) 1px, transparent 1px);
  background-size: 100% 100%, 40px 40px, 40px 40px;
  z-index: -1;
  pointer-events: none;  /* 不影響點擊 */
}
```

**多層背景技巧：**
```
第 1 層：radial-gradient  → 底部發光效果
第 2 層：linear-gradient  → 水平線（每 40px 一條）
第 3 層：linear-gradient  → 垂直線（每 40px 一條）
         ↓
       疊加形成網格效果
```

### 4.4 毛玻璃效果 Header

```css
.site-header {
  background: rgba(13, 2, 33, 0.95);      /* 半透明背景 */
  backdrop-filter: blur(20px);             /* 背景模糊 */
  -webkit-backdrop-filter: blur(20px);     /* Safari 支援 */
  border-bottom: 1px solid var(--border);
  padding: 20px 0;
  position: sticky;                        /* 黏性定位 */
  top: 0;
  z-index: 100;
  transition: var(--transition);
  box-shadow: 0 0 20px rgba(5, 217, 232, 0.2);  /* 霓虹光暈 */
}

/* 滾動後的狀態 */
.site-header.scrolled {
  padding: 12px 0;                         /* 縮小 padding */
  box-shadow: var(--neon-glow);            /* 增強光暈 */
}
```

**`backdrop-filter` 說明：**
- 對元素背後的內容進行濾鏡處理
- `blur(20px)` 產生毛玻璃效果
- 需要半透明背景才能看到效果

### 4.5 霓虹邊框動畫

```css
.post {
  background: var(--bg-card);
  border-radius: var(--radius);
  padding: 32px;
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}

/* 頂部霓虹邊框 */
.post::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, 
    var(--cyber-cyan), 
    var(--cyber-pink), 
    var(--cyber-cyan)
  );
  background-size: 200% 100%;
  animation: borderGlow 3s linear infinite;
}

@keyframes borderGlow {
  0% { background-position: 0% 0%; }
  100% { background-position: 200% 0%; }
}

/* 懸停時邊框變粗 */
.post:hover::before {
  height: 3px;
}
```

**動畫原理：**
```
背景寬度設為 200%，包含完整的漸層循環
        ↓
動畫將 background-position 從 0% 移動到 200%
        ↓
視覺上看起來像是顏色在流動
```

### 4.6 霓虹按鈕樣式

```css
.read-more {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding: 12px 24px;
  background: transparent;                    /* 透明背景 */
  border: 2px solid var(--cyber-cyan);        /* 霓虹邊框 */
  color: var(--cyber-cyan) !important;
  font-weight: 600;
  font-size: 14px;
  border-radius: var(--radius);
  transition: var(--transition);
  text-transform: uppercase;                  /* 全大寫 */
  letter-spacing: 2px;                        /* 字距加寬 */
  font-family: 'Orbitron', monospace;         /* 科技感字體 */
}

.read-more:hover {
  background: var(--cyber-cyan);              /* 填滿背景 */
  color: var(--bg) !important;                /* 文字變深色 */
  box-shadow: var(--neon-glow);               /* 發光效果 */
  transform: translateX(4px);                 /* 向右移動 */
}

/* 箭頭動畫 */
.read-more::after {
  content: '→';
  transition: transform 0.3s ease;
}

.read-more:hover::after {
  transform: translateX(4px);                 /* 箭頭額外移動 */
}
```

### 4.7 程式碼區塊樣式

```css
.post-content pre {
  background: #1d1f21 !important;             /* 深色背景 */
  color: #c5c8c6;
  padding: 0;
  border-radius: var(--radius);
  overflow: hidden;
  margin: 24px 0;
  box-shadow: var(--shadow-lg);
  font-family: 'JetBrains Mono', 'SF Mono', 'Consolas', monospace;
  position: relative;
}

/* macOS 風格的視窗裝飾 */
.post-content pre::before {
  content: '';
  display: block;
  height: 32px;
  background: #2d2f31;
  border-bottom: 1px solid #3c3d3f;
}

.post-content pre::after {
  content: '● ● ●';
  position: absolute;
  top: 8px;
  left: 12px;
  font-size: 10px;
  letter-spacing: 4px;
  color: #ff5f56;                             /* 紅色 */
  text-shadow: 
    12px 0 #ffbd2e,                           /* 黃色 */
    24px 0 #27ca40;                           /* 綠色 */
}
```

**視覺效果：**
```
┌─────────────────────────────────────┐
│ ● ● ●                               │  ← 模擬 macOS 視窗按鈕
├─────────────────────────────────────┤
│ function hello() {                  │
│   console.log('Hello, World!');     │
│ }                                   │
└─────────────────────────────────────┘
```

### 4.8 霓虹捲軸

```css
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg);
}

::-webkit-scrollbar-thumb {
  background: var(--cyber-cyan);
  border-radius: 4px;
  box-shadow: 0 0 10px var(--cyber-cyan);     /* 發光效果 */
}

::-webkit-scrollbar-thumb:hover {
  background: var(--cyber-pink);              /* 懸停變粉色 */
  box-shadow: 0 0 10px var(--cyber-pink);
}
```

### 4.9 響應式設計

```css
/* 平板裝置 */
@media (max-width: 1200px) {
  .post-page .container {
    max-width: 85%;
    width: 85%;
  }
}

/* 手機裝置 */
@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
  
  .post-page .container {
    max-width: 100%;
    width: 100%;
  }
  
  .header-content {
    flex-direction: column;           /* 垂直排列 */
    align-items: flex-start;
    gap: 16px;
  }
  
  .site-nav {
    width: 100%;
    justify-content: flex-start;
  }
  
  .post {
    padding: 24px;
    margin-bottom: 24px;
  }
  
  .post-title {
    font-size: 22px;                  /* 縮小標題 */
  }
  
  /* 文章導航改為單欄 */
  .post-nav {
    grid-template-columns: 1fr;
  }
  
  /* 系列卡片改為單欄 */
  .series-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
```

**斷點選擇說明：**

| 斷點 | 裝置類型 | 主要調整 |
|------|----------|----------|
| `1200px` | 平板橫向 | 內容寬度 85% |
| `992px` | 平板直向 | 系列卡片單欄 |
| `768px` | 手機 | 全寬、縮小字體 |

---

## 五、總結

### 5.1 技術棧回顧

| 類別 | 技術 | 用途 |
|------|------|------|
| 爬蟲 | Node.js + https | 抓取 iThome 文章 |
| 轉換 | 正則表達式 | HTML → Markdown |
| 動畫 | GSAP + ScrollTrigger | 專業級頁面動畫 |
| 樣式 | CSS Variables + Flexbox/Grid | Cyberpunk 主題 |
| 部署 | AWS S3 + CloudFront | 靜態網站託管 |

### 5.2 設計原則

1. **零依賴爬蟲**：使用 Node.js 內建模組，減少外部依賴
2. **防封鎖機制**：請求間隔 + User-Agent 偽裝
3. **無障礙設計**：尊重 `prefers-reduced-motion` 設定
4. **效能優化**：Debounce、延遲載入、增量部署
5. **可維護性**：CSS 變數系統、模組化函數

### 5.3 延伸閱讀

- [GSAP 官方文件](https://greensock.com/docs/)
- [ScrollTrigger 教學](https://greensock.com/scrolltrigger/)
- [CSS 變數完整指南](https://developer.mozilla.org/zh-TW/docs/Web/CSS/Using_CSS_custom_properties)
- [Hexo 官方文件](https://hexo.io/zh-tw/docs/)

---

## 附錄：完整檔案結構

```
Hexo_parser/
├── _config.yml                          # Hexo 主配置
├── package.json                         # NPM 依賴
├── source/
│   ├── _posts/                          # Markdown 文章
│   └── about/                           # 關於頁面
├── themes/fast-theme/
│   ├── _config.yml                      # 主題配置
│   ├── layout/
│   │   ├── index.ejs                    # 首頁模板
│   │   ├── post.ejs                     # 文章模板
│   │   ├── archive.ejs                  # 歸檔模板
│   │   └── partial/
│   │       ├── header.ejs
│   │       ├── footer.ejs
│   │       └── article.ejs
│   └── source/
│       ├── css/
│       │   └── style.css                # 主樣式檔
│       └── js/
│           ├── main.js                  # 基礎功能
│           └── gsap-animations.js       # GSAP 動畫
├── tools/
│   ├── 爬取ithome文章.js                 # 單篇爬蟲
│   ├── 批量爬取系列文章.js               # 批量爬蟲
│   ├── 添加文章分類.js                   # 分類管理
│   └── deploy-to-s3-sync.js             # S3 部署
└── public/                              # 生成的靜態檔案
```

---

**作者**：XianYu  
**最後更新**：2025-12-28
