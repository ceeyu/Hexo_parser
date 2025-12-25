---
title: "【開局地端紅隊小白與雲端資安的清晨Punch】Day9 Docker下載DVWA"
date: 2025-12-25
tags: [dvwa, 資訊安全]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10345290
---

# 壹、Docker下載

## 一、先用EC2的SSH連線

[參考: DAY 20 - 連接到 EC2 instance 並下載 Docker](https://ithelp.ithome.com.tw/articles/10334594)

開啟cmd並且複製ssh的選項並貼上
![image](https://hackmd.io/_uploads/HyIGV0SqC.png)

sudo apt update

sudo apt install apt-transport-https ca-certificates curl software-properties-common
![image](https://hackmd.io/_uploads/HJ78HArq0.png)

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
![image](https://hackmd.io/_uploads/rJDjrCr50.png)

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" 
![image](https://hackmd.io/_uploads/SykJL0SqA.png)

sudo apt update

![image](https://hackmd.io/_uploads/r1a-BRBcR.png)

apt-cache policy docker-ce
![image](https://hackmd.io/_uploads/HyZ-LCB90.png)

sudo apt install docker-ce
![image](https://hackmd.io/_uploads/Bk4G8RSqR.png)

sudo docker --version
![image](https://hackmd.io/_uploads/SkkS8Cr9R.png)

測試Docker開啟: sudo service docker start
sudo docker ps
![image](https://hackmd.io/_uploads/Sy1FU0HcA.png)

# 貳、Docker 下載 DVWA pre-built image

![image](https://hackmd.io/_uploads/SkNMmrb0T.png)

下載網址參照: [DVWA pre-built image.](https://github.com/digininja/DVWA/pkgs/container/dvwa)

輸入指令: sudo docker pull ghcr.io/digininja/dvwa:1232568

![image](https://hackmd.io/_uploads/BJZ0dbU9R.png)

### 備註: Double check: docker / docker compose

sudo docker compose version

sudo docker version
![image](https://hackmd.io/_uploads/r1XVFWU5C.png)

## 三、安裝 DVWA

### 指令

![image](https://hackmd.io/_uploads/ry6CBBWRT.png)

![image](https://hackmd.io/_uploads/SJN06FbCa.png)

wget https://raw.githubusercontent.com/IamCarron/DVWA-Script/main/Install-DVWA.sh
![image](https://hackmd.io/_uploads/BkgTLKZ8qA.png)

chmod +x Install-DVWA.sh

sudo ./Install-DVWA.sh

### 成功執行!!

![image](https://hackmd.io/_uploads/Bk19FZUc0.png)

安裝過程跑完後:中間可以設置密碼，按enter等於設定不用密碼
![image](https://hackmd.io/_uploads/SJKhKZUcA.png)

記得登入的預設帳號跟密碼是
帳號: admin
密碼: password

設定完後可以從http://localhost/DVWA/login.php登入剛剛設定的帳號與密碼
![image](https://hackmd.io/_uploads/SkgC5zL5A.png)

登入畫面:
![image](https://hackmd.io/_uploads/BkKgjz890.png)
