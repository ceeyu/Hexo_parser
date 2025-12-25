# Hexo 部署到 AWS - 新手完整步驟指南

## 前置準備
- ✅ 你已有 AWS root user 帳戶
- ✅ 你已有 Hexo 項目（當前項目）
- ⬜ 需要完成以下步驟

---

## 第一部分：AWS 帳戶設置（約 15 分鐘）

### 步驟 1：創建 IAM 用戶（不要用 root 帳戶操作）

**為什麼？** Root 帳戶權限太大，不安全。我們創建一個專門用於部署的用戶。

1. **登入 AWS Console**
   - 前往：https://console.aws.amazon.com/
   - 使用你的 root 帳戶登入

2. **進入 IAM 服務**
   - 在頂部搜索欄輸入 "IAM"
   - 點擊 "IAM" 進入身份和訪問管理

3. **創建新用戶**
   - 左側菜單點擊 "Users"（用戶）
   - 點擊右上角橙色按鈕 "Add users"（添加用戶）

4. **設置用戶名**
   - User name（用戶名）：輸入 `hexo-deployer`
   - 點擊 "Next"（下一步）

5. **設置權限**
   - 選擇 "Attach policies directly"（直接附加策略）
   - 在搜索框搜索並勾選以下兩個策略：
     * ✅ `AmazonS3FullAccess`
     * ✅ `CloudFrontFullAccess`（如果要用 CDN）
   - 點擊 "Next"（下一步）

6. **審查並創建**
   - 檢查信息
   - 點擊 "Create user"（創建用戶）

7. **創建訪問密鑰**
   - 點擊剛創建的用戶 `hexo-deployer`
   - 點擊 "Security credentials"（安全憑證）標籤
   - 向下滾動到 "Access keys"（訪問密鑰）部分
   - 點擊 "Create access key"（創建訪問密鑰）
   - 選擇 "Command Line Interface (CLI)"
   - 勾選底部的確認框
   - 點擊 "Next"
   - 點擊 "Create access key"

8. **⚠️ 重要：保存密鑰**
   - 你會看到：
     * Access key ID（訪問密鑰 ID）：類似 `AKIAIOSFODNN7EXAMPLE`
     * Secret access key（私密訪問密鑰）：類似 `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`
   - **立即複製並保存到安全的地方！**
   - **這是唯一一次可以看到 Secret access key！**
   - 點擊 "Download .csv file"（下載 CSV 文件）備份
   - 點擊 "Done"

---

## 第二部分：創建 S3 Bucket（約 10 分鐘）

### 步驟 2：創建 S3 儲存桶

1. **進入 S3 服務**
   - 在頂部搜索欄輸入 "S3"
   - 點擊 "S3" 進入

2. **創建 Bucket**
   - 點擊橙色按鈕 "Create bucket"（創建儲存桶）

3. **基本設置**
   - **Bucket name**（儲存桶名稱）：輸入唯一名稱
     * 例如：`my-hexo-blog-2024`（必須全球唯一，只能小寫字母、數字、連字符）
     * ⚠️ 記住這個名稱，後面會用到！
   - **AWS Region**（區域）：選擇離你最近的
     * 台灣用戶推薦：`ap-northeast-1`（東京）
     * 或：`ap-southeast-1`（新加坡）

4. **公開訪問設置**
   - **取消勾選** "Block all public access"（阻止所有公開訪問）
   - 會出現警告，勾選確認框：
     ✅ "I acknowledge that the current settings might result in this bucket and the objects within becoming public"

5. **其他設置保持默認**
   - Bucket Versioning：保持 Disabled
   - Tags：可以不填
   - Default encryption：保持默認

6. **創建**
   - 滾動到底部，點擊橙色按鈕 "Create bucket"

### 步驟 3：配置 Bucket 為靜態網站

1. **進入你的 Bucket**
   - 在 S3 列表中點擊你剛創建的 bucket 名稱

2. **進入屬性設置**
   - 點擊 "Properties"（屬性）標籤

3. **啟用靜態網站託管**
   - 滾動到最底部找到 "Static website hosting"（靜態網站託管）
   - 點擊右側 "Edit"（編輯）
   - 選擇 "Enable"（啟用）
   - Hosting type：選擇 "Host a static website"
   - Index document：輸入 `index.html`
   - Error document：輸入 `404.html`
   - 點擊 "Save changes"（保存更改）

4. **記錄網站端點**
   - 返回 Properties 標籤
   - 在 "Static website hosting" 部分
   - 你會看到 "Bucket website endpoint"（儲存桶網站端點）
   - 類似：`http://my-hexo-blog-2024.s3-website-ap-northeast-1.amazonaws.com`
   - ⚠️ 記住這個網址，這是你的網站地址！

### 步驟 4：設置 Bucket 權限

1. **進入權限設置**
   - 點擊 "Permissions"（權限）標籤

