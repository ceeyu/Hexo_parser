---
title: 【開局地端紅隊小白與雲端資安的清晨Punch】Day16 AWS NACL, site to site VPN
date: 2024-08-26 16:00:00
tags: [防火牆, nacl]

source: https://ithelp.ithome.com.tw/articles/10346327
series: 雲端資安
categories:
  - 雲端資安
---

# 防禦策略與防火牆設定

# 壹、參考資料

參考: 公司上櫃資訊內控審計之準備 [2010 iT 邦幫忙鐵人賽 IT上櫃心法](https://ithelp.ithome.com.tw/users/20000375/ironman/180)
參考: [[IT上櫃心法]-22.防火牆設定](https://ithelp.ithome.com.tw/articles/10056261)
參考: [Stateful vs. Stateless Firewall
](https://www.linkedin.com/pulse/stateful-vs-stateless-firewall-rajneesh-gupta-df8kf/)參考: [什麼是下一代防火牆 (NGFW)？](https://www.cloudflare.com/zh-tw/learning/security/what-is-next-generation-firewall-ngfw/)

## 一、雲端

參考: [無限手套 AWS 版：掌控一切的 5 + 1 雲端必學主題](https://ithelp.ithome.com.tw/users/20100951/ironman/4671)
[Amazon Cloud Service 30 days challenge](https://ithelp.ithome.com.tw/users/20083507/ironman/1366)

## 二、連線

參考: [AWS VPC NACL](https://medium.com/@bayaansanni/aws-vpc-nacl-58d414efc328)

# 貳、實作步驟

參考: [AWS — 學習筆記(1) Deploy ENV/EC2](https://medium.com/jacky-life/aws-%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98-1-deploy-env-ec2-ea5e5f56d936)
參考:[AWS — 學習筆記(2) NAT/Container Service](https://medium.com/jacky-life/aws-%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98-2-nat-container-service-e23d78f1ab55)
參考:[AWS — 學習筆記(3) Deploy ELB](https://medium.com/jacky-life/aws-%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98-3-deploy-elb-2b0d86c776f7)

## 一、使用預設VPC、創建Subnet Group

目前: Security group + public subnet, 裡面有兩個EC2 (僅只有下圖的左半Security Group，沒有建立Private subnet)
![image](https://hackmd.io/_uploads/SJBrg0cAa.png)

參考:[AWS — 學習筆記(2) NAT/Container Service](https://medium.com/jacky-life/aws-%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98-2-nat-container-service-e23d78f1ab55)

### 目前 Resource Map

![image](https://hackmd.io/_uploads/HyJUNA506.png)

## 二、建立NACL(Netwarks ACL)

VPC --> Netwark ACLs --> Create network ACL

![image](https://hackmd.io/_uploads/Hkff7A906.png)

## 三、設置Inbound

### 原本是denined all，要新增其他rules 來allow

![image](https://hackmd.io/_uploads/ryifA65R6.png)

- All traffic

- All TCP

- Custom TCP+ port: 1024-49151(若寫0-65535則等於All TCP)

- RDP --> 遠端桌面連線

- SSH(Security Shell)

- ICMP --> Ping, 網路探測, 錯誤報告

- HTTP

- HTTPS

### Port知識補充

TCP 協議中的端口號範圍是從 0\~65535。這個範圍中的端口號被分為三個部分：(若寫0-65535則等於All TCP)

**知名端口（Well-known Ports）**：這些端口號範圍從 0 到 1023。知名端口通常是一些廣泛使用的服務所使用的，例如 HTTP 服務（端口 80）和 HTTPS 服務（端口 443）。

**註冊端口（Registered Ports）**：這些端口號範圍從 1024 到 49151。註冊端口通常用於註冊了的應用程序，但不像知名端口那樣廣泛使用。

**動態或私有端口（Dynamic or Private Ports）**：這些端口號範圍從 49152 到 65535。這些端口通常由客戶端應用程序動態分配，用於與伺服器端進行通信。

## 四、設置Outbound rules

![image](https://hackmd.io/_uploads/ryqS10qCT.png)

- All ICMP

- All TCP

## 五、Routing Tables

### 將子網路加入route tables

VPC --> Route Table --> Edit subnet associations --> Save associations
![image](https://hackmd.io/_uploads/BJ8MSRqA6.png)

### Routes

- igw(Internet Gateway)

- local

![image](https://hackmd.io/_uploads/BkuoBAqRp.png)

### Subnet associations

- Explict subnet associations --> 可以看到剛剛添加的subnet

**注意**: 但因為目前只有一個public subnet，所以Resource Map再新增前後看不出差異
![image](https://hackmd.io/_uploads/Syaf8CqC6.png)

# 參、AWS NACL 相關問題

inbound / outbound rules 區分

- inbound是從我們的電腦連線到EC2，所以是針對主機(ipinfo: 公司位址)

如何只擋掉特定IP(By source / destination)，是本機端的IP ex: 172.18.2.214/23

- 直接將resource IP 設為欲封鎖IP

cloud firewall的stateless, stateful差別

- 進階版(Cloud為地端的延伸)

Port號，為什麼要把HTTP,HTTPS,SSH,ICMP特別拉出來(**只有開他們無法連線**，但開了All TCP or custom TCP又等於都開啟)

- 針對特定功能的IP的Port做處理

- Ex: 家裡有很多扇門，欲設每一扇都鎖住，開白名單等於把限制訪客(特定IP)只能透過某一扇門(port)來通過

privite subnet的routing table為什麼需要3個(而不是兩個)

- 系統本來就有的routing tables(因為雲端本來就是在同個VPC下，代表本來就在同個routing table連結)

NAT主要是把private subnet轉譯到public?
![image](https://hackmd.io/_uploads/HyGHb0qC6.png)

NGFW 跟 雲端防火牆的差異 [下一代防火牆 (NGFW) 與防火牆即服務 (FWaaS)](https://www.cloudflare.com/zh-tw/learning/cloud/ngfw-vs-fwaas/)
![image](https://hackmd.io/_uploads/SJhjzAq06.png)

### 筆記

- Security Group是白名單、NACL是黑名單

- 雲端已經幫我們預設Fire wall的功能，但是防火牆的概念要由地端(沒有幫我們做設定)延伸比較好理解!!
