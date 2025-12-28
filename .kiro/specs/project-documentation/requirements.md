# Requirements Document

## Introduction

本文件為 Hexo Blog 專案的主要程式碼說明文件，涵蓋專案架構、核心功能模組、工具腳本及主題系統的完整說明。此專案是一個基於 Hexo 的技術部落格系統，具備從 iThome 鐵人賽自動爬取文章、Cyberpunk 風格主題、以及 AWS S3 部署功能。

## Glossary

- **Hexo**: 快速、簡潔且高效的靜態部落格框架
- **iThome**: 台灣 IT 技術社群網站，舉辦年度鐵人賽活動
- **GSAP**: GreenSock Animation Platform，專業級 JavaScript 動畫庫
- **S3**: AWS Simple Storage Service，用於靜態網站託管
- **EJS**: Embedded JavaScript，Hexo 使用的模板引擎
- **Front-matter**: Markdown 文章開頭的 YAML 格式元資料區塊

---

## 專案架構總覽

```
Hexo_parser/
├── _config.yml              # Hexo 主配置檔
├── package.json             # Node.js 依賴與腳本
├── source/                  # 原始內容
│   ├── _posts/             # Markdown 文章（90+ 篇）
│   └── about/              # 關於頁面
├── themes/fast-theme/       # 自定義 Cyberpunk 主題
│   ├── layout/             # EJS 模板
│   └── source/             # CSS/JS 資源
├── tools/                   # 工具腳本
│   ├── 爬取ithome文章.js
│   ├── 批量爬取系列文章.js
│   ├── 添加文章分類.js
│   ├── deploy-to-s3-sync.js
│   └── 系列網址配置.json
└── public/                  # 生成的靜態檔案
```

---

## 核心配置檔案

### 1. `_config.yml` - Hexo 主配置

| 配置項 | 說明 |
|--------|------|
| `title` | 網站標題：XianYu Blog |
| `theme` | 使用主題：fast-theme |
| `url` | 部署網址（AWS S3） |
| `permalink` | 文章永久連結格式：`:title.html` |
| `per_page` | 每頁文章數：10 |
| `language` | 語言：zh-TW |

### 2. `package.json` - NPM 腳本

```bash
npm run build      # 生成靜態檔案 (hexo generate)
npm run server     # 本地預覽 (hexo server)
npm run deploy:sync # 增量部署到 S3
npm run deploy:full # 完整部署流程
```

---

## 工具腳本說明

### 1. `tools/爬取ithome文章.js` - 單篇文章爬蟲

**功能**: 從 iThome 網站爬取單篇文章並轉換為 Hexo Markdown 格式

**使用方式**:
```bash
node tools/爬取ithome文章.js https://ithelp.ithome.com.tw/articles/xxxxx
```

**核心函數**:
| 函數名 | 功能 |
|--------|------|
| `fetchArticle(url)` | 使用 HTTPS 抓取網頁 HTML |
| `parseArticle(html)` | 解析 HTML 提取標題、日期、內容、標籤 |
| `slugify(text)` | 將標題轉換為 URL 友善的 slug |

**HTML 轉 Markdown 轉換規則**:
- `<pre><code>` → ` ```code``` `
- `<h1>~<h4>` → `#~####`
- `<ul><li>` → `- item`
- `<a href>` → `[text](url)`
- `<img src>` → `![alt](src)`
- `<strong>` → `**bold**`

---

### 2. `tools/批量爬取系列文章.js` - 批量爬蟲

**功能**: 從多個 iThome 系列頁面批量爬取所有文章

**配置的系列頁面**:
- C++ 基礎教學系列 (ironman/5369)
- Flutter 30天系列 (ironman/5953)
- 雲端資安系列 (ironman/7285)

**核心流程**:
1. 遍歷所有系列頁面 URL
2. 提取每頁的文章連結 (`extractArticleLinks`)
3. 逐篇爬取文章內容
4. 檢查重複並保存為 Markdown

**防封鎖機制**:
- 請求間隔 2-3 秒 (`sleep` 函數)
- 模擬瀏覽器 User-Agent
- 支援 gzip 壓縮回應

---

### 3. `tools/deploy-to-s3-sync.js` - S3 增量部署

**功能**: 智慧比對本地與 S3 檔案，只上傳變更的檔案

**核心邏輯**:
```
1. 掃描本地 public/ 目錄所有檔案
2. 計算每個檔案的 MD5 雜湊值
3. 獲取 S3 上所有檔案的 ETag (MD5)
4. 比對差異：
   - 新檔案 → 上傳
   - 已修改 → 上傳
   - S3 有但本地沒有 → 刪除
   - 相同 → 跳過
```

**AWS 配置**:
| 參數 | 值 |
|------|-----|
| Bucket | xian-hexo-blog-2025 |
| Region | ap-northeast-1 |
| 認證 | AWS CLI Profile (fromIni) |

