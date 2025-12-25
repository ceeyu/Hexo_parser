---
title: 【開局地端紅隊小白與雲端資安的清晨Punch】Day26 靶機攻防端篩選Log(上)
date: 2025-12-25
tags: [資訊安全]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10348063
---

# 靶機攻防端篩選Log

開啟conf文檔
sudo nano /etc/apache2/apache2.conf

nano 加入CustomLog ${APACHE_LOG_DIR}/access.log combined

![image](https://hackmd.io/_uploads/H183N_9l0.png)

- 重新啟動apache

sudo systemctl restart apache2

- access log命令

sudo cat /var/log/apache2/access.log

- error log命令

sudo cat /var/log/apache2/error.log

- 檢查status命令

sudo systemctl status apache2

![image](https://hackmd.io/_uploads/B1iWM_ce0.png)

- 印出所有log文檔

ls /var/log/

```
──(kali㉿kali)-[~]
└─$ ls /var/log/
README            clamav                 faillog         lastlog         private            sysstat
alternatives.log  cloud-init-output.log  fontconfig.log  lightdm         redis              tiger
apache2           cloud-init.log         freeradius      lighttpd        redsnarf           tor
apt               cron.log               freeradius-wpe  macchanger.log  runit              unattended-upgrades
auth.log          defectdojo             gvm             mosquitto       samba              user.log
blue_hydra        dpkg.log               hostapd-wpe     nginx           snort              wtmp
boot.log          dradis                 inetsim         notus-scanner   speech-dispatcher  xrdp-sesman.log
btmp              eaphammer              journal         openvpn         stunnel4           xrdp.log
chkrootkit        exim4                  kern.log        postgresql      syslog
```

![image](https://hackmd.io/_uploads/BJIc9_9g0.png)

## Error/Access log checking

輸入error code有兩條訊息，只第一行是 Apache 的通知訊息，指示 Apache 已經配置完成，恢復正常運作。第二行是關於 Apache 主進程的通知

```
┌──(root㉿kali)-[/var/log/apache2]
└─# sudo cat /var/log/apache2/error.log
[Mon Apr 15 09:21:04.055498 2024] [mpm_prefork:notice] [pid 251144] AH00163: Apache/2.4.58 (Debian) configured -- resuming normal operations
[Mon Apr 15 09:21:04.055553 2024] [core:notice] [pid 251144] AH00094: Command line: '/usr/sbin/apache2'
```

![image](https://hackmd.io/_uploads/rJ89HOqlA.png)

## 另外載 [fullhunt/spring4shell-scan](https://github.com/fullhunt/spring4shell-scan)

```
git clone https://github.com/fullhunt/spring4shell-scan.git
cd spring4shell-scan
sudo docker build -t spring4shell-scan .
sudo docker run -it --rm spring4shell-scan

# With URL list "urls.txt" in current directory
docker run -it --rm -v $PWD:/data spring4shell-scan -l /data/urls.txt
```

指令執行
python3 spring4shell-scan.py -u http://127.104.100.165:8066/

掃描畫面

```
┌──(root㉿kali)-[/home/iris/Downloads/spring4shell-scan/spring4shell-scan]
└─# python3 spring4shell-scan.py -u http://127.104.100.165:8066/
[•] CVE-2022-22965 - Spring4Shell RCE Scanner
[•] Scanner provided by FullHunt.io - The Next-Gen Attack Surface Management Platform.
[•] Secure your External Attack Surface with FullHunt.io.
[•] URL: http://127.104.100.165:8066/
[%] Checking for Spring4Shell RCE CVE-2022-22965.
[•] URL: http://127.104.100.165:8066/ | PAYLOAD: class.module.classLoader[iv1jdve]=iv1jdve
[!!!] Target Affected (CVE-2022-22965)
[!] Total Vulnerable Hosts: 1
[!] http://127.104.100.165:8066/
```

![image](https://hackmd.io/_uploads/S1aT_O5lC.png)
