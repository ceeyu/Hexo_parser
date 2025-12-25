---
title: 【開局地端紅隊小白與雲端資安的清晨Punch】Day11 DVWA 使用(XSS)
date: 2025-12-25
tags: [xss, 資訊安全, dvwa]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10345605
---

# 肆、DVWA 官方文件 --- Features

## 一、DVWA Security

### 注意: 2015版本已分為: impossible, high, medium, low

![image](https://hackmd.io/_uploads/S1xzxj-0a.png)

![image](https://hackmd.io/_uploads/SJ5Vgj-RT.png)

## 二、PHP-IDS(Instruction Detection System)

![image](https://hackmd.io/_uploads/SyaSesWCa.png)

![image](https://hackmd.io/_uploads/SyhIeibCT.png)

# 伍、User Security(說明)

- DVWA is **not emilate** !!! It's real!!

![image](https://hackmd.io/_uploads/ByCaxsWRp.png)

- external link處理

![image](https://hackmd.io/_uploads/SJG1Wj-06.png)

![image](https://hackmd.io/_uploads/Bkc7bib0T.png)

# 陸、Usage(使用方式)---XSS

![image](https://hackmd.io/_uploads/B1Rw-sW0p.png)

![image](https://hackmd.io/_uploads/rJjOWjWAa.png)

## 一、XSS範例 --- Security: Low

右下角有功能鈕

- View Source

View Help
![image](https://hackmd.io/_uploads/SkLF-jZA6.png)

![image](https://hackmd.io/_uploads/HkU2Zj-C6.png)

DVWA 舊版頁面

## 二、網頁正常行為描述

User留下Name(必填)、Comment，並傳送到Database

![image](https://hackmd.io/_uploads/SypSGjZA6.png)

## 三、Source Code 描述

兩個主要參數: $name, $message，兩者先經過trim()函式移除空白鍵

### Sanitize: 移除user input 有危害的地方

**$message**

- stripslashes(): 移除斜線

- mysql_real)escape_string():移除特殊字元(可以避免SQL injection)

**$name**

- stripslashes(): 移除斜線

![image](https://hackmd.io/_uploads/r18PziWRp.png)

![image](https://hackmd.io/_uploads/r1Q_fsbRp.png)

![image](https://hackmd.io/_uploads/HkEtGsZCa.png)

![image](https://hackmd.io/_uploads/rky5fjb0a.png)

![image](https://hackmd.io/_uploads/S1dQ4o-0p.png)

## 四、攻擊方式

可以直接輸入 <script>alert('XSS');</script> 攻擊

![image](https://hackmd.io/_uploads/r1ivNsW06.png)

## 五、XSS範例 --- Security: High

- 新增htmlspecialchars()函式，把user input多做一層轉換，變為HTML形式，而非 being excuted 形式

![image](https://hackmd.io/_uploads/ByAA4sbCp.png)

![image](https://hackmd.io/_uploads/rJTkriWAa.png)

![image](https://hackmd.io/_uploads/B1OUBobCa.png)

## 六、XSS的可能危害

Complex AJAX Script Attack, like:

- 攻擊者可以從remote web server獲得session cookies

- 可以安裝malware

- 可以竊取bank account username & password

![image](https://hackmd.io/_uploads/H1uOBoWCp.png)
