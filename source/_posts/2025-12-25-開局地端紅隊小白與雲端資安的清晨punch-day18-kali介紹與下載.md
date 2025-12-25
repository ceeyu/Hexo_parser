---
title: 【開局地端紅隊小白與雲端資安的清晨Punch】Day18 Kali介紹與下載
date: 2024-08-28 18:00:00
tags: [kali, 資訊安全]

source: https://ithelp.ithome.com.tw/articles/10346688
series: 雲端資安
categories:
  - 雲端資安
---

# Kali 介紹

Kali Linux 是一個基於 Debian 的 Linux 發行版，專門為信息安全專業人員和滲透測試人員設計。它由 Offensive Security 維護，旨在提供一個全面的工具集來協助進行安全評估、漏洞測試和滲透測試。以下是 Kali Linux 的主要特點和功能：

## 主要特點

1. $1

- Kali Linux 預裝了大量的安全測試和滲透測試工具，這些工具涵蓋了不同的安全領域，包括網絡掃描、漏洞評估、密碼破解、數據挖掘等。

- 常見工具包括 Nmap、Metasploit Framework、Wireshark、Burp Suite、John the Ripper 和 Aircrack-ng 等。

2.開源和免費：

- Kali Linux 是一個開源的操作系統，可以免費下載和使用。這使得它成為安全研究人員和學生的理想選擇。

1. $1

- Offensive Security 定期更新 Kali Linux，以添加新功能和工具，並修補已知的漏洞。這確保了使用者始終擁有最新的安全工具和改進。

1. $1

- Kali Linux 擁有活躍的使用者社區和廣泛的文檔支持。使用者可以通過論壇、教程和官方文檔來獲得幫助和指導。

1. $1

- Kali Linux 提供多種安裝選擇，包括完整版、輕量版、Live CD/USB 版本，以及專門針對 ARM 設備的版本（如 Raspberry Pi）。

1. $1

- 用戶可以自定義 Kali Linux，根據需求添加或移除工具，並創建自己的定制版本。

1. $1

- 除了滲透測試和安全評估，Kali Linux 也可用於數據恢復、數字取證和其他安全研究工作。

## 使用場景

1. $1

- 用於模擬攻擊以識別系統和網絡中的安全漏洞，幫助組織改進安全防護。

1. $1

- 用於分析和評估系統或應用程序中的漏洞，並提供修補建議。

1. $1

- 用於收集、分析和呈現數字證據，以支持法律和調查工作。

1. $1

- 用於研究和開發新的安全技術和工具，並測試其有效性。

# Kali 下載

[在 AWS 上設定 Kali Linux EC2 平臺（第 2 章）](https://medium.com/aws-cloud-penetration-testing-offensive-security/setting-up-a-kali-linux-ec2-platform-on-aws-chapter-2-9ee38e9f6d1a)

EC2 ---> AMI目錄
![image](https://hackmd.io/_uploads/HykivOKo0.png)

搜尋: Kali ---> AWS Marketing AMI ---> Kali Linux
![image](https://hackmd.io/_uploads/B1Jl_OFsR.png)

定價
![image](https://hackmd.io/_uploads/H1sEOOtoR.png)

立即訂閱
![image](https://hackmd.io/_uploads/Hy_Pd_FjA.png)

使用AMI啟動執行個體
![image](https://hackmd.io/_uploads/SJA9uuKjA.png)

ssh連線: 記得指令前面要改成Kali
![image](https://hackmd.io/_uploads/Hyb7hOYo0.png)

後續步驟跟創立EC2類似，這些是參考網站的前置步驟

sudo apt update && sudo apt install -y kali-linux-headless

sudo apt update && sudo apt install -y kali-desktop-xfce

sudo apt-get update && sudo apt-get -y upgrade

sudo apt-get install -y kali-linux-everything

### 記得要加另外的指令，設定xrdp

sudo apt update

sudo apt install -y xrdp

sudo service xrdp start

sudo update-rc.d xrdp enable

### 設定帳號密碼

username換成自己的帳戶名

sudo adduser <newusername>

sudo usermod -aG sudo newusername

### 記得Security Group要開 inbound rule 3389(RDP)

## 成功開啟Kali囉

![image](https://hackmd.io/_uploads/ryZo2OIgC.png)

## 下載可視化觀測

sudo apt update

sudo apt install htop

htop

![image](https://hackmd.io/_uploads/rkBAi9FjR.png)
