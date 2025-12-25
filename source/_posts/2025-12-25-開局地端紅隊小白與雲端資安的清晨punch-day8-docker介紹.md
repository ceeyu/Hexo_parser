---
title: 【開局地端紅隊小白與雲端資安的清晨Punch】Day8 Docker介紹
date: 2024-08-18 08:00:00
tags: [docker, 雲端]

source: https://ithelp.ithome.com.tw/articles/10345171
series: 雲端資安
categories:
  - 雲端資安
---

# 壹、Docker 介紹

[AWS 什麼是 Docker？](https://aws.amazon.com/tw/docker/)
[Docker官網](https://docs.docker.com/)

## 一、什麼是 Docker？

Docker 是一個開源的平台，用於打包、發佈和執行應用程式，以「容器(Container)」的形式。它讓開發者將應用程式及其所有依賴項封裝在一個獨立的容器中，無論環境如何，都能確保程式碼在不同環境中始終保持一致。

## 二、Docker 的優勢：

- 一致性與可攜性： Docker 容器可以在任何環境中執行，無論是開發者筆記本電腦、測試伺服器還是生產環境，確保應用程式在不同環境中都能順暢運行。

- 資源效率： Docker 容器共享作業系統核心，節省系統資源，同時提升應用程式啟動速度。

- 敏捷開發： Docker 容器讓開發者可以快速建立、測試和部署應用程式，縮短開發週期。

- 簡化部署： Docker 容器可以輕鬆部署到不同的平台，包括 AWS、Azure 和 Google Cloud Platform。

- 可擴展性： Docker 容器可以輕鬆擴展，滿足流量需求的增長。

- 安全性： Docker 容器可以隔離應用程式，提高安全性，防止應用程式之間互相影響。

## 三、Docker的架構

- Docker Engine： Docker 核心引擎，負責建立、執行和管理 Docker 容器。

- Docker Image： Docker 容器的藍圖，包含應用程式程式碼、依賴項和設定檔。

- Docker Container： 實際執行的 Docker 容器，包含一個獨立的執行環境。

- Docker Registry： 用於儲存和分享 Docker Image 的中央倉庫，例如 Docker Hub。

- Docker Compose： 用於定義和管理多個 Docker 容器的工具。

- Docker Swarm： 用於建立和管理 Docker 容器集群的工具。

## 四、Docker 與 AWS 的整合：

- Amazon ECS (Elastic Container Service)： AWS 的容器編排服務，可以自動化 Docker 容器的部署、擴展和管理。

- Amazon EKS (Elastic Kubernetes Service)： AWS 的 Kubernetes 服務，可以用來建立和管理 Kubernetes 叢集，支援 Docker 容器。

- AWS CodeBuild： AWS 的持續整合/持續交付 (CI/CD) 服務，可以與 Docker 整合，自動化建置 Docker Image 並部署到 AWS。

- AWS Fargate： AWS 的無伺服器容器執行環境，可以執行 Docker 容器，而無需管理伺服器。

## 使用 Docker 的案例：

- 快速開發和部署應用程式： 開發者可以將應用程式打包成 Docker 容器，並輕鬆部署到不同的環境。

- 微服務架構： Docker 容器可以輕鬆建立和管理微服務，提高應用程式的可擴展性和靈活性。

- 雲端原生應用程式開發： Docker 是雲端原生應用程式開發的首選平台，可以簡化應用程式部署和管理。

- DevOps 工具整合： Docker 可以與 CI/CD 工具和自動化工具整合，簡化應用程式開發和部署流程。
