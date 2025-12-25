---
title: 無職轉生～到了資工系就拿出真本事٩(๑•̀ω•́๑)۶【Flutter Go in 30 Days】：Day1 今晚，我想來點Flutter!
date: 2025-12-25
tags: [flutter]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10314945
---

# 壹、什麼是跨平台開發語言?

想像以前在開發軟體時需要專門先用Android(Java或Kotlin)的原生語言與IOS的原生語言(Objective-C或Swift)進行分別的開發，不但需要各自的原生語言生命週期和UI元素有熟悉的了解，編寫Android和iOS版本的程式碼，並且針對不同平台的用戶體驗進行優化調整。

而跨平台開發語言是一種，不但允許開發者在一次編寫的基礎上，將App直接運行在多個不同的作業系統和平台上，相較原本撰寫各自程式語言的方式，無需進行額外的代碼修改。可以大大簡化了軟體開發的流程，並節省了時間和成本。

# 貳、Flutter是什麼?

參考資料: [官網:Flutter architectural overview](https://docs.flutter.dev/resources/architectural-overview)

## 一、Flutter 特色

Flutter作為一個由Google開發的免費、開源UI框架，提供了一個全新的方式來建立跨平台應用程式。它的特點是具有快速熱重載(Hot Reload)功能，優雅美觀的UI元素，以及一次編寫就能在多個平台上執行的能力。

此外，Flutter還支援多種硬體設備，包括智慧手機、平板電腦和桌上型電腦。無論是Mobile、桌面(Windows/MacOS)還是Web的應用程式，Flutter都可以提供良好的跨平台使用者體驗。

## 二、Flutter System框架

Flutter是一個分層的結構，系統主要分為三層:

![](https://hackmd.io/_uploads/BJbhSTLcn.png)

### 1. Framework

是Dart程式與前端主要撰寫的區域，包含了主要的Material(Android風格),Cupertino(IOS風格) UI、Widget、各類繪圖、動畫、手勢動作執行的地方

### 2. Engine

以C/C++語言撰寫，是實現主要Flutter核心庫的地方，包含了通信服務的協定、Isolate的設定、系統事件通知、Dart虛擬機、渲染引擎(Skia or Impeller)執行的地方，作為Framework與Embedder的橋樑

### 3. Embedder

為將Engine實際執行Task Runner與線程管理、將Flutter嵌入各原生平台的地方。

# 參、Flutter的核心特性

Flutter具有一些引人矚目的核心特性，使其在跨平台應用程式開發領域獲得了廣泛的關注和支持。其中一個最引人注目的特點是"熱重載"（Hot Reload）功能。這個功能允許開發者在進行程式碼更改後立即查看結果，這使得調試和UI設計變得更加迅速和容易。Flutter的快速熱重載為開發提供了即時回饋，節省了寶貴的時間和開發成本。

![](https://hackmd.io/_uploads/H1_W5pU93.png)

[Flutter框架概覽，Widget佈局](https://doc.flutterchina.club/technical-overview/)

另一個Flutter的重要特點是它的組件化架構，即Widgets。Flutter將應用程式的每個元素視為一個Widget，這些小部件可以互相層遞組合，以創建複雜的UI。這種組件化的方法使得開發者可以更容易地構建和重用UI元素，同時保持程式碼的清晰和可維護性。

# 肆、Flutter 與其他跨平台框架語言的比較

## 一、Flutter v.s. ReacNative

而Flutter也長年與React Native做為比較對象，兩者有以下幾點主要差別：

使用語言
UI渲染
熱重載
社群支援、文件
原生API存取
性能

Flutter
Dart
自己的渲染引擎
即時、快速
Google社群與開發者 ，官方文件豐富
Platform Channel，用Dart編寫
性能較好

ReactNative
JavaScript
原生UI元素
稍慢
已有龐大社群，具大量第三方套件使用，文件無統一
Native Modules，用JavaScript編寫
性能較差

## 二、Flutter相關應用資料

### Stackoverflow

Stackoverflow上的Frameworks and Libraries數目也多於React Native

![](https://hackmd.io/_uploads/Hy4wsh8qn.png)

[Stack overflow: most-popular-technologies-other-frameworks-and-libraries](https://survey.stackoverflow.co/2023/#section-most-popular-technologies-other-frameworks-and-libraries)

### Wordwide cross-platform mobile frameworks used

由本圖我們也可以看到2019-2022，開發者們選擇Flutter的比率逐年增高，並且在2021年後超越了ReactNative，並且是跨平台開發者的首選語言

![](https://hackmd.io/_uploads/rkN7ST893.png)

[Cross-platform mobile frameworks used by software developers worldwide from 2019 to 2022](https://www.statista.com/statistics/869224/worldwide-software-developer-working-hours/)

### Github Ranking

並且在GitHub上也累積了15萬顆Stars的點閱率

![](https://hackmd.io/_uploads/r1_9Ya893.png)

[Gitstar-ranking: Flutter](https://gitstar-ranking.com/flutter/flutter)

### Show Case, Companies who using Flutter

而在官網的Show Case中我們也可以看到許多使用Flutter進行主要開發工具的廠商，像是BMW, Google Pay, Nubank(巴西的銀行，為拉丁美洲最大的金融科技銀行), Kijiji等。

[flutter.dev/showcase](https://flutter.dev/showcase)
