# 📥 如何抓取 iThome 文章

## 方法一：手動複製（最簡單）⭐ 推薦

### 步驟：

1. **打開 iThome 文章**
   ```
   https://ithelp.ithome.com.tw/users/20151593/articles
   ```

2. **點擊任一篇文章**

3. **選取並複製內容**
   - 用滑鼠選取文章內容（從標題下方開始）
   - 按 `Ctrl + A` 全選（或手動選取）
   - 按 `Ctrl + C` 複製

4. **創建 Hexo 文章**
   ```cmd
   node tools/快速創建文章.js
   ```
   按提示輸入標題、標籤等

5. **貼上內容**
   - 打開生成的 `.md` 文件
   - 找到 `## 簡介` 的位置
   - 按 `Ctrl + V` 貼上
   - 保存文件

6. **預覽**
   ```cmd
   npm run server
   ```
   訪問 http://localhost:4000

---

## 方法二：使用爬蟲工具（單篇）

### 步驟：

1. **複製文章網址**
   - 例如：`https://ithelp.ithome.com.tw/articles/10234567`

2. **運行爬蟲**
   ```cmd
   node tools/爬取ithome文章.js https://ithelp.ithome.com.tw/articles/10234567
   ```

3. **自動完成**
   - 腳本會自動抓取標題、內容、標籤
   - 自動創建 Markdown 文件
   - 自動轉換格式

4. **檢查並預覽**
   ```cmd
   npm run server
   ```

### 使用範例：

```cmd
# 抓取單篇文章
node tools/爬取ithome文章.js https://ithelp.ithome.com.tw/articles/10234567

# 輸出：
# 🔍 正在抓取文章...
# 📝 標題: 文章標題
# 📅 日期: 2024-12-23
# 🏷️  標籤: python, AI
# ✅ 文章已保存！
```

---

## 方法三：批量爬取（多篇）

### 步驟：

1. **創建網址列表文件**
   
   創建一個文本文件 `urls.txt`，每行一個網址：
   ```
   https://ithelp.ithome.com.tw/articles/10234567
   https://ithelp.ithome.com.tw/articles/10234568
   https://ithelp.ithome.com.tw/articles/10234569
   ```

2. **運行批量爬取**
   ```cmd
   node tools/批量爬取.js
   ```

3. **按提示操作**
   - 輸入文件路徑：`urls.txt`
   - 確認開始：`y`

4. **等待完成**
   - 腳本會自動處理所有文章
   - 每篇間隔 2 秒（避免被封鎖）

---

## ⚠️ 注意事項

### 1. 尊重版權
- ✅ 這些是你自己在 iThome 發表的文章
- ✅ 你有權利將自己的文章搬到自己的博客
- ❌ 不要爬取別人的文章

### 2. 爬蟲限制
- 每次請求間隔至少 2 秒
- 不要一次爬取太多（建議每次 10-20 篇）
- 如果被封鎖，改用手動複製

### 3. 內容檢查
- 爬蟲可能無法完美轉換格式
- 建議每篇都檢查一下：
  - 代碼塊是否正確
  - 圖片是否顯示
  - 連結是否有效

---

## 🎯 推薦工作流程

### 對於 202 篇文章：

**第一週：測試階段**
```cmd
# 1. 手動複製 3-5 篇重要文章
node tools/快速創建文章.js
# 手動貼上內容

# 2. 測試爬蟲工具
node tools/爬取ithome文章.js <文章網址>
# 檢查效果

# 3. 確認格式正確
npm run server
# 瀏覽檢查
```

**第二週：批量導入**
```cmd
# 1. 準備網址列表（每次 20 篇）
# 創建 urls-batch1.txt, urls-batch2.txt...

# 2. 分批爬取
node tools/批量爬取.js
# 輸入 urls-batch1.txt

# 3. 檢查並部署
npm run server
# 確認無誤後部署
npm run clean && npm run build && npm run deploy
```

**持續優化**
- 修正格式問題
- 優化圖片
- 添加內部連結

---

## 🔧 格式調整技巧

### 如果代碼塊格式錯誤

手動修改 `.md` 文件：

```markdown
# 錯誤格式
code here

# 正確格式
\`\`\`python
code here
\`\`\`
```

### 如果圖片無法顯示

1. 下載圖片到 `source/images/`
2. 修改連結：
```markdown
![圖片說明](/images/圖片名稱.jpg)
```

### 如果有特殊字符問題

確保文件編碼為 UTF-8：
- 用 VS Code 或 Notepad++ 打開
- 另存為 UTF-8 編碼

---

## 📊 進度追蹤

建議創建一個 Excel 或 Google Sheet：

| 文章標題 | 原始網址 | 狀態 | 備註 |
|---------|---------|------|------|
| 文章1 | https://... | ✅ 已完成 | 格式正確 |
| 文章2 | https://... | 🔄 處理中 | 需要調整圖片 |
| 文章3 | https://... | ⏳ 待處理 | |

---

## 🆘 遇到問題？

### 爬蟲失敗
- 檢查網址是否正確
- 檢查網路連線
- 改用手動複製

### 格式混亂
- 手動調整 Markdown 格式
- 參考 Markdown 語法指南

### 圖片遺失
- 從 iThome 下載圖片
- 上傳到 `source/images/`
- 更新圖片連結

---

## 🎉 開始吧！

**推薦順序：**

1. 先手動複製 2-3 篇測試
2. 熟悉流程後使用爬蟲
3. 最後批量處理剩餘文章

有任何問題隨時問我！😊
