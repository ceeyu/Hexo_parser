# Hexo 在 AWS 上部署指南

## 方法 1: S3 + CloudFront（推薦）

### 1. AWS 設置

#### 創建 S3 Bucket
```bash
# 使用 AWS CLI 創建 bucket
aws s3 mb s3://your-website-name --region us-east-1
```

或在 AWS Console:
- 進入 S3 服務
- 點擊 "Create bucket"
- 輸入唯一的 bucket 名稱
- 選擇區域
- 取消勾選 "Block all public access"（如果要公開訪問）

#### 配置 Bucket 為靜態網站
```bash
aws s3 website s3://your-website-name/ --index-document index.html --error-document 404.html
```

#### 設置 Bucket Policy（公開訪問）
在 S3 Bucket 的 Permissions > Bucket Policy 添加：
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-website-name/*"
    }
  ]
}
```

### 2. 配置 IAM 用戶

創建 IAM 用戶並附加以下策略：
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::your-website-name",
        "arn:aws:s3:::your-website-name/*"
      ]
    }
  ]
}
```

保存 Access Key ID 和 Secret Access Key。

### 3. 配置 Hexo

更新 `_config.yml` 的 deploy 部分：
```yaml
deploy:
  type: aws-s3
  bucket: your-website-name
  region: us-east-1
  # 可選：如果要使用 CloudFront
  # cloudfront: YOUR_DISTRIBUTION_ID
```

### 4. 設置 AWS 憑證

**方法 A: 使用環境變數**
```bash
# Windows CMD
set AWS_ACCESS_KEY_ID=your_access_key
set AWS_SECRET_ACCESS_KEY=your_secret_key

# Windows PowerShell
$env:AWS_ACCESS_KEY_ID="your_access_key"
$env:AWS_SECRET_ACCESS_KEY="your_secret_key"
```

**方法 B: 使用 AWS CLI 配置**
```bash
aws configure
# 輸入 Access Key ID
# 輸入 Secret Access Key
# 輸入默認區域（如 us-east-1）
# 輸入默認輸出格式（json）
```

### 5. 部署網站

```bash
# 清理舊文件
npm run clean

# 生成靜態文件
npm run build

# 部署到 S3
npm run deploy
```

### 6. 配置 CloudFront（可選，推薦用於 CDN 加速）

1. 在 AWS Console 進入 CloudFront
2. 創建新的 Distribution
3. Origin Domain 選擇你的 S3 bucket
4. 設置 Default Root Object 為 `index.html`
5. 配置自定義域名（可選）
6. 等待部署完成（約 15-20 分鐘）

獲取 Distribution ID 後，更新 `_config.yml`：
```yaml
deploy:
  type: aws-s3
  bucket: your-website-name
  region: us-east-1
  cloudfront: YOUR_DISTRIBUTION_ID
```

---

## 方法 2: AWS Amplify（最簡單，自動化）

### 1. 安裝 Amplify CLI
```bash
npm install -g @aws-amplify/cli
amplify configure
```

### 2. 初始化 Amplify
```bash
amplify init
```

### 3. 添加 Hosting
```bash
amplify add hosting
# 選擇 "Hosting with Amplify Console"
# 選擇 "Manual deployment"
```

### 4. 部署
```bash
npm run build
amplify publish
```

---

## 方法 3: EC2（適合需要服務器端功能）

### 1. 啟動 EC2 實例
- 選擇 Amazon Linux 2 或 Ubuntu
- 配置安全組（開放 80, 443 端口）

### 2. 連接並安裝依賴
```bash
# 更新系統
sudo yum update -y  # Amazon Linux
# 或
sudo apt update && sudo apt upgrade -y  # Ubuntu

# 安裝 Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# 安裝 Nginx
sudo yum install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 3. 部署 Hexo
```bash
# 克隆或上傳你的項目
git clone your-repo-url
cd hexo-site

# 安裝依賴
npm install

# 生成靜態文件
npm run build

# 複製到 Nginx 目錄
sudo cp -r public/* /usr/share/nginx/html/
```

### 4. 配置域名（可選）
- 使用 Route 53 配置 DNS
- 使用 Certificate Manager 申請 SSL 證書
- 配置 Nginx 使用 HTTPS

---

## 成本比較

| 方法 | 月成本估算 | 優點 | 缺點 |
|------|-----------|------|------|
| S3 + CloudFront | $1-5 | 便宜、可擴展、CDN | 僅靜態內容 |
| Amplify | $0.15/GB | 自動化、CI/CD | 稍貴 |
| EC2 | $5-20+ | 完全控制 | 需要維護 |

---

## 推薦配置

對於 Hexo 博客，推薦使用 **S3 + CloudFront**：
- 成本最低
- 性能優秀
- 維護簡單
- 全球 CDN 加速

## 自定義域名設置

### 使用 Route 53
1. 註冊或轉移域名到 Route 53
2. 創建 Hosted Zone
3. 添加 A 記錄指向 CloudFront 或 S3
4. 在 CloudFront 中配置 Alternate Domain Names (CNAMEs)
5. 使用 AWS Certificate Manager 申請免費 SSL 證書

### 更新 Hexo 配置
```yaml
# _config.yml
url: https://your-domain.com
```

---

## 自動化部署（GitHub Actions）

創建 `.github/workflows/deploy.yml`：
```yaml
name: Deploy to AWS S3

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy to S3
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --delete
        env:
          AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: 'us-east-1'
          SOURCE_DIR: 'public'
```

在 GitHub Repository Settings > Secrets 中添加：
- `AWS_S3_BUCKET`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
