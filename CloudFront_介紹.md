# AWS CloudFront 介紹

## 什麼是 CloudFront？

CloudFront 是 AWS 的 **內容傳遞網路 (CDN)**，它將你的網站內容快取到全球各地的邊緣節點，讓用戶可以從最近的伺服器獲取內容，大幅提升載入速度。

## 核心概念

### Distribution（分發）
一個 CloudFront Distribution 就是一個 CDN 配置，包含：
- Origin（來源）：內容的原始位置（如 S3 bucket）
- 快取設定
- SSL/HTTPS 設定
- 地理限制等

### Origin（來源）
內容的原始儲存位置，可以是：
- Amazon S3 bucket
- EC2 實例
- Elastic Load Balancer
- 任何 HTTP 伺服器

### Edge Location（邊緣節點）
全球超過 400 個節點，分布在：
- 北美洲
- 歐洲
- 亞洲（包含東京、新加坡、香港等）
- 南美洲
- 澳洲

## 為什麼使用 CloudFront？

### 1. HTTPS 支援
S3 靜態網站託管只支援 HTTP，透過 CloudFront 可以免費獲得 HTTPS。

### 2. 全球加速
用戶從最近的邊緣節點獲取內容，延遲大幅降低。

### 3. 降低成本
減少對 Origin 的請求次數，降低 S3 傳輸費用。

### 4. DDoS 防護
內建 AWS Shield Standard，免費提供基本 DDoS 防護。

### 5. 壓縮
自動壓縮 HTML、CSS、JS 等文件，減少傳輸量。

## 本專案的 CloudFront 設定

| 項目 | 值 |
|-----|-----|
| Distribution Domain | `dkjuqtsbwj2f8.cloudfront.net` |
| Origin | `xian-hexo-blog-2025.s3-website-ap-northeast-1.amazonaws.com` |
| Protocol | HTTPS（自動重定向 HTTP） |
| Price Class | 使用全部邊緣節點 |

## 網站網址

### HTTPS（推薦）
```
https://dkjuqtsbwj2f8.cloudfront.net
```

### 原始 S3 網址（HTTP）
```
http://xian-hexo-blog-2025.s3-website-ap-northeast-1.amazonaws.com
```

## 常用操作

### 清除快取（Invalidation）

當你更新網站內容後，需要清除 CloudFront 快取：

1. 進入 CloudFront Console
2. 選擇你的 Distribution
3. 點擊「無效判定」(Invalidations) 標籤
4. 點擊「建立無效判定」
5. 輸入路徑：`/*`（清除所有快取）
6. 點擊「建立」

### 查看統計數據

CloudFront 提供詳細的統計數據：
- 請求數量
- 資料傳輸量
- 快取命中率
- 熱門物件
- 訪客地理分布

## 費用說明

### 免費額度（每月）
- 1 TB 資料傳出
- 10,000,000 次 HTTP/HTTPS 請求
- 2,000,000 次 CloudFront Functions 調用

### 超出免費額度後
- 資料傳出：約 $0.085/GB（依區域不同）
- HTTP 請求：約 $0.0075/10,000 次

對於個人部落格，通常不會超過免費額度。

## 進階功能

### 自訂網域
可以使用自己的網域（如 `blog.example.com`），需要：
1. 在 Route 53 或其他 DNS 服務設定 CNAME
2. 在 AWS Certificate Manager 申請 SSL 憑證
3. 在 CloudFront 設定 Alternate Domain Names

### Lambda@Edge
在邊緣節點執行程式碼，可用於：
- URL 重寫
- A/B 測試
- 動態內容生成
- 認證授權

### 地理限制
可以限制特定國家/地區的訪問。

## 部署流程更新

現在的完整部署流程：

```bash
# 1. 生成靜態文件
npm run build

# 2. 上傳到 S3
npm run deploy:s3

# 3. 清除 CloudFront 快取（可選，如果內容有更新）
# 在 AWS Console 手動操作，或使用 AWS CLI：
# aws cloudfront create-invalidation --distribution-id E1D7UMPPDIR54S --paths "/*"
```

## 相關資源

- [CloudFront 官方文檔](https://docs.aws.amazon.com/cloudfront/)
- [CloudFront 定價](https://aws.amazon.com/cloudfront/pricing/)
- [CloudFront 最佳實踐](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/best-practices.html)
