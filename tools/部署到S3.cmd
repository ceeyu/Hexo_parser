@echo off
chcp 65001 >nul
echo ========================================
echo    部署 Hexo 到 AWS S3
echo ========================================
echo.

echo [1/3] 清理舊文件...
call npm run clean
if errorlevel 1 (
    echo 清理失敗！
    pause
    exit /b 1
)

echo.
echo [2/3] 生成靜態文件...
call npm run build
if errorlevel 1 (
    echo 生成失敗！
    pause
    exit /b 1
)

echo.
echo [3/3] 上傳到 S3...
aws s3 sync public/ s3://xian-hexo-blog-2025/ --delete --acl public-read
if errorlevel 1 (
    echo 上傳失敗！請確認 AWS CLI 已安裝並配置。
    pause
    exit /b 1
)

echo.
echo ========================================
echo    部署完成！
echo    網址: http://xian-hexo-blog-2025.s3-website-ap-northeast-1.amazonaws.com
echo ========================================
pause