2. **編輯 Bucket Policy**
   - 滾動到 "Bucket policy"（儲存桶策略）部分
   - 點擊 "Edit"（編輯）

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
         "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
       }
     ]
   }
   ```
   - ⚠️ **重要**：將 `YOUR-BUCKET-NAME` 替換為你的 bucket 名稱
     * 例如：`arn:aws:s3:::my-hexo-blog-2024/*`
   - 點擊 "Save changes"（保存更改）

---

## 第三部分：配置本地環境（約 5 分鐘）

### 步驟 5：安裝 AWS CLI（可選但推薦）

1. **下載 AWS CLI**
   - 前往官方安裝指南：https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
   - 選擇 Windows 版本
   - [下載 MSI 安裝程序（64 位)](https://awscli.amazonaws.com/AWSCLIV2.msi)
   - 運行安裝程序，按默認選項安裝
   - 安裝完成後，**重新打開命令提示符**（CMD）才能使用

2. **驗證安裝**
   - 打開命令提示符（CMD）
   - 輸入：
   ```cmd
   aws --version
   ```
   - 應該看到版本信息

3. **配置 AWS CLI**
   - 在 CMD 中輸入：
   ```cmd
   aws configure
   ```
   - 按提示輸入：
     * AWS Access Key ID：輸入步驟 1 保存的 Access Key ID
     * AWS Secret Access Key：輸入步驟 1 保存的 Secret Access Key
     * Default region name：輸入你的 bucket 區域（如 `ap-northeast-1`）
     * Default output format：輸入 `json`

### 步驟 6：配置 Hexo 項目

1. **打開項目文件夾**
   - 在 CMD 中進入你的 Hexo 項目目錄
   ```cmd
   cd 你的項目路徑
   ```

2. **編輯 _config.yml**
   - 用文本編輯器打開 `_config.yml`
   - 找到最底部的 `deploy:` 部分
   - 修改為：
   ```yaml
   deploy:
     type: aws-s3
     bucket: my-hexo-blog-2024  # 改為你的 bucket 名稱
     region: ap-northeast-1      # 改為你的區域
   ```

3. **更新網站 URL**
   - 在同一個 `_config.yml` 文件中
   - 找到頂部的 `url:` 設置
   - 修改為你的 S3 網站端點（步驟 3.4 記錄的）：
   ```yaml
   url: http://my-hexo-blog-2024.s3-website-ap-northeast-1.amazonaws.com
   ```

4. **保存文件**

---

## 第四部分：部署網站（約 5 分鐘）

### 步驟 7：首次部署

1. **清理舊文件**
   ```cmd
   npm run clean
   ```

2. **生成靜態文件**
   ```cmd
   npm run build
   ```
   - 你會看到生成了 `public` 文件夾
   - 這裡面是你的網站所有文件

3. **部署到 AWS**
   ```cmd
   npm run deploy
   ```
   - 第一次可能需要幾分鐘
   - 你會看到上傳進度
   - 完成後會顯示成功信息

4. **訪問你的網站**
   - 打開瀏覽器
   - 訪問你的 S3 網站端點
   - 🎉 你的網站上線了！

---

## 第五部分：後續更新（每次更新內容時）

### 步驟 8：更新網站內容

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

## 常見問題排查

### 問題 1：部署時提示 "Access Denied"
**解決方法：**
- 檢查 AWS 憑證是否正確配置
- 重新運行 `aws configure` 確認密鑰

### 問題 2：網站顯示 403 Forbidden
**解決方法：**
- 檢查 Bucket Policy 是否正確設置
- 確認 bucket 名稱在策略中正確

### 問題 3：網站樣式丟失
**解決方法：**
- 檢查 `_config.yml` 中的 `url` 設置是否正確
- 確保使用完整的 S3 網站端點

### 問題 4：上傳很慢
**解決方法：**
- 這是正常的，第一次上傳所有文件需要時間
- 後續更新只會上傳變更的文件，會快很多

---

## 下一步：進階設置（可選）

### 選項 1：使用自定義域名
- 需要購買域名
- 在 Route 53 配置 DNS
- 詳見主要指南文件

### 選項 2：添加 CloudFront CDN
- 加速全球訪問
- 支持 HTTPS
- 詳見主要指南文件

### 選項 3：自動化部署
- 使用 GitHub Actions
- 每次推送代碼自動部署
- 詳見主要指南文件

---

## 成本估算

使用 S3 託管 Hexo 博客的成本非常低：

- **S3 存儲**：約 $0.023/GB/月
  * 一個典型博客約 50-100MB
  * 月成本：< $0.01

- **數據傳輸**：
  * 前 1GB 免費
  * 之後 $0.09/GB
  * 小型博客月成本：$0.5-2

- **總計**：每月約 $0.5-2 美元

如果是新 AWS 帳戶，還有 12 個月免費套餐！

---

## 檢查清單

部署前確認：
- ✅ 已創建 IAM 用戶並保存密鑰
- ✅ 已創建 S3 bucket
- ✅ 已啟用靜態網站託管
- ✅ 已設置 Bucket Policy
- ✅ 已配置 AWS CLI
- ✅ 已更新 _config.yml
- ✅ 已運行 deploy 命令

全部完成後，你的網站就上線了！

---

## 需要幫助？

如果遇到問題：
1. 檢查上面的常見問題排查
2. 查看 AWS CloudWatch 日誌
3. 檢查 S3 bucket 的訪問日誌
4. 隨時問我！
