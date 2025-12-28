---
title: "【開局地端紅隊小白與雲端資安的清晨Punch】Day5、漏洞掃描---ZAP(一)"
date: 2025-12-25
tags: [zap, 資訊安全]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10344732
---

# 壹、漏洞掃描---ZAP(一)

## 一、下載瀏覽器

下載google安裝檔
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

解壓縮
sudo dpkg -i google-chrome-stable_current_amd64.deb

運行錯誤排除
sudo apt-get install -f

執行
google-chrome

1. 或是由遠端桌面直接開啟Chrome

![image](https://hackmd.io/_uploads/BygCl9JcR.png)

## 二、ZAP 說明

[ZAP 版本2.15.0](https://www.zaproxy.org/docs/desktop/releases/2.15.0/)
[ZAP 入門](https://www.zaproxy.org/docs/desktop/start/)
[What is the primary purpose of using OWASP ZAP in web application penetration testing?](https://eitca.org/cybersecurity/eitc-is-wapt-web-applications-penetration-testing/hidden-files/discovering-hidden-files-with-zap/examination-review-discovering-hidden-files-with-zap/what-is-the-primary-purpose-of-using-owasp-zap-in-web-application-penetration-testing/)

根據官網文件，旨在作為使用 Zed Attack Proxy（ZAP）工具進行安全測試的**基本入門指南**，即使你**沒有安全測試的背景也可以使用**。

文檔包含了一些安全測試的概念和術語，但**並非提供全面**的 ZAP 或安全測試指南。

![image](https://hackmd.io/_uploads/S1SOe3Jq0.png)

- Zed Attack Proxy (ZAP) 是一款免費且開源的滲透測試工具，受 The Software Security Project (SSP) 維護。

- 用途：專為測試網頁應用程式而設計，具有高度的靈活性和擴展性。

核心功能：作為“中介層代理”運作，位於測試者的瀏覽器和網頁應用程式之間，

- 能夠攔截並檢查瀏覽器和網頁應用程式之間發送的訊息

- 必要時可修改內容，然後將這些資料包轉發到目的地。

與其他代理的兼容性：在許多企業環境中，若已有其他網路代理使用，ZAP 可配置為連接該代理。
使用者範圍：適合從開發者、新手測試者到專業安全測試人員的各種技能水平。
多平台支持：提供各主要操作系統版本和 Docker 支持，不受限於單一操作系統。
擴展功能：透過 ZAP Marketplace 的各種附加元件，使用者可獲得更多額外功能。
開源特性：源代碼公開，任何人均可參與 ZAP 的開發、修復漏洞、添加功能、提交 pull request，或撰寫附加元件以支持特殊需求。

![image](https://hackmd.io/_uploads/BkvZZn190.png)

![image](https://hackmd.io/_uploads/ryeM-nJ5R.png)

## 三、下載ZAP

到網頁[ZAP Downloads](https://www.zaproxy.org/download/)下載Cross Platform版本
![image](https://hackmd.io/_uploads/BJ5Yboy9C.png)

到Downloads先對它按兩下
![image](https://hackmd.io/_uploads/ByKwfok9A.png)

指令碼解壓縮，在Downloads開啟Terminal
sudo apt-get update
sudo apt-get install unzip
unzip ZAP_2.15.0_Crossplatform.zip

在~/Downloads/ZAP_2.15.0_Crossplatform/ZAP_2.15.0/開啟Terminal，輸入指令，開啟ZAP。
 ./zap.sh
![image](https://hackmd.io/_uploads/S1oX7i1qR.png)
