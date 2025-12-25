---
title: "無職轉生～在資工系就拿出真本事٩(๑•̀ω•́๑)۶【Flutter Go in 30 Days】：Day5 揭開Dart的朦朧面紗"
date: 2025-12-25
tags: [flutter, dart]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10314954
---

# 壹、為什麼Flutter要使用Dart?

我們依據官網的FAQ(常見問題)，關於"Why did Flutter choose to use Dart?"的問題回復中可以得知，Dart語言在以下幾個特點有出色的表現，因此在當初Google的眾多選擇中脫穎而出

即時編譯(Just-In-Time, JIT)和提前編譯(Ahead-of-Time, AOT):使得 Flutter 可以在開發和生產環境中達到高效的性能。

可預測、高性能(Predictable, high performance): 用於創建快速、流暢的用戶體驗，大幅降低動畫掉幀(Dropped frames)行為

社群和工具支援(Community and Tool Support)：Dart 擁有活躍的開發社群，提供了許多有用的工具和套件，幫助開發人員更容易地使用 Dart 來創建各種類型的應用程式。

開發人員生產力(Developer productivity): 可以使用相同的 Dart 語言為 iOS 和 Android 創建應用程序，節省工程資源

快速分配(Fast allocation)：使用函數式流程(functional-style flow)，使得能夠有效地處理小型、短期的分配。

支援非同步編程(Asynchronous Programming)：Dart 內建了非同步程式設計的支援，使得處理I/O操作、網路請求等異部任務變得更加容易和高效。

參見: [Flutter官網 FAQ](https://docs.flutter.dev/resources/faq#why-did-flutter-choose-to-use-dart)

# 貳、DartPad初體驗

為了在進入Flutter實戰時更為順暢，我們會先對Dart語言進行介紹，並且使用線上編輯器---[DartPad](https://dartpad.dev/?)方便語言的練習。DartPad可以在任何瀏覽器中打開，也可以由其他網頁(如Codelab)進入，除了Dart語言，同時支援Flutter的運行!

之後的天數裡，在介紹Dart與Flutter的程式使用上我們都會使用本平台作為Demo，只要是後續有提供輸出結果的部分，可以把文章中提供的程式碼複製並貼上到DartPad後便可執行!再從程式所需的部分做需要的修改~自己覺得許多程式、元件的運用，都需要有執行後的視覺化輔助才能方便大家的學習(❁´◡`❁)

參見: [官網DartPad介紹](https://dart.dev/tools/dartpad)

初始進入頁面

![](https://hackmd.io/_uploads/Sk723e4on.png)

新增一個Pad，我們可以透過New Pad按鈕來創造新的頁面，並且可以選擇"Dart"或是"Flutter"

- 注意: 一定要將HTML的滑桿設為"禁用"

![](https://hackmd.io/_uploads/ryrmTxEs2.png)

在初始的Demo中按下Run，在下述區塊會出現相對反應；而按下Reset時則會重製執行

- "Console"處: 顯示程式執行結果

- "Documents"處: 顯示游標指向的"函數"或"變數"的相關說明，以及提供library docs連結

![](https://hackmd.io/_uploads/rkZlRx4sn.png)

而當程式出線錯誤時，舉例而言我把第二行原本"i++"的一個加號刪除，那便會在錯誤處出現紅色引號，並在右下角出現error警示提供詳細錯誤訊息，我們就可以依據其敘述來偵錯。

![](https://hackmd.io/_uploads/SyNfybVjn.png)

也可以透過右上角的Samples快速開啟Dart或Flutter範例，舉例自己開啟了一個"Fibonacci"的示例並執行

![](https://hackmd.io/_uploads/rkJLxZEj3.png)

# 參、Dart官網資源與地圖嚮導

我們從Flutter官網 -> Resources -> Learninig -> Learn Dart頁面，進入Dart語言的相關資料連結

![](https://hackmd.io/_uploads/ryADQbNih.png)

參見: [Bootstrap into Dart](https://docs.flutter.dev/resources/bootstrap-into-dart)

我們在Dart官網中可以看到主要分為下列以下五個項目

- Language Tour: 作為基本的語言示例指引

- Effective Dart: 對於具有一致、可維護、與高效能性質的建構範例

- Library Tour: 提供基本的Dart SDK所連結的Libraries與主要特色

- Dart SDK: 介紹SDK與安裝方式

- Future, async, await: 介紹Dart的非同步語法，以及Future, async, await的對應用法

![](https://hackmd.io/_uploads/Hy_GQbNoh.png)

參見: [Dart Guide](https://dart.dev/guides)

### 而Dart的介紹主要會針對Language Tour與Future, async, await章節稍作詳細解說!因為在Flutter的世界裡，我們時常會需要扎實的Dart語法基本功與程式流程認知，才能在專案設計裡如虎添翼!而我們今天會大致介紹兩者的章程，並在接下來的天數一一提及

# 肆、Language Tour章程概述

在Language Tour主要包含以下幾點項目:

參見官方文檔: [Dart Language](https://dart.dev/language)

**Introduction**：Dart程式中的各式樣貌、特點與重要概念簡介

**Symtax basics**：包含變數、運算元、註解、Library import與Keywords

**Types**：包含各式型別、Records的表示、範圍與相關回傳、Collections的使用

**Patterns**：各種類型Pattern介紹與使用

**Functions**：參數、各類函數的介紹與使用，包含命名函數、可選位置函數、main函數

**Control flow**：包含Loop與Branch

**Error handling**：包含錯誤處理中的Throw, try, catch, finally, assert等應用

**Classes & objects**：包含Class, Constructor, Extend, Maxins, Enums等應用

**Class modifiers**：包含modifiers的介紹與使用方式

**Concurrency**：包含Asynchronous與isolate的介紹

**Null Safety**：null-safety原則、遷移方式與原理

# 伍、Future, async, await章程概述

在Future, async, await主要包含以下幾點項目:

參見官方文檔: [Asynchronous programming: futures, async, await](https://dart.dev/codelabs/async-await)

**為何**需要Asynchronous code?

**Future**是什麼?

**async 與await**在Future中的應用
1. 將**try-catch**應用於錯誤處理

**綜合**統整與實作
