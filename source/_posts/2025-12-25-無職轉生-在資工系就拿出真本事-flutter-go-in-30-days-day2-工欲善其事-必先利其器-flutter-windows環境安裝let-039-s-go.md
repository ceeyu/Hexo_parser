---
title: 無職轉生～在資工系就拿出真本事٩(๑•̀ω•́๑)۶【Flutter Go in 30 Days】：Day2 工欲善其事，必先利其器--Flutter Windows環境安裝Let&#039;s Go!
date: 2025-12-25
tags: [flutter, 環境安裝]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10314949
---

### 由於Flutter最為人稱道的便是完善的官方文件，因此我們也試著遵循著堪稱教科書的文件開始吧!

# 零、Get Started and Install

在我們開始前，勢必得有環境與框架才能著手開發與認識的道路，我們參見官網的

- 本章章程縮圖:

![](https://hackmd.io/_uploads/HJORQ69c3.png)

從文件的前端可以看到可以在四種系統上安裝Flutter: Windows, MacOS, Linux, ChromeOS。而我們將以其中的Windows與MacOS作為釋例!

![](https://hackmd.io/_uploads/ryY7ZPw5h.png)

[Flutter Get started: install](https://docs.flutter.dev/get-started/install)

# 壹、Windows設定

## 一、設備最低要求

在Windows上運行Flutter的最低需求如下:

1. $1

2. $1

其他工具:

[Windows PowerShell 5.0](https://learn.microsoft.com/en-us/powershell/scripting/windows-powershell/install/installing-windows-powershell?view=powershell-7.3)或更新的版本 (在Windows10為內建選項)

[Git for Windows](https://git-scm.com/download/win)2.x版本或以上，並且需有「從 Windows 命令提示符使用 Git」的選項

## 二、安裝Flutter SDK

Flutter SDK中包含了以下項目:

參見: [官網Flutter FAQ](https://docs.flutter.dev/resources/faq#should-i-build-my-next-production-app-with-flutter)

- 深度優化的Mobile-First 2D渲染引擎

- 現代React-style 框架

- Material Design(Android Style), IOS-style部件

- 提供給單元&集成測試(Unit and integration testa)API

- 提供連接第三方SDK與系統相互操作(Interop)與插件(Plugin)的API

- 提供在Windows, Mac, Linux上的無介面化測試(Headless test)

- Flutter Dev Tools(或稱Dart DevTools)，用於測試與除錯

- 命令列工具(command-line tools)，用於測試、建造與編譯程式

因此不論在哪一平台上，我們都需要先取得Flutter SDK才得以繼續行動!下載後解壓縮，將此含有FLutter的資料夾放到欲安裝的路徑，並且要注意以下兩點:

Flutter SDK 解壓所檔: [flutter_windows_3.10.6-stable.zip](https://storage.googleapis.com/flutter_infra_release/releases/stable/windows/flutter_windows_3.10.6-stable.zip)

路徑名稱不能包含空格或特殊字元

1. $1

## 三、設定環境變數

在Windows搜尋欄中尋找"環境"，並開啟"編輯系統環境變數"

![](https://hackmd.io/_uploads/ryVjDa552.png)

在"進階"-> 選取"環境變數"

![](https://hackmd.io/_uploads/Hkkkdpc5h.png)

找到使用者變數中的"Path"，並按下編輯

![](https://hackmd.io/_uploads/SkjWdT9cn.png)

按下"新增"，並且寫入剛才放置flutter中bin資料夾的完整路徑，並按下"確定"

- 如圖所示，我的路徑為"C:\flutter\bin"

![](https://hackmd.io/_uploads/Bk0Ld6q92.png)

## 四、安裝Visual Studio

到[VS官網](https://visualstudio.microsoft.com/zh-hant/downloads/)選取"Community"->免費下載

![](https://hackmd.io/_uploads/r1EQpAyj3.png)

並且在下載後，在檔案介面右鍵點擊.exe檔，選取"以管理者身分執行"

![](https://hackmd.io/_uploads/S1a7A0ki2.png)

在VS開啟頁面內勾選"使用C++進行桌面開發"進行下載，便完成了VS的設置

![](https://hackmd.io/_uploads/rkBu1yxs2.png)

## 五、安裝VS Code

到[VS Code官網](https://code.visualstudio.com/download)，點選"Windows"進行下載，並持續點選下一步直到安裝完成

![](https://hackmd.io/_uploads/HkUmeJxj2.png)

完成後開啟VS Code頁面，在左側點選"延伸模組"，並用搜尋方式下載"Dart"與"Flutter"工具，便完成了VS Code的設定

![](https://hackmd.io/_uploads/HkmxWyej3.png)

## 六、執行Flutter doctor

在Windows搜尋欄尋找"cmd"，開啟命令提示字元，並用cd flutter放置路徑

例如，我的指令便會是cd c:\flutter

![](https://hackmd.io/_uploads/Skh75pc9h.png)

在本路徑下執行指令flutter doctor

- 本指令換檢查目前電腦的環境與目前Flutter的安裝狀態報告，以綠色的勾勾與紅色的叉號顯示已完成與尚未完成的項目(未完成的項目會顯示為粗體)。

![](https://hackmd.io/_uploads/SJ79Facc3.png)

而我們也可以用指令flutter doctor -v來印出更詳細的內容，如下圖，我們可以看到更細節如下顯示。若是我們在安裝時有資料錯誤或是其餘須查證的細節資訊都可以在這裡找到!並跟著錯誤訊息的描述一一處理。

![](https://hackmd.io/_uploads/BJU7spcc3.png)

Flutter相關

- Flutter 框架版本, Channel與Flutter所在路徑

- 官方Github Repo

- 官方近期框架修訂日期

- Engine Version

- Dart語言版本

- DevTools版本

Chrome的web開發執行網頁路徑

Visual Studio的路徑、社群版本、Windows SDK版本

VS Code路徑與Flutter延伸套件版本

連接設備細節清單

HTTP Host可用性

# 貳、首次Flutter run

Windows在還沒有安裝Android Studio時就可以由Windows或網頁視窗執行專案。我們開啟Flutter，點選"檢視"->"終端"，開啟下方terminal區塊

![](https://hackmd.io/_uploads/Hk6Pfygj3.png)

或由右上角的切換版面處開啟

![](https://hackmd.io/_uploads/H1GsGyej3.png)

我們在terminal中輸入欲放置Flutter專案的位置(舉例，我輸入cd ~/Desktop，代表我想放在桌面)，並接續輸入指令flutter create 專案名稱(舉例，我的專案名稱叫做hello，因此指令為flutter create hello)

![](https://hackmd.io/_uploads/SkkxXJlih.png)

接著，依序輸入指令

cd hello :移至剛剛創立的專案路徑

flutter run :執行專案
輸入想要執行的設備端點的代表數字:舉例我選擇用Windows執行，因此輸入1

![](https://hackmd.io/_uploads/HJ1PXkgs3.png)

再輸入完後，就會開啟Flutter的範例Demo，計數器

![](https://hackmd.io/_uploads/Hk7mNkgjh.png)

而VS Code終端的部分也會顯示常用於執行時中Flutter專案的指令快捷鍵，第一個字代表輸入的鍵盤字母(有分大小寫)，後續的句子為代表含意，比較常用的是下列三個功能

- r: 代表Hot Reload，能在不重啟flutter run時及時展示修改後的程式碼

- R: 代表可以重新執行專案

- q: 結束本次的執行專案

![](https://hackmd.io/_uploads/B1lL41gs2.png)
