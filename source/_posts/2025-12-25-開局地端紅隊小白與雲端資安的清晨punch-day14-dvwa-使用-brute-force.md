---
title: 【開局地端紅隊小白與雲端資安的清晨Punch】Day14 DVWA 使用(Brute Force)
date: 2025-12-25
tags: [dvwa, 資訊安全]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10346070
---

# 陸、Usage(使用方式)---Brute Force

## 一、下載Burp Suite Community

[Burp Suite Community Edition 下載](https://portswigger.net/burp/communitydownload)

sudo su

cd iris

cd Downloads

sudo ./burpsuite_community_linux_v2024_1_1_6.sh

cd burpsuite_community_linux_v2024_1_1_6

sudo chmod +x burpsuite_community_linux_v2024_1_1_6.sh 

- 報錯:因為缺少圖形環境或者缺少 X11 Window 系統的支持

![image](https://hackmd.io/_uploads/r17STpeiR.png)

### 透過非圖形化介面安裝

sudo ./burpsuite_community_linux_v2024_1_1_6.sh -c 

./burpsuite_community_linux_v2024_1_1_6.sh --mode text 

安裝成功: 去/home/iris/BurpSuiteCommunity即可開啟檔案
![image](https://hackmd.io/_uploads/H1N1kpPCT.png)

## 二、Burp Suite 使用

參考: [使用 Burp 代理攔截 HTTP 流量](https://portswigger.net/burp/documentation/desktop/getting-started/intercepting-http-traffic?utm_source=burp_suite_community&utm_medium=learn_tab&utm_campaign=onboarding)
參考: [Web滲透測試 - Burp Suite 完整教學](https://ithelp.ithome.com.tw/users/20114110/ironman/3806)

初始頁面
![image](https://hackmd.io/_uploads/r1fZNpPR6.png)

確認運行成功: ps aux | grep burpsuite
![image](https://hackmd.io/_uploads/r1c3pTxsR.png)

到Proxy --> intercept --> Open browser
![image](https://hackmd.io/_uploads/H1rdMRvRT.png)

開啟擴充套件 --> Burp Suit
![image](https://hackmd.io/_uploads/HkEgQ0wCa.png)

會出現一個無痕式頁面，按下"Start Record"即可開始監聽封包
![image](https://hackmd.io/_uploads/BkhVQAvCp.png)

到"HTTP history"可以看到以觀測到歷史紀錄
![image](https://hackmd.io/_uploads/Skz0QRP0T.png)

如果在 Proxy setting --> 搜尋listener --> 在裡面新增specific addr，並勾選；則可以透過internet的方式連線(外部網卡)

![image](https://hackmd.io/_uploads/ByiZceORT.png)

![image](https://hackmd.io/_uploads/HyaeFgdR6.png)

現在可以透過外部IP連線
![image](https://hackmd.io/_uploads/BJvU5gO06.png)

![image](https://hackmd.io/_uploads/B1AP5gOCp.png)

### 暴力解操作---Low

參考: [三人要保密，一個人要學好資安系列 第 12 篇
DVWA練習-Brute Force](https://ithelp.ithome.com.tw/articles/10272463)
參考: [新手指南：DVWA-1.9全級別教程之Brute Force](https://www.bing.com/search?q=dvwa+brute+force+Brute+Force+%E4%BD%BF%E7%94%A8%E6%95%99%E5%AD%B8&qs=n&form=QBRE&sp=-1&ghc=1&lq=0&pq=dvwa+brute+force+brute+force+%E4%BD%BF%E7%94%A8%E8%86%A0%E3%84%92%E3%84%A9%E3%84%9D&sc=6-35&sk=&cvid=1F53E129DA634E248FEE387465F4C148&ghsh=0&ghacc=0&ghpl=)
參考: [DVWA使用教程（Brute Force）（一）](https://www.twblogs.net/a/5cff2f1cbd9eee14029f6da9)
餐考: [Web滲透測試 - Burp Suite 完整教學系列 第 13 篇
Intruder 帳密暴力破解與列舉FUZZING找漏洞的好幫手](https://ithelp.ithome.com.tw/articles/10245914)

正常行為: 輸入帳號=admin，與正確密碼，登入頁面

找到DVWA登入頁面---Low，帳號選擇admin，並隨意輸入一組錯誤密碼
![image](https://hackmd.io/_uploads/HkLS2AwRa.png)

在Burp找到該筆封包並對程式碼區域按下ctrl+i(send to intruder)，將程式碼複製到intruder內
![image](https://hackmd.io/_uploads/r1PlD0wAa.png)

可以看到intrader成功複製網頁程式碼
![image](https://hackmd.io/_uploads/rJjYPCwRa.png)

### 製作字典

並對密碼變數部分前後加上標記符號(在右側按鈕點下Add)![image](https://hackmd.io/_uploads/r1uG2CwC6.png)
![image](https://hackmd.io/_uploads/r1AP9RP0a.png)

在payloads頁面輸入要攻擊的密碼串(測試用)
![image](https://hackmd.io/_uploads/B1rAcADRT.png)

### 攻擊與結果觀察

攻擊種類

- Snipper

- Batering ram

- Pitch fork

Cluster bomb
![image](https://hackmd.io/_uploads/rynxbb_0T.png)

按下右上角attack，並到Result觀察結果

length**最不一樣**的就是正確解答，以本次為例，帳戶admin就是正確的密碼就是password，長度為4660，其餘都是4618或4617
![image](https://hackmd.io/_uploads/S1aCh0DCp.png)

### Wordlist

參考資料: [kkrypt0nn/wordlists](https://github.com/kkrypt0nn/wordlists/tree/main/wordlists)

可以透過Wordlist找到已有的字典進行暴力解
![image](https://hackmd.io/_uploads/Sy7TG7ORT.png)

## 三、Source Code分析

參考: [DVWA使用教程（Brute Force）（一）](https://www.twblogs.net/a/5cff2f1cbd9eee14029f6da9)

### 1. Low

![image](https://hackmd.io/_uploads/HkZtID5Ra.png)

### 2. Medium

![image](https://hackmd.io/_uploads/BJZaIvcCp.png)

### 3. High

![image](https://hackmd.io/_uploads/ry60IPqAT.png)

### 4. Impossible

![image](https://hackmd.io/_uploads/ry2WPvqRp.png)

![image](https://hackmd.io/_uploads/rJTMwwcRa.png)

![image](https://hackmd.io/_uploads/HkoVvw50T.png)

![image](https://hackmd.io/_uploads/HJKDwDcC6.png)

## 四、可能危害

密碼破解：Brute Force 攻擊通常用於嘗試破解密碼。攻擊者通過不斷嘗試大量可能的密碼組合，持續進行登錄尝試，直到找到正確的密碼為止。一旦成功，攻擊者就可以獲取被攻擊者的帳戶或系統的訪問權限。

資源消耗：由於 Brute Force 攻擊需要不斷嘗試大量的密碼組合，因此它會造成伺服器資源的消耗。這可能包括 CPU 計算資源、內存資源以及網路頻寬等。

帳戶被鎖定：在防禦 Brute Force 攻擊時，通常會採取一些安全措施，如帳戶鎖定或 IP 封鎖等。如果攻擊者不斷嘗試登錄，可能會導致帳戶被鎖定，給正常用戶帶來不便。

隱私洩漏：在進行 Brute Force 攻擊時，攻擊者可能會使用一些自動化工具或腳本，這些工具可能會在網路上產生大量的登錄尝試日誌。這些日誌可能包含用戶的敏感信息，如用戶名、密碼等，導致隱私洩漏風險增加。

系統崩潰：如果伺服器無法及時應對大量的登錄尝試請求，可能會導致系統資源耗盡，最終導致系統崩潰或服務不可用。
