---
title: "無職轉生～在資工系就拿出真本事٩(๑•̀ω•́๑)۶【Flutter Go in 30 Days】：Day14 一窺Flutter，Basic Widgets 與他的產地(上)"
date: 2025-12-25
tags: [flutter, basic widgets]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10315057
---

# 壹、Flutter指令

我們可以在terminal輸入flutter -h來查看可使用的指令，當有需要其他特殊的指令再查詢即可!

## 一、Command commands: 常用指令

![](https://hackmd.io/_uploads/SkyaCpgR3.png)

**flutter create <app_name>**：創建一個新的Flutter應用程序項目。在命令中，<app_name>是您希望為您的應用程序指定的名稱。

![](https://hackmd.io/_uploads/rJ1cLAeCh.png)

flutter create test，範例

**flutter run**：運行您的Flutter應用程序。這將在連接的設備或模擬器上啟動您的應用程序。

![](https://hackmd.io/_uploads/By5h80lCh.png)

flutter run，範例

## 二、Global options: 全局選項

此類項目通常會加在命令後贅，代表不同功能

**-h** , **--help**：顯示命令的使用信息和可用選項。當您不確定如何使用特定命令時，可以運行 flutter <command> -h 來獲得幫助信息。

![](https://hackmd.io/_uploads/rkk4HRe0h.png)

flutter create -h，範例

**-v**, **--verbose**：啟用冗長日誌輸出，包括執行的所有命令。當您想查看詳細的操作日誌時，可以使用此選項。如果與 --help 一起使用，則會顯示隱藏的選項。如果與 flutter doctor 一起使用，則會顯示額外的診斷信息(例，**flutter doctor -v**)。要更多的冗長日誌，可以使用 -vv 選項。

![](https://hackmd.io/_uploads/S1bLSRlCh.png)

flutter doctor -v，範例

**-d**, **--device-id**：指定目標設備的ID或名稱。當您有多個設備可用時，可以使用此選項來選擇特定的目標設備。例如，您可以使用 -d emulator-1234 來選擇一個名為"emulator-1234"的模擬器作為目標(例，**flutter run -d emulator-1234 lib/main.dart**)

**--version**：顯示Flutter命令行工具的版本號。這是用於檢查您的Flutter工具是否是最新版本的快速方式(例，**flutter --version**)

![](https://hackmd.io/_uploads/S1mpBAeA3.png)

flutter --version，範例

**--suppress-analytics**：運行命令時，「不發送」數據分析報告。Flutter命令行工具通常會收集匿名使用數據以改進工具的性能和品質。如果您不想參與這個數據收集，可以使用此選項。

![](https://hackmd.io/_uploads/HJEU80xAn.png)

flutter --suppress-analytics run，範例

## 三、Flutter SDK命令：

![](https://hackmd.io/_uploads/S1ZslAxA2.png)

**flutter bash-completion**：生成用於設置命令行自動完成的腳本。這可用於改進命令行工具的使用體驗。

![](https://hackmd.io/_uploads/B1FlwCgC2.png)

flutter bash-completion，範例

**flutter channel**：列出或切換Flutter的發行通道。您可以使用不同的通道來獲取不同版本的Flutter SDK。

![](https://hackmd.io/_uploads/rJ4zPRgA2.png)

flutter channel，範例

**flutter config**：配置Flutter的各種設置選項，例如設置代理、設置SDK路徑等。

![](https://hackmd.io/_uploads/rkDVPAxR2.png)

flutter config，範例

**flutter doctor**：顯示有關安裝的工具和設置的詳細信息。通常用於檢查開發環境的健康狀態。

![](https://hackmd.io/_uploads/SkJwvCx02.png)

flutter doctor，範例

**flutter downgrade**：將Flutter降級到當前通道的上一個活動版本。可以用於回滾到較舊的Flutter版本。

![](https://hackmd.io/_uploads/BJt9PClR2.png)

flutter downgrade，範例

**flutter precache**：填充Flutter工具的二進制資源緩存，以加速後續操作。

![](https://hackmd.io/_uploads/BJCJuClAn.png)

flutter precache，範例

**flutter upgrade**：升級您的Flutter工具，以獲取最新版本。通常用於保持Flutter工具最新。

![](https://hackmd.io/_uploads/rJG0v0eRn.png)

flutter upgrade，範例

## 四、套件、IOS/Android建構、緩存相關

**flutter packages get** , **flutter pub get**：用於獲取和安裝應用程序依賴套件的命令。它會從pubspec.yaml文件中讀取依賴並下載相應的套件。

![](https://hackmd.io/_uploads/S1rGOReAn.png)

flutter pub get，範例

**flutter pub upgrade**：升級您的應用程序的依賴套件到最新版本。

![](https://hackmd.io/_uploads/HJjVORgAn.png)

flutter pub upgrade，範例

**flutter build apk**：構建Android APK包。

![](https://hackmd.io/_uploads/r1ns_Rg0n.png)

flutter build apk，範例

**flutter build ios**：構建iOS應用程序，需要有Xcode環境才可執行!

**flutter test**：運行測試套件來測試您的應用程序。

![](https://hackmd.io/_uploads/rkrQ9ReR3.png)

flutter test，範例

**flutter clean**：清理應用程序的緩存和生成文件，有助於解決一些編譯問題。

![](https://hackmd.io/_uploads/Hk3V5RxR3.png)

flutter clean，範例

# 貳、Flutter基本架構

在進入Flutter元件前，先簡單介紹一下Flutter最基本的架構。與前幾日介紹的Dart不同，Flutter 應用程式的架構是基於元件樹(Widget Tree)，其中包含各種用於定義應用程式的外觀和行為的元件。他們可以嵌套在一起，形成層次結構，以構建複雜的用戶介面。並由main 函數啟動應用程式，並運行整個元件樹以顯示應用程式的界面。

後續的Basic Widgets範例中，我們也將直接套用這些架構作為說明。

總體而言，

## 一、入口函數，main()函數

Flutter 應用程式的入口是 main 函數，它是 Dart 程式的起點。在 main 函數中，通常會使用 runApp 函數來運行您的 Flutter 應用程式。而在main函數前，我們也會將需要的套件進行引入，方便使用

```
import 'package:flutter/material.dart';//引入material套件

void main() {
  runApp(MyApp());
}
```

flutter main()函數

## 二、MyApp 類別

通常，我們會創建一個自訂的 MyApp 類別，該類繼承自 StatelessWidget 或 StatefulWidget(取決是否有無狀態)，並在其中定義應用程式的整體外觀和結構。build 方法通常用於構建應用程式的主要用戶介面

```
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      // 配置應用程式的主題、頁面等
      home: MyHomePage(),
    );
  }
}
```

MyApp 類別

## 三、用戶介面元件

Flutter 的應用程式由許多小部件元件組成，這些小部件用於構建用戶介面。可以使用 Scaffold、AppBar、Text、Image 等小部件來創建界面元素。在 build 方法中，我們會定義這些小部件的配置、排列和外觀。而我們之後介紹的基礎元件在使用上也會放在這裡。

```
class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('My Flutter App'),
      ),
      body: Center(
        child: Text('Hello, Flutter!'),
      ),
    );
  }
}
```

用戶介面元件

## 四、其他項目

外觀設置：您可以使用 MaterialApp 或其他相關元件來設置應用程式的主題、字體、顏色和頁面等外觀和行為選項。

頁面管理：如果您的應用程式包含多個畫面，則需要進行頁面管理。Flutter 提供了 Navigator 和 MaterialPageRoute 等工具來處理頁面導航。

狀態管理（可選）：對於需要管理狀態的應用程式，您可以使用 StatefulWidget 並在其 State 對象中維護應用程式的狀態。

資源管理：圖片、字型、本地化字符串等資源的管理也是應用程式的一部分，您可以將這些資源存放在 assets 文件夾中，然後使用相應的元件來訪問它們。
