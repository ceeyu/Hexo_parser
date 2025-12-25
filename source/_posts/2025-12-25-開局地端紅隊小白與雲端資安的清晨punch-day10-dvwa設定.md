---
title: "【開局地端紅隊小白與雲端資安的清晨Punch】Day10 DVWA設定"
date: 2025-12-25
tags: [dvwa, 資訊安全]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10345465
---

# 貳、DVWA環境設置

MySQL 步驟參考: [實戰工作坊 — — DVWA（Damn Vulnerable Web Application）](https://lin19921127.medium.com/%E5%AF%A6%E6%88%B0%E5%B7%A5%E4%BD%9C%E5%9D%8A-dvwa-damn-vulnerable-web-application-253f1b11fa8a#:~:text=DVWA%EF%BC%88Damn%20Vulnerable,Web%20Application%EF%BC%89%E6%98%AF%E4%B8%80%E5%80%8B%E7%94%A8%E4%BE%86%E9%80%B2%E8%A1%8C%E5%BC%B1%E9%BB%9E%E5%AE%89%E5%85%A8%E6%B8%AC%E8%A9%A6%E7%9A%84%E7%B6%B2%E7%AB%99%E7%B3%BB%E7%B5%B1%EF%BC%8C%E6%97%A8%E5%9C%A8%E7%82%BA%E5%AE%89%E5%85%A8%E5%B0%88%E6%A5%AD%E4%BA%BA%E5%93%A1%E6%B8%AC%E8%A9%A6%E8%87%AA%E5%B7%B1%E7%9A%84%E5%B0%88%E6%A5%AD%E6%8A%80%E8%83%BD%E5%92%8C%E5%B7%A5%E5%85%B7%E6%8F%90%E4%BE%9B%E5%90%88%E6%B3%95%E7%9A%84%E7%92%B0%E5%A2%83%EF%BC%8C%E5%B9%AB%E5%8A%A9web%E9%96%8B%E7%99%BC%E8%80%85%E6%9B%B4%E5%A5%BD%E7%9A%84%E7%90%86%E8%A7%A3web%E6%87%89%E7%94%A8%E5%AE%89%E5%85%A8%E9%98%B2%E7%AF%84%E7%9A%84%E9%81%8E%E7%A8%8B%E3%80%82)
DVWA使用說明參考: [渗透初识之DVWA靶场搭建及使用（详细图文）](https://blog.csdn.net/m0_60884805/article/details/127086871)

## 一、MySQL

sudo mysql
![image](https://hackmd.io/_uploads/BJEyafL50.png)

create user ‘dvwa’@’localhost’ identified by '';
![image](https://hackmd.io/_uploads/rJRl6z85C.png)

select user, host, password from mysql.user;
![image](https://hackmd.io/_uploads/r1dV6GIqR.png)

grant all privileges on *.* to ‘dvwa’@’localhost’ ; 
![image](https://hackmd.io/_uploads/H1dSTzUqC.png)

flush privileges;
![image](https://hackmd.io/_uploads/rJEUTMUcR.png)

離開MySQL: \q
![image](https://hackmd.io/_uploads/BynLTGI9C.png)

登入後在側邊攔選擇 Setup DVWA --> 可以按下下方"Create/Reset DB"按鈕來創建新的DB
![image](https://hackmd.io/_uploads/BJMGRzU90.png)

![image](https://hackmd.io/_uploads/SkbaaMI9A.png)

- 會被先登出再登入一次，再來就可以看到基礎頁面設定完成

![image](https://hackmd.io/_uploads/H1UO0GI9A.png)

- 可以設置攻克難度，代表挑戰難度

![image](https://hackmd.io/_uploads/HyTAAM8cA.png)

# 參、DVWA 官方文件(概念~安裝)

參考: [DVWA docs DVWA_v1.3.pdf 說明文件](https://gitlab.com/GeekMasher/DVWA/-/blob/master/docs/DVWA_v1.3.pdf)

## 一、概念說明

DVWA會建好一個網站，調整網站的難易度來代表攻擊難度，並選擇側邊攔，可以先觀察網頁的初始功能與型態，並且思考要選擇什麼攻擊手法，並驗證攻擊

## 二、Introduction

![image](https://hackmd.io/_uploads/rk84h9WR6.png)

## 三、License

![image](https://hackmd.io/_uploads/ByD82qWA6.png)

## 四、Warning

![image](https://hackmd.io/_uploads/BkvPnqb06.png)

## 五、Installation

![image](https://hackmd.io/_uploads/SJK9ncbA6.png)

- Windows

- Linux

![image](https://hackmd.io/_uploads/Bkvj2q-Ap.png)

## 六、Vulnerabilities(By OWASP Top 10, 2010)

![image](https://hackmd.io/_uploads/r1eCn5WC6.png)

![image](https://hackmd.io/_uploads/S1OW6cZAa.png)

![image](https://hackmd.io/_uploads/BycuyjZ06.png)

## 七、DVWA 所提供的網站漏洞功能:

- 暴力破解 (Brute Force): 測試密碼暴力破解工具及顯示弱密碼的風險。

- 命令注入 (Command Injection): 在底層作業系統上執行任意命令。

- 跨站請求偽造 (CSRF): 攻擊者能夠偽造請求來更改應用程式的管理員密碼或其他設定。

- 檔案包含 (File Inclusion): 允許攻擊者將遠端或本地檔案包含到網頁應用程式中。

- 不安全檔案上傳 (File Upload): 允許攻擊者將惡意檔案上傳到伺服器。

- 不安全的 CAPTCHA (Insecure CAPTCHA): 測試 CAPTCHA 機制的脆弱性。

- SQL 注入 (SQL Injection): 允許攻擊者將 SQL 語句注入到 HTTP 表單輸入框中。DVWA 包括盲目 SQL 注入和錯誤 SQL 注入。

- 盲目 SQL 注入 (SQL Injection - Blind): 通過無法直接看到錯誤消息的方式進行 SQL 注入。

- 弱會話 ID (Weak Session IDs): 測試會話 ID 的弱點，可能導致會話劫持。

- DOM 型 XSS (XSS - DOM): 攻擊者利用 Document Object Model (DOM) 操作注入惡意腳本。

- 反射型 XSS (XSS - Reflected): 攻擊者在即時回應中注入惡意腳本。

- 儲存型 XSS (XSS - Stored): 攻擊者將惡意腳本儲存在伺服器端，影響到所有讀取該腳本的用戶。

- 內容安全政策繞過 (CSP Bypass): 測試繞過內容安全政策 (CSP) 的能力，實施更靈活的腳本注入。

- JavaScript: 測試與 JavaScript 相關的安全漏洞。

- 授權繞過 (Authorization Bypass): 測試繞過授權機制的漏洞，以取得未經授權的資源。

- 開放 HTTP 重定向 (Open HTTP Redirect): 測試是否能夠利用 HTTP 重定向進行釣魚攻擊或其他不當操作。

## 八、OWASP Top 10 2023

![image](https://hackmd.io/_uploads/HkpQutoq0.png)

[OWASP Top 10 API Security Risks – 2023](https://owasp.org/API-Security/editions/2023/en/0x11-t10/)
