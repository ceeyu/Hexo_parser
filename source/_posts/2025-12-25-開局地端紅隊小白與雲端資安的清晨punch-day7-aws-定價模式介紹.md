---
title: 【開局地端紅隊小白與雲端資安的清晨Punch】Day7 AWS 定價模式介紹
date: 2024-08-17 07:00:00
tags: [aws, 定價模型]

source: https://ithelp.ithome.com.tw/articles/10345036
series: 雲端資安
categories:
  - 雲端資安
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

1. $1

2. $1

3. $1

4. $1

5. $1

我們也可以從EC2下方的「監控」看到真實的流量變化。
**注意: 流量的費用並不會即時更新到Bill上，有時會有時差**
![image](https://hackmd.io/_uploads/S1bx8pr50.png)
![image](https://hackmd.io/_uploads/SJOVu6BcA.png)
