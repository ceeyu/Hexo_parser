# 使用 AWS Kiro 與 S3 + CloudFront 打造現代化靜態網站部署流程

> **作者**：AWS Community Builder  
> **難度**：初級至中級  
> **預估時間**：60-90 分鐘  
> **AWS 服務**：S3, CloudFront, IAM

## 前言

在這篇文章中，我將分享如何使用 AWS 最新推出的 AI 輔助開發工具 **Kiro**，結合 **Amazon S3** 與 **CloudFront** 建立一個完整的靜態網站部署流程。這個方案特別適合技術部落格、個人作品集或文件網站的託管需求。

### 為什麼選擇這個架構？

| 優勢 | 說明 |
|-----|------|
| **成本效益** | S3 靜態網站託管費用極低，小型網站每月可能不到 $1 USD |
| **全球加速** | CloudFront CDN 提供全球 400+ 邊緣節點，大幅降低延遲 |
| **高可用性** | S3 提供 99.999999999% (11 個 9) 的資料耐久性 |
| **免費 HTTPS** | CloudFront 內建免費 SSL/TLS 憑證 |
| **AI 輔助開發** | Kiro 可加速開發流程，自動生成程式碼與配置 |

---

## 架構概覽

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   開發者    │────▶│  Amazon S3  │────▶│ CloudFront  │────▶ 全球用戶
│   (Kiro)    │     │  (Origin)   │     │   (CDN)     │
└─────────────┘     └─────────────┘     └─────────────┘
       │                                       │
       │         ┌─────────────┐              │
       └────────▶│    IAM      │◀─────────────┘
                 │ (權限控制)   │
                 └─────────────┘
```

---

## Part 1：認識 AWS Kiro

### 什麼是 Kiro？

[Kiro](https://kiro.dev/) 是 AWS 推出的 AI 輔助開發工具，基於 VS Code 架構，整合了 Amazon Q 的 AI 能力。它能夠：

- 理解自然語言指令並生成程式碼
- 自動化重複性開發任務
- 提供智慧程式碼補全與建議
- 直接與 AWS 服務整合

### 安裝 Kiro

1. 前往 [Kiro 官方網站](https://kiro.dev/) 下載安裝程式
2. 執行安裝精靈，依照提示完成安裝
3. 首次啟動時，可選擇從 VS Code 匯入設定與擴充套件

> 💡 **提示**：Kiro 支援從 VS Code 匯入現有配置，包括主題、快捷鍵與擴充套件，讓遷移過程更加順暢。

### 初始設定

啟動 Kiro 後，建議進行以下設定：

1. **語言設定**：可切換為繁體中文介面
2. **AWS 帳戶連結**：登入 AWS Builder ID 以啟用完整功能
3. **Bonus Credit**：新用戶會獲得免費額度，可用於 AI 功能

---

## Part 2：建立 Hexo 專案

### 環境準備

確保已安裝以下工具：
- Node.js (建議 v18+)
- npm 或 yarn
- Git

### 初始化專案

在 Kiro 終端機中執行：

```bash
# 安裝 Hexo CLI
npm install -g hexo-cli

# 建立新專案
hexo init my-blog

# 進入專案目錄並安裝依賴
cd my-blog
npm install
```

### 本地預覽

```bash
# 啟動開發伺服器
hexo server
```

開啟瀏覽器訪問 `http://localhost:4000/` 即可預覽網站。

> 按 `Ctrl + C` 可停止伺服器。

---

## Part 3：AWS 環境配置

### 3.1 建立 IAM 用戶

> ⚠️ **安全最佳實踐**：請勿使用 root 帳戶進行日常操作，應建立專用的 IAM 用戶。

#### 步驟：

