---
title: "【開局地端紅隊小白與雲端資安的清晨Punch】Day19: RPCSS Activation Kernel Security Callback Privilege Escalation漏洞介紹"
date: 2024-08-29 19:00:00
tags: [漏洞介紹, 資訊安全]

source: https://ithelp.ithome.com.tw/articles/10346778
series: 雲端資安
categories:
  - 雲端資安
---

# 壹、尋找漏洞

- 因為SEIM System對於本體的Windows本體的Log比較不用設定篩選條件，所以從自身版本的windows 1809找漏洞

- 有綠色勾號的代表有驗證過漏洞

![image](https://hackmd.io/_uploads/BJvx_umgC.png)

[Exploit Database ](https://www.exploit-db.com/search?q=1809&platform=windows)

## EC2 Windows2019 Base版本號

![image](https://hackmd.io/_uploads/SJwCR_7g0.png)

## 介紹漏洞

[Microsoft Windows 10 1903/1809 - RPCSS Activation Kernel Security Callback Privilege Escalation](https://www.exploit-db.com/exploits/47135)

Microsoft Windows 10 1903/1809 - RPCSS Activation Kernel Security Callback Privilege Escalation 是一個影響 Microsoft Windows 10 版本 1903 和 1809 的漏洞。這個漏洞涉及 Windows 操作系統的 RPCSS（Remote Procedure Call Subsystem）服務，可能會導致特權提升。以下是該漏洞的主要細節和背景：

漏洞概述

- 漏洞名稱: RPCSS Activation Kernel Security Callback Privilege Escalation

- 漏洞編號: CVE-2020-0601（這是一個與 Windows Cryptographic Services 相關的漏洞，但此處的 RPCSS 漏洞與之相關）

- 受影響版本: Microsoft Windows 10 版本 1903 和 1809

- 漏洞類型: 特權提升（Privilege Escalation）

漏洞描述
這個漏洞涉及 Windows 10 的 RPCSS（Remote Procedure Call Subsystem）服務的內核安全回調。RPCSS 是 Windows 操作系統中處理遠程過程調用的核心組件。該漏洞利用了 RPCSS 服務中的一個設計缺陷或實作問題，使攻擊者能夠在沒有適當權限的情況下提升自身權限。

漏洞影響

- 特權提升: 攻擊者可以利用此漏洞在目標系統上以更高的權限執行代碼。這意味著攻擊者可以將自己提升為系統管理員，從而獲得完整的控制權。

- 系統損害: 攻擊者獲得更高的權限後，可能會執行惡意代碼，修改系統設置，竊取敏感信息或進行其他破壞性活動。

攻擊方法
攻擊者通常會採取以下步驟利用此漏洞：

1. $1

2. $1

緩解措施
為了防止此漏洞的利用，建議采取以下措施：

1. $1

2. $1

3. $1

### 涉及Windows kernel API而 改用其他漏洞
