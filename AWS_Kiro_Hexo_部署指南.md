# 使用 AWS Kiro 與 S3 + CloudFront 打造現代化靜態網站部署流程


## 前言

在這篇文章中，將撰寫如何使用 AWS 所推出的 AI 輔助開發工具 **Kiro**，結合 **Amazon S3** 與 **CloudFront** 建立一個完整的靜態網站部署流程。這個方案特別適合技術部落格、個人作品集或文件網站的託管需求!本專案以技術文章網站`[iThome](https://ithelp.ithome.com.tw/articles?tab=tech) 為範例

## Demo 影片
{%youtube https://youtu.be/6TK7SkCooTA?si=afgp4gT1WURm1i-L %}  //複製這段

---

## Part 1：認識 AWS Kiro

[Kiro](https://kiro.dev/) 是 AWS 推出的 AI 輔助開發工具，基於 VS Code 架構，整合了 Amazon Q 的 AI 能力。它能夠做到以下功能：

- 理解自然語言指令並生成程式碼
- 自動化重複性開發任務
- 提供智慧程式碼補全與建議
- 直接與 AWS 服務整合

### 安裝 Kiro

可以在AWS Consol內部搜尋`Kiro`
![image](https://hackmd.io/_uploads/rkjOwzum-l.png)

![image](https://hackmd.io/_uploads/rk9YDfuX-g.png)

![image](https://hackmd.io/_uploads/ByfsPG_XWl.png)

或是由 [Kiro 官方網站](https://kiro.dev/) 安裝
![image](https://hackmd.io/_uploads/BJqAPzdXWx.png)

### 安裝過程，依照提示完成安裝
![image](https://hackmd.io/_uploads/HJ4Z_f_mZg.png)

![image](https://hackmd.io/_uploads/HyWMOG_Q-e.png)

![image](https://hackmd.io/_uploads/HJmmdf_QWe.png)

![image](https://hackmd.io/_uploads/B1t7dfOQbl.png)

![image](https://hackmd.io/_uploads/r1eEuMOQ-e.png)

![image](https://hackmd.io/_uploads/BkOUuz_7Wx.png)

安裝成功後的Kiro畫面!

![image](https://hackmd.io/_uploads/Hyk_dzdQZg.png)

![image](https://hackmd.io/_uploads/r1IyKMuX-x.png)

### VS Code 匯入設定與擴充套件
第一次啟動時，可選擇從 VS Code 匯入設定與擴充套件
* import from VSCode
![image](https://hackmd.io/_uploads/SkBgFfdQbl.png)

### 初始設定
切換主題
![image](https://hackmd.io/_uploads/SyTGKzd7Wl.png)

相關套件匯入
![image](https://hackmd.io/_uploads/B1_7tf_XZl.png)

![image](https://hackmd.io/_uploads/r1oHtG_XZx.png)

![image](https://hackmd.io/_uploads/ByTLYMdQWx.png)

跳出提示: 切換為繁體中文介面

![image](https://hackmd.io/_uploads/BkrM9GOQ-e.png)

**Bonus Credit**：新用戶會獲得免費額度，可用於 AI 功能
![image](https://hackmd.io/_uploads/rkZlwdqmbg.png)

---

## Part 2：建立 Hexo 專案






### 環境準備

確保已安裝以下工具：
- Node.js (建議 v18+)
- npm 或 yarn
- Git

開啟一個聊天欄位
![image](https://hackmd.io/_uploads/H1O4jfd7bx.png)

網頁結果
![image](https://hackmd.io/_uploads/HJfrsMd7Zl.png)

### 基礎設定:
![image](https://hackmd.io/_uploads/BkNvsM_mbg.png)

### 初始化專案
依序在cmd輸入以下指令:
`npm install -g hexo-cli`

![image](https://hackmd.io/_uploads/S18tsfdm-x.png)

`hexo init my-blog`

![image](https://hackmd.io/_uploads/r1w5jGdmbe.png)

`cd my-blog` + `npm install`
![image](https://hackmd.io/_uploads/HJ9piGOmbg.png)

### 本地預覽
開啟server: `hexo server`
測試連結，開啟瀏覽器輸入: http://localhost:4000/ 可預覽網站
> 按 `Ctrl + C` 可停止server。

![image](https://hackmd.io/_uploads/r1gJhGd7bg.png)

---

## Part 3：AWS 環境配置


![image](https://hackmd.io/_uploads/SkAH3Gu7-l.png)

安裝相關套件

![image](https://hackmd.io/_uploads/r1BP3Gumbg.png)

`npm install --save @string-bean/hexo-deployer-aws-s3`
![image](https://hackmd.io/_uploads/SytypzO7Ze.png)


## 開啟my-blog 資料夾

![image](https://hackmd.io/_uploads/r1OT6z_QZg.png)

---

### 3.1 建立 IAM 用戶，取得訪問密鑰

### 步驟 1：創建 IAM 用戶（不要用 root 帳戶操作）

**為什麼？** Root 帳戶權限太大，不安全。所以需要創建一個專門用於部署的用戶。

1. **登入 AWS Console**
   - 前往：[AWS Console](https://console.aws.amazon.com/)
   - 使用 root 帳戶登入

2. **進入 IAM 服務**
   - 在頂部搜索欄輸入 "IAM"
   - 點擊 "IAM" 進入身份和訪問管理
![image](https://hackmd.io/_uploads/r1f3CMOmWl.png)





3. **創建新用戶**
   - 左側菜單點擊 "Users"（用戶、人員）
![image](https://hackmd.io/_uploads/Hk_CRzdmWg.png)
   - 點擊右上角橙色按鈕 "Add users"（新增人員）
![image](https://hackmd.io/_uploads/S1PXkQ_mWx.png)

4. **設置用戶名**
   - User name（用戶名）：輸入 `hexo-deployer`
![image](https://hackmd.io/_uploads/r1SuJmuQ-l.png)
   - 點擊 "Next"（下一步）

5. **設置權限**
   - 選擇 "Attach policies directly"（直接附加策略）
![image](https://hackmd.io/_uploads/SJk0JXum-g.png)
   - 在搜索框搜索並勾選以下兩個策略：
     * `AmazonS3FullAccess`
![image](https://hackmd.io/_uploads/SylelXOXbl.png)
     * `CloudFrontFullAccess`（如果要用 CDN）
![image](https://hackmd.io/_uploads/ryRlgmdX-g.png)
   - 點擊 "Next"（下一步）
6. **審查並創建**
   - 檢查信息
   - 點擊 "Create user"（創建用戶）
![image](https://hackmd.io/_uploads/B1f7lXOmWx.png)


7. **創建訪問密鑰**
   - 點擊剛創建的用戶 `hexo-deployer`
![image](https://hackmd.io/_uploads/SkZVl7uX-e.png)
   - 點擊 "Security credentials"（安全憑證）標籤
![image](https://hackmd.io/_uploads/SyFJbXOQ-x.png)
   - 向下滾動到 "Access keys"（訪問密鑰）部分
   - 點擊 "Create access key"（創建訪問密鑰）
![image](https://hackmd.io/_uploads/S15-bXumbe.png)
   - 選擇 "Command Line Interface (CLI)"
   - 勾選底部的確認框
![image](https://hackmd.io/_uploads/rkOQW7OQ-l.png)
   - 點擊 "Next"
   - 點擊 "Create access key"
![image](https://hackmd.io/_uploads/ByaVZmOQWg.png)
8. **重要：保存密鑰**
   - 你會看到：
     * Access key ID（訪問密鑰 ID）：類似 `AKIA****************`
     * Secret access key（私密訪問密鑰）：`****************************************`
   - **立即複製並保存到安全的地方！**
   - **這是唯一一次可以看到 Secret access key！**
   - 點擊 "Download .csv file"（下載 CSV 文件）備份
   - 點擊 "Done"
![image](https://hackmd.io/_uploads/HymvbXuQWg.png)

---

### 3.2 建立 S3 Bucket

#### 步驟：

1. **進入 S3 服務**
   - 在頂部搜索欄輸入 "S3"
   - 點擊 "S3" 進入
![image](https://hackmd.io/_uploads/rJH-zQ_QWl.png)
2. **創建 Bucket**
   - 點擊橙色按鈕 "Create bucket"（創建儲存桶）
![image](https://hackmd.io/_uploads/BJozzm_m-l.png)
3. **基本設置**
   - **右上角 AWS Region**（區域）：選擇離你最近的
     * 在台灣可以使用：`ap-northeast-1`（東京）或：`ap-southeast-1`（新加坡）
![image](https://hackmd.io/_uploads/Bk49MQ_m-g.png)
   - **Bucket name**（儲存桶名稱）：輸入唯一名稱
     * 例如：`xian-hexo-blog-2025`（必須全球唯一，只能小寫字母、數字、連字符）
     * ⚠️ 記住這個名稱，後面會用到！
![image](https://hackmd.io/_uploads/Sy0hMQ_XWg.png)
4. **公開訪問設置**
   - **取消勾選** "Block all public access"（阻止所有公開訪問）
   - 會出現警告，勾選確認框：
     ✅ "I acknowledge that the current settings might result in this bucket and the objects within becoming public"
![image](https://hackmd.io/_uploads/HJ2bXm_7Wg.png)
5. **其他設置保持默認**
   - Bucket Versioning：保持 Disabled
   - Tags：可以不填
   - Default encryption：保持默認
![image](https://hackmd.io/_uploads/B1kmm7umZl.png)
6. **創建**
   - 滾動到底部，點擊橙色按鈕 "Create bucket"


#### 啟用靜態網站託管：

1. **進入你的 Bucket**
   - 在 S3 列表中點擊你剛創建的 bucket 名稱
![image](https://hackmd.io/_uploads/HJMB7XumZl.png)
2. **進入屬性設置**
   - 點擊 "Properties"（屬性）標籤
![image](https://hackmd.io/_uploads/Skcjm7d7-l.png)
3. **啟用靜態網站託管**
> [Hosting a static website using Amazon S3 User Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html?icmpid=docs_amazons3_console)
   - 滾動到最底部找到 "Static website hosting"（靜態網站託管）
![image](https://hackmd.io/_uploads/S1yyEQu7-e.png)
   - 點擊右側 "Edit"（編輯）
   - 選擇 "Enable"（啟用）
   - Hosting type：選擇 "Host a static website"
![image](https://hackmd.io/_uploads/H1jrN7u7Wl.png)
   - Index document：輸入 `index.html`
   - Error document：輸入 `404.html`
![image](https://hackmd.io/_uploads/SyYUNQ_mWg.png)
   - 點擊 "Save changes"（保存更改）
![image](https://hackmd.io/_uploads/B1Id47OQbe.png)


4. **記錄網站端點**
   - 返回 Properties 標籤
   - 在 "Static website hosting" 部分
   - 看到 "Bucket website endpoint"（儲存桶網站端點）
   - 類似：http://xian-hexo-blog-2025.s3-website-ap-northeast-1.amazonaws.com
   - 這是目前的網站地址！
![image](https://hackmd.io/_uploads/SymcV7_7Wl.png)
* 尚未配置完成，現在直接點選會有403 Forbidden 問題
![image](https://hackmd.io/_uploads/HyiZHXdm-x.png)


#### 設定 Bucket Policy：
1. **進入權限設置**
   - 點擊 "Permissions"（權限）標籤
![image](https://hackmd.io/_uploads/S1-VSQOX-g.png)
2. **編輯 Bucket Policy**
   - 滾動到 "Bucket policy"（儲存桶策略）部分
![image](https://hackmd.io/_uploads/rkr8BmOXbg.png)
   - 點擊 "Edit"（編輯）
![image](https://hackmd.io/_uploads/SJ5DrmdmZe.png)
3. **添加策略**
   - 在編輯器中貼上以下內容：
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-bucket-name/
       }
     ]
   }
   ```
   - **重要**：請將 `your-bucket-name`替換為你的 bucket 名稱
     * 例如：`arn:aws:s3:::xian-hexo-blog-2025/*`