1. 登入 [AWS Console](https://console.aws.amazon.com/)
2. 搜尋並進入 **IAM** 服務
3. 點擊左側選單 **Users** → **Add users**
4. 設定用戶名稱：`hexo-deployer`
5. 附加以下權限政策：
   - `AmazonS3FullAccess`
   - `CloudFrontFullAccess`
6. 完成建立後，進入用戶詳情頁
7. 點擊 **Security credentials** → **Create access key**
8. 選擇 **Command Line Interface (CLI)**
9. **務必保存** Access Key ID 與 Secret Access Key

```
Access Key ID:     AKIA****************
Secret Access Key: ****************************************
```

> 🔐 **重要**：Secret Access Key 只會顯示一次，請立即保存至安全位置。

### 3.2 建立 S3 Bucket

#### 步驟：

1. 進入 **S3** 服務
2. 點擊 **Create bucket**
3. 配置以下設定：

| 設定項目 | 值 |
|---------|-----|
| Bucket name | `your-blog-name-2025`（必須全球唯一）|
| AWS Region | `ap-northeast-1`（東京，推薦台灣用戶）|
| Block Public Access | **取消勾選**（允許公開存取）|

4. 確認警告訊息並建立

#### 啟用靜態網站託管：

1. 進入 Bucket → **Properties**
2. 滾動至 **Static website hosting** → **Edit**
3. 選擇 **Enable**
4. 設定：
   - Index document: `index.html`
   - Error document: `404.html`
5. 保存後記錄 **Bucket website endpoint**

#### 設定 Bucket Policy：

進入 **Permissions** → **Bucket policy**，貼上以下政策：

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::your-bucket-name/*"
        }
    ]
}
```

> 📝 請將 `your-bucket-name` 替換為實際的 Bucket 名稱。

### 3.3 安裝與配置 AWS CLI

#### 安裝：

前往 [AWS CLI 安裝指南](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) 下載對應作業系統的安裝程式。

#### 驗證安裝：

```bash
aws --version
# aws-cli/2.x.x Python/3.x.x Windows/10 exe/AMD64
```

#### 配置憑證：

```bash
aws configure
```

依序輸入：
- AWS Access Key ID
- AWS Secret Access Key
- Default region name: `ap-northeast-1`
- Default output format: `json`

---

## Part 4：配置 Hexo 部署

### 安裝部署套件

```bash
npm install --save @string-bean/hexo-deployer-aws-s3
```

### 修改 _config.yml

編輯專案根目錄的 `_config.yml`：

```yaml
# 網站 URL（使用 S3 端點或 CloudFront 網域）
url: https://your-distribution.cloudfront.net

# 部署設定
deploy:
  type: aws-s3
  bucket: your-bucket-name
  region: ap-northeast-1
```

### 部署指令

```bash
# 清理快取
npm run clean

# 生成靜態檔案
npm run build

# 部署至 S3
npm run deploy
```

---

## Part 5：配置 CloudFront CDN

### 為什麼需要 CloudFront？

| 功能 | 說明 |
|-----|------|
| **HTTPS** | S3 靜態網站僅支援 HTTP，CloudFront 提供免費 SSL |
| **全球加速** | 內容快取至全球邊緣節點 |
| **DDoS 防護** | 內建 AWS Shield Standard |
| **壓縮** | 自動壓縮 HTML/CSS/JS |

### 建立 Distribution

1. 進入 **CloudFront** 服務
2. 點擊 **Create distribution**
3. 配置 Origin：
   - Origin domain: `your-bucket.s3-website-ap-northeast-1.amazonaws.com`
4. 其他設定保持預設
5. 點擊 **Create distribution**

### 查詢 Distribution 狀態

使用 CloudShell 或本地終端機：

```bash
aws cloudfront list-distributions \
  --query "DistributionList.Items[*].[Id,DomainName,Status]" \
  --output table
```

### 清除快取（Invalidation）

當網站內容更新後，需清除 CDN 快取：

```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

> 💡 **提示**：在瀏覽器按 `Ctrl + Shift + R` 可強制刷新頁面。

---

## Part 6：進階功能 - 自訂主題

### 建立主題目錄結構

```bash
# 建立主題資料夾
mkdir -p themes/fast-theme/layout/partial
mkdir -p themes/fast-theme/source/css
mkdir -p themes/fast-theme/source/js
```

### 主題配置

在 `_config.yml` 中指定主題：

```yaml
theme: fast-theme
```

---

## Part 7：內容管理 - 爬蟲工具

本專案包含自動化爬蟲工具，可從 iThome 鐵人賽匯入文章。

### 單篇文章爬取

```bash
node tools/爬取ithome文章.js https://ithelp.ithome.com.tw/articles/10234567
```

### 批量爬取系列文章

```bash
node tools/批量爬取系列文章.js
```

### 瀏覽器書籤工具

最簡單的方式是使用書籤工具：

1. 建立新書籤，名稱設為 `📝 複製為Markdown`
2. 網址欄貼上 JavaScript 程式碼（詳見專案文件）
3. 在 iThome 文章頁面點擊書籤即可複製 Markdown 格式

---

## 常見問題排解

### Q1: 部署後網站顯示 403 Forbidden

**原因**：Bucket Policy 未正確設定或 Block Public Access 未關閉。

**解決方案**：
1. 確認已取消勾選 Block Public Access
2. 確認 Bucket Policy 中的 Resource ARN 正確

### Q2: CloudFront 更新後內容未變化

**原因**：CDN 快取尚未過期。

**解決方案**：
```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_ID \
  --paths "/*"
```

### Q3: hexo deploy 失敗

**原因**：AWS 憑證未正確配置。

**解決方案**：
```bash
aws configure
# 重新輸入 Access Key 與 Secret Key
```

---

## 成本估算

| 服務 | 免費方案 | 超出後費用 |
|-----|---------|-----------|
| S3 | 5GB 儲存 / 20,000 GET | ~$0.023/GB |
| CloudFront | 1TB 傳輸 / 10M 請求 | ~$0.085/GB |
| Route 53 | - | $0.50/hosted zone |

> 對於小型部落格，通常可維持在免費方案範圍內。

---

## 總結

透過本文介紹的架構，我們成功建立了一個：

✅ **高效能** - CloudFront CDN 全球加速  
✅ **低成本** - S3 靜態託管費用極低  
✅ **安全** - HTTPS + IAM 最小權限原則  
✅ **自動化** - Kiro AI 輔助 + 爬蟲工具  

這個方案非常適合技術部落格、個人作品集或文件網站。如果你有任何問題，歡迎在下方留言討論！

---

## 參考資源

- [AWS S3 靜態網站託管文件](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [CloudFront 開發者指南](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/)
- [Kiro 官方網站](https://kiro.dev/)
- [Hexo 官方文件](https://hexo.io/docs/)

---

*本文由 AWS Community Builder 撰寫，如有錯誤歡迎指正。*
