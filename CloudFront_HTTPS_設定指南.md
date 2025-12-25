# CloudFront HTTPS 設定指南

## 步驟 1：進入 CloudFront Console

1. 登入 [AWS Console](https://console.aws.amazon.com/)
2. 搜尋並進入 **CloudFront**
3. 點擊 **Create Distribution**

## 步驟 2：設定 Origin

| 設定項目 | 值 |
|---------|-----|
| Origin domain | `xian-hexo-blog-2025.s3-website-ap-northeast-1.amazonaws.com` |
| Protocol | **HTTP only**（S3 網站託管只支援 HTTP） |
| Name | 自動填入，保持預設 |

> ⚠️ **重要**：不要選擇 S3 bucket 下拉選項，要手動輸入完整的 S3 網站端點！

## 步驟 3：設定 Default Cache Behavior

| 設定項目 | 值 |
|---------|-----|
| Viewer protocol policy | **Redirect HTTP to HTTPS** |
| Allowed HTTP methods | GET, HEAD |
| Cache policy | **CachingOptimized**（推薦）|
| Compress objects automatically | **Yes** |

## 步驟 4：設定 Settings

| 設定項目 | 值 |
|---------|-----|
| Price class | **Use all edge locations**（或選擇較便宜的區域） |
| Default root object | `index.html` |
| Description | `Hexo Blog HTTPS` |

## 步驟 5：創建 Distribution

1. 點擊 **Create Distribution**
2. 等待狀態從 **Deploying** 變成 **Enabled**（約 5-15 分鐘）
3. 複製 **Distribution domain name**（如 `d1234abcd.cloudfront.net`）

## 步驟 6：測試 HTTPS

完成後，你的網站就可以用 HTTPS 訪問了：
```
https://d1234abcd.cloudfront.net
```

## 額外設定：自訂錯誤頁面（可選）

為了讓 SPA 路由或 404 頁面正常工作：

1. 進入你的 Distribution
2. 點擊 **Error pages** 標籤
3. 點擊 **Create custom error response**
4. 設定：
   - HTTP error code: `404`
   - Customize error response: Yes
   - Response page path: `/index.html`
   - HTTP response code: `200`

## 更新部署後清除快取

每次部署新內容後，需要清除 CloudFront 快取：

### 方法 1：AWS Console
1. 進入 CloudFront Distribution
2. 點擊 **Invalidations** 標籤
3. 點擊 **Create invalidation**
4. 輸入 `/*` 清除所有快取

### 方法 2：AWS CLI（如果有安裝）
```bash
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## 費用說明

CloudFront 有免費額度：
- 每月 1TB 資料傳輸
- 每月 1000 萬次 HTTP/HTTPS 請求
- 每月 200 萬次 CloudFront Functions 調用

對於個人部落格來說，通常不會超過免費額度。

## 完成後

記得更新你的網站連結，使用新的 HTTPS 網址！
