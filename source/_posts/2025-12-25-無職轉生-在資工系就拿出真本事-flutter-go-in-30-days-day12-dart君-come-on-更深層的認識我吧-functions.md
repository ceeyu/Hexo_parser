---
title: 無職轉生～在資工系就拿出真本事٩(๑•̀ω•́๑)۶【Flutter Go in 30 Days】：Day12 Dart君：Come On ~更深層的認識我吧，Functions
date: 2025-12-25
tags: [flutter, dart]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10314963
---

# 壹、Functions: 函數

參見: [Dart Functions](https://dart.dev/language/functions)

在Dart使用函數上，針對只有一個函數的表達式我們可以用=> expr的方式作為簡寫。像是下列程式碼只須回傳一個 " _nobleGases[ atomicNumber ] " 變數值

```
bool isNoble(int atomicNumber) {
  return _nobleGases[atomicNumber] != null;
}
```

單一回傳值函數

而在這樣的函式，我們就可以簡寫為下列方式，並且需要注意，=>後到分號前我們只能使用條件式表達

```
bool isNoble(int atomicNumber) => _nobleGases[atomicNumber] != null;
```

單一回傳值函數的箭頭表示法簡寫

## 一、Parameters--- Named Parameters: 命名參數

### 命名參數定義

- 允許根據參數的名稱指定值，而不必按照參數的順序傳遞值。

- 參數標記為required代表是"必要(不得缺乏)"的參數

使用的形式如{param1, param2, …}

### 命名參數使用範例

在本範例中，我們宣告一個函數"printPersonInfo"，並使用命名參數並給予初始值，而在main()函式呼叫時，我們分為三種不同的參數給予情境，

- 注意: 若不給予初始值會有"The parameter '變數名稱' can't have a value of 'null'"的報錯，所以一定要先給予初值

```
void printPersonInfo({String name = "name", int age = 10, String location = "Unknown"}) {
  print("Name: $name, Age: $age, Location: $location");
}

void main() {
  // 使用命名參數調用函式
  printPersonInfo(name: "Alice", age: 30);

  // 只提供一部分參數
  printPersonInfo(name: "Bob");

  // 提供所有參數
  printPersonInfo(name: "Charlie", age: 25, location: "London");
}
```

命名參數使用範例

- 輸出結果

![](https://hackmd.io/_uploads/rkv0krqh3.png)

### 命名參數required用法

而若是我們稍微更改程式碼，將name變數前綴required指令，由下圖可看到若我們沒有在呼叫函式給予name參數，便會產生報錯

![](https://hackmd.io/_uploads/ByuPbBq32.png)

## 二、Parameters--- 可選位置參數

### 可選位置參數定義

- 使用[]包含起來的參數代表"可選位置參數"

- 允許在函數調用時按照參數的「位置」提供參數值

- 可以選擇性地省略一些參數，不提供則使用該參數預設值

- 若不提供預設值，則它們的類型必須可為空，因為它們的預設值將是null

### 可選位置參數使用範例

在下列範例中，我們使用中括號將"location"變數設為可選位置參數，因此在三個呼叫範例中，我們可以看到使用與不使用預設值情況下的location變數輸出結果的相異

```
void printPersonInfo(String name, int age, [String location = "Unknown"]) {
  print("Name: $name, Age: $age, Location: $location");
}

void main() {
  // 提供所有參數
  printPersonInfo("Alice", 30, "New York");

  // 只提供前兩個參數，location 使用預設值
  printPersonInfo("Bob", 25);

  // 提供所有參數，location 覆蓋預設值
  printPersonInfo("Charlie", 28, "London");
}
```

可選位置參數使用範例

- 輸出結果

![](https://hackmd.io/_uploads/H1oHurq3h.png)

## 三、main()

### main()函數說明

- main 函數是每個 Dart 程式的初始入口點。

- 當執行一個 Dart 程式時，系統會自動尋找並執行 main 函數

- 包含了程式的主要執行邏輯，並且可以調用其他函數、執行任務，或者進行資料處理等操作

### main()函數基本範例

基本上，大家應該在前幾天的範例中已大量使用dartpad進行程式碼的操作，對main()函式的使用應該不陌生，一般而言，一個dart程式檔案內(或未來我們使用，一個flutter專案內)都會有一個main()函數作為我們主要執行邏輯的觸發，並呼叫其他函數或是進行其他操作

```
void main() {
  // 在這裡放置程式的主要執行邏輯
  print("Hello, World!");  // 例如這裡輸出一條訊息
}
```

main()函數基本範例

- 輸出結果

![](https://hackmd.io/_uploads/rk36FB5hh.png)

## 四、Anonymous functions: 匿名函數

### 匿名函數定義

- 匿名函數也被稱為無名函數或lambda函數

- 是沒有名稱的函數，通常用於簡單的操作或需要被當作參數傳遞的地方

- 可以用來快速定義和使用簡單的功能，而無需在程式中額外命名一個函數。

### 匿名函數使用範例

我們可以將參數列表放在小括號中，然後在大括號內撰寫函數主體。這個範例中，我們使用匿名函數作為 forEach 方法的參數。這個匿名函數將列表中的每個元素平方並輸出結果。匿名函數的定義包含在大括號中，並在 forEach 中傳遞

```
void main() {
  var numbers = [1, 2, 3, 4, 5];

  // 使用匿名函數將列表中的每個元素平方並印出
  numbers.forEach((number) {
    var squared = number * number;
    print('$number 的平方值是 $squared');
  });
}
```

匿名函數使用範例

- 輸出結果

![](https://hackmd.io/_uploads/rk-ETHq23.png)

而我們也可以利用箭頭語法的方式省略上述範例如下，不過因為匿名函數的參數只能在內部有效，因此我們僅輸出平方值作為參考

```
void main() {
  const list = [1, 2, 3, 4, 5];
  
  list
    .map((number) => number * number)
    .forEach((squared) => print('Squared: $squared'));
}
```

匿名函數使用，箭頭語法簡略範例

- 輸出結果

![](https://hackmd.io/_uploads/SkN3CSc3n.png)

## 五、Lexical scope: 詞彙範圍

「函數詞彙範圍」指變數在不同函數之間的可見性和存取範圍。每個函數在其內部都有一個自己的詞彙範圍，這意味著在函數內部聲明的變數只能在該函數內部使用，且不會影響到其他函數。在一般靜態的宣告中我們可以藉由依據大括號的{}的前後位置來判定

### 區域變數（Local Variables）

在函數內部宣告的變數稱為區域變數。這些變數只在「該函數」的詞彙範圍內可見，不能在其他函數中訪問。當函數執行完成後，區域變數的生命週期也會結束，它們的值將被釋放。

### 全域變數（Global Variables）

在任何函數外部宣告的變數被稱為全域變數。這些變數在「整個程式」中都是可見的，可以在不同的函數內部訪問和修改。全域變數的生命週期在整個程式運行期間持續。

### 函數參數（Function Parameters）

函數的參數也具有詞彙範圍，它們只在函數內部有效。函數的參數在「函數內部】有效。函數的參數在函數內部的詞彙範圍中扮演著區域變數的角色。

### 巢狀函數（Nested Functions）

在一個函數內部定義的另一個函數被稱為巢狀函數。巢狀函數可以訪問其外部函數的區域變數，但外部函「無法」訪問巢狀函數的區域變數。

## 六、Lexical closures: 詞彙閉包

### 詞彙閉包定義

- 是一種特性(或技巧)，它讓函數可以捕獲其所在的詞彙範圍內的變數，即使這個詞彙範圍已經不存在

- 讓函數能夠記住它們被創建時所處的上下文，並且可以在稍後的時間內使用這些變數

- 在「回呼函數（Callback Functions）」與「異步操作（Asynchronous Operations）」的情況下特別好用

### 詞彙閉包使用範例

在下列範例中，在這個例子中，"inner 函數"是一個詞彙閉包，捕獲了 "outer 函數"的詞彙範圍內的 "outerValue" 和 "innerValue" 變數。即使 "inner 函數"在 "outer 函數"回傳後才被調用，它仍然可以訪問和使用這兩個變數的值。

```
Function outer() {
  int outerValue = 10;
  
  Function inner() {
    int innerValue = 20;
    return () {
      print("Outer value: $outerValue, Inner value: $innerValue"); //輸出outerValue與innerValue變數值
    };
  }
  
  return inner;
}

void main() {
  var closure = outer();
  var innerClosure = closure();
  innerClosure(); // 輸出 "Outer value: 10, Inner value: 20"
}
```

詞彙閉包使用範例

- 輸出結果

![](https://hackmd.io/_uploads/BJgPNLqn3.png)

## 七、Generators: 產生器

### 產生器定義

- 是一種特殊的函數，它可以產生一個序列的值，而不需要一次性全部計算和儲存這些值

- 這種方式可以節省記憶體和計算資源，特別是在處理大量數據時非常有用

分為兩種形式:

- 同步生成器(**Synchronous** generato): 返回一個Iterable對象

- 異步生成器(**Asynchronous** generator): 返回一個Stream對象

### 同步生成器使用方式

在同步生成器中，使用Iterable與sync* 來宣告函數，下方例子中，並用yield 關鍵字產生值並暫停函數的執行，然後可以從暫停的地方恢復

```
Iterable<int> naturalNumbers(int n) sync* {
  for (int i = 1; i <= n; i++) {
    yield i;
  }
}
```

### 異步生成器使用方式

在同步生成器中，使用Stream與async* 來宣告函數，並用await 關鍵字等待異步操作的完成，再用yield 關鍵字產生值

```
Stream<int> asyncNaturalNumbers(int n) async* {
  for (int i = 1; i <= n; i++) {
    await Future.delayed(Duration(seconds: 1));  // 模擬異步操作的延遲時間
    yield i;
  }
}
```

### 同步/異步產生器範例

以下是我們結合同步/異步產生器的宣告式與使用範例

- 注意: 執行時，因為為了模擬異步操作的部分，我們加入了延遲時間1秒的限制，因此terminal的數字會逐一出現，而不是一次出現!

```
Iterable<int> naturalNumbers(int n) sync* {
  for (int i = 1; i <= n; i++) {
    yield i;
  }
}

Stream<int> asyncNaturalNumbers(int n) async* {
  for (int i = 1; i <= n; i++) {
    await Future.delayed(Duration(seconds: 1));  // 模擬異步操作的延遲時間，這裡訂為1秒鐘
    yield i;
  }
}

void main() {
  final n = 5;
  
  print("Sync Generator:"); //同步產生器
  final syncNumbers = naturalNumbers(n);
  for (var number in syncNumbers) {
    print(number);
  }
  
  print("\nAsync Generator:"); //異步產生器
  final asyncNumbers = asyncNaturalNumbers(n);
  asyncNumbers.listen((number) {
    print(number);
  });
}
```

同步/異步產生器範例

- 輸出結果

![](https://hackmd.io/_uploads/ryJN_8923.png)
