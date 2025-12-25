# Hexo Blog - iThome 文章解析器

這是一個基於 Hexo 的技術博客，包含從 iThome 鐵人賽文章自動爬取和部署到 AWS S3 的完整工具鏈。

## 🌟 特色功能

- ✅ **自動爬取**：批量從 iThome 爬取文章並轉換為 Markdown
- ✅ **格式修復**：自動修復 YAML 和 Markdown 格式問題
- ✅ **自定義主題**：極速加載的 Fast Theme
- ✅ **AWS 部署**：一鍵部署到 AWS S3
- ✅ **Git 自動化**：專業的 Git 工作流程

## 📁 項目結構

```
Hexo_parser/
├── source/              # 文章源文件
│   └── _posts/         # Markdown 文章
├── themes/             # 主題
│   └── fast-theme/    # 自定義極速主題
├── tools/              # 工具腳本
│   ├── 批量爬取系列文章.js      # 批量爬取工具
│   ├── 修復文章格式.js          # 格式修復工具
│   ├── 快速創建文章.js          # 文章創建工具
│   ├── git-push.cmd            # Git 推送腳本
│   └── 部署並推送.cmd          # 部署+推送腳本
├── public/             # 生成的靜態網站（不提交）
├── node_modules/       # 依賴包（不提交）
└── _config.yml         # Hexo 配置

```

## 🚀 快速開始

### 1. 安裝依賴

```cmd
npm install
```

### 2. 本地預覽

```cmd
npm run server
```

訪問：http://localhost:4000

### 3. 部署到 AWS

```cmd
npm run deploy:full
```

或分步執行：
```cmd
npm run clean
npm run build
npm run deploy:s3
```

## 📝 文章管理

### 創建新文章

```cmd
node tools/快速創建文章.js
```

### 批量爬取 iThome 文章

```cmd
node tools/批量爬取系列文章.js
```

### 修復文章格式

```cmd
node tools/修復文章格式.js
```

## 🔧 Git 工作流程

### 方法 1：快速推送

```cmd
tools\git-push.cmd "提交訊息"
```

範例：
```cmd
tools\git-push.cmd "新增文章：AWS 部署指南"
tools\git-push.cmd "修復：文章格式問題"
tools\git-push.cmd "更新：主題樣式"
```

### 方法 2：部署並推送（推薦）

```cmd
tools\部署並推送.cmd "提交訊息"
```

這個命令會：
1. 清理舊文件
2. 生成靜態網站
3. 部署到 AWS S3
4. 提交到 Git
5. 推送到 GitHub

### 方法 3：手動操作

```cmd
# 添加變更
git add .

# 提交
git commit -m "你的提交訊息"

# 推送
git push origin main
```

## 📊 提交訊息規範

使用語義化提交訊息：

- `新增：` - 新增功能或文章
- `修復：` - 修復 bug
- `更新：` - 更新現有功能
- `優化：` - 性能優化
- `文檔：` - 文檔更新
- `樣式：` - 代碼格式調整
- `重構：` - 代碼重構

範例：
```
新增：批量爬取 iThome 文章功能
修復：文章列表頁面破圖問題
更新：主題配色方案
優化：圖片延遲加載
文檔：更新 README 使用說明
```

## 🛠️ 工具說明

### 批量爬取系列文章

從 iThome 鐵人賽系列頁面批量爬取文章：

```cmd
node tools/批量爬取系列文章.js
```

功能：
- 自動提取文章連結
- 轉換為 Markdown 格式
- 修復常見格式問題
- 跳過已存在的文章

### 修復文章格式

修復已存在文章的格式問題：

```cmd
node tools/修復文章格式.js
```

修復內容：
- YAML front-matter 冒號問題
- Markdown 刪除線問題（`1~4` → `1\~4`）
- 多餘空行

### 快速創建文章

交互式創建新文章：

```cmd
node tools/快速創建文章.js
```

## 🌐 部署

### AWS S3 配置

1. 創建 S3 Bucket
2. 啟用靜態網站託管
3. 配置 Bucket Policy
4. 設置 AWS 憑證

詳細步驟見：`AWS_新手部署步驟.md`

### 部署命令

```cmd
# 完整部署流程（推薦）
npm run deploy:full

# 或分步執行
npm run clean
npm run build
npm run deploy:s3

# 使用快捷腳本（部署 + Git 推送）
tools\部署並推送.cmd "部署訊息"
```

**注意：** 使用 `npm run deploy:s3` 需要先配置 AWS 憑證（`~/.aws/credentials`）

詳細說明請參考：[🔧 S3部署路徑修復說明.md](./🔧%20S3部署路徑修復說明.md)

## 📖 文檔

### Git 相關
- [📘 專業 Git 工作流程指南](./📘%20專業Git工作流程指南.md) - 深入理解 Git 原理和最佳實踐
- [📋 Git 快速參考](./📋%20Git快速參考.md) - 常用命令速查表
- [📚 Git 工作流程指南](./📚%20Git%20工作流程指南.md) - 基礎工作流程
- [.gitconfig.example](./.gitconfig.example) - Git 配置範例

### AWS 部署
- [AWS 新手部署步驟](./AWS_新手部署步驟.md)
- [🔧 S3 部署路徑修復說明](./🔧%20S3部署路徑修復說明.md)

### 文章管理
- [🎯 超簡單導入步驟](./🎯%20超簡單導入步驟.md)
- [📥 如何抓取 iThome 文章](./📥%20如何抓取iThome文章.md)
- [🤖 自動化批量爬取指南](./🤖%20自動化批量爬取指南.md)
- [🔧 格式問題修復說明](./🔧%20格式問題修復說明.md)

## 🎨 主題

使用自定義的 Fast Theme，特點：

- ⚡ 極速加載（零 jQuery）
- 📱 響應式設計
- 🎯 簡潔優雅
- 🔧 易於自定義

主題配置：`themes/fast-theme/_config.yml`

## 📊 統計

- 文章數量：90+ 篇
- 主題：Fast Theme（自定義）
- 部署：AWS S3 + CloudFront
- 版本控制：Git + GitHub

## 🔗 連結

- **線上網站**：http://xian-hexo-blog-2025.s3-website-ap-northeast-1.amazonaws.com
- **GitHub 倉庫**：https://github.com/ceeyu/Hexo_parser
- **iThome 個人頁**：https://ithelp.ithome.com.tw/users/20151593

## 📝 授權

本項目採用 MIT 授權。

## 🙏 致謝

- [Hexo](https://hexo.io/) - 靜態網站生成器
- [iThome](https://ithelp.ithome.com.tw/) - 文章來源
- [AWS](https://aws.amazon.com/) - 雲端託管

## 📧 聯絡

如有問題或建議，歡迎開 Issue 或 Pull Request。

---

**最後更新**：2025-12-25
