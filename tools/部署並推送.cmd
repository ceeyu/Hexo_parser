@echo off
REM 完整的部署和推送流程
REM 使用方法：tools\部署並推送.cmd "提交訊息"

echo.
echo ========================================
echo    Hexo 部署 + Git 推送
echo ========================================
echo.

REM 檢查提交訊息
if "%~1"=="" (
    set /p COMMIT_MSG="請輸入提交訊息: "
) else (
    set COMMIT_MSG=%~1
)

echo 提交訊息：%COMMIT_MSG%
echo.

REM 步驟 1：清理
echo [1/6] 清理舊文件...
call npm run clean
if errorlevel 1 goto :error
echo.

REM 步驟 2：生成靜態文件
echo [2/6] 生成靜態文件...
call npm run build
if errorlevel 1 goto :error
echo.

REM 步驟 3：部署到 AWS
echo [3/6] 部署到 AWS S3...
call npm run deploy
if errorlevel 1 goto :error
echo.

REM 步驟 4：Git 添加
echo [4/6] 添加變更到 Git...
git add .
echo.

REM 步驟 5：Git 提交
echo [5/6] 提交到本地倉庫...
git commit -m "%COMMIT_MSG%"
if errorlevel 1 (
    echo [提示] 沒有需要提交的變更
    goto :skip_push
)
echo.

REM 步驟 6：Git 推送
echo [6/6] 推送到 GitHub...
git push origin main
if errorlevel 1 goto :error
echo.

:skip_push
echo ========================================
echo    部署完成！
echo ========================================
echo.
echo AWS 網站：http://xian-hexo-blog-2025.s3-website-ap-northeast-1.amazonaws.com
echo GitHub：https://github.com/ceeyu/Hexo_parser
echo.
goto :end

:error
echo.
echo [錯誤] 執行失敗，請檢查錯誤訊息
exit /b 1

:end
