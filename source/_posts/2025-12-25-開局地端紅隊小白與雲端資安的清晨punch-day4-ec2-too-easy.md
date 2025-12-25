---
title: 【開局地端紅隊小白與雲端資安的清晨Punch】Day4 EC2, too easy!
date: 2025-12-25
tags: [aws ec2, 雲端]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10344625
---

# 壹、EC2實作

## 一、開啟EC2

- 選擇地區(可以選近一點的，像是大阪)，預設是奧勒岡

![image](https://hackmd.io/_uploads/ryDyfdRt0.png)

![image](https://hackmd.io/_uploads/H1Klz_RKA.png)

- 搜尋:「EC2」

[EC2功能](https://aws.amazon.com/tw/ec2/features/)

![image](https://hackmd.io/_uploads/H1UiWOCF0.png)

- 點擊EC2，並按下執行新個體

![image](https://hackmd.io/_uploads/rJUkX_AtC.png)

- 命名，並選擇Ubuntu

![image](https://hackmd.io/_uploads/S16vmdCFA.png)

- 選硬體大小，最好可以選到Large或xLarge,因為GUI很吃RAM

![image](https://hackmd.io/_uploads/BkusHuAYR.png)

建立新的金鑰對，命名與創立(選RSA)
![image](https://hackmd.io/_uploads/ByxiXuCt0.png)

![image](https://hackmd.io/_uploads/B1AgE_RKR.png)

- 網路設定只允許SSH連線

![image](https://hackmd.io/_uploads/HJmuVdCYR.png)

- 其餘部分不用更改，按下啟動執行個體

![image](https://hackmd.io/_uploads/BJdkUOCYA.png)

- 按下「檢視所有個體」

![image](https://hackmd.io/_uploads/Hk7VUdRYA.png)

- 可以看到狀態檢查為「正在初始化」，等待片刻

![image](https://hackmd.io/_uploads/r1o5UuCtR.png)

- 按下reload，可以看到狀態欄由初始化變為「2/2項檢查通過」

![image](https://hackmd.io/_uploads/SkahPORKR.png)

## 二、連線EC2

- 按下連線

![image](https://hackmd.io/_uploads/rJh_dOCYR.png)

- 按下 EC2 Instance Connect 端

![image](https://hackmd.io/_uploads/HJHsY_RF0.png)

- 成功連線

![image](https://hackmd.io/_uploads/ByNgcu0tA.png)

## 三、安裝 GUI，跟著以下指令

[【 Cloud 】使用遠端桌面連到 AWS Ubuntu VM](https://learningsky.io/remote-desktop-connect-aws-ubuntu-vm/)

sudo apt-get update 

sudo apt-get install -y gnome

sudo apt-get install -y xrdp

sudo systemctl enable xrdp

echo gnome-session >~/.xsession

sudo service xrdp restart

sudo apt update

sudo apt install net-tools

sudo netstat -plnt | grep rdp 

- 中間等待一段下載時間是正常的

![image](https://hackmd.io/_uploads/ryaGyFCFA.png)

![image](https://hackmd.io/_uploads/Syf27KCKC.png)

- 設定帳號密碼

sudo adduser <name>

輸入以後會出現帳號密碼與個人資料的設定
![image](https://hackmd.io/_uploads/BJqgHvkcR.png)

## 三、遠端桌面連線

- 從「安全性」--> Security Group

![image](https://hackmd.io/_uploads/ByY5Rukc0.png)

- 傳入規則 --> 編輯傳入規則

![image](https://hackmd.io/_uploads/r1fX1Yy9R.png)

- 開啟 3389 port --> 儲存規則

- 

![image](https://hackmd.io/_uploads/Byk_yty9A.png)

- 可以從詳細資訊中看到公有iPv4的資訊

![image](https://hackmd.io/_uploads/SkeYLD1cC.png)

- 開啟Windows 遠端桌面連線，並輸入剛剛創建的帳號密碼登入

![image](https://hackmd.io/_uploads/B1q2Lwkq0.png)

![image](https://hackmd.io/_uploads/rkG0IPJc0.png)

- 進入ubuntu

![image](https://hackmd.io/_uploads/S1m70ukcA.png)

## 四、停止/啟用/終止現有個體

- 「暫停」，中間要稍微停止的話記得要勾選執行個體，並且按下「停止執行個體」，否則會被收取流量費用

![image](https://hackmd.io/_uploads/Bkjz4FRF0.png)

![image](https://hackmd.io/_uploads/Syjd4Y0tR.png)

- 「啟用」，一樣等待一段時間後再reload一次即可

![image](https://hackmd.io/_uploads/SJOYWDJcR.png)

- 「終止」，當不需要再度使用時可以按下終止，將會連初始設定一併刪除

![image](https://hackmd.io/_uploads/B1rhgKy50.png)

## 五、設定Root User

- 將User 變為super user

sudo su

- 開啟vi檔

visudo

把user加入root user(可以省去之後寫sudo)
iris   ALL=(ALL:ALL) ALL 中間的空格是tab，要注意

vi用法 [vi 的使用](https://dywang.csie.cyut.edu.tw/dywang/linuxProgram/node4.html)

修改 vi 文件(^X --> Enter)

![image](https://hackmd.io/_uploads/rJpm0YyqA.png)
