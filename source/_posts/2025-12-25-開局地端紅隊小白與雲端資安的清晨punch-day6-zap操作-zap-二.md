---
title: "【開局地端紅隊小白與雲端資安的清晨Punch】Day6 ZAP操作 ---ZAP(二)"
date: 2025-12-25
tags: [zap, 漏洞掃描, 資訊安全]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10344868
---

# 貳、ZAP操作---ZAP(二)

## 一、更新項目

![image](https://hackmd.io/_uploads/S1Ep5C490.png)

![image](https://hackmd.io/_uploads/rk11o0NcC.png)

## 二、相關reference

參見: [Day22_掃描 OWASP ZAP](https://ithelp.ithome.com.tw/articles/10249892?sc=hot)
參見:[OWASP ZAP掃描工具，入門安裝和操作](https://ithelp.ithome.com.tw/articles/10313098)
參見:[網頁滲透測試 OWASP ZAP](https://medium.com/@jieshiun/%E7%B6%B2%E9%A0%81%E6%BB%B2%E9%80%8F%E6%B8%AC%E8%A9%A6-owasp-zap-60f03b8d340d)
([https://www.twblogs.net/a/5d846be4bd9eee541c34a162](https://www.twblogs.net/a/5d846be4bd9eee541c34a162))
參見:[網頁安全性測試：OWASP ZAP使用入門
](https://www.tpisoftware.com/tpu/articleDetails/2161)

## 三、Hitcon找範例

- 去[Hitcon](https://zeroday.hitcon.org/vulnerability/disclosed/page/2) --> 公開，找可攻擊網址

測試: [GIOS TAIWAN 資料庫注入漏洞](https://giostw.com/article01.php?id=1)

## 四、漏洞分析實作

- 開啟Auto Scan 輸入URL

![image](https://hackmd.io/_uploads/rJD8Dok9R.png)

- 輸入網址 --> Attack按鈕

![image](https://hackmd.io/_uploads/H1pGdo1qR.png)

- 等待一段時間，按下Stop，或是在下方欄位選「加號」，新增「Active Scan」跟「Spider」來看掃描進度

![image](https://hackmd.io/_uploads/Hkv9sRE90.png)

- Report --> Generate report可以生成報告

![image](https://hackmd.io/_uploads/BJeXjo150.png)

- Templete可以改成pdf

![image](https://hackmd.io/_uploads/SJLLisk5R.png)

- 選擇要印出的選項

![image](https://hackmd.io/_uploads/S1wt9FC6T.png)

- Report樣式

![image](https://hackmd.io/_uploads/rJbniik9C.png)

![image](https://hackmd.io/_uploads/ByDpsoy50.png)

![image](https://hackmd.io/_uploads/Skmyni15R.png)

![image](https://hackmd.io/_uploads/S1Uxnjy9C.png)

![image](https://hackmd.io/_uploads/BynZhskc0.png)

![image](https://hackmd.io/_uploads/SkJm2sk9R.png)

由本範例可以看出SQL injection 為最嚴重的問題(等級High)

# 參、漏洞分析

## 一、SQL injection

- Alert顯示

![image](https://hackmd.io/_uploads/BJ6ZPeB5R.png)

點擊兩下可以看漏洞說明，Attack部分為攻擊手法
**請不要攻擊非公開在Hitcon的網站，或是請簽NDA保密協議後才可幫忙測試，避免任何法律問題**

![image](https://hackmd.io/_uploads/SyORcxSqA.png)

- 原始網站([https://giostw.com/article01.php?id=1](https://giostw.com/article01.php?id=1))

![image](https://hackmd.io/_uploads/S1I6KgrcR.png)

- 具描述後攻擊網站(ZAP是以將id改為3-2，但我們改為300比較有明顯差異)，可以看到我們可以藉由SQL injection的方式將網站注入有害程式

![image](https://hackmd.io/_uploads/rJi4clBqC.png)

## 二、Absence of Anti-CSRF Tokens

- 網站裡form class(eForm1)的寫法可能會有用戶資料洩漏的問題，因為攻擊者能夠偽造用戶的請求。

線索: <form class="col col-input" action="#" method="post" id="eForm1" name="eForm1">
![image](https://hackmd.io/_uploads/B1QUnlBcR.png)
