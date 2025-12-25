---
title: 無職轉生～在資工系就拿出真本事٩(๑•̀ω•́๑)۶【Flutter Go in 30 Days】：Day7 Hiii，Dart，初次見面你好嗎，Introdoction(下)
date: 2025-12-25
tags: [flutter, dart]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10314956
---

# 參、Introduction---Classes, Enums

參見: [Introduction to dart--Classes](https://dart.dev/language#classes)

## 一、類別(Classes)

在Dart中也可以使用"Class"，並且建立屬性與建構子，下列為一個範例，描述了一個概念性的類別範例"Spacecraft "，說明了類別的屬性"name", """"，以及特定屬性的特殊處理方法"describe()"。

- Class:

1. $1

2. $1

3. $1

main()
當我們要呼叫已創建的class時，就可以在mian()函式中新增符合class定義規則的物件與參數，並帶入欲執行方法

```
// 定義一個 Spacecraft 類別
class Spacecraft {
  String name; // 名稱屬性
  DateTime? launchDate; // 發射日期屬性

  // 讀取器，用來取得發射年份。使用 "=> launchDate?.year" 簡化寫法。
  int? get launchYear => launchDate?.year;

  // 建構子，使用語法糖(Syntactic sugar)簡化屬性賦值。
  Spacecraft(this.name, this.launchDate) {
    // 初始化程式碼放在這裡。
  }

  // 命名建構子，將參數傳遞給預設建構子。
  Spacecraft.unlaunched(String name) : this(name, null);

  // 方法，用來描述太空船的資訊。
  void describe() {
    print('太空船: $name');
    // 因為 launchDate 是可為 null 的屬性，所以在這裡使用 type promotion 不適用。
    var launchDate = this.launchDate;
    if (launchDate != null) {
      // 計算太空船發射後的年份。
      int years = DateTime.now().difference(launchDate).inDays ~/ 365;
      print('發射日期: $launchYear ($years 年前)\n');
    } else {
      print('發射日期: 尚未發射\n');
    }
  }
}

void main() {
  // 建立一個 Spacecraft 物件，使用建構子初始化屬性。
  var voyager = Spacecraft('航行者一號', DateTime(1977, 9, 5));
  voyager.describe(); // 輸出'航行者一號'太空船的資訊，包括發射年份和發射後的年數。

  var unnamed = Spacecraft.unlaunched('未命名太空船');
  unnamed.describe(); // 輸出'未命名太空船'的太空船資訊。
  
  //創建兩個額外的太空船物件，作為延伸要使用Spacecraft函式的範例
  var voyager2 = Spacecraft('Voyager II', DateTime(1987, 8, 20));
  voyager2.describe();

  var voyager3 = Spacecraft.unlaunched('Voyager III');
  voyager3.describe();
}
```

class範例

- 輸出結果

![](https://hackmd.io/_uploads/ryp3_YIi3.png)

## 二、列舉(Enums)

列舉（enum）是一種有用的資料型別，它用於定義一組具有相關值的常數。這些常數可以表示一系列可能的值，提高可讀性和維護性。

```
// 行星類型的列舉
enum PlanetType { terrestrial, gas, ice }

/// 行星列舉，列舉了我們太陽系中不同行星及其一些屬性。
enum Planet {
  mercury(planetType: PlanetType.terrestrial, moons: 0, hasRings: false), // 水星
  venus(planetType: PlanetType.terrestrial, moons: 0, hasRings: false), // 金星
  earth(planetType: PlanetType.terrestrial, moons: 1, hasRings: false), // 地球
  // ···
  uranus(planetType: PlanetType.ice, moons: 27, hasRings: true), // 天王星
  neptune(planetType: PlanetType.ice, moons: 14, hasRings: true); // 海王星

  /// 常量生成建構子
  const Planet(
      {required this.planetType, required this.moons, required this.hasRings});

  /// 所有實例變數都是 final
  final PlanetType planetType; // 行星類型
  final int moons; // 衛星數量
  final bool hasRings; // 是否有環

  /// 增強的列舉支援 getter 和其他方法
  bool get isGiant =>
      planetType == PlanetType.gas || planetType == PlanetType.ice; // 判斷是否為巨型行星
}

void main() {
  final yourPlanet = Planet.earth; // 創建一個行星變數，並設置為地球

  if (!yourPlanet.isGiant) {
    print('你的行星不是 "巨型行星"。');
  }
}
```

- 輸出結果

![](https://hackmd.io/_uploads/B1chTKUsh.png)

# 肆、Introduction---繼承(Inheritance)

## 一、延伸(extend)

我們可以用extends的方式，將原有的Class屬性繼承，並依據需求在原有的類別上增添需要的屬性資料。例如，我們新定義一個Orbiter類別，其繼承Spacecraft，並且會新增一個"altitude"，代表軌道高度的屬性

```
// 定義一個 Orbiter 類別，它繼承自 Spacecraft 類別
class Orbiter extends Spacecraft {
  double altitude; // 定義軌道高度屬性

  // 建構子，使用語法糖簡化屬性賦值
  // 建構子接收三個參數：name, launchDate 和 altitude
  // 使用 super 關鍵字呼叫父類別的建構子來初始化 name 和 launchDate 屬性
  // 使用 this 關鍵字初始化 altitude 屬性
  Orbiter(String name, DateTime launchDate, this.altitude)
      : super(name, launchDate);
}
```

在使用上，Orbiter物件比原先的Spacecraft物件多了"軌道高度"的參數

![](https://hackmd.io/_uploads/rJLUZq8oh.png)

## 二、混合(Mixins)

Mixin是一種用於在多個類別中重複使用程式碼的機制，通過with關鍵字將Mixin混合到其他類別中，使得類別可以獲得Mixin中定義的功能，提高靈活性。例如，我們定義一個"Piloted"的Mixin，具有

1. $1

2. $1

```
// 定義一個混合 (Mixin)
mixin Piloted {
  int astronauts = 1; // 定義太空船上的宇航員數量

  // 定義用來描述太空船上宇航員數量的方法
  void describeCrew() {
    print('太空人數量: $astronauts 名');
  }
}
```

在使用上，我們可以透過新增"Piloted"的方式來使用額外定義原有的方法describe()與新的方法describeCrew()

![](https://hackmd.io/_uploads/rJbr8q8j2.png)

## 三、實現(implements)

implements是一種可以將一個類別實現為多個"介面(Implicit interfaces)"，方便類別之間共享行為。例如我們定義一個"MockSpaceship"類別，他是原本"Spacecraft類別"的實現介面

```
// 定義一個 MockSpaceship 類別，實現(implements) Spacecraft類別
class MockSpaceship implements Spacecraft {
  @override
  String name;
  @override
  DateTime? launchDate;

  MockSpaceship(this.name, this.launchDate);

  @override
  int? get launchYear => launchDate?.year;

  @override
  void describe() {
    print('太空船: $name');
    var launchDate = this.launchDate;
    if (launchDate != null) {
      int years = DateTime.now().difference(launchDate).inDays ~/ 365;
      print('發射日期: $launchYear ($years 年前)\n');
    } else {
      print('發射日期: 尚未發射\n');
    }
  }
}
```

在使用上，在我們定義並實現了MockSpaceship介面後，變可以用呼叫"MockSpaceship物件"的方式達成原本呼叫"Spacecraft物件"的功能(兩個不同的類別，在"implement"的作用下，執行相同功能)

![](https://hackmd.io/_uploads/ryj6s5Ij3.png)

## 四、結合Class, Extend, Mixin, implement 綜合應用範例

我們將原有的Class與Extend, Mixin, implement中提到的"Orbiter"、"Piloted"、"MockSpaceship"進行結合，變為以下程式範例

```
// 定義一個 Spacecraft 類別
class Spacecraft {
  String name; // 名稱屬性
  DateTime? launchDate; // 發射日期屬性

  // 讀取器，用來取得發射年份。使用 "=> launchDate?.year" 簡化寫法。
  int? get launchYear => launchDate?.year;

  // 建構子，使用語法糖簡(Syntactic sugar)化屬性賦值。
  Spacecraft(this.name, this.launchDate) {
    // 初始化程式碼放在這裡。
  }

  // 命名建構子，將參數傳遞給預設建構子。
  Spacecraft.unlaunched(String name) : this(name, null);

  // 方法，用來描述太空船的資訊。
  void describe() {
    print('太空船: $name');
    // 因為 launchDate 是可為 null 的屬性，所以在這裡使用 type promotion 不適用。
    var launchDate = this.launchDate;
    if (launchDate != null) {
      // 計算太空船發射後的年份。
      int years = DateTime.now().difference(launchDate).inDays ~/ 365;
      print('發射日期: $launchYear ($years 年前)\n');
    } else {
      print('發射日期: 尚未發射\n');
    }
  }
}

// 定義一個混合 (Mixin)
mixin Piloted {
  int astronauts = 1; // 定義太空船上的宇航員數量

  // 定義用來描述太空船上宇航員數量的方法
  void describeCrew() {
    print('太空人數量: $astronauts\n');
  }
}

// 定義一個繼承 Spacecraft 並混合 Piloted 的類別
class PilotedCraft extends Spacecraft with Piloted {
  // 建構子，使用 super 關鍵字呼叫父類別的建構子來初始化 name 和 launchDate 屬性
  PilotedCraft(String name, DateTime launchDate) : super(name, launchDate);
}

// 定義一個 MockSpaceship 類別，實現(implements) Spacecraft類別
class MockSpaceship implements Spacecraft {
  @override
  String name;
  @override
  DateTime? launchDate;

  MockSpaceship(this.name, this.launchDate);

  @override
  int? get launchYear => launchDate?.year;

  @override
  void describe() {
    print('太空船: $name');
    var launchDate = this.launchDate;
    if (launchDate != null) {
      int years = DateTime.now().difference(launchDate).inDays ~/ 365;
      print('發射日期: $launchYear ($years 年前)\n');
    } else {
      print('發射日期: 尚未發射\n');
    }
  }
}

void main() {
  // 建立一個 Spacecraft 物件，使用建構子初始化屬性。
  var voyager = Spacecraft('航行者一號', DateTime(1977, 9, 5));
  voyager.describe(); // 輸出'航行者一號'太空船的資訊，包括發射年份和發射後的年數。

  var unnamed = Spacecraft.unlaunched('未命名太空船');
  unnamed.describe(); // 輸出'未命名太空船'的太空船資訊。

  // 創建兩個額外的太空船物件，作為延伸要使用 Spacecraft 函式的範例
  var voyager2 = Spacecraft('Voyager II', DateTime(1987, 8, 20));
  voyager2.describe();

  var voyager3 = Spacecraft.unlaunched('Voyager III');
  voyager3.describe();

  // 創建 PilotedCraft 物件，測試 PilotedCraft 類別
  var pilotedCraft = PilotedCraft('Piloted I', DateTime(2005, 3, 15));
  pilotedCraft.describe(); // 輸出 'Piloted I' 太空船的資訊，包括發射年份和發射後的年數。
  pilotedCraft.describeCrew(); // 輸出 'Number of astronauts: 1'，太空船上有1名宇航員。

  // 創建 MockSpaceship 物件，測試 MockSpaceship 類別
  var mockSpaceship = MockSpaceship('MockShip', DateTime(2022, 7, 1));
  mockSpaceship.describe(); // 輸出 '太空船: MockShip' 和發射日期
}
```

Inheritance範例

- 輸出結果

![](https://hackmd.io/_uploads/Bk35n5Ijh.png)

## 五、抽象(abstract)

抽象(abstract)類別可以包含抽象方法，這些方法沒有實際的程式內容，只是定義方法的規範，並且可以被具體類別繼承(extend)或實現(implement)。

在下述範例中，"MyClass"是一個具體的類別，實現了 "Describable抽象類別"的describe() 方法，並提供了具體的描述內容。

```
// 定義抽象類別 Describable
abstract class Describable {
  void describe();//沒有方法的具體程式碼

  void describeWithEmphasis() {
    print('\n=========');
    describe();
    print('=========');
  }
}

// 定義一個具體的類別，實現 Describable 抽象類別
class MyClass extends Describable {
  String description;

  MyClass(this.description);

  @override
  void describe() {
    print('Description: $description');
  }
}

void main() {
  // 創建 MyClass 物件
  var myObject = MyClass('This is a sample description.');

  // 呼叫 describe() 方法，輸出
  myObject.describe();

  // 呼叫 describeWithEmphasis() 方法，以"強調形式"輸出
  myObject.describeWithEmphasis();
}
```

abstract範例

- 輸出結果

黃框為"describeWithEmphasis()"之內容

![](https://hackmd.io/_uploads/Ske_woUsn.png)
