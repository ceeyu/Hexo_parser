# 專業 Git 工作流程指南

> 參考資源：
> - [Git for Computer Scientists](https://eagain.net/articles/git-for-computer-scientists/)
> - [Explain Git in Simple Words](https://xosh.org/explain-git-in-simple-words/)
> - [Learn Git Branching](https://learngitbranching.js.org/?locale=zh_TW)

## 🎯 Git 核心概念

### Git 是一個有向無環圖 (DAG)

Git 的核心是一個**有向無環圖 (Directed Acyclic Graph)**，每個 commit 都是圖中的一個節點：

```
A ← B ← C ← D (main)
     ↖
       E ← F (feature)
```

- **Commit**: 不可變的快照，包含指向父節點的指針
- **Branch**: 指向 commit 的可變指針
- **HEAD**: 指向當前 branch 的指針
- **Tag**: 指向 commit 的不可變指針

### 三個區域

```
Working Directory → Staging Area (Index) → Repository
     (工作區)           (暫存區)              (倉庫)
```

## 📋 專業提交訊息規範

### Conventional Commits 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 類型

```
feat:     新功能
fix:      修復 bug
docs:     文檔更新
style:    代碼格式（不影響代碼運行）
refactor: 重構（既不是新增功能，也不是修復bug）
perf:     性能優化
test:     測試相關
build:    構建系統或外部依賴
ci:       CI 配置文件和腳本
chore:    其他不修改 src 或測試文件的更改
revert:   回退之前的 commit
```

### 範例

```bash
# 簡單格式
feat: 新增批量爬取 iThome 文章功能
fix: 修復歸檔頁面分頁導航缺失問題
docs: 更新 README 部署說明

# 完整格式
feat(crawler): 新增批量爬取系列文章功能

- 支持從系列頁面自動提取文章連結
- 自動轉換為 Markdown 格式
- 修復常見格式問題

Closes #123

# 破壞性變更
feat(api)!: 重構 API 端點結構

BREAKING CHANGE: API 端點從 /api/v1 改為 /api/v2
```

## 🌿 分支策略

### Git Flow（適合發布週期明確的項目）

```
main (production)
  ↓
develop (integration)
  ↓
feature/* (新功能)
hotfix/*  (緊急修復)
release/* (發布準備)
```

### GitHub Flow（適合持續部署）

```
main (always deployable)
  ↓
feature/* (短期分支)
```

### 本項目推薦：簡化的 GitHub Flow

```bash
# 1. 從 main 創建功能分支
git checkout -b feat/add-pagination

# 2. 開發並提交
git add .
git commit -m "feat: 新增歸檔頁面分頁導航"

# 3. 推送到遠端
git push -u origin feat/add-pagination

# 4. 合併回 main（本地開發可直接合併）
git checkout main
git merge feat/add-pagination

# 5. 刪除功能分支
git branch -d feat/add-pagination
```

## 🔧 常用命令與最佳實踐

### 1. 查看狀態和歷史

```bash
# 查看當前狀態
git status

# 查看提交歷史（圖形化）
git log --oneline --graph --all --decorate

# 查看某個文件的歷史
git log --follow -p -- <file>

# 查看誰修改了哪一行
git blame <file>
```

### 2. 暫存和提交

```bash
# 暫存特定文件
git add <file>

# 暫存所有變更
git add .

# 交互式暫存（選擇性暫存部分變更）
git add -p

# 提交
git commit -m "feat: 描述"

# 修改最後一次提交
git commit --amend

# 修改最後一次提交訊息
git commit --amend -m "新的訊息"
```

### 3. 分支操作

```bash
# 創建並切換分支
git checkout -b <branch-name>
# 或使用新語法
git switch -c <branch-name>

# 切換分支
git checkout <branch-name>
# 或
git switch <branch-name>

# 查看所有分支
git branch -a

# 刪除本地分支
git branch -d <branch-name>

# 強制刪除
git branch -D <branch-name>

# 刪除遠端分支
git push origin --delete <branch-name>
```

### 4. 合併策略

```bash
# Fast-forward 合併（默認，保持線性歷史）
git merge <branch>

# 創建合併提交（保留分支歷史）
git merge --no-ff <branch>

# Rebase（重寫歷史，保持線性）
git rebase <branch>

# 交互式 rebase（整理提交）
git rebase -i HEAD~3
```

### 5. 撤銷操作

```bash
# 撤銷工作區的修改
git checkout -- <file>
# 或
git restore <file>

# 撤銷暫存區的文件
git reset HEAD <file>
# 或
git restore --staged <file>

# 撤銷最後一次提交（保留變更）
git reset --soft HEAD~1

# 撤銷最後一次提交（丟棄變更）
git reset --hard HEAD~1

# 創建一個新提交來撤銷之前的提交
git revert <commit-hash>
```

### 6. 暫存工作

```bash
# 暫存當前工作
git stash

# 暫存包含未追蹤的文件
git stash -u

# 查看暫存列表
git stash list

# 應用最近的暫存
git stash apply

# 應用並刪除暫存
git stash pop

# 刪除暫存
git stash drop
```

## 🚀 本項目工作流程

### 日常開發流程

```bash
# 1. 確保在最新的 main 分支
git checkout main
git pull origin main

# 2. 創建功能分支（可選，小改動可直接在 main）
git checkout -b feat/new-feature

# 3. 開發並頻繁提交
git add .
git commit -m "feat: 實現 XXX 功能"

# 4. 推送到遠端
git push -u origin feat/new-feature

# 5. 合併回 main
git checkout main
git merge feat/new-feature

# 6. 推送 main
git push origin main

# 7. 清理分支
git branch -d feat/new-feature
git push origin --delete feat/new-feature
```

### 快速提交流程（小改動）

```bash
# 使用提供的快捷腳本
tools\git-push.cmd "feat: 新增功能描述"

# 或手動執行
git add .
git commit -m "feat: 新增功能描述"
git push origin main
```

### 部署流程

```bash
# 使用完整部署腳本
tools\部署並推送.cmd "feat: 新增功能並部署"

# 這會執行：
# 1. npm run clean
# 2. npm run build
# 3. npm run deploy:s3
# 4. git add .
# 5. git commit
# 6. git push
```

## 📊 查看項目歷史

### 圖形化歷史

```bash
# 簡潔的圖形化歷史
git log --oneline --graph --all

# 詳細的圖形化歷史
git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --all
```

### 創建別名

在 `~/.gitconfig` 中添加：

```ini
[alias]
    lg = log --oneline --graph --all --decorate
    st = status -sb
    co = checkout
    br = branch
    ci = commit
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --all
```

使用：

```bash
git lg
git st
git visual
```

## 🔍 高級技巧

### 1. 交互式 Rebase 整理提交

```bash
# 整理最近 3 個提交
git rebase -i HEAD~3

# 在編輯器中：
# pick  = 保留提交
# reword = 修改提交訊息
# edit   = 修改提交內容
# squash = 合併到前一個提交
# fixup  = 合併到前一個提交（丟棄訊息）
# drop   = 刪除提交
```

### 2. Cherry-pick 特定提交

```bash
# 將其他分支的特定提交應用到當前分支
git cherry-pick <commit-hash>
```

### 3. 查找引入 Bug 的提交

```bash
# 二分查找
git bisect start
git bisect bad                 # 當前版本有 bug
git bisect good <commit-hash>  # 某個好的版本
# Git 會自動切換到中間的提交，測試後標記
git bisect good  # 或 git bisect bad
# 重複直到找到引入 bug 的提交
git bisect reset  # 結束查找
```

### 4. 子模組管理

```bash
# 添加子模組
git submodule add <repository-url> <path>

# 克隆包含子模組的項目
git clone --recursive <repository-url>

# 更新子模組
git submodule update --remote
```

## 🛡️ 最佳實踐

### 1. 提交頻率

- ✅ **頻繁提交**：每完成一個小功能就提交
- ✅ **原子提交**：每個提交只做一件事
- ❌ 避免：一次提交包含多個不相關的變更

### 2. 提交訊息

- ✅ 使用現在式：`feat: add` 而不是 `feat: added`
- ✅ 首字母小寫（除非是專有名詞）
- ✅ 不要以句號結尾
- ✅ 第一行不超過 50 字符
- ✅ 詳細描述放在空行後的 body

### 3. 分支管理

- ✅ 分支名稱要有意義：`feat/add-pagination` 而不是 `fix-bug`
- ✅ 定期清理已合併的分支
- ✅ 保持 main 分支隨時可部署

### 4. 合併策略

- **小項目/個人項目**：直接在 main 開發，或使用短期分支
- **團隊項目**：使用 Pull Request 進行代碼審查
- **開源項目**：Fork + Pull Request

### 5. 不要提交的內容

```gitignore
# 依賴
node_modules/
vendor/

# 構建產物
public/
dist/
build/

# 環境配置
.env
.env.local

# IDE 配置
.vscode/
.idea/

# 系統文件
.DS_Store
Thumbs.db

# 日誌
*.log
```

## 📚 學習資源

### 互動式學習

1. **Learn Git Branching**（中文）
   - https://learngitbranching.js.org/?locale=zh_TW
   - 視覺化學習 Git 分支操作

2. **Git 練習場**
   - https://git-school.github.io/visualizing-git/

### 深入理解

1. **Git for Computer Scientists**
   - https://eagain.net/articles/git-for-computer-scientists/
   - 從數據結構角度理解 Git

2. **Pro Git Book**（中文）
   - https://git-scm.com/book/zh/v2

### 快速參考

1. **Git Cheat Sheet**
   - https://education.github.com/git-cheat-sheet-education.pdf

2. **Explain Git in Simple Words**
   - https://xosh.org/explain-git-in-simple-words/

## 🎓 練習建議

### 初學者

1. 在測試項目中練習基本命令
2. 嘗試創建分支並合併
3. 練習撤銷操作
4. 學習查看歷史

### 進階

1. 練習 rebase 和 cherry-pick
2. 學習解決衝突
3. 使用 git bisect 查找 bug
4. 貢獻開源項目

### 專家

1. 自定義 Git 工作流程
2. 編寫 Git hooks
3. 優化大型倉庫性能
4. 教導他人使用 Git

## 🔗 本項目相關文檔

- [Git 工作流程指南](./📚%20Git%20工作流程指南.md) - 基礎指南
- [README.md](./README.md) - 項目說明
- [部署指南](./AWS_新手部署步驟.md) - AWS 部署

---

**記住**：Git 是一個強大的工具，但不要過度複雜化。選擇適合你項目規模的工作流程，保持簡單和一致性。
