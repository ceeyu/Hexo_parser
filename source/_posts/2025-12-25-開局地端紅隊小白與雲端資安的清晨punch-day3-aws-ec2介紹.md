---
title: "【開局地端紅隊小白與雲端資安的清晨Punch】Day3 AWS EC2介紹"
date: 2025-12-25
tags: [雲端, aws ec2]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10344509
---

# 壹、AWS EC2介紹

[What is Amazon EC2?](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)

## 一、 EC2 是什麼？

Amazon Elastic Compute Cloud (Amazon EC2) 是 AWS 的一個主要服務，提供雲端虛擬伺服器，也被稱為**實例(Instances)**。

## 二、EC2 的優點

提供了:

1. 彈性與可擴性: 可隨時擴展的算力，可減少硬體成本，更快地開發和部署應用程式

2. 選擇性： EC2 提供各種型號的實例，滿足不同應用程式需求的運算、記憶體和儲存需求。

3. 方便管理: 配置安全性和網絡設置，便於管理儲存。

4. 成本效益：當需要處理突然大流量任務（例如搶演唱會門票）時，您可以擴展容量；當需求下降時，則可減少容量。而不用隨時預備過多硬體。

## 三、EC2的主要服務

![image](https://hackmd.io/_uploads/B1glOhr5R.png)

[What is EC2](https://docs.aws.amazon.com/images/AWSEC2/latest/UserGuide/images/ec2-instances.png)

- 虛擬伺服器（Instances）: 您可以根據需要啟動不同配置的伺服器(Virtual Servers)。

- 預配置模板（Amazon Machine Images ,AMIs）: 內建操作系統和應用程式的伺服器模板。

- 儲存: 持久儲存（Amazon EBS）和臨時儲存（Instance types）。

- 安全: 使用密鑰對(Key pairs)和安全組(Security groups

- )來保護伺服器。

## 四、EC2的進階服務

- Auto Scaling: 自動調整伺服器數量。

- Backup: 自動備份 EC2 實例及其儲存。

- CloudWatch: 監控伺服器和儲存狀態。

- Load Balancing: 平衡流量到多個伺服器。

- GuardDuty: 偵測安全威脅。

- Amazon Lightsail: 簡化的虛擬伺服器服務，適合小型項目。

- ECS 和 EKS: 容器化應用程式的管理服務。

可以當作我們透過網路，跟AWS的Server連線，並且選定要架設機器的地點，選擇後，開始選擇所需的硬體規格，像是Memory, Storage 大小, 映像檔OS的選擇，網路設定等等，只不過這些設定會在AWS被冠上新的名字
