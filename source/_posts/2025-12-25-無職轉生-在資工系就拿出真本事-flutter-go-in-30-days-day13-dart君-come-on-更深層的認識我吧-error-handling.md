---
title: 無職轉生～在資工系就拿出真本事٩(๑•̀ω•́๑)۶【Flutter Go in 30 Days】：Day13 Dart君：Come On ~更深層的認識我吧，Error handling
date: 2023-09-21 13:00:00
tags: [flutter, dart]

source: https://ithelp.ithome.com.tw/articles/10314965
series: Flutter 30天
categories:
  - Flutter 30天
---

# 貳、Error handling: 錯誤處理

參見: [Dart Error handling](https://dart.dev/language/error-handling)

錯誤處理是一種重要的程式設計概念，它允許你在程式運行時捕捉和處理各種不同的錯誤和異常情況。Dart 提供了多種處理錯誤的機制，包括使用 try、catch 和 on 等關鍵字。

## 一、Exceptions: 例外情況(異常情況)

### 例外情況定義

- 是指表示發生了一些意外情況的錯誤，用於表示程式碼遇到意外狀況的一種機制

- 如果例外情況未被捕捉，引發例外的隔離（Isolate）將被暫停，通常該隔離和其程式將被終止

- Dart 中的所有例外情況都是未檢查的例外

- Dart 提供了 Exception 和 Error 類型，或自行定義的情況

### Throw使用方式

我們可以用throw關鍵字來拋出一個例外情況，使用方式如下。其中，方式三的部分，因為拋出例外情況本身便是一個表達式，因此可以放置在任何允許表達式的程式區段，而在這裡舉例箭頭表示法下使用Throw的情況

```
//方式一: 拋出一個引發例外情況的對
throw FormatException('Expected at least 1 section'); 象

//方式二: 拋出任意對象
throw 'Out of llamas!';

//方式三: 在可以放置"表達式"的地方使用throw
void distanceTo(Point other) => throw UnimplementedError();
```

### Try-Catch使用方式

使用 try 和 catch 關鍵字可以捕捉和處理異常。在 "try" 區塊中放置可能引發異常的程式碼，如果發生了異常，則執行相應的 "catch" 區塊中的程式碼。

```
try {
  // 可能引發異常的程式碼
} catch (e) {
  // 處理異常的程式碼
}
```

而我們也可以配合on關鍵字用於捕捉特定類型的異常，在針對不同的錯誤情況進行不同處理時非常有用。

```
try {
  // 可能引發異常的程式碼
} on Exception catch (e) {
  // 處理特定類型的異常
} catch (e) {
  // 處理其他異常
}
```

### Rethrow使用範例

若我們想要觀察特定的異常行為，我們可以配合rethrow關鍵字來使用

- 例外情況製作(產生錯誤): 在 misbehave() 函數中，我們使用 dynamic 類型來宣告 foo，然後試圖對其進行自增操作（foo++）。這個操作在執行時會引發錯誤

- Rethrow使用: 在 misbehave() 的 catch 塊中，我們捕捉這個引發的錯誤並輸出相關訊息，然後使用 rethrow 「重新引發」這個錯誤，以便讓呼叫者能夠看到這個異常。

- 程式邏輯: 在 main() 函數中，我們呼叫了 misbehave()，並在外部的 catch 塊中捕捉這個重新引發的錯誤，並輸出相關訊息

```
void misbehave() {
  try {
    dynamic foo = true;
    print(foo++); // 這行會在執行時引發錯誤
  } catch (e) {
    print('misbehave() 部分處理 ${e.runtimeType}.');
    rethrow; // 允許呼叫者查看這個異常。
  }
}

void main() {
  try {
    misbehave();
  } catch (e) {
    print('main() 完成處理 ${e.runtimeType}.');
  }
}
```

Rethrow使用範例

- 輸出結果

![](https://hackmd.io/_uploads/HJjmZv52n.png)

### Finally使用方式

finally 區塊中的程式碼「無論是否發生異常」都會執行，這對於執行清理工作非常有用，例如關閉文件或資料庫連接。

```
try {
  // 可能引發異常的程式碼
} catch (e) {
  // 處理異常的程式碼
} finally {
  // 始終執行的程式碼，用於清理
}
```

### Finally 使用範例

我們將Try-Catch與Finally結合使用如下，程式執行後會先輸出異常情況，最後再執行finally內的 cleanLlamaStalls()函數

```
void breedMoreLlamas() {
  throw Exception('Oops, something went wrong while breeding llamas.');
}

void cleanLlamaStalls() {
  print('Cleaning llama stalls...');
}

void main() {
  try {
    breedMoreLlamas();
  } catch (e) {
    print('錯誤: $e'); // 首先處理異常情況。
  } finally {
    cleanLlamaStalls(); // 然後進行清理。
  }
}
```

Finally 使用範例

- 輸出結果

![](https://hackmd.io/_uploads/SJH8VDq33.png)

## 二、Assert: 斷言

### 斷言定義

- 通常在開發和測試階段使用

- 是一種程式碼中的檢查，用於確保程式在運行時滿足特定的條件

- 如果斷言的條件為假（false），則會引發異常，通常是 "AssertionError"

### 斷言使用方式

斷言的語法為assert(<condition>, <optionalMessage>);

<condition> 代表斷言的條件，若條件為false則引發中斷

<optionalMessage> 代表可選的參數，用於指定在斷言失敗時顯示的訊息

下列提供幾種斷言的使用方式

```
// 確保變數具有非空值。
assert(text != null);

// 確保值小於 100。
assert(number < 100);

// 確保這是一個 https URL。
assert(urlString.startsWith('https'));

// 確保這是一個以 "https" 開頭的 URL，附加失敗時顯示的訊息
assert(urlString.startsWith('https'),
    'URL ($urlString) 應該以 "https" 開頭。');
```

### 斷言使用範例: 成功執行

我們將上述斷言變為一個可執行程式如下，初始我們給予不會引發斷言的程式碼

```
void main() {
  String text = "hello";
  int number = 50;
  String urlString = "https://www.example.com";

  // 確保變數並非"hi"。
  assert(text != "hi");

  // 確保值小於 100。
  assert(number < 100);

  // 確保這是一個以 "https" 開頭的 URL。
  assert(urlString.startsWith('https'),
      'URL ($urlString) 應該以 "https" 開頭。');

  print("程式碼執行成功");
}
```

- 輸出結果

![](https://hackmd.io/_uploads/rJbVvw9n2.png)

### 斷言使用範例: 觸發斷言

而我們依序更改程式碼觸發每個斷言，並附上更改的程式與錯誤輸出截圖。前兩個更改text, number觸發的斷言因為並未指定錯誤訊息，因此跳出的都是系統報錯；而urlString因為有寫下錯誤訊息內容，因此會多加輸出所指定的錯誤訊息

- 更改text初值，觸發斷言:

![](https://hackmd.io/_uploads/Hy7rdD5nn.png)

- 更改number初值，觸發斷言:

![](https://hackmd.io/_uploads/Sy9puv923.png)

- 更改urlString初值，觸發斷言:

![](https://hackmd.io/_uploads/rJAj5wqn2.png)
