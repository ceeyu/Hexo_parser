# 📚 Git 工作流程指南

## 🎯 快速使用

### 方法 1：使用自動化腳本（推薦）

```cmd
# 只推送代碼
tools\git-push.cmd "提交訊息"

# 部署 + 推送（完整流程）
tools\部署並推送.cmd "提交訊息"
```

### 方法 2：手動操作

```cmd
git add .
git commit -m "提交訊息"
git push origin main
```

---

## 📝 提交訊息規範

### 格式

```
類型：簡短描述

詳細說明（可選）
```

### 類型說明

| 類型 | 說明 | 範例 |
|------|------|------|
| `新增` | 新增功能或文章 | `新增：批量爬取工具` |
| `修復` | 修復 bug | `修復：文章列表破圖問題` |
| `更新` | 更新現有功能 | `更新：主題配色方案` |
| `優化` | 性能優化 | `優化：圖片延遲加載` |
| `文檔` | 文檔更新 | `文檔：更新 README` |
| `樣式` | 代碼格式調整 | `樣式：統一縮排格式` |
| `重構` | 代碼重構 | `重構：爬蟲邏輯` |
| `測試` | 測試相關 | `測試：添加單元測試` |
| `配置` | 配置文件修改 | `配置：更新 Hexo 設定` |

### 好的提交訊息範例

✅ **清晰明確**
```
新增：從 iThome 批量爬取文章功能

- 支持多個系列頁面
- 自動去重
- 延遲請求避免封鎖
```

✅ **簡潔有力**
```
修復：文章摘要顯示為空白的問題
```

✅ **描述性強**
```
優化：改進文章列表加載速度

- 添加圖片延遲加載
- 壓縮 CSS 文件
- 移除未使用的 JavaScript
```

### 不好的提交訊息範例

❌ **太模糊**
```
更新文件
```

❌ **沒有類型**
```
修改了一些東西
```

❌ **太長**
```
今天修改了很多東西包括主題樣式和文章格式還有爬蟲腳本以及部署配置等等
```

---

## 🔄 常見工作流程

### 1. 新增文章

```cmd
# 1. 創建或爬取文章
node tools/快速創建文章.js
# 或
node tools/批量爬取系列文章.js

# 2. 本地預覽
npm run server

# 3. 部署並推送
tools\部署並推送.cmd "新增：XX 篇技術文章"
```

### 2. 修復問題

```cmd
# 1. 修復問題
node tools/修復文章格式.js

# 2. 測試
npm run server

# 3. 推送
tools\git-push.cmd "修復：文章格式問題"
```

### 3. 更新主題

```cmd
# 1. 修改主題文件
# themes/fast-theme/...

# 2. 清理並預覽
npm run clean
npm run server

# 3. 部署並推送
tools\部署並推送.cmd "更新：主題樣式優化"
```

### 4. 更新文檔

```cmd
# 1. 修改文檔
# README.md, *.md

# 2. 推送
tools\git-push.cmd "文檔：更新使用說明"
```

---

## 🌿 分支管理

### 主分支

- `main` - 主分支，穩定版本

### 功能分支（可選）

如果要開發大功能：

```cmd
# 創建功能分支
git checkout -b feature/新功能名稱

# 開發...

# 提交
git add .
git commit -m "新增：新功能"

# 推送到遠端
git push origin feature/新功能名稱

# 合併回主分支
git checkout main
git merge feature/新功能名稱
git push origin main
```

---

## 📊 查看歷史

### 查看提交記錄

```cmd
# 簡潔版
git log --oneline

# 詳細版
git log

# 圖形化
git log --graph --oneline --all
```

### 查看變更

```cmd
# 查看未提交的變更
git status

# 查看具體變更內容
git diff

# 查看已暫存的變更
git diff --staged
```

---

## 🔙 撤銷操作

### 撤銷未提交的變更

```cmd
# 撤銷單個文件
git checkout -- 文件名

# 撤銷所有變更
git checkout -- .
```

### 撤銷已提交但未推送

```cmd
# 撤銷最後一次提交（保留變更）
git reset --soft HEAD~1

# 撤銷最後一次提交（丟棄變更）
git reset --hard HEAD~1
```

### 撤銷已推送的提交

```cmd
# 創建一個新提交來撤銷
git revert HEAD
git push origin main
```

---

## 🆘 常見問題

### Q: 推送時提示衝突？

```cmd
# 1. 拉取最新代碼
git pull origin main

# 2. 解決衝突
# 手動編輯衝突文件

# 3. 標記為已解決
git add .

# 4. 完成合併
git commit -m "解決衝突"

# 5. 推送
git push origin main
```

### Q: 忘記添加文件？

```cmd
# 修改最後一次提交
git add 忘記的文件
git commit --amend --no-edit
git push origin main --force
```

### Q: 提交訊息寫錯了？

```cmd
# 修改最後一次提交訊息
git commit --amend -m "正確的訊息"
git push origin main --force
```

### Q: 不小心提交了敏感信息？

```cmd
# 1. 從歷史中移除
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch 敏感文件" \
  --prune-empty --tag-name-filter cat -- --all

# 2. 強制推送
git push origin main --force

# 3. 更新 .gitignore
echo "敏感文件" >> .gitignore
```

---

## 📋 檢查清單

### 提交前

- [ ] 代碼已測試
- [ ] 本地預覽正常
- [ ] 提交訊息清晰
- [ ] 沒有敏感信息
- [ ] .gitignore 正確配置

### 推送前

- [ ] 已拉取最新代碼
- [ ] 沒有衝突
- [ ] 提交歷史清晰

### 部署前

- [ ] 本地構建成功
- [ ] 所有測試通過
- [ ] 文檔已更新

---

## 🎯 最佳實踐

1. **頻繁提交**：小步快跑，每個功能點提交一次
2. **清晰訊息**：讓別人（和未來的自己）能看懂
3. **及時推送**：避免本地積累太多提交
4. **定期拉取**：保持與遠端同步
5. **使用腳本**：減少重複操作，避免錯誤

---

## 🚀 自動化腳本

### git-push.cmd

快速推送腳本：

```cmd
tools\git-push.cmd "提交訊息"
```

功能：
1. 顯示當前狀態
2. 添加所有變更
3. 提交到本地
4. 推送到 GitHub
5. 顯示最新提交

### 部署並推送.cmd

完整部署流程：

```cmd
tools\部署並推送.cmd "提交訊息"
```

功能：
1. 清理舊文件
2. 生成靜態網站
3. 部署到 AWS
4. 提交到 Git
5. 推送到 GitHub

---

## 📚 參考資源

- [Git 官方文檔](https://git-scm.com/doc)
- [GitHub 指南](https://guides.github.com/)
- [語義化版本](https://semver.org/lang/zh-TW/)
- [約定式提交](https://www.conventionalcommits.org/zh-hant/)

---

**記住**：好的 Git 習慣讓協作更順暢，讓歷史更清晰！🎉
