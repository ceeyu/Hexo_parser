---
title: 無職轉生～在資工系就拿出真本事٩(๑•̀ω•́๑)۶【Flutter Go in 30 Days】：Day3 東市買駿馬，西市買鞍韉--Flutter Android Studio Let&#039;s Go!
date: 2023-09-11 03:00:00
tags: [flutter, 環境安裝]

source: https://ithelp.ithome.com.tw/articles/10314951
series: Flutter 30天
categories:
  - Flutter 30天
---

# 壹、Android Studio

## 一、安裝Android Studio

到[Android Studio官網](https://developer.android.com/studio)下載安裝檔

![](https://hackmd.io/_uploads/BJkSeelj2.png)

同樣點選右鍵->"以系統管理員身分執行"，並不斷點選下一步直到安裝完成，點選"Finish"

![](https://hackmd.io/_uploads/rJvRlxgoh.png)

進入第一次的設定畫面，一路點選"Next"

![](https://hackmd.io/_uploads/SJJoZlgih.png)

在License Agreement頁面，將左方紅色星號的選項逐一點選Accept，並按下"Finish"等待安裝執行

![](https://hackmd.io/_uploads/HJ9Omegsn.png)

## 二、更新環境路徑

點選"More Action" -> "SDK Management"

![](https://hackmd.io/_uploads/ryZRIexin.png)

複製目前的sdk路徑

![](https://hackmd.io/_uploads/SJe7Pglo3.png)

在環境變數區新增變數ANDROID_HOME，並且設定為剛剛複製的sdk路徑，點選"確定"

![](https://hackmd.io/_uploads/B12yugxj3.png)

## 三、執行flutter doctor

由執行flutter doctor後我們可以看到原先Android Studio的部分已由黃色驚嘆號的"Not Install"轉為綠色

![](https://hackmd.io/_uploads/HJZttxxjn.png)

## 四、Plugins與SDK Tools下載

按下Project按鈕，開啟隨意專案(Ex.我們昨天創建的Flutter Demo測試檔)，點選左上方"檔案"->"設定"

![](https://hackmd.io/_uploads/rk429leon.png)

點選"Plugins"，並透過搜尋欄下載Flutter與Dart

![](https://hackmd.io/_uploads/SkrFoxxoh.png)

![](https://hackmd.io/_uploads/rkL2segih.png)

再度開啟SDK Management，在"Android SDK"->"SDK Tools"下載"Android SDK Command-line Tools(latest)"

Stack Overflow 參考資料: [I am getting error "cmdline-tools component is missing" after installing Flutter and Android Studio... I added the Android SDK. How can I solve them?](https://stackoverflow.com/questions/68236007/i-am-getting-error-cmdline-tools-component-is-missing-after-installing-flutter)

![](https://hackmd.io/_uploads/rJEa2gei3.png)

設定完後再執行一次flutter doctor，便可以看到剛剛紅色的錯誤資訊解除，只剩下licenses的問題

- 小撇步: 當安裝時flutter doctor出現任何錯誤問題，都可以複製訊息在網路上搜尋解答，常見的網站像是StackOverflow等

![](https://hackmd.io/_uploads/SyD10lgj2.png)

## 五、android-licenses設定

按照錯誤訊息提示，輸入指令flutter doctor --android-licenses，並一路按'y'代表同意

![](https://hackmd.io/_uploads/rJCNCgxs3.png)

可以看到所有的安裝問題皆順利解除!

![](https://hackmd.io/_uploads/S1j2Rego2.png)

# 貳、Android 虛擬機

## 一、創建新的虛擬機

在上方"Tools"->"Device Management"

![](https://hackmd.io/_uploads/r1RFzWloh.png)

點選"Create Device"

![](https://hackmd.io/_uploads/BJEkZWxjn.png)

點選欲開啟的虛擬機型號

![](https://hackmd.io/_uploads/rkzMb-xo3.png)

若還沒下載對應的SDK Installer要先下載完成才能開啟，點選配對的系統並按下下載圖是圖示

![](https://hackmd.io/_uploads/HkQ9-bei3.png)

等待下載過程結束

![](https://hackmd.io/_uploads/H1KHbZlo2.png)

命名與設定，若有需要修改的部分可以按下"Show Advanced Settings"進行更正，若確認無誤後按下右下方"Finish"

![](https://hackmd.io/_uploads/rkfEzWgsh.png)

## 二、透過Android Studio在虛擬機執行程式

結束後會顯示剛剛新增的虛擬機，在Action處按下"撥放"號誌，啟動虛擬機

![](https://hackmd.io/_uploads/Byld7Wxsn.png)

接著我們開啟我們昨天建立的hello檔(flutter create創建的檔案)，選取"main.dart"檔案，點選右上方的"執行"後，就可以看到計數器的demo畫面在我們的虛擬機上運行囉!

- 按下右邊的紅色方框便可以停止運行

![](https://hackmd.io/_uploads/Sy2x4Zxin.png)

## 透過VS Code在虛擬機執行程式

我們也可以由昨天介紹的方式，在VS Code的terminal執行flutter run來運行

![](https://hackmd.io/_uploads/Sy2x4Zxin.png)

而我們也可以在Terminal輸入flutter devices來檢視所有目前可用的設備

![](https://hackmd.io/_uploads/S1fHPWls3.png)
