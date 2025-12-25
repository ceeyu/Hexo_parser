---
title: 無職轉生～在資工系就拿出真本事٩(๑•̀ω•́๑)۶【Flutter Go in 30 Days】：Day8 Weee，Dart，與你的一場約會，Syntax Basics(上)
date: 2023-09-16 08:00:00
tags: [flutter, dart]

source: https://ithelp.ithome.com.tw/articles/10314958
series: Flutter 30天
categories:
  - Flutter 30天
---

# 壹、Syntax Basics--- Variables

參見: [Dart Variables](https://dart.dev/language/variables)

## 一、Variables: 不同的變數宣告方式

在變數裡，我們會舉例介紹三種宣告變數的方式: Var, Object與String

### Var

- 一種「自動類型判斷」的宣告方式，它會根據賦值的值來推斷變數的類型。

- 當使用 var 宣告的變數在賦值時會自動推斷出其類型，之後該變數的類型就被確定了，"不能"再更改類型。

### Object

- Object 是Dart 的根類別（Root class），所有的物件都是 Object 類別的子類別。

- 我們可以透過使用 Object 類別，宣告的變數可以指向「任何」物件

- 這種宣告方式通常用於需要變數能夠包含「不同類型物件」的情況

### String(或其他明確限制地宣告方式，像是int,bool...)

- 使用 String 宣告的變數只能指向"字串"類型的值。這是一種明確限制變數類型的方式。

- 明確宣告的變數的方式減少了可能出現的類型相關錯誤。

- 確保變數必定為單一特定類型時可以使用

### 程式碼練習

```
void main() {
  //-------Object宣告變數範例---------
  
  print('-------Object宣告變數範例---------');
  Object obj = 'Hello'; // obj 可以指向字串物件
  print('obj is a ${obj.runtimeType} and its value is $obj'); // 輸出 obj 的類型和值

  obj = 42; // obj 現在可以指向整數物件
  print('obj is a ${obj.runtimeType} and its value is $obj'); // 輸出 obj 的類型和值

  print('--------Var宣告變數範例-----------');
  
    
  var name = 'John'; // name 的類型被推斷為字串 (String)
  print('name is a ${name.runtimeType} and its value is $name'); // 輸出 name 的類型和值

  var age = 30; // age 的類型被推斷為整數 (int)
  print('age is a ${age.runtimeType} and its value is $age'); // 輸出 age 的類型和值

  //-------String宣告變數範例---------
  print('-------String宣告變數範例---------');
  
  String message = 'Hello, world!'; // message 只能指向字串物件
  print('message is a ${message.runtimeType} and its value is $message'); // 輸出 message 的類型和值
}
```

變數宣告範例

輸出結果:

![](https://hackmd.io/_uploads/H18OpAwjh.png)

## 二、Null safety: 空安全

為了避免因為意外訪問被設置為null的變數而導致的錯誤（null dereference error），Dart設置了Null Safety的限制，讓本錯誤可以提前在編譯時期(而非等到運行時)就被檢驗出來。

而Null safety主要分為下列三種方式

在宣告變數時，若該變數可為"null"，則需要在宣告時添增一個?

```
String? name  // name可為null或string(即為"Nullable type")

String name   // name可為string，但不可為null(即為"Non-nullable type")
```

1. $1

- 對於"Nullable type"，Dart設定初值即為"null"

- 對於"Non-nullable type"，並無初始值且需要自行手動設定，若沒有經過設定而使用此變數會導致系統報錯

1. $1

```
// --------error報錯，因為直接使用了一個值為null的變數
Person? person = null; // 宣告一個可空類型的變數 person，初始值為 null
print(person.name); // 這裡會報錯，因為 person 是 null，不能訪問 name 屬性

// --------將null值本身先用"toString()"函式轉換再使用，可成功輸出
Person? person = null;
print(person.toString()); // 這是合法的，因為 null 支援 toString() 方法
```

- 原本直接使用變數，error報錯

![](https://hackmd.io/_uploads/S1qKQJds3.png)

- 使用ToString()轉換，成功輸出

![](https://hackmd.io/_uploads/H1DIXkuoh.png)

## 三、Default value: 初始值設定

在"Null safety"我們提到了設置初始值的重要性，接著我們會介紹如何設定初始值

### Nullable type，我們可以用assert()函式幫助程式的檢查

```
int? lineCount;
assert(lineCount == null); //assert()函數代表在執行時若(lineCount==null)的條件未成立則會報錯
```

### Non-nullable type，直接在程式碼"初始"或是"使用前"設立初值即可

- 程式初始處設立

```
int lineCount = 0; //設立初值
```

- 程式運行前設立，下述程式並未給予lineCount初始值，但是在執行if迴圈時該變數獲得賦值，因此print函式執行時並不會報錯，而會正確輸出數值

```
int countLines() {
  // 假設這裡有計算行數的程式碼
  return 5;
}

void main() {
  bool weLikeToCount = true; // 定義並賦值 weLikeToCount 變數，假設我們希望計算行數
  int lineCount; //初始並未給值

  if (weLikeToCount) { //在if迴圈中獲得賦值
    lineCount = countLines(); // 呼叫 countLines() 方法來取得行數
  } else {
    lineCount = 0; // 否則將 lineCount 設為 0
  }

  print(lineCount); // 輸出 lineCount的值，不會報錯
}
```

Default value範例

- 輸出結果:

![](https://hackmd.io/_uploads/HkZ4dkds3.png)

### 注意事項

在Dart中，頂層變數（Top-level variables）和類別變數（Class variables）是「延遲初始化」。代表它們的初始化代碼只會在第一次使用這些變數時才會執行。

## 四、Late variables: 延遲宣告

使用 late 是告訴 Dart的編譯器，保證該變數在使用之前一定會被初始化，因此不需要在宣告時立即給予初始值。並且在後續的編譯控制流分析中視該變數為非空，並且不再提出錯誤。包含兩種情況

1. $1

2. $1

這在處理一些特殊情況時十分有用，例如當你確定某個變數在某些程式碼路徑中一定會被初始化，便可以使用 late 修飾符解決這個問題，舉例如下

- 未將late前綴宣告變數前，報錯

![](https://hackmd.io/_uploads/rJ5ss1doh.png)

- 使用late後，成功輸出

![](https://hackmd.io/_uploads/Hk_XhkOon.png)

## 五、Final, const的使用

如果想要設定一個「常數(constant)」的值，可以用final或const的方式來宣告變數(而非使用"var"的方式)

### Final

- 用於只能被設置一次的變數，一旦變數被賦值，就不能再修改它的值。

- 可以在運行時（runtime）被設置，可以在程式碼執行時動態賦值

### Final範例

在以下示例中，我們可以看到經過final宣告的"name"變數就不可以再給予其他賦值

![](https://hackmd.io/_uploads/ByQsbeujh.png)

### const

- 用於宣告一個編譯（compile-time）常數，即它的值在程式碼編譯時就必須確定，並且不能在運行時再更改。

- 變數的值必須在編譯時已知，不能是由運行時動態得來。

### const範例

- constant宣告變數

```
const bar = 1000000; // 壓力單位 (dynes/cm2)
  const double atm = 1.01325 * bar; // 標準大氣壓
```

- 將變數賦予所創造的constant值或建構函數:

三者都是將變數都初始化為一個空的 List 常數，其中，用final跟const宣告的變數"bar"與"baz"無法再進行修改，而由var宣告的變數"foo"可以

```
void main() {
  var foo = const [];
  final bar = const [];
  const baz = []; // Equivalent to `const []`

  print('foo before: $foo'); // 輸出 foo 的值

  // 修改 foo 變數，這次不會報錯，因為 foo 是可變的 List
  foo = [1, 2, 3];

  print('foo after: $foo'); // 輸出修改後的 foo 的值

  // 修改 baz 變數，這裡會報錯，因為 baz 是 const 變數，其值在初始化後不能再被修改
  // baz = [42];
}
```

const範例

- 輸出結果，可以證實由var創立的變數foo可以再行賦值

![](https://hackmd.io/_uploads/HJ84wldj3.png)

若我們把baz = [42]的註解拿掉後會出現以下報錯，因此由const創立的變數baz無法再行賦值

![](https://hackmd.io/_uploads/SkPbwxuoh.png)
