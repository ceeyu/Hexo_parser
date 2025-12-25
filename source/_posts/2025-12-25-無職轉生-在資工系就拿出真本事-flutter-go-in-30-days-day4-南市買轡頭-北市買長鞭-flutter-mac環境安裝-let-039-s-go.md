---
title: 無職轉生～在資工系就拿出真本事٩(๑•̀ω•́๑)۶【Flutter Go in 30 Days】：Day4 南市買轡頭，北市買長鞭--Flutter Mac環境安裝 Let&#039;s Go!
date: 2023-09-12 04:00:00
tags: [flutter, mac環境安裝]

source: https://ithelp.ithome.com.tw/articles/10314952
series: Flutter 30天
categories:
  - Flutter 30天
---

# 壹、M1 Mac設定

參考官方文件: [Get Started: macOS install](https://docs.flutter.dev/get-started/install/macos)，並於以補充

## 一、設備最低要求

在Mac上運行Flutter的最低需求如下:

1. $1

2. $1

其他工具: Xcode與Git兩者均為點選安裝連結並接續按下同意、下一步至安裝結束

[Xcode安裝](https://developer.apple.com/xcode/)

[Git安裝](https://git-scm.com/download/mac)

- 而Xcode有時也會可能因為目前使用的macOS過舊而產生不相容的問題，這點我們將在第肆大點進行補充!

## 二、晶片/MacOS版本差異

由於目前Apple設備會有Intel晶片(x86架構)與M1以後的Silicon晶片(ARM架構)，在一些設定上會有不同的處理方式需要注意。

開啟左上"蘋果" -> "關於這台Mac"，可以查看硬體資訊，包含晶片版與macOS版本。像範例設備的資訊為

晶片: Apple M2

macOS: Ventura 13.2.1

![https://ithelp.ithome.com.tw/upload/images/20240429/20151593rLWuKCNFRy.png](https://ithelp.ithome.com.tw/upload/images/20240429/20151593rLWuKCNFRy.png)

## 三、Rosetta環境

基於我們的設備是M1，因此需要多加一個設定Rosetta環境的程序，我們開啟終端機並輸入指令sudo softwareupdate --install-rosetta --agree-to-license，出現成功畫面

![](https://hackmd.io/_uploads/rJW0fBbs3.png)

# 貳、Flutter SDK

## 一、Flutter SDK下載

針對目前的設備進行對應的sdk下載(注意不要載錯!)，並且官網上放的是最新的穩定版本，若要查詢或下載其他版本請參見[Flutter SDK archive](https://docs.flutter.dev/release/archive?tab=windows)

[Intel晶片: Flutter SDK 3.10.6 Download](https://storage.googleapis.com/flutter_infra_release/releases/stable/macos/flutter_macos_3.10.6-stable.zip)

[Silicon晶片: Flutter SDK 3.10.6 Download](https://storage.googleapis.com/flutter_infra_release/releases/stable/macos/flutter_macos_arm64_3.10.6-stable.zip)

我們選取sdk 3.7.7(apple silicon)版本進行下載，在下載完後將路徑移至欲放置位置，以桌面為例

![](https://hackmd.io/_uploads/rkY87BZo3.png)

### 而在我們繼續Fluttwe SDK的設定前，我們會先與各位介紹基本的終端機與Vim編輯器指令，方便後續操作的理解

## 二、基礎Linux指令介紹

在終端機是以Linux語法進行，而我們有幾個常用的指令

cd 資料夾名稱: 移動至目前路徑的對應資料夾

cd ..: 回到上一層資料夾

pwd: 印出目前所在的當前位置

ls: 印出目前所在路徑下的所有檔案

延伸參考: [[ Linux 指令 ] cd 指令-切換目錄操作教學](https://www.tokfun.net/os/linux/linux-cd-command/)
延伸參考: [Day26-終端機操作](https://ithelp.ithome.com.tw/articles/10209142)

## 三、Vim語法介紹

由於稍後的設定會需要更改Mac的設定檔，進入設定檔後會是"Vim編輯器"的方式開啟，操作會與終端機有所不同，沒有滑鼠，只能以方向鍵與鍵盤輸入達成操作。以下介紹幾個常用的功能，首先在"終端機"裡，我們可以透過下列指令進入vim編輯器

vim 檔案名稱: 用vim編輯器開啟對應檔案

進入vim編輯器後初始是普通模式，可用上下鍵移動游標，而在我們輸入

i: 進入Insert模式，可新增與修改字詞

在插入模式中，當我們修改完欲增加的內容後，可以按下

esc鍵: 退出插入模式回到普通模式

當我們需要關閉/保存或離開Vim編輯器時，可以輸入冒號

:: 開啟命令列模式

在命令列模式中，輸入

w: 代表存檔(Write)

q: 代表離開(quit)

wq: 代表存檔並離開

接著便會回到終端機中

延伸參考: [鳥哥私房菜:第九章、vim 程式編輯器](https://linux.vbird.org/linux_basic/centos7/0310vi.php)
延伸參考: [【Vim 編輯器 入門指南 (上)】用思維的速度寫程式](https://ithelp.ithome.com.tw/articles/10255325?sc=pt)

## 四、Flutter SDK環境路徑設定

由於在官網的敘述裡，若僅只有在終端機輸入指令會只對「當前」的視窗進行作業(如紅線處所示)，因此我們用以下步驟對Mac的設定檔作永久的環境變數設定

![](https://hackmd.io/_uploads/SkYGN8Zs3.png)

一開始，我們在終端機輸入以下指令，取得目前的Flutter SDK放置路徑

cd ~/Desktop: 移動至桌面路徑

cd flutter: 移動至flutter資料夾

cd bin:  移動至bin資料夾

pwd: 印出目前路徑並複製，而此路徑就是我們flutter SDK的放置路徑

![](https://hackmd.io/_uploads/BJhR4rWi3.png)

輸入指令vim ~/.bash_profile開啟設定檔，輸入i進入插入模式，並輸入指令export PATH="$PATH:剛剛查到的Flutter Bin的路徑

舉例而言，我們輸入export PATH="$PATH:Users/widelab/Desktop/flutter/bin"

並按下esc鍵，輸入:wq，保存並離開vim編輯器，回到終端機中

![](https://hackmd.io/_uploads/rySAJIWjn.png)

輸入指令source ~/.bash_profile，確保讓我們剛剛對bash_profile的修改可以產生作用

![](https://hackmd.io/_uploads/SkdSb8-i3.png)

## 五、Flutter doctor檢查

輸入flutter doctor -v檢查，我們可以發現在Xcode的部分還有"CocoaPods"以及Chrome尚未安裝的問題

- 在Mac設備上，我們會針對Xcode與Apple產品的虛擬機進行設定，Android的相關設定可以參考昨天的文章!

- Chrome的問題在[Chrome官網](https://www.google.com/chrome/)下載PKG檔案後便可後解決

![](https://hackmd.io/_uploads/H1dJMLZs2.png)

# 參、CocoaPods

## 一、安裝CocoaPods

參考資料:  [CocoaPods官網: Getting Started
](https://guides.cocoapods.org/using/getting-started.html#installation)

首先輸入指令sudo gem install cocoapods，發現安裝到一半出現錯誤訊息

![](https://hackmd.io/_uploads/rJJRUI-s3.png)

跟著訊息的指示輸入sudo gem install activesupport -v 6.1.7.3

- 前面加sudo，Superuser do，代表讓本命令具有系統管理員權限執行

- 每個人的錯誤訊息會有所不同，需依據自身情況而改變安裝的版本!

![](https://hackmd.io/_uploads/ByOkdUbjh.png)

再輸入一次sudo gem install cocoapods指令，成功安裝完CocoaPods，並且沒有跳任何錯誤訊息

![](https://hackmd.io/_uploads/Hkjr_IWjh.png)

## 二、Flutter doctor檢查

輸入flutter doctor -v檢查，可以發現Xcode部分由黃色驚嘆號轉為綠色勾號

![](https://hackmd.io/_uploads/SJNhdUbj2.png)

# 參、VS Code設定與虛擬機

## 一、VS Code與延伸套件安裝

到[官網Download VS Code](https://code.visualstudio.com/download)安裝

![](https://hackmd.io/_uploads/BJf6FUbi3.png)

開啟VS Code，在Extensions(延伸套件)安裝"Dart"與"Flutter"

![](https://hackmd.io/_uploads/SkQx9U-o3.png)

開啟下方terminal處，按照前幾天所教導的，輸入flutter create 專案名稱創建專案，cd 專案名稱，並輸入flutter run執行，並輸入1選擇以macOS設備開啟(中間的紅字可以忽略)

![](https://hackmd.io/_uploads/Bk9xi8-jh.png)

成功執行畫面

![](https://hackmd.io/_uploads/r1gDEoIbj3.png)

## 二、虛擬機設定

我們對主畫面的Simulator->右鍵->Device->IPad Air(5th gerneration)，可以開啟對應型號的虛擬機

![](https://hackmd.io/_uploads/B1F3hIbsh.png)

當虛擬機開機完畢後，便可以在終端機輸入flutter devices來檢查，並且重新執行一次flutter run後便會出現在設備的選擇清單中，或是直接以Simulator開啟

![](https://hackmd.io/_uploads/rJXIaIWs2.png)

Demo Code在Simulator上的顯示

![](https://hackmd.io/_uploads/ByCD68bs2.png)

# 肆、補充: 舊版本MacOS下載Xcode相關設定

因為在App Store上只會有最新版本的Xcode釋放，因此當我們的目前的MacOS與當前版本不支援時，就需要按照以下方法安裝硬體對應版本，例如，到Apple開發者網站，Xcode最低要求與對應支援SDK的表格，尋找自己的設備與對應Xcode版本

![](https://hackmd.io/_uploads/rJzCC8Woh.png)

參考資料: [Apple Developer: Minimum requirements and supported SDKs](https://developer.apple.com/support/xcode/)

並登入[Apple Developer More Downloads](https://idmsa.apple.com/IDMSWebAuth/signin.html?path=%2Fdownload%2Fall%2F%3Fq%3Dxcode&appIdKey=891bd3417a7776362562d2197f89480a8547b108fd934911bcbea0110d07f757&rv=0)，到裡面尋找剛剛確認的對應Xcode版本號

![](https://hackmd.io/_uploads/HJmXewbo3.png)

舉例，我們可以點選Xcode 14.3並進行下載

![](https://hackmd.io/_uploads/B1uIxPWi2.png)