![image](https://hackmd.io/_uploads/HyQNU7uQ-e.png)
   - 點擊 "Save changes"（保存更改）
![image](https://hackmd.io/_uploads/SkeBUQO7Zg.png)

---

### 3.3 安裝與配置 AWS CLI

#### 安裝：
1. **下載 AWS CLI**
   - 前往：[AWS 命令列界面官方安裝指南](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
   - 點擊 Windows 標籤
![image](https://hackmd.io/_uploads/r1kVOXd7Wx.png)
   - [下載 MSI 安裝程序（64 位)](https://awscli.amazonaws.com/AWSCLIV2.msi)
   - 運行安裝程序，按默認選項安裝
![image](https://hackmd.io/_uploads/rk7IdQOQWl.png)
![image](https://hackmd.io/_uploads/rJjUO7_7Wl.png)
![image](https://hackmd.io/_uploads/HJuDOmum-l.png)
![image](https://hackmd.io/_uploads/BJlOd7d7Wx.png)
2. **驗證安裝**
   - 打開命令提示符（CMD）
   - 輸入：
   ```cmd
   aws --version
   ```
   - 可以看到版本信息
![image](https://hackmd.io/_uploads/Hy2h_7umZe.png)
3. **配置 AWS CLI**
   - 在 CMD 中輸入：
   ```cmd
   aws configure
   ```
   - 按提示輸入：
     * AWS Access Key ID：輸入步驟 1 保存的 Access Key ID
![image](https://hackmd.io/_uploads/SkgMNtXdmbx.png)
     * AWS Secret Access Key：輸入步驟 1 保存的 Secret Access Key
     * Default region name：輸入你的 bucket 區域（如 `ap-northeast-1`）
     * Default output format：輸入 `json`
![image](https://hackmd.io/_uploads/ryh3KXOXWl.png)

---

## Part 4：配置 Hexo 部署

### 安裝部署套件
在cmd輸入

```bash
npm install --save @string-bean/hexo-deployer-aws-s3
```
![image](https://hackmd.io/_uploads/SyyFMC9m-l.png)

1. **打開項目文件夾**
   - 在 CMD 中進入你的 Hexo 項目目錄
   ```cmd
   cd 你的專案路徑
   ```
2. **編輯 _config.yml**
   - 用文本編輯器打開 `_config.yml`
   - 找到最底部的 `deploy:` 部分
   - 修改為：
   ```yaml
   deploy:
     type: aws-s3
     bucket: your-bucket-name  # 改為你的 bucket 名稱
     region: ap-northeast-1      # 改為你的區域
   ```
![image](https://hackmd.io/_uploads/BkFYjmOXZl.png)
3. **更新網站 URL**
   - 在同一個 `_config.yml` 文件中
   - 找到頂部的 `url:` 設置
   - 修改為你的 S3 網站端點(目前的網站URL)：
   ```yaml
   url: http://xian-hexo-blog-2025.s3-website-ap-northeast-1.amazonaws.com
   ```
![image](https://hackmd.io/_uploads/Hyno5QuXZe.png)
4. **保存文件**


### 部署指令

1. **清理舊文件**
在cmd輸入
   ```
   # 清理快取
   npm run clean
   ```
![image](https://hackmd.io/_uploads/rJYCcmdQWg.png)

2. **生成靜態文件**
在cmd輸入
   ```
   # 生成靜態檔案
   npm run build
   ```
![image](https://hackmd.io/_uploads/Skt-sQu7Zx.png)
   - 你會看到生成了 `public` 文件夾
![image](https://hackmd.io/_uploads/ryTXj7dQbx.png)
   - 這裡面是你的網站所有文件



3. **部署到 AWS**
在cmd輸入
   ```
   # 部署至 S3
   npm run deploy
   ```
   - 第一次可能需要幾分鐘
   - 你會看到上傳進度
   - 完成後會顯示成功信息
![image](https://hackmd.io/_uploads/r1l3omdmWg.png)


4. **開啟網站**
   - 打開瀏覽器
   - 訪問你的 S3 網站端點
   - 你的網站成功上線了！
![image](https://hackmd.io/_uploads/S1xRsm_7Zx.png)




### 基礎Hexo語法統整

1. **創建新文章**
   ```cmd
   npx hexo new post "我的第一篇文章"
   ```
   - 會在 `source/_posts/` 創建新的 markdown 文件
   - 編輯這個文件寫內容
2. **本地預覽**
   ```cmd
   npm run server
   ```
   - 打開瀏覽器訪問 http://localhost:4000
   - 檢查效果
   - 按 Ctrl+C 停止服務器
3. **部署更新**
   ```cmd
   npm run clean
   npm run build
   npm run deploy
   ```
   - 等待上傳完成
   - 刷新你的網站查看更新

---

## Part 5：配置 CloudFront CDN


### 什麼是 CloudFront？

CloudFront 是 AWS 的 **內容傳遞網路 (CDN)**，它將你的網站內容快取到全球各地的邊緣節點，讓用戶可以從最近的伺服器獲取內容，大幅提升載入速度。

### 核心概念

#### Distribution（分發）
一個 CloudFront Distribution 就是一個 CDN 配置，包含：
- Origin（來源）：內容的原始位置（如 S3 bucket）
- 快取設定
- SSL/HTTPS 設定
- 地理限制等

#### Origin（來源）
內容的原始儲存位置，可以是：
- Amazon S3 bucket
- EC2 實例
- Elastic Load Balancer
- 任何 HTTP 伺服器

#### Edge Location（邊緣節點）
全球超過 400 個節點，分布在：
- 北美洲
- 歐洲
- 亞洲（包含東京、新加坡、香港等）
- 南美洲
- 澳洲

### 為什麼需要 CloudFront？

| 功能 | 說明 |
|-----|------|
| **HTTPS** | S3 靜態網站僅支援 HTTP，CloudFront 提供免費 SSL |
| **全球加速** | 內容快取至全球邊緣節點 |
| **DDoS 防護** | 內建 AWS Shield Standard |
| **壓縮** | 自動壓縮 HTML/CSS/JS |

### 範例: 本專案的 CloudFront 設定

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

# 常用操作

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

### 建立 Distribution

1. 進入 **CloudFront** 服務
![image](https://hackmd.io/_uploads/HJBfCqc7Wx.png)
2. 點擊 Create distribution 按鈕
![image](https://hackmd.io/_uploads/S1S-qqq7Zg.png)
3. 選擇 free plan
![image](https://hackmd.io/_uploads/BkeQ599mWl.png)
4. 輸入distribution名稱
![image](https://hackmd.io/_uploads/r1Izs9cmWl.png)
5. 配置Origin: 在 Origin domain 欄位輸入： `your-bucket.s3-website-ap-northeast-1.amazonaws.com
`
![image](https://hackmd.io/_uploads/SJ1Eiqq7-g.png)
    * 不需要選 WAF
![image](https://hackmd.io/_uploads/ByKV3997bx.png)
6. 按下建立
![image](https://hackmd.io/_uploads/ryl5ncc7-e.png)

### 查詢 Distribution 狀態

使用 CloudShell 或本地終端機查詢狀態 
```bash
aws cloudfront list-distributions \
  --query "DistributionList.Items[*].[Id,DomainName,Status]" \
  --output table
```
![image](https://hackmd.io/_uploads/Sy924iqQbx.png)

### 清除Cache（Invalidation）
當網站內容更新後，需清除 CDN Cache：
```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```
> **提示**：在瀏覽器按 `Ctrl + Shift + R` 可強制刷新頁面。

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
