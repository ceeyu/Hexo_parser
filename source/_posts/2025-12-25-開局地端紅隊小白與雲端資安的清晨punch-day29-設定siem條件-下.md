---
title: 【開局地端紅隊小白與雲端資安的清晨Punch】Day29 設定SIEM條件(下)
date: 2024-09-08 29:00:00
tags: [wazuh, 資訊安全]

source: https://ithelp.ithome.com.tw/articles/10348622
series: 雲端資安
categories:
  - 雲端資安
---

## 連結掛載

docker run -p 8066:8080 -v /var/log:/log vulfocus/spring-core-rce-2022-03-29:latest

# 延伸掛載指令確認

進入docker 終端指令
docker exec -it b9b1f689b597   bash
![image](https://hackmd.io/_uploads/r1ViAYhZC.png)

確認 Docker 容器的 /logs 資料夾是否存在：
(將 <container_id> 替換為你的 Docker 容器的 ID)

docker exec <container_id> ls /

```
docker exec <container_id> ls /logs
```

在外部終端機中，檢查外部資料夾 /vars/logs 是否有文件存在：

ls /vars/logs
這將列出 /vars/logs 資料夾中的所有文件，如果成功掛載，你應該能夠看到 Docker 容器內部 /logs 資料夾中的文件。

通過執行以上兩個指令，你可以確保 Docker 容器內部的 /logs 資料夾已經成功掛載到外部資料夾 /vars/logs 中。

## inspect指令確認

docker inspect b9b1f689b597

由Monts 屬性看到有掛載成功
![image](https://hackmd.io/_uploads/SyIZMhnWC.png)

docker inspect <container_id>

這將顯示容器的 JSON 格式詳細資訊，包括容器的配置、網路設置、掛載的卷和其他相關資訊。

有一些常用的選項，可以根據需要在 docker inspect 指令中使用：

- -f：指定要顯示的自定義格式。

- --format：指定要顯示的自定義格式，與 -f 相同。

- --type：僅檢視特定類型的 Docker 物件，例如 container、image、volume 等。

- --size：顯示物件的大小資訊，例如容器的大小。

### 檢查內外部log資料夾權限

```
ls -l /var/log //外部
ls -l /logs //內部
```

## 別以為自己殺掉容器就好了，要多檢查

docker ps -a

![image](https://hackmd.io/_uploads/SyTyjK3WR.png)

![image](https://hackmd.io/_uploads/Bk7znFhbC.png)
成功移出image
![image](https://hackmd.io/_uploads/r1FVhYhbC.png)

## Tomcat修改

sed -i 's/^.*\.level = .*/\0TRACE/g' /app/tomcat/conf/logging.properties

cat /app/tomcat/conf/logging.properties

```
[root@267a37b74319 /]# cat /app/tomcat/conf/logging.properties
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
 
handlers = 1catalina.org.apache.juli.AsyncFileHandler, 2localhost.org.apache.juli.AsyncFileHandler, 3manager.org.apache.juli.AsyncFileHandler, 4host-manager.org.apache.juli.AsyncFileHandler, java.util.logging.ConsoleHandler
 
.handlers = 1catalina.org.apache.juli.AsyncFileHandler, java.util.logging.ConsoleHandler
 
############################################################
# Handler specific properties.
# Describes specific configuration info for Handlers.
############################################################
 
1catalina.org.apache.juli.AsyncFileHandler.level = FINETRACE
1catalina.org.apache.juli.AsyncFileHandler.directory = ${catalina.base}/logs
1catalina.org.apache.juli.AsyncFileHandler.prefix = catalina.
1catalina.org.apache.juli.AsyncFileHandler.encoding = UTF-8
 
2localhost.org.apache.juli.AsyncFileHandler.level = FINETRACE
2localhost.org.apache.juli.AsyncFileHandler.directory = ${catalina.base}/logs
2localhost.org.apache.juli.AsyncFileHandler.prefix = localhost.
2localhost.org.apache.juli.AsyncFileHandler.encoding = UTF-8
 
3manager.org.apache.juli.AsyncFileHandler.level = FINETRACE
3manager.org.apache.juli.AsyncFileHandler.directory = ${catalina.base}/logs
3manager.org.apache.juli.AsyncFileHandler.prefix = manager.
3manager.org.apache.juli.AsyncFileHandler.encoding = UTF-8
 
4host-manager.org.apache.juli.AsyncFileHandler.level = FINETRACE
4host-manager.org.apache.juli.AsyncFileHandler.directory = ${catalina.base}/logs
4host-manager.org.apache.juli.AsyncFileHandler.prefix = host-manager.
4host-manager.org.apache.juli.AsyncFileHandler.encoding = UTF-8
 
java.util.logging.ConsoleHandler.level = FINETRACE
java.util.logging.ConsoleHandler.formatter = org.apache.juli.OneLineFormatter
java.util.logging.ConsoleHandler.encoding = UTF-8
 
 
############################################################
# Facility specific properties.
# Provides extra control for each logger.
############################################################
 
org.apache.catalina.core.ContainerBase.[Catalina].[localhost].level = INFOTRACE
org.apache.catalina.core.ContainerBase.[Catalina].[localhost].handlers = 2localhost.org.apache.juli.AsyncFileHandler
 
org.apache.catalina.core.ContainerBase.[Catalina].[localhost].[/manager].level = INFOTRACE
org.apache.catalina.core.ContainerBase.[Catalina].[localhost].[/manager].handlers = 3manager.org.apache.juli.AsyncFileHandler
 
org.apache.catalina.core.ContainerBase.[Catalina].[localhost].[/host-manager].level = INFOTRACE
org.apache.catalina.core.ContainerBase.[Catalina].[localhost].[/host-manager].handlers = 4host-manager.org.apache.juli.AsyncFileHandler
 
# For example, set the org.apache.catalina.util.LifecycleBase logger to log
# each component that extends LifecycleBase changing state:
#org.apache.catalina.util.LifecycleBase.level = FINETRACE
 
# To see debug messages in TldLocationsCache, uncomment the following line:
#org.apache.jasper.compiler.TldLocationsCache.level = FINETRACE
 
# To see debug messages for HTTP/2 handling, uncomment the following line:
#org.apache.coyote.http2.level = FINETRACE
 
# To see debug messages for WebSocket handling, uncomment the following line:
#org.apache.tomcat.websocket.level = FINETRACE
```

### 開啟Tomcat指令後的Wazuh

收到Tomcat跟內部docker logs

![image](https://hackmd.io/_uploads/HyVM0KhW0.png)

- 飆升了 還有一條等級10的，但尚未出現Level 12 or above

![image](https://hackmd.io/_uploads/HJ0-k53W0.png)

![image](https://hackmd.io/_uploads/r1T8kc3bC.png)

![image](https://hackmd.io/_uploads/SkYBy92bC.png)

### 查詢Tomcat log指令

echo $CATALINA_HOME

cat <Tomcat 安裝目錄>/logs/catalinacatalina.2024-04-29.log

```
[root@b9b1f689b597 logs]# cat /app/tomcat/logs/catalina.2024-04-29.log
29-Apr-2024 02:58:38.674 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Server version name:   Apache Tomcat/8.5.77
29-Apr-2024 02:58:38.677 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Server built:          Mar 13 2022 19:13:33 UTC
29-Apr-2024 02:58:38.678 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Server version number: 8.5.77.0
29-Apr-2024 02:58:38.678 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log OS Name:               Linux
29-Apr-2024 02:58:38.678 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log OS Version:            6.6.15-cloud-amd64
29-Apr-2024 02:58:38.678 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Architecture:          amd64
29-Apr-2024 02:58:38.678 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Java Home:             /app/jdk9
29-Apr-2024 02:58:38.678 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log JVM Version:           9.0.4+11
29-Apr-2024 02:58:38.678 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log JVM Vendor:            Oracle Corporation
29-Apr-2024 02:58:38.678 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log CATALINA_BASE:         /app/tomcat
29-Apr-2024 02:58:38.679 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log CATALINA_HOME:         /app/tomcat
29-Apr-2024 02:58:38.681 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: --add-opens=java.base/java.lang=ALL-UNNAMED
29-Apr-2024 02:58:38.682 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: --add-opens=java.base/java.io=ALL-UNNAMED
29-Apr-2024 02:58:38.682 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: --add-opens=java.base/java.util=ALL-UNNAMED
29-Apr-2024 02:58:38.682 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: --add-opens=java.base/java.util.concurrent=ALL-UNNAMED
29-Apr-2024 02:58:38.683 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: --add-opens=java.rmi/sun.rmi.transport=ALL-UNNAMED
29-Apr-2024 02:58:38.683 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: -Djava.util.logging.config.file=/app/tomcat/conf/logging.properties
29-Apr-2024 02:58:38.683 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: -Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager
29-Apr-2024 02:58:38.683 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: -Djdk.tls.ephemeralDHKeySize=2048
29-Apr-2024 02:58:38.684 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: -Djava.protocol.handler.pkgs=org.apache.catalina.webresources
29-Apr-2024 02:58:38.684 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: -Dorg.apache.catalina.security.SecurityListener.UMASK=0027
29-Apr-2024 02:58:38.684 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: -Dignore.endorsed.dirs=
29-Apr-2024 02:58:38.685 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: -Dcatalina.base=/app/tomcat
29-Apr-2024 02:58:38.685 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: -Dcatalina.home=/app/tomcat
29-Apr-2024 02:58:38.685 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: -Djava.io.tmpdir=/app/tomcat/temp
29-Apr-2024 02:58:38.685 INFO [main] org.apache.catalina.core.AprLifecycleListener.lifecycleEvent The Apache Tomcat Native library which allows using OpenSSL was not found on the java.library.path: [/usr/java/packages/lib:/usr/lib64:/lib64:/lib:/usr/lib]
29-Apr-2024 02:58:38.725 INFO [main] org.apache.coyote.AbstractProtocol.init Initializing ProtocolHandler ["http-nio-8080"]
29-Apr-2024 02:58:38.751 INFO [main] org.apache.catalina.startup.Catalina.load Initialization processed in 580 ms
29-Apr-2024 02:58:38.802 INFO [main] org.apache.catalina.core.StandardService.startInternal Starting service [Catalina]
29-Apr-2024 02:58:38.803 INFO [main] org.apache.catalina.core.StandardEngine.startInternal Starting Servlet engine: [Apache Tomcat/8.5.77]
29-Apr-2024 02:58:38.821 INFO [localhost-startStop-1] org.apache.catalina.startup.HostConfig.deployWAR Deploying web application archive [/app/tomcat/webapps/ROOT.war]
29-Apr-2024 02:58:40.257 INFO [localhost-startStop-1] org.apache.jasper.servlet.TldScanner.scanJars At least one JAR was scanned for TLDs yet contained no TLDs. Enable debug logging for this logger for a complete list of JARs that were scanned but no TLDs were found in them. Skipping unneeded JARs during scanning can improve startup time and JSP compilation time.
29-Apr-2024 02:58:42.602 INFO [localhost-startStop-1] org.apache.catalina.startup.HostConfig.deployWAR Deployment of web application archive [/app/tomcat/webapps/ROOT.war] has finished in [3,780] ms
29-Apr-2024 02:58:42.605 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-nio-8080"]
29-Apr-2024 02:58:42.618 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in 3866 ms
```

## Sed 指令說明

sed -i 's/FINETRACE/TRACE/g' /app/tomcat/conf/logging.properties 

- sed: 這是 Linux/Unix 系統上的一個流編輯器，用於對文本進行編輯操作。

- -i: 這是 sed 命令的一個選項，意思是 "in-place"，表示直接在原始文件中修改，而不是輸出到標準輸出。這意味著該指令將修改 /app/tomcat/conf/logging.properties 文件而不是將修改結果輸出到終端。

's/FINETRACE/TRACE/g': 這是 sed 的替換操作。它告訴 sed 在文件中尋找所有出現的 "FINETRACE" 字符串，並將其替換為 "TRACE"。
- s: 這表示替換操作。
/FINETRACE/: 這是要搜索和替換的模式或字符串。在這個例子中，我們搜索 "FINETRACE" 字符串。
/TRACE/: 這是要用於替換的字符串。在這個例子中，我們將 "FINETRACE" 替換為 "TRACE"。

- g: 這是全局標誌，表示替換操作應用於每一個匹配的字符串，而不僅僅是第一個。如果不使用 g，則只會替換每行的第一個匹配。

- /app/tomcat/conf/logging.properties: 這是要操作的文件路徑。在這個例子中，我們將修改 /app/tomcat/conf/logging.properties 文件中的內容。

## 正確路徑相關

路徑:/app/tomcat/logs

catalina.2024-04-29.log

catalina.out

host-manager.2024-04-29.log

localhost.2024-04-29.log
這個抓到 Logs :localhost_access_log.2024-04-29.txt

manager.2024-04-29.log

![image](https://hackmd.io/_uploads/HJptTphbC.png)

# 成功畫面

![image](https://hackmd.io/_uploads/HkjrLya-C.png)

![image](https://hackmd.io/_uploads/SyCOU1ab0.png)

![image](https://hackmd.io/_uploads/S1QSf6asR.png)

![image](https://hackmd.io/_uploads/HkYbRn_GA.png)

![image](https://hackmd.io/_uploads/ByxIA3uf0.png)

### 110002

![image](https://hackmd.io/_uploads/BJusC2uzA.png)

![image](https://hackmd.io/_uploads/Sy1kyTuf0.png)

Table:
![image](https://hackmd.io/_uploads/HkCbyTOMA.png)

JSON
![image](https://hackmd.io/_uploads/B1Z1faaoR.png)

Rule
![image](https://hackmd.io/_uploads/HkiSkTuG0.png)

## Report

![image](https://hackmd.io/_uploads/SJPT16_zA.png)

[Reporting using OpenSearch Dashboards](https://opensearch.org/docs/latest/reporting/report-dashboard-index/)

以下是逐步指南來確定 Wazuh 安全事件是否已經被索引到 OpenSearch 中：

1. $1

2. $1

3. $1

4. $1

5. $1
