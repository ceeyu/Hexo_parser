# Git 快速參考卡片

## 🚀 日常操作

### 查看狀態
```bash
git status              # 查看工作區狀態
git status -sb          # 簡短格式
git diff                # 查看未暫存的變更
git diff --cached       # 查看已暫存的變更
```

### 暫存和提交
```bash
git add <file>          # 暫存特定文件
git add .               # 暫存所有變更
git add -p              # 交互式暫存
git commit -m "msg"     # 提交
git commit --amend      # 修改最後一次提交
```

### 查看歷史
```bash
git log                 # 查看提交歷史
git log --oneline       # 簡潔格式
git log --graph --all   # 圖形化顯示所有分支
git log -p <file>       # 查看文件的變更歷史
git blame <file>        # 查看每一行的修改者
```

## 🌿 分支操作

### 創建和切換
```bash
git branch <name>       # 創建分支
git checkout <name>     # 切換分支
git checkout -b <name>  # 創建並切換
git switch <name>       # 切換分支（新語法）
git switch -c <name>    # 創建並切換（新語法）
```

### 查看和刪除
```bash
git branch              # 查看本地分支
git branch -a           # 查看所有分支
git branch -d <name>    # 刪除分支
git branch -D <name>    # 強制刪除
```

### 合併
```bash
git merge <branch>      # 合併分支
git merge --no-ff       # 創建合併提交
git merge --squash      # 壓縮合併
```

## ↩️ 撤銷操作

### 撤銷工作區
```bash
git checkout -- <file>  # 撤銷文件修改
git restore <file>      # 撤銷文件修改（新語法）
git clean -fd           # 刪除未追蹤的文件
```

### 撤銷暫存區
```bash
git reset HEAD <file>   # 取消暫存
git restore --staged    # 取消暫存（新語法）
```

### 撤銷提交
```bash
git reset --soft HEAD~1 # 撤銷提交，保留變更
git reset --hard HEAD~1 # 撤銷提交，丟棄變更
git revert <commit>     # 創建新提交來撤銷
```

## 🔄 遠端操作

### 基本操作
```bash
git clone <url>         # 克隆倉庫
git remote -v           # 查看遠端倉庫
git fetch               # 獲取遠端更新
git pull                # 拉取並合併
git push                # 推送到遠端
git push -u origin main # 首次推送並設置上游
```

### 分支操作
```bash
git push origin <branch>        # 推送分支
git push origin --delete <br>   # 刪除遠端分支
git push --tags                 # 推送標籤
```

## 💾 暫存工作

```bash
git stash               # 暫存當前工作
git stash -u            # 包含未追蹤的文件
git stash list          # 查看暫存列表
git stash apply         # 應用暫存
git stash pop           # 應用並刪除暫存
git stash drop          # 刪除暫存
git stash clear         # 清空所有暫存
```

## 🔍 查找和比較

### 搜索
```bash
git grep <pattern>      # 在工作區搜索
git log -S <string>     # 搜索引入/刪除字符串的提交
git log --grep=<pattern># 搜索提交訊息
```

### 比較
```bash
git diff                # 工作區 vs 暫存區
git diff --cached       # 暫存區 vs HEAD
git diff HEAD           # 工作區 vs HEAD
git diff <br1> <br2>    # 比較兩個分支
git diff <commit1> <commit2> # 比較兩個提交
```

## 🏷️ 標籤

```bash
git tag                 # 查看標籤
git tag <name>          # 創建輕量標籤
git tag -a <name> -m    # 創建附註標籤
git tag -d <name>       # 刪除標籤
git push origin <tag>   # 推送標籤
git push --tags         # 推送所有標籤
```

## 🔧 配置

### 用戶信息
```bash
git config --global user.name "Name"
git config --global user.email "email"
```

### 別名
```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
```

### 查看配置
```bash
git config --list       # 查看所有配置
git config user.name    # 查看特定配置
```

## 🎯 高級操作

### Rebase
```bash
git rebase <branch>     # 變基
git rebase -i HEAD~3    # 交互式變基
git rebase --continue   # 繼續變基
git rebase --abort      # 取消變基
```

### Cherry-pick
```bash
git cherry-pick <commit># 應用特定提交
git cherry-pick <c1> <c2> # 應用多個提交
```

### Bisect（二分查找）
```bash
git bisect start        # 開始二分查找
git bisect bad          # 標記當前為壞版本
git bisect good <commit># 標記好版本
git bisect reset        # 結束查找
```

## 📊 統計和分析

```bash
git shortlog -sn        # 貢獻者統計
git log --author=<name> # 查看某人的提交
git log --since="2 weeks ago" # 最近兩週的提交
git log --stat          # 顯示變更統計
git log --pretty=oneline # 自定義格式
```

## 🛡️ 安全操作

### 檢查前先查看
```bash
git diff HEAD           # 查看將要提交的內容
git log origin/main..HEAD # 查看將要推送的提交
```

### 備份
```bash
git branch backup       # 創建備份分支
git tag backup-$(date +%Y%m%d) # 創建備份標籤
```

## 💡 實用技巧

### 修改最後一次提交
```bash
# 修改訊息
git commit --amend -m "新訊息"

# 添加遺漏的文件
git add <file>
git commit --amend --no-edit
```

### 臨時切換分支
```bash
git stash               # 暫存當前工作
git checkout <branch>   # 切換分支
# ... 做一些工作 ...
git checkout -          # 切回之前的分支
git stash pop           # 恢復工作
```

### 查看某個文件的歷史
```bash
git log --follow -p -- <file>
```

### 找回刪除的提交
```bash
git reflog              # 查看所有操作記錄
git checkout <commit>   # 恢復到特定提交
```

## 🚨 緊急情況

### 誤刪除分支
```bash
git reflog              # 找到分支的最後一次提交
git checkout -b <branch> <commit>
```

### 誤提交到錯誤分支
```bash
git reset --hard HEAD~1 # 撤銷提交
git checkout <correct-branch>
git cherry-pick <commit># 應用到正確分支
```

### 推送了錯誤的提交
```bash
# 如果還沒有人拉取
git reset --hard HEAD~1
git push --force

# 如果已經有人拉取（推薦）
git revert <commit>
git push
```

## 📝 提交訊息模板

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type**: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert

**範例**:
```
feat(crawler): 新增批量爬取功能

- 支持從系列頁面提取文章
- 自動轉換為 Markdown
- 修復格式問題

Closes #123
```

## 🔗 相關資源

- [專業 Git 工作流程指南](./📘%20專業Git工作流程指南.md)
- [Learn Git Branching](https://learngitbranching.js.org/?locale=zh_TW)
- [Pro Git Book](https://git-scm.com/book/zh/v2)

---

**提示**: 將常用命令設置為別名，可以大大提高效率！