---

### 4. `tools/添加文章分類.js` - 分類管理

**功能**: 根據檔名模式自動為文章添加分類

**分類規則**:
| 模式 | 分類 |
|------|------|
| `day\d+` | C++ 基礎教學 |
| `無職轉生.*flutter` | Flutter 30天 |
| `開局地端紅隊` | 雲端資安 |

---

## 主題系統 (fast-theme)

### 1. 主題配置 `themes/fast-theme/_config.yml`

```yaml
menu:
  首頁: /
  文章總覽: /archives
  關於: /about

performance:
  lazyload: true      # 圖片延遲載入
  minify: true        # HTML 壓縮
  preload: true       # 預載入關鍵資源
```

---

### 2. JavaScript 模組

#### `source/js/main.js` - 基礎功能

| 功能 | 說明 |
|------|------|
| `lazyLoadImages()` | IntersectionObserver 圖片延遲載入 |
| `smoothScroll()` | 錨點平滑滾動 |
| `externalLinks()` | 外部連結新視窗開啟 |
| `addCopyButtons()` | 程式碼區塊複製按鈕 |
| `readingProgress()` | 閱讀進度條 |
| `backToTop()` | 返回頂部按鈕 |

#### `source/js/gsap-animations.js` - GSAP 動畫系統

| 函數 | 效果 |
|------|------|
| `initPageTransition()` | 頁面載入過渡動畫 |
| `initHeaderAnimation()` | Header 滾動隱藏/顯示 |
| `initPostCardsAnimation()` | 文章卡片滾動進場 + 懸停效果 |
| `initScrollProgress()` | 漸層閱讀進度條 |
| `initFloatingElements()` | 標籤浮動效果 |
| `initMagneticButtons()` | 按鈕磁性跟隨效果 |
| `initParallaxBackground()` | 背景視差滾動 |

**動畫配置**:
```javascript
const CONFIG = {
  duration: { fast: 0.3, normal: 0.6, slow: 1 },
  ease: {
    smooth: 'power3.out',
    bounce: 'back.out(1.7)',
    elastic: 'elastic.out(1, 0.5)'
  }
};
```

---

### 3. CSS 樣式系統

#### `source/css/style.css` - Cyberpunk 主題

**CSS 變數 (設計系統)**:
```css
:root {
  --primary: #05d9e8;        /* 主色：霓虹青 */
  --accent: #ff2a6d;         /* 強調色：霓虹粉 */
  --bg: #0d0221;             /* 背景：深紫黑 */
  --cyber-cyan: #05d9e8;     /* 賽博青 */
  --cyber-pink: #ff2a6d;     /* 賽博粉 */
  --cyber-yellow: #f9f002;   /* 賽博黃 */
  --neon-glow: 0 0 10px var(--cyber-cyan), 0 0 20px var(--cyber-cyan);
}
```

**主要元件樣式**:
| 元件 | 特效 |
|------|------|
| `.site-header` | 毛玻璃效果 + 霓虹邊框 |
| `.post` | 漸層頂部邊框動畫 |
| `.read-more` | 霓虹邊框按鈕 |
| `::selection` | 粉色選取文字 |
| `::-webkit-scrollbar` | 霓虹捲軸 |

---

## 文章格式

### Front-matter 結構

```yaml
---
title: "文章標題"
date: 2025-12-25
tags: [Flutter, Dart, 環境安裝]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/xxxxx
---
```

### 文章系列分類

| 系列 | 文章數 | 主題 |
|------|--------|------|
| C++ 基礎教學 | 30 篇 | 從 Hello World 到排序演算法 |
| Flutter 30天 | 30 篇 | Dart 語法到 UI 開發 |
| 雲端資安 | 30 篇 | AWS、DVWA、滲透測試 |

---

## 部署流程

```bash
# 1. 清除舊檔案
npm run clean

# 2. 生成靜態檔案
npm run build

# 3. 增量部署到 S3
npm run deploy:sync

# 4. (選用) 清除 CloudFront 快取
aws cloudfront create-invalidation --distribution-id EMO5ZDCYTAEYA --paths "/*"
```

**部署網址**:
- S3: http://xian-hexo-blog-2025.s3-website-ap-northeast-1.amazonaws.com
- CloudFront: https://d34eallw8vaf1d.cloudfront.net

---

## 技術棧總結

| 類別 | 技術 |
|------|------|
| 框架 | Hexo 8.x |
| 模板 | EJS |
| 樣式 | 原生 CSS (CSS Variables) |
| 動畫 | GSAP + ScrollTrigger |
| 部署 | AWS S3 + CloudFront |
| 爬蟲 | Node.js (https 模組) |
| 字體 | Orbitron, JetBrains Mono, LXGW WenKai TC |
