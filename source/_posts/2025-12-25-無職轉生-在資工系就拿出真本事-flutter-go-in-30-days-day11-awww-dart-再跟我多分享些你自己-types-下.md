---
title: 無職轉生～在資工系就拿出真本事٩(๑•̀ω•́๑)۶【Flutter Go in 30 Days】：Day11 Awww，Dart，再跟我多分享些你自己，Types(下)
date: 2023-09-19 11:00:00
tags: [flutter, dart]

source: https://ithelp.ithome.com.tw/articles/10314962
series: Flutter 30天
categories:
  - Flutter 30天
---

# 參、Types -- Generics: 泛型

參見: [Dart Language: Generics](https://dart.dev/language/generics)

## 一、使用泛型的原因

- 允許撰寫適用於多種資料類型的通用程式碼，而不須為每種資料類型重複撰寫相同的邏輯

- 減少重複程式，且在多種類型間可以定義同一個介面實現

我們使用以下範例情況來說明，假設我們今天宣告了一個Object的Class，

```
abstract class ObjectCache {
  Object getByKey(String key);
  void setByKey(String key, Object value);
}
```

Object型別的Cache Class範例

並且在宣告後，我們發現又需要額外"相同功能"，但Value型別不同的Class(舉例如下:兩個額外的宣告，分別用於String與int型別)

```
abstract class StringCache { //String型別同功能Class
  String getByKey(String key);
  void setByKey(String key, String value);
}

abstract class IntCache { //int型別同功能Class
  String getByKey(String key);
  void setByKey(String key, int value);
}
```

String,int型別的Cache Class範例

我們可以看到在Class的結構上，三個宣告式都是相同的，唯一不同的只有Value所對應的對象(型別上的不同)，因此，我們就可以用"泛型"的宣告方式來解決這樣的程式碼重複問題，我們可以將上述的宣告改為泛型宣告，並且用符號<T>代表「替代類型」，方便我們在宣告後各自帶入不同的型別作為使用

```
abstract class Cache<T> {
  T getByKey(String key);
  void setByKey(String key, T value);
}
```

泛型的Cache Class範例

## 二、Collection literals: 集合的參數化文字示範

在進入到泛型的使用前，我們先提到另一個型別的表示方式。我們可以用<type>加在List或Sets錢的方式定義型別，而在Map，我們也可以在原有的key-value對前加上<keyType, valueType>來定義兩者的型別

```
var names = <String>['Seth', 'Kathy', 'Lars']; //型別為String的List
var uniqueNames = <String>{'Seth', 'Kathy', 'Lars'};//型別為String的Set
var pages = <String, String>{ //key-value型別皆為String的Map
  'index.html': 'Homepage',
  'robots.txt': 'Hints for web robots',
  'humans.txt': 'We are people, not machines'
};
```

參數化類型範例

## 三、Using parameterized types with constructors: 參數化型別與構造函式的使用

而我們在使用上，會在呼叫構造函式時，會將<type>加在Set或Map的後方，如下列範例中，我們在宣告"nameSet"時將原本的字串陣列"names"轉換為一個String的字串集合，便使用了Set<String>的撰寫方式；同理，我們創建一個"views"的參數時，也使用了Map<int, View>()的方式作為型別定義

```
void main() {
  // 創建一個字串列表，使用泛型語法指定元素類型為字串
  var names = <String>['Seth', 'Kathy', 'Lars'];

  // 將字串列表轉換為字串集合，並指定元素類型為字串
  var nameSet = Set<String>.from(names);

  // 創建一個整數到 View 物件的鍵值對映射，View 是自定義的類別
  var views = Map<int, View>();
  views[1] = View(title: 'First View');
  views[2] = View(title: 'Second View');
  
  // 輸出結果
  print('字串集合: $nameSet');
  print('鍵值對映射: $views');
}

// 自定義 View 類別
class View {
  final String title;

  View({required this.title});

  @override
  String toString() {
    return 'View{title: $title}';
  }
}
```

參數化型別與構造函式的使用範例

- 輸出結果

![](https://hackmd.io/_uploads/BymwlKf23.png)

## 三、參數化類型的限制:extends

我們可以用extends關鍵字對T的型別做限制，如以下範例中，我們限制了泛型類別僅可以為shape已繼承的對象(也就是circle, square, triangle)

```
class Shape {}

class Circle extends Shape {} //用extends繼承Shape類別為Circle
class Square extends Shape {} //用extends繼承Shape類別為Square
class Triangle extends Shape {} //用extends繼承Shape類別為Triangle

class Geometry<T extends Shape> {  // 泛型類別 Geometry，泛型參數 T 必須是 Shape 或其子類的實例(shape繼承的對象)
  String toString() => "Geometric figure: 'Geometry<$T>'";
}

void main() {
  var circleGeometry = Geometry<Circle>(); //將T帶微Circle
  var squareGeometry = Geometry<Square>();//將T帶微Square
  var triangleGeometry = Geometry<Triangle>();//將T帶微Triangle

  print(circleGeometry);
  print(squareGeometry);
  print(triangleGeometry);
}
```

參數化類型的限制，extends範例

- 輸出結果:

![](https://hackmd.io/_uploads/HJLretz32.png)

假設我們今天新增了一個StringGeometry()函式，並且將型別設為"String"，那麼就會因為String並不屬於shape的繼承類別，而受到限制，並產生error

![](https://hackmd.io/_uploads/ByUepdM3h.png)

# 肆、typedef: 類型定義

參考: [Dart Language: Typedefs](https://dart.dev/language/typedefs)

## 一、typedef介紹

- 是一種用來定義函式類型別名的關鍵字，可以給一個函式的型別一個簡短易懂的名稱，方便引用

- 可以用來宣告各種不同型別的函式，包括參數和返回值都是函式的情況。

## 二、typedef使用範例

我們在以下範例中，分別使用typedef的方式定義了兩個函式型別"MyFunction"與"CompareFunction"，在主函式中，便可以直接使用定義出的兩個型別來進行宣告與使用

```
// 定義一個函式型別別名 MyFunction，這個型別接受兩個 int 參數並返回一個 int 值
typedef MyFunction = int Function(int, int);

// 定義一個函式型別別名 CompareFunction，這個型別接受兩個泛型參數 T，並返回一個 int 值
typedef CompareFunction<T> = int Function(T, T);

void main() {
  // 使用定義的函式型別別名 MyFunction
  MyFunction add = (a, b) => a + b;
  print('MyFunction的add函式，輸出2+3= ${add(2, 3)}'); // 輸出：5

  // 使用定義的函式型別別名 CompareFunction
  CompareFunction<int> compareInts = (a, b) => a.compareTo(b);
  print('CompareFunction 的compareInts函式，輸出1代表5>3: ${compareInts(5, 3)}'); // 輸出：1，表示 5 > 3
}
```

typedef使用範例

- 輸出結果:

![](https://hackmd.io/_uploads/rJd1xYfhh.png)
