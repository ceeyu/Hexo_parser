---
title: 無職轉生～在資工系就拿出真本事٩(๑•̀ω•́๑)۶【Flutter Go in 30 Days】：Day6 Hiii，Dart，初次見面你好嗎，Introdoction(上)
date: 2025-12-25
tags: [flutter, dart]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10314955
---

# 壹、Introduction---Variables、Control flow

參見: [Introduction to dart](https://dart.dev/language#hello-world)

接下來的介紹都會以"程式碼"輔佐文字與註解部分的解釋與說明的方式進行，我們可以具有結果的將程式碼貼到 DartPad中運作，或微作修正來檢視自己是否理解對應的概念!

參見: 線上編輯器[DartPad](https://dartpad.dev/?)

## 一、Hello World

在我們學習每種程式前必備的一定少不了"Hello World"的字串練習，用print函數可以進行字串輸出

```
void main() {
  print('Hello, World!');
}
```

Hello World程式碼

- 輸出結果:

![](https://hackmd.io/_uploads/rydPcUro2.png)

## 二、變數(Variables)

在變數方面，我們可以用var宣告變數，並且由該變數的"初值"決定其型別。例如下方可以看到

```
void main() {

//-------宣告變數並給予初值---------

  var name = 'Voyager I';
  var year = 1977;
  var antennaDiameter = 3.7;
  var flybyObjects = ['Jupiter', 'Saturn', 'Uranus', 'Neptune'];
  var image = {
    'tags': ['saturn'],
    'url': '//path/to/saturn.jpg'
  };

//-------印出每個變數的型別---------

  print('name 型別為: ${name.runtimeType}');
  print('year 型別為: ${year.runtimeType}');
  print('antennaDiameter 型別為: ${antennaDiameter.runtimeType}');
  print('flybyObjects 型別為: ${flybyObjects.runtimeType}');
  print('image 型別為: ${image.runtimeType}');
}
```

變數介紹程式碼

- 輸出結果:

![](https://hackmd.io/_uploads/SJeznLHi3.png)

## 三、控制流程語句(Control flow statements)

控制流程語句，包含if-else迴圈, for 迴圈, while迴圈等範例如下

```
//-------if迴圈範例---------
if (year >= 2001) {
  print('21st century');
} else if (year >= 1901) {
  print('20th century');
}

//-------for迴圈範例---------

for (final object in flybyObjects) {
  print(object);
}

for (int month = 1; month <= 12; month++) {
  print(month);
}

//-------while迴圈範例---------

while (year < 2016) {
  year += 1;
}void main() {
  // 設定年份的假設數據
  int year = 2000;
  
  print('-------if迴圈範例---------');
  //-------if迴圈範例---------
  if (year >= 2001) {
    print('21st century');
  } else if (year >= 1901) {
    print('20th century');
  }
  
  print('-------for迴圈範例: 參數為變數---------');
  //-------for迴圈範例---------
  // 假設的對象列表
  List<String> flybyObjects = ['Moon', 'Mars', 'Jupiter'];
  
  // 使用for迴圈列印每個對象
  for (final object in flybyObjects) {
    print("現在是：" + object + "星球");
  }
  
  print('-------for迴圈範例: 參數為常數---------');
  
  // 使用for迴圈列印1到12的數字，表示月份
  for (int month = 1; month <= 12; month++) {
    print("現在是 $month 月");
  }
  
  print('-------while迴圈範例---------');
  //-------while迴圈範例---------
  // 假設的年份上限為2016
  final int upperLimit = 2016;
  
  // 使用while迴圈增加year的值，直到year >= 2016
  while (year < upperLimit) {
    year += 1;
  }
  
  // 輸出最終的年份
  print("Final year: $year");
}
```

if, for, while迴圈範例

- 輸出結果

![](https://hackmd.io/_uploads/r1txgK8j2.png)

# 貳、Introduction---Functions, Comments, import

## 一、函數(Functions)

函數的呼叫我們以fibonacci為範例，我們對fibonacci(int n)函數進行遞迴定義並在main()程式中呼叫執行地20次的結果並輸出

```
void main() {
  var i = 20;
  print('fibonacci($i) = ${fibonacci(i)}'); //呼叫函數
}

//-------計算第n次費波那契函數數值---------

int fibonacci(int n) { //費波那契函數定義
  if (n == 0 || n == 1) return n; //初值
  return fibonacci(n - 1) + fibonacci(n - 2); //遞迴規則
}
```

fibonacci函數範例

- 輸出結果

![](https://hackmd.io/_uploads/BkAWjIBin.png)

## 二、註解(Comments)

在Dart中有三種型態的註解，包含"單行註解"、"文件註解"與"多行註解"

```
// 單行註解的樣子

/// 文件註解的樣子
/// 用於libraries, classes, members的說明，會被IDE與dartdoc工具所辨識

/* 多行註解的樣子 */
```

comments範例

## 三、import

在我們需要使用其他API所提供的Libraries或其他套件時，我們會使用import

```
// import Dart的核心函式庫
import 'dart:math';

// Import其他套件的Libraries
import 'package:test/test.dart';

// Import檔案(前面需填寫目標檔案與目前執行中的.dart檔的"相對路徑")
import 'path/to/my_other_file.dart';
```

import範例
