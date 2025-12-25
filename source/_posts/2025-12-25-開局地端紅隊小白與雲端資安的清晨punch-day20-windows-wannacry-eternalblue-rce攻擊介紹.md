---
title: 【開局地端紅隊小白與雲端資安的清晨Punch】Day20 Windows Wannacry(EternalBlue) RCE攻擊介紹
date: 2025-12-25
tags: [資訊安全]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10346973
---

# Windows Wannacry(EternalBlue)，RCE

## 深入分析WannaCry: EternalBlue和RCE

### 背景介紹

WannaCry是一種在2017年爆發的勒索軟體攻擊，它利用了Windows作業系統中的一個已知漏洞—EternalBlue—來進行遠程代碼執行（RCE）。這個漏洞最初是由美國國家安全局（NSA）發現並開發的，後來被一個黑客組織Shadow Brokers洩漏出來，並迅速被不法分子利用來散播惡意軟體。

### EternalBlue漏洞

EternalBlue是一個Windows Server Message Block（SMB）協議中的漏洞，該漏洞允許攻擊者在無需用戶交互的情況下，遠程執行任意代碼。利用EternalBlue，攻擊者可以輕鬆地在未打補丁的Windows系統上植入惡意代碼，並進一步擴散到網路中的其他設備。

### WannaCry勒索軟體

WannaCry是一個利用EternalBlue漏洞進行擴散的勒索軟體。它的工作機制如下：

初始感染: WannaCry首先透過已打開SMB端口的計算機進行初步感染。攻擊者利用EternalBlue漏洞在未修補的系統上遠程執行代碼。

惡意代碼執行: 一旦成功利用漏洞，WannaCry會將其勒索軟體本體下載到受害者系統並執行。該惡意軟體隨即開始加密受害者系統上的文件，並顯示一個勒索訊息，要求支付比特幣以解鎖文件。

橫向擴散: WannaCry具有自我複製功能，透過SMB協議掃描並攻擊同一網路中的其他未修補系統，進而快速擴散。

### 防護與緩解措施

要防止受到WannaCry或類似的勒索軟體攻擊，企業和個人應採取以下措施：

立即更新與修補: Microsoft已經針對EternalBlue漏洞釋出安全補丁（MS17-010）。所有Windows使用者應立即安裝這些更新，防止攻擊者利用該漏洞。

啟用網路防火牆: 關閉不必要的SMB端口（如445），並使用網路防火牆來限制進出網路的可疑流量。

備份重要資料: 定期備份重要文件並存儲在離線或遠端安全位置，以防止資料被勒索軟體加密。

網路隔離: 將關鍵系統與其他網路隔離，減少感染擴散的可能性。

# Malware

### 注意，不要再自己的電腦或是未隔離的環境下載使用

本體:
[limiteci/WannaCry](https://github.com/limiteci/WannaCry)

執行方式
cd wannacry.exe的目標資料夾

執行指令
wannacry.exe

相關文章: [Demystifying WannaCry: A Deep Dive into Malware Analysis](https://medium.com/@s.shrimeenaakshi/demystifying-wannacry-a-deep-dive-into-malware-analysis-03a10a0b1f40)

[HuskyHacks / PMAT-labs](https://github.com/HuskyHacks/PMAT-labs/tree/main/labs/4-1.Bossfight-wannacry.exe)

### 結果: 因為此為直接加密電腦，不好抓取Log，因此再換一個漏洞
