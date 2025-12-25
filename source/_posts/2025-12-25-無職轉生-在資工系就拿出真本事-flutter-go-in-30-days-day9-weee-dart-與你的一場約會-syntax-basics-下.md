---
title: 無職轉生～在資工系就拿出真本事٩(๑•̀ω•́๑)۶【Flutter Go in 30 Days】：Day9 Weee，Dart，與你的一場約會，Syntax Basics(下)
date: 2025-12-25
tags: [flutter, dart]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10314959
---

# 貳、Syntax Basics---Operators

參見:　[Dart Operators](https://dart.dev/language/operators)

在dart中提供基本程式語言邏輯的運算元，包含常見的一元、二元運算元、計算運算符、關係運算、與其他運算符符等。其中，我們挑選比較特別的「類型檢查運算符」與「條件表達式(三元運算符)」進行介紹!

![](https://hackmd.io/_uploads/SJY5bZ_oh.png)

參見: [Dart Operators](https://dart.dev/language/operators): 支援運算符與優先層級

![](https://hackmd.io/_uploads/ryuxfbuo3.png)

參見: [Dart Operators](https://dart.dev/language/operators): 支援計算運算符

![](https://hackmd.io/_uploads/S1-BfZOon.png)

參見: [Dart Operators](https://dart.dev/language/operators): 支援關係運算符

## 一、Type test operators:類型檢查運算符

Dart提供三種類型檢查運算符讓我們在runtime時檢查變數類型

### as

as 運算符用於進行類型轉換（Type Casting）。在運算為安全的前提下，它允許你將一個對象轉換為特定的類型。若該轉換是不安全的，則會在運行時會拋出異常。

### is

is 運算符用於檢查一個對象是否「屬於」特定的類型，它返回一個boolean值（屬於時回傳true，不屬於則回傳false）。

### is!

is! 運算符用於檢查一個對象是否「不屬於」特定的類型，同樣返回一個boolean值（不屬於時回傳true，屬於則回傳false）。

### 綜合程式範例

在以下範例中，分別用"as, is, is!"示範了如何達成對變數"employee"的類型轉換與測試，我們可以依據開發的程式段落需求不同而使用相應的不同類型檢查運算符

```
class Person {
  String firstName = '';
}

class Employee extends Person {
  // Employee 是 Person 的子類，繼承了 firstName 屬性
  // 這個子類還可以有自己的其他屬性和方法
}

void main() {
  // 創建一個 Employee 實例
  Employee employee = Employee();

  // 方法1: 使用 'as' 運算符進行類型轉換（在運行時進行類型檢查）
  (employee as Person).firstName = 'Bob'; // 透過類型轉換設置 firstName

  // 方法2: 使用 'is' 運算符進行類型檢查（在運行時進行類型檢查）
  if (employee is Person) {
    employee.firstName = 'Bob'; // 直接設置 firstName，無需類型轉換
  }

  // 方法3: 使用 'is!' 運算符進行反向類型檢查（在運行時進行類型檢查）
  if (employee is! Person) {
    // 如果 employee 不是 Person 的實例
    // 可以進行相應的處理
    print('這個員工不是一個合法的人員'); // 輸出：這個員工不是一個合法的人員
  }

  // 印出更新後的 firstName
  print('員工的名字：${employee.firstName}'); // 輸出：員工的名字：Bob

}
```

as, is, is!範例

## 二、Conditional expressions: 條件表達式、三元運算符

Dart提供兩種運算符可以"**簡潔地**"表示條件判斷式(等義於if-else效力)

### condition ? expr1 : expr2

如果 condition 為真，則計算並回傳 expr1 的值；否則，計算並回傳 expr2 的值。拿以下列範例作為說明:

- "isPublic" 代表condition

- 'public' 代表expr1

- 'private' 代表expr2

當condition為true則回傳'public'的字串；為false則回傳'private'的字串

```
void main() {
  //-----------condition為true的情況
  bool isPublic = true;
  var visibility = isPublic ? 'public' : 'private'; //判斷結果為expr1
  print('Visibility: $visibility'); // Output: Visibility: public
  
  //-----------condition為false的情況
  
  isPublic = false;
  visibility = isPublic ? 'public' : 'private';//判斷結果為expr2
  print('Visibility: $visibility');
  
}
```

- 輸出結果

![](https://hackmd.io/_uploads/r1JdhmFoh.png)

### expr1 ?? expr2

如果 expr1 是非空的，則回傳 expr1 的值；否則計算並回傳 expr2 的值。這個運算符可以用來處理變數「可能為空」的情況。拿以下列範例作為說明:

- "name" 代表expr1

- 'Guest' 代表expr2

當name值為"非空"時，便會輸出name，反之則輸出字串'Guest'

```
String playerName(String? name) => name ?? 'Guest';

void main() {
  String player1 = playerName('John'); //name = 'John'
  print("player1: " + player1); // 輸出: John

  String player2 = playerName(null); //name = null
  print("player2: " +player2); // 輸出: Guest
}
```

- 輸出結果

![](https://hackmd.io/_uploads/S1kTqQKo2.png)

### 條件表達式與if-else程式行數比較

在下列程式中我們可以清楚的看到使用三元運算符的條件表達式相較原先if-else的寫法，用更簡潔的方式達到相同效力的功能!

```
// 使用三元運算符: 
String playerName(String? name) => name != null ? name : 'Guest';

// 使用 if-else 語句
String playerName(String? name) {
  if (name != null) {
    return name;
  } else {
    return 'Guest';
  }
}
```

## 三、Cascade notation: 串聯表示法

Dart提供，“Cascade notation”（串聯表示法）讓我們對同一個物件進行一系列操作。這包括訪問實例成員以及調用該物件的實例方法。使用串聯表示法可以節省創建臨時變數的步驟，方便我們寫出更加流暢的程式碼。以下我們提供兩個範例代表使用前後差距

### 操作對象非空

- 原始程式碼:

```
var paint = Paint();
paint.color = Colors.black;
paint.strokeCap = StrokeCap.round;
paint.strokeWidth = 5.0;
```

- 使用串聯表示法的等義程式碼: 可以看到原先的三個"paint"物件皆可被省略為串聯表示法

```
var paint = Paint()
  ..color = Colors.black
  ..strokeCap = StrokeCap.round
  ..strokeWidth = 5.0;
```

### 操作對象可為空

- 原始程式碼:

```
var button = querySelector('#confirm');
button?.text = 'Confirm';
button?.classes.add('important');
button?.onClick.listen((e) => window.alert('Confirmed!'));
button?.scrollIntoView();
```

- 使用串聯表示法的等義程式碼: 只需要在第一個使用的變數前(button.text)加上'?'即可代表可為空變數

```
querySelector('#confirm') // Get an object.
  ?..text = 'Confirm' // Use its members.
  ..classes.add('important')
  ..onClick.listen((e) => window.alert('Confirmed!'))
  ..scrollIntoView();
```

# 參、Syntax Basics---Metadata: 額外信息

參見: [Dart: Metadata](https://dart.dev/language/metadata)

## 一、常見的三種metadata

在 Dart 中，可以使用元數據（metadata）來給你的程式碼提供額外的信息。元數據通常用於對程式碼進行註解，以提供關於程式碼的一些特殊信息，例如標示某個函數已經被廢棄（deprecated）或者是覆寫了父類的方法（override）等。

通常metadata的註解以 @ 字符開頭，後面可以跟著一個指向編譯時期常數的引用（例如 deprecated），或者是調用一個常數構造函數。

以下提供可被所有dart程式代碼使用的三種matadata

**@Deprecated**：給「**程式開發者**」使用的matadata，表示標記的內容已經被廢棄，不建議使用。

**@deprecated**：給「 **Dart 語言庫使用(官方)**」表示標記的內容已經被廢棄，不建議使用的代碼。注意這裡的首字母小寫。

**@override**：表示這是對父類中方法的覆寫（重寫），確保該方法確實覆寫了父類的方法，並且與父類方法具有相同的名稱和參數列表。

## 二、程式開發者使用@Deprecated範例

本程式中，我們將"activate()"函數用"@Deprecated('Use turnOn instead')"的metadata註記，並且依序呼叫

```
class Television {
  /// metadata表示不再使用activate()，請轉用turnOn()
  @Deprecated('Use turnOn instead')
  void activate() {
    turnOn();
  }

  /// Turns the TV's power on.
  void turnOn() {
    print('Television is now turned on.');
  }
}

void main() {
  var tv = Television();

  // 使用 @Deprecated 註解過時的 activate() 方法，編譯器會給出警告
  tv.activate();

  // 使用 turnOn() 方法來開啟電視
  tv.turnOn();

  // 使用 @Deprecated 註解過時的 activate() 方法，編譯器會給出警告
  // 但實際上仍然會調用 turnOn() 方法來開啟電視
  tv.activate();
}
```

@Deprecated範例

- 輸出結果與警告：我們可以看到呼叫metadata註解被廢棄的函示時會出現的警告內容

![](https://hackmd.io/_uploads/rJS2hxdsn.png)

## 三、自行定義metadata

我們也時常透過自行定義 metadata的方式，增強程式的可讀性、維護性和可理解性。除了標記類別、函數、變數等元素，表達有關程式碼的特定信息，如版本號、作者、授權訊息、待辦事項、重要提示之外，也可以讓開發者和工具在開發、測試和維護程式時更容易理解程式碼的邏輯與設計，更能在 IDE 或工具中提供更有用的提示和警告，提高開發效率，並降低出錯的風險。

以下範例提供一個自行定義的metadata:@Todo，並且在執行到時讀取該metadata所提供的參數訊息。

```
class Todo {
  final String who;
  final String what;

  const Todo(this.who, this.what);
}

// 自定義 @Todo metadata，在編譯時可獲取所提及的函式參數訊息

@Todo('Dash', 'Implement this function')
void doSomething() {
  print('Do something');
}

void main() {
  // 呼叫待辦事項函數
  doSomething();
}
```

自行定義metadata範例
