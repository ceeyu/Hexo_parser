---
title: "【開局地端紅隊小白與雲端資安的清晨Punch】Day27 靶機攻防端篩選Log(下)"
date: 2025-12-25
tags: [資訊安全, wazuh]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10348179
---

## Docker Log

docker ps: 找Container id

![image](https://hackmd.io/_uploads/BJsmRi2gA.png)

```
┌──(root㉿kali)-[/home/iris/Downloads]
└─# docker ps
CONTAINER ID   IMAGE                                        COMMAND                  CREATED         STATUS         PORTS                                       NAMES
233ab001aa5a   vulfocus/spring-core-rce-2022-03-29:latest   "/app/tomcat/bin/cat…"   3 minutes ago   Up 3 minutes   0.0.0.0:8066->8080/tcp, :::8066->8080/tcp   distracted_joliot
```

### 看到Log了!

docker logs 233ab001aa5a

![image](https://hackmd.io/_uploads/HkgZCihxA.png)

```
┌──(root㉿kali)-[/home/iris/Downloads]
└─# docker logs 233ab001aa5a
NOTE: Picked up JDK_JAVA_OPTIONS:  --add-opens=java.base/java.lang=ALL-UNNAMED --add-opens=java.base/java.io=ALL-UNNAMED --add-opens=java.base/java.util=ALL-UNNAMED --add-opens=java.base/java.util.concurrent=ALL-UNNAMED --add-opens=java.rmi/sun.rmi.transport=ALL-UNNAMED
17-Apr-2024 01:55:52.641 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Server version name:   Apache Tomcat/8.5.77
17-Apr-2024 01:55:52.647 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Server built:          Mar 13 2022 19:13:33 UTC
17-Apr-2024 01:55:52.647 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Server version number: 8.5.77.0
17-Apr-2024 01:55:52.648 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log OS Name:               Linux
17-Apr-2024 01:55:52.648 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log OS Version:            6.6.9-cloud-amd64
17-Apr-2024 01:55:52.649 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Architecture:          amd64
17-Apr-2024 01:55:52.649 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Java Home:             /app/jdk9
17-Apr-2024 01:55:52.650 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log JVM Version:           9.0.4+11
17-Apr-2024 01:55:52.650 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log JVM Vendor:            Oracle Corporation
17-Apr-2024 01:55:52.650 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log CATALINA_BASE:         /app/tomcat
17-Apr-2024 01:55:52.651 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log CATALINA_HOME:         /app/tomcat
17-Apr-2024 01:55:52.656 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: --add-opens=java.base/java.lang=ALL-UNNAMED
17-Apr-2024 01:55:52.658 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: --add-opens=java.base/java.io=ALL-UNNAMED
17-Apr-2024 01:55:52.659 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: --add-opens=java.base/java.util=ALL-UNNAMED
17-Apr-2024 01:55:52.659 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: --add-opens=java.base/java.util.concurrent=ALL-UNNAMED
17-Apr-2024 01:55:52.660 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: --add-opens=java.rmi/sun.rmi.transport=ALL-UNNAMED
17-Apr-2024 01:55:52.660 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: -Djava.util.logging.config.file=/app/tomcat/conf/logging.properties
17-Apr-2024 01:55:52.661 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: -Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager
17-Apr-2024 01:55:52.662 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: -Djdk.tls.ephemeralDHKeySize=2048
17-Apr-2024 01:55:52.662 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: -Djava.protocol.handler.pkgs=org.apache.catalina.webresources
17-Apr-2024 01:55:52.663 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: -Dorg.apache.catalina.security.SecurityListener.UMASK=0027
17-Apr-2024 01:55:52.665 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: -Dignore.endorsed.dirs=
17-Apr-2024 01:55:52.665 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: -Dcatalina.base=/app/tomcat
17-Apr-2024 01:55:52.666 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: -Dcatalina.home=/app/tomcat
17-Apr-2024 01:55:52.666 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Command line argument: -Djava.io.tmpdir=/app/tomcat/temp
17-Apr-2024 01:55:52.666 INFO [main] org.apache.catalina.core.AprLifecycleListener.lifecycleEvent The Apache Tomcat Native library which allows using OpenSSL was not found on the java.library.path: [/usr/java/packages/lib:/usr/lib64:/lib64:/lib:/usr/lib]
17-Apr-2024 01:55:52.729 INFO [main] org.apache.coyote.AbstractProtocol.init Initializing ProtocolHandler ["http-nio-8080"]
17-Apr-2024 01:55:52.788 INFO [main] org.apache.catalina.startup.Catalina.load Initialization processed in 1092 ms
17-Apr-2024 01:55:52.891 INFO [main] org.apache.catalina.core.StandardService.startInternal Starting service [Catalina]
17-Apr-2024 01:55:52.892 INFO [main] org.apache.catalina.core.StandardEngine.startInternal Starting Servlet engine: [Apache Tomcat/8.5.77]
17-Apr-2024 01:55:52.917 INFO [localhost-startStop-1] org.apache.catalina.startup.HostConfig.deployWAR Deploying web application archive [/app/tomcat/webapps/ROOT.war]
17-Apr-2024 01:55:54.681 INFO [localhost-startStop-1] org.apache.jasper.servlet.TldScanner.scanJars At least one JAR was scanned for TLDs yet contained no TLDs. Enable debug logging for this logger for a complete list of JARs that were scanned but no TLDs were found in them. Skipping unneeded JARs during scanning can improve startup time and JSP compilation time.

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.6.5)

2024-04-17 01:55:55.694  INFO 1 --- [ost-startStop-1] c.b.spring.core.rce.ServletInitializer   : Starting ServletInitializer v0.0.1-SNAPSHOT using Java 9.0.4 on 233ab001aa5a with PID 1 (/app/tomcat/webapps/ROOT/WEB-INF/classes started by root in /)
2024-04-17 01:55:55.700  INFO 1 --- [ost-startStop-1] c.b.spring.core.rce.ServletInitializer   : No active profile set, falling back to 1 default profile: "default"
2024-04-17 01:55:56.941  INFO 1 --- [ost-startStop-1] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 1103 ms
2024-04-17 01:55:57.833  INFO 1 --- [ost-startStop-1] c.b.spring.core.rce.ServletInitializer   : Started ServletInitializer in 2.884 seconds (JVM running for 6.708)
17-Apr-2024 01:55:57.871 INFO [localhost-startStop-1] org.apache.catalina.startup.HostConfig.deployWAR Deployment of web application archive [/app/tomcat/webapps/ROOT.war] has finished in [4,953] ms
17-Apr-2024 01:55:57.874 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-nio-8080"]
17-Apr-2024 01:55:57.894 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in 5105 ms
2024-04-17 01:59:00.609  INFO 1 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'
2024-04-17 01:59:00.615  INFO 1 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 1 ms
```

# 設立攻擊端(分開攻擊與靶機)

## 區網確認

![image](https://hackmd.io/_uploads/HyjNsgTx0.png)

```
┌──(root㉿kali)-[/home/kali]
└─# ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host noprefixroute
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 9001 qdisc mq state UP group default qlen 1000
    link/ether 06:49:30:6c:4b:f1 brd ff:ff:ff:ff:ff:ff
    inet 172.31.42.131/20 brd 172.31.47.255 scope global dynamic eth0
       valid_lft 2347sec preferred_lft 2347sec
    inet6 fe80::449:30ff:fe6c:4bf1/64 scope link proto kernel_ll
       valid_lft forever preferred_lft forever
3: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
    link/ether 02:42:71:04:aa:71 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:71ff:fe04:aa71/64 scope link proto kernel_ll
       valid_lft forever preferred_lft forever
5: veth98a3814@if4: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master docker0 state UP group default
    link/ether c2:63:3a:71:1a:1d brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet6 fe80::c063:3aff:fe71:1a1d/64 scope link proto kernel_ll
       valid_lft forever preferred_lft forever
```

成功Ping到

- 172.31.42.131

![image](https://hackmd.io/_uploads/B10ohgpe0.png)

# 研究Code

[Spring 远程命令执行漏洞（CVE-2022-22965）原理分析和思考](https://paper.seebug.org/1877/)

[CVE-2022-22965: Spring Core Remote Code Execution Vulnerability Exploited In the Wild (SpringShell) (Updated)](https://unit42.paloaltonetworks.com/cve-2022-22965-springshell/)

## 重製環境

dcker ps: 查看CONTAINER_ID

docker stop <CONTAINER_ID>: 停止docker

docker rm <CONTAINER_ID>: 刪除container

docker rmi <IMAGE_ID>: 移除映像檔

```
┌──(root㉿kali)-[/home/iris]
└─# docker stop 884aefa286ca
884aefa286ca

┌──(root㉿kali)-[/home/iris]
└─# docker rm 884aefa286ca
884aefa286ca

┌──(root㉿kali)-[/home/iris]
└─# docker rmi spring-core-rce-2022-03-29:latest
```

## 攻擊前

時間線是 2024 08:35

![image](https://hackmd.io/_uploads/r1-3o-Te0.png)

## Ubuntu攻擊機攻擊後

時間線是2024 08:36

![image](https://hackmd.io/_uploads/SkHPs-axC.png)

- 靶機畫面，代表遠端攻擊成功

![image](https://hackmd.io/_uploads/Hydx3ZTeA.png)

# 參、相關資料

[飛飛[漏洞分析] 002 復現 Spring4Shell: Spring Core RCE JDK 9+ CVE-2022-22965](https://feifei.tw/springshell-spring-core-rce/)

[[Day 1] - Spring Boot 是什麼](https://ithelp.ithome.com.tw/articles/10213097)

攻擊腳本檔案 [spring-core-rce/test.py](https://github.com/dinosn/spring-core-rce/blob/main/test.py)

[Spring4shell 來襲！繼 Log4Shell 後又一 Java 生態系嚴重漏洞出現](https://www.informationsecurity.com.tw/article/article_detail.aspx?aid=9792)

[SpringCore0day/漏洞分析.pdf](https://github.com/craig/SpringCore0day/blob/main/%E6%BC%8F%E6%B4%9E%E5%88%86%E6%9E%90.pdf)
