# Hexo Blog - iThome 文章解析器

基於 Hexo 的技術部落格，包含從 iThome 鐵人賽文章自動爬取和部署到 AWS S3 + CloudFront 的完整工具鏈。

## 🌟 特色功能

- ✅ **自動爬取**：批量從 iThome 爬取文章並轉換為 Markdown
- ✅ **Cyberpunk 主題**：GSAP 動畫 + 3D 卡片效果
- ✅ **AWS 部署**：S3 靜態託管 + CloudFront CDN 加速
- ✅ **瀏覽器書籤工具**：一鍵複製文章為 Markdown

## 📁 專案結構

```
Hexo_parser/
├── source/_posts/          # Markdown 文章（90+ 篇）
├── themes/fast-theme/      # 自定義 Cyberpunk 主題
│   ├── layout/            # EJS 模板
│   └── source/            # CSS/JS 資源
├── tools/                  # 工具腳本
│   ├── 爬取ithome文章.js         # 單篇爬取
│   ├── 批量爬取系列文章.js        # 批量爬取
│   ├── 添加文章分類.js           # 分類管理
│   ├── 瀏覽器書籤工具.js         # 書籤代碼
│   ├── deploy-to-s3-sync.js    # S3 部署腳本
│   └── 系列網址配置.json         # 爬取配置
├── _config.yml             # Hexo 配置
└── AWS_Kiro_Hexo_部署指南.md  # 完整部署教學
```

## 🚀 快速開始

```bash
# 安裝依賴
npm install

# 本地預覽
npm run server
# 訪問 http://localhost:4000

# 部署到 AWS
npm run deploy:sync
```

## 📝 文章管理

```bash
# 單篇爬取
node tools/爬取ithome文章.js https://ithelp.ithome.com.tw/articles/xxxxx

# 批量爬取系列
node tools/批量爬取系列文章.js

# 添加分類
node tools/添加文章分類.js
```

## 🌐 部署

```bash
# 完整部署流程
npm run clean && npm run build && npm run deploy:sync

# 清除 CloudFront 快取
aws cloudfront create-invalidation --distribution-id EMO5ZDCYTAEYA --paths "/*"
```

詳細部署教學請參考：[AWS_Kiro_Hexo_部署指南.md](./AWS_Kiro_Hexo_部署指南.md)

## 🎨 主題特色

- ⚡ Cyberpunk 2077 風格設計
- 🎬 GSAP ScrollTrigger 動畫
- 🃏 3D 卡片 hover 效果
- 📱 響應式設計

## 🔗 連結

- **線上網站**：https://d34eallw8vaf1d.cloudfront.net/archives/
- **GitHub**：https://github.com/ceeyu/Hexo_parser

---

**最後更新**：2025-12-25
