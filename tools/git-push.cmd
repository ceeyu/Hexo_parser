@echo off
REM 專業的 Git 推送腳本
REM 使用方法：tools\git-push.cmd "提交訊息"

echo.
echo ========================================
echo    Git 自動推送腳本
echo ========================================
echo.

REM 檢查是否提供提交訊息
if "%~1"=="" (
    echo [錯誤] 請提供提交訊息
    echo.
    echo 使用方法：
    echo   tools\git-push.cmd "你的提交訊息"
    echo.
    echo 範例：
    echo   tools\git-push.cmd "新增文章：AWS 部署指南"
    echo   tools\git-push.cmd "修復：文章格式問題"
    echo   tools\git-push.cmd "更新：主題樣式"
    echo.
    exit /b 1
)

REM 顯示當前狀態
echo [1/5] 檢查 Git 狀態...
git status --short
echo.

REM 添加所有變更
echo [2/5] 添加所有變更...
git add .
echo.

REM 提交變更
echo [3/5] 提交變更...
git commit -m "%~1"
if errorlevel 1 (
    echo.
    echo [提示] 沒有需要提交的變更
    exit /b 0
)
echo.

REM 推送到 GitHub
echo [4/5] 推送到 GitHub...
git push origin main
if errorlevel 1 (
    echo.
    echo [錯誤] 推送失敗，請檢查網路連線或權限
    exit /b 1
)
echo.

REM 顯示最新提交
echo [5/5] 最新提交記錄：
git log -1 --oneline
echo.

echo ========================================
echo    推送完成！
echo ========================================
echo.
echo GitHub 倉庫：https://github.com/ceeyu/Hexo_parser
echo.
