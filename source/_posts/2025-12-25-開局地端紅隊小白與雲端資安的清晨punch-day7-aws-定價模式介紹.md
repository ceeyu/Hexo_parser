---
title: "【開局地端紅隊小白與雲端資安的清晨Punch】Day7 AWS 定價模式介紹"
date: 2025-12-25
tags: [aws, 定價模型]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10345036
---

# 壹、AWS 定價模式介紹

點選建立預估
![image](https://hackmd.io/_uploads/SkmRZpS9R.png)
[AWS 定價計算工具](https://calculator.aws/#/)

點選新增服務

![image](https://hackmd.io/_uploads/B1qUWTrc0.png)

我的預估

- 依照欄位填寫資料

**注意: 因為AWS也有提供免費方案，所以免費方案的選項並不會羅列在Calculator中**

![image](https://hackmd.io/_uploads/H10_ZaSq0.png)

- 假設建立每日峰值模式，最低為一台EC2, 最高可能為5台，且周一到五每天運行8.5小時

![image](https://hackmd.io/_uploads/ry9jzpB5C.png)

假設選擇t3版本的xlarge(vCPU = 4, RAM = 16GB)，則價格為每小時0.3美元
![image](https://hackmd.io/_uploads/SyxB7pSc0.png)

就可以粗估費用，也可以再添增其他選項與功能

![image](https://hackmd.io/_uploads/HkHgV6SqA.png)

# 貳、補充介紹，AWS定價計算

1. Pricing model: 決定是否使用按需計費還是預留實例（Reserved Instances, RI）。預留實例需要預付，而非即時支付

2. Reservation terms: 當預訂預留實例時，可以選擇一或三年的合約。默認為一年，以降低測試成本

3. Payment options: 預留實例的付款選擇包括全額預付（一次性付款，無月付）、部分預付加月付（較小的預付，月付），或無預付（僅月付）。全額預付通常能獲得最佳折扣

4. Expected utilization of EC2 instances: 輸入預期的EC2實例使用量，僅適用於按需計費策略

5. Spot: 可以輸入折扣百分比來估算現貨實例的費用，計算器會顯示歷史折扣百分比

我們也可以從EC2下方的「監控」看到真實的流量變化。
**注意: 流量的費用並不會即時更新到Bill上，有時會有時差**
![image](https://hackmd.io/_uploads/S1bx8pr50.png)
![image](https://hackmd.io/_uploads/SJOVu6BcA.png)
