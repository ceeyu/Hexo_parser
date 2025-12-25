---
title: 無職轉生～在資工系就拿出真本事٩(๑•̀ω•́๑)۶【Flutter Go in 30 Days】：Day10 Awww，Dart，再跟我多分享些你自己，Types(上)
date: 2023-09-18 10:00:00
tags: [flutter, dart]

source: https://ithelp.ithome.com.tw/articles/10314960
series: Flutter 30天
categories:
  - Flutter 30天
---

# 壹、Types -- Collections

參見： [Dart Language: Collections](https://dart.dev/language/collections)

## 一、List

### List定義

- 是一種可變數組，可以存儲任意數量的元素。

- 的元素可以是任何類型，包括數字、字符串、對象等。

- 可以使用索引來訪問元素，索引從 0 開始。

- 可以使用增長或減少列表長度的方法來添加或刪除元素。

- 可以使用迭代器來尋訪元素。

### List宣告範例

我們以外層為中括號包裹元素，並以逗號分隔的方式來定義陣列，下述兩種都是宣告陣列的方式

```
var list = [1, 2, 3]; //數字陣列

var list = [
  'Car',
  'Boat',
  'Plane',
]; //字串陣列，最後的逗號不影響宣告，但可以防範複製錯誤
```

List宣告範例

### List基本性質範例

在下述例子中，我們可以看到基本的List性質，包含陣列長度計算、陣列位址計算、修改方式等。

- 注意: 因為list是由[0](Index=0)作為第一元素，因此這裡的[1]代表的是陣列中的第二個元素，也就是'2'，所以陣列的表示位址就是由[0]~[陣列長度-1]，以下述範例而言，就是[0],[1],[2]

```
void main() {
  // 創建一個 List
  var list = [1, 2, 3];

  // 檢查 List 的長度
  print('List 的長度是 ${list.length}');

  // 檢查 List 中的元素
  print('List 中的元素是 $list');

  // 更改 List 中的元素
  list[1] = 1;//因為list是由[0]作為第一元素，因此這裡的[1]代表的是陣列中的第二個元素，也就是'2'

  // 再次檢查 List 中的元素
  print('List 中的元素是 $list');
}
```

List使用範例

- 輸出結果:

![](https://hackmd.io/_uploads/rJs4nay33.png)

## 二、Sets:集合

### Set定義

- 是一種無序的集合，其中元素是唯一的。

- 的元素可以是任何類型，包括數字、字符串、對象等。

- 可以使用迭代器來遍歷元素。

- 可以使用包含運算符來檢查元素是否存在於 Set 中。

- 可以使用 union()、intersection()、difference() 和 symmetricDifference() 等方法來操作其他 Set。

### Set宣告範例

我們以外層為大括號包裹元素，並以逗號分隔的方式來定義Set

```
var halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};
//鹵素包含以下幾種元素集合

var names = <String>{};//創建空集合，等義於 Set<String> names = {};
```

### Set基本性質範例

我們可以使用add()的方式將單一元素加入原有的集合中，例如下列範例將'fluorine'加入elements 集合；或是使用addAll()將一集合內全部元素加入另一集合中，例如下列範例將alogens 集合中的所有元素加入到 elements 集合中；而同樣的，我們也可以用.length來得到集合長度

```
void main() {
  // 定義 halogens 集合，包含氟、氯、溴、碘和砹等元素
  var halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};
  
  // 定義一個空的 elements 集合
  var elements = <String>{};
  
  // 將 'fluorine' 加入 elements 集合
  elements.add('fluorine');
  
  // 將 halogens 集合中的所有元素加入到 elements 集合中
  elements.addAll(halogens);
  
  // 確保 elements 集合的長度為 5
  assert(elements.length == 5);
  
  // 輸出 halogens 集合的元素
  print('Halogens: $halogens');
  
  // 輸出 elements 集合的元素
  print('Elements: $elements');
}
```

Set基本性質範例

- 輸出結果

![](https://hackmd.io/_uploads/rygkxRy3n.png)

## 三、Maps

### Map定義

- 是一種無序的集合，其中元素是鍵(Key)值(Value)對應關係。

- 的鍵(Key)可以是任何類型，包括數字、字符串、對象等。

- 的值(Value)可以是任何類型，包括數字、字符串、對象等。

- 可以使用迭代器來遍歷元素。

- 可以使用包含運算符來檢查元素是否存在於 Map 中。

- 可以使用 keys()、values() 和 entries() 等方法來獲取相互的對列表。

### Map宣告範例

我們以外層為大括號包裹元素，並以逗號分隔每組key-value值的方式來定義，每組key與value間以分號:作為連結

```
var gifts = {
  // Key欄位:  Value欄位，Key欄位紀錄禮物序號，Value欄位紀錄禮物內容
  'first': 'partridge',
  'second': 'turtledoves',
  'fifth': 'golden rings'
};

var nobleGases = {
  // Key欄位:  Value欄位，Key欄位紀錄原子序，Value欄位紀錄元素名稱
  2: 'helium',
  10: 'neon',
  18: 'argon',
};
```

Map宣告範例

而我們也可以將"gifts" ,"nobleGases"變數用Map構造函式Map<String, String>與Map<int, String>的方式進行宣告，

```
var gifts = Map<String, String>();
gifts['first'] = 'partridge';
gifts['second'] = 'turtledoves';
gifts['fifth'] = 'golden rings';

var nobleGases = Map<int, String>();
nobleGases[2] = 'helium';
nobleGases[10] = 'neon';
nobleGases[18] = 'argon';
```

Map宣告範例

### Map基本性質範例

我們可以用[]=的方式來新增一個key-value對，並且用.length的方式來確認長度。尤以下範例中，我們首先定義了一個gifts的Map物件，一開始只有一個key-value對，而後我們再新增第二個禮物(中括號內的為key值，而等號右方的為value值)，在兩次的print(gifts)中我們可以看出差別，而中間的assert()函式可以幫助我們進行條件檢查(條件不符合時會出現警告)

```
void main() {
  // 定義一個名為 "gifts" 的 Map 物件，包含一個 key-value 對。
  var gifts = {'first': 'partridge'};
  
  // 在 Map 中新增一個 key-value 對，新增第二個禮物設為 'calling birds'。
  gifts['second'] = 'calling birds';
  
  print(gifts);//印出的gifts裡面有 first和second
  
  // 斷言：檢查第一個禮物是否是 'partridge'。
  assert(gifts['first'] == 'partridge');
  
  // 斷言：檢查第三個禮物是否為 null。
  assert(gifts['third'] == null);
  
  // 再次在 Map 中新增一個 key-value 對，新增第三個禮物設為 'doll'
  gifts['third'] = 'doll';
  
  print(gifts);//印出的gifts裡面有 first,second和third
  
  // 斷言：檢查 Map 的長度是否為 3。
  assert(gifts.length == 3);
}
```

Map基本性質範例

- 輸出結果:

![](https://hackmd.io/_uploads/Sy4Jrm-hh.png)

## 四、Operators

### Spread operators: 展開運算符

- 於將一個集合（如串列或 Map）的元素展開並嵌入到另一個集合中

- 展開運算符可以使程式碼更簡潔且易讀

- 有兩種主要的展開運算符：... 和 ?...，前者用於非空情況，後者用於可能為空的情況

以下示範兩種範例

```
void main() {
  //---------"..."展開運算符----------
  // 定義一個整數串列 list1
  var list1 = [1, 2, 3];

  // 使用展開運算符將 list1 的元素展開到 list2 中
  var list2 = [0, ...list1, 4, 5];

  // 輸出 list2 的內容
  print('展開運算符範例: $list2'); // 輸出：[0, 1, 2, 3, 4, 5]

  //---------"?... "安全展開運算符----------
  
  // 定義一個可能為 null 的整數串列 nullableList
  List<int>? nullableList = null;

  // 使用安全展開運算符將 nullableList 的元素展開到 list3 中
  var list3 = [0, ...?nullableList];

  // 輸出 list3 的內容
  print('安全展開運算符範例: $list3'); // 輸出：[0]
}
```

展開運算符範例

- 輸出結果:

![](https://hackmd.io/_uploads/S1Gzd7W22.png)

### Control-flow operators

我們可以透過在集合（如串列或 Map）中加入if, for的方式來宣告，以便簡化宣告流程的判斷或迭代，我們可以由以下範例看到三種用法，包含if集合、if-case集合與for迴圈集合用於列表的用法

```
void main() {
  //---------if集合用於列表範例-------------

  bool promoActive = true;

  // 建立一個導航串列 "nav"，並加入if條件判斷
  var nav = ['Home', 'Furniture', 'Plants', if (promoActive) 'Outlet'];

  print('if集合用於列表範例: $nav'); 
  // promoActive為true，條件成立，輸出：[Home, Furniture, Plants, Outlet]
  
  //---------if-case集合用於列表範例---------

  String login = 'Manager';

  // 建立另一個導航串列 "navWithLogin"，並加入if-case判斷
  var navWithLogin = ['Home', 'Furniture', 'Plants', if (login == 'Manager') 'Inventory'];

  print('if-case集合用於列表範例: $navWithLogin'); 
  // login為'Manager'，條件成立，輸出：[Home, Furniture, Plants, Inventory]

  //---------for迴圈集合用於列表範例---------

  var listOfInts = [1, 2, 3];

  // 建立一個字串串列 "listOfStrings"，並加入for迴圈
  var listOfStrings = ['#0', for (var i in listOfInts) '#$i'];

  print('for迴圈集合用於列表範例: $listOfStrings');//輸出for迴圈迭代後結果

}
```

- 輸出結果:

![](https://hackmd.io/_uploads/H12Ms7Zh2.png)

# 貳、Types -- Records: 紀錄

參考資料: [Dart Language: Records](https://dart.dev/language/records)

- 是Dart語言在3.0版本後提供的功能

- 是一種資料結構，用來儲存資料，也可以儲存在變數中

- 是一種匿名、不可變的聚合型別

- 可以包含任意數量的欄位，可以將多個物件打包成單一物件

- 可以使用類似字典的方式來存取欄位。

- 可以用來模擬類似物件導向語言中的類別。

## 一、Record syntax: 紀錄語法

### Records範例

在Records中，我們使用"逗號"為括號內的每筆資料作分隔，並且可以用getter，$<position>或指定變數的方式取值。其中，當我們使用getter時是針對沒有命名的變數進行取值，所以可以由下列範例中的$2印出'last'字串，可以看到a, b兩個已命名變數會被跳過

```
void main() {
  var record = ('first', a: 2, b: true, 'last');
  print(record.$1); // 輸出第一欄位，'first'
  print(record.$2); // 輸出第二欄位，'last'(跳過命名的變數a,b)
  print(record.a);  // 輸出變數'a'的值
  print(record.b);  // 輸出變數'b'的值
}
```

record範例

我們由DartPad的Documentation欄位可以看到這是一個由兩個String, 一個int變數"a"與bool變數"b"組成的record變數

![](https://hackmd.io/_uploads/Sypsx2yh2.png)

- 輸出結果:

![](https://hackmd.io/_uploads/H1J_Zhkh3.png)

### Records用於回傳資料定義

而我們也可以用records的方式來定義回傳的資料，下方的(int, int)代表Records類型的註釋

```
(int, int) swap((int, int) record) { //用records的方式對回傳函式參數值進行規範
  var (a, b) = record;
  return (b, a);
}

void main() {
  var (a, b) = swap((1, 2));//交換前的數字陣列是(1,2)
  print('交換後的a: $a'); // 輸出2
  print('交換後的b: $b'); // 輸出1
}
```

Records類型註釋範例

- 輸出結果

![](https://hackmd.io/_uploads/SkdOv3yh3.png)

### Records宣告，包含變數與直接給定值

在宣告Records時，我們可以選擇連同變數與型別一起宣告的方式(用大括號將變數類型與名稱包含)

```
void main() {
//--------宣告Record變數與內部變數、型別-----------

({int a, bool b}) record;//用大括號表示Records內的變數宣告

// 給予Records初始化值: (a: 123, b: true)
record = (a: 123, b: true);

print('變數a: ${record.a}'); // 輸出 a 變數的值
print('變數b: ${record.b}'); // 輸出 b 變數的值

//--------宣告Records變數與內部型別---------------
(int, bool) record2;

// 給予Record2初始化值: (a: 123, b: true)
record2 = (123, true);

  print('欄位一: ${record2.$1}'); // 輸出欄位一的值
  print('欄位二: ${record2.$2}'); // 輸出欄位二的值
}
```

- 輸出結果:

![](https://hackmd.io/_uploads/HJKf021n2.png)

## 二、Record types

在我們未宣告變數時，系統也會明確知道Records內部真值的型別

```
void main() {
(num, Object) pair = (42, 'a');

var first = pair.$1; // 靜態型別`num`, 運行型別`int`.
var second = pair.$2; // 靜態型別 `Object`, 運行型別 `String`.

print(first.runtimeType); // 輸出運行型別，int
print(second.runtimeType); // 輸出運行型別，String
  
}
```

Record types範例

- 輸出結果:

![](https://hackmd.io/_uploads/rkFBz6J22.png)

## 三、Record equality

兩個 record 相等如果它們有相同的形狀（變數集合）和相應變數的值相同。 由於命名"順序"不是 record 的形狀的一部分，因此命名變數的順序"不影響"相等性。

以下是一些概念例子：

- ({x: 1, y: 2}) 和 ({y: 2, x: 1}) 是相等的，因為它們有相同的形狀（兩個字段 x 和 y）和相應字段的值相同。

- ({x: 1, y: 2}) 和 ({x: 1, y: 3}) 是不相等的，因為它們 y 的值不同。

- ({x: 1, y: 2}) 和 ({z: 1, y: 2}) 是不相等的，因為它們有不同的形狀（一個x 和另一個 z）。

## 五、Multiple returns

我們可以用Records的方式來簡化具有多重回傳值的情況，以下列範例為例，可以一次性的將多種型別與函數值對應在userInfo的函式中

```
void main() {
  // 定義一個 JSON 對象
  final json = {
    'name': 'Dash',
    'age': 10,
    'color': 'blue',
  };

  // 使用 record 模式獲取 name 和 age 字段的值
  var (name, age) = userInfo(json);

  // 輸出 name 和 age 的值
  print('Name: $name');
  print('Age: $age');
}

(String, int) userInfo(Map<String, dynamic> json) {
  // 返回 name 和 age 字段的值
  return (json['name'] as String, json['age'] as int);
}
```

Multiple returns範例

- 輸出結果:

![](https://hackmd.io/_uploads/r137Kp1n2.png)
