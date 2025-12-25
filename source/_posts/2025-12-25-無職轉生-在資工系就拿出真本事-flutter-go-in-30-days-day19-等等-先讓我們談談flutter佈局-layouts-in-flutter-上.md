---
title: 無職轉生～在資工系就拿出真本事٩(๑•̀ω•́๑)۶【Flutter Go in 30 Days】：Day19 等等，先讓我們談談Flutter佈局: Layouts in Flutter(上)
date: 2025-12-25
tags: [flutter, layout]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10317411
---

參見: [Layouts in Flutter](https://docs.flutter.dev/ui/layout#lay-out-a-widget)
程式碼參見:[pavlova](https://github.com/flutter/website/tree/main/examples/layout/pavlova)、[sizing](https://github.com/flutter/website/tree/main/examples/layout/sizing)、[row_column](https://github.com/flutter/website/tree/main/examples/layout/row_column)、
[grid_and_list](https://github.com/flutter/website/tree/main/examples/layout/grid_and_list)、[bottom_navigation_demo.dart](https://github.com/flutter/gallery/blob/main/lib/demos/material/bottom_navigation_demo.dart)

# 壹、Lay out multiple widgets vertically and horizontally

## 一、元件樹

通常在Flutter中，我們使用的元件會有相互層遞的父子關係，每個圓圈都代表一個元件群，我們在撰寫程式時也可以透過類似的書寫方式來釐清元件間的關聯

- 越上層是包裹越外圍的元件

- 越下層是包裹越內層的元件

- 葉子的部分則為單一元件

![](https://hackmd.io/_uploads/rkrCW-IC3.png)

## 二、Row與Column

通常我們在規劃構圖時，都會針對「水平(Row)、垂直(Column)」進行組件的分割。以下圖為例，可以看到不同的Row與Column規劃，並且圖中的紅框皆代表同一Row、綠框皆代表同一Column

- 外層的紅框: 包含兩個子元件，一個圖片與Column元件

- 左方綠框: 包含了四個子元件，包含了兩段文字、星等與其他資訊

![](https://hackmd.io/_uploads/BkxyfcgUCn.png)

而按照同樣邏輯，我們可以把綠框內的元件再行細分為不同的Row與Column組成，直到我們的目標對象已經是獨立元件或是群組為止。

![](https://hackmd.io/_uploads/r1-YqgUAh.png)

如果以元件樹的方式概略可以畫為下圖

![](https://hackmd.io/_uploads/r1r2Ib802.png)

同時，Flutter也提供更為方便的元件來管理Row與Column的行為，像是ListTile與ListView等。

- ListTile：提供了用於設置leading 和trailing 的屬性，支持單列最多3行文字的列表項目。

- ListView：通常會包覆在ListTile外，具有自動滾動功能

## 三、Aligning widgets

在Row與Column中，Flutter也提供了對齊的元件，mainAxisAlignment與crossAxisAlignment，並且我們在定義Main Axis與Cross Axis時會針對目前的"主方向"而定

- 若是對象為Row，則橫向為Main Axis、縱向為Cross Axis

- 若是對象為Column，則縱向為Main Axis、橫向為Cross Axis

![](https://hackmd.io/_uploads/r19mtWLRh.png)

並且，提供不同的對齊方式

- center: 置中

- end: 靠近尾端

- start: 靠近起點

- spaceAround: 去除子元素空間的均分，兩端有留空

- spaceBetween: 兩端貼齊頭與尾，中間元件空間均分

- spaceEvenly: 所有空間均分，兩端有留空

![](https://hackmd.io/_uploads/SyqojZLCh.png)

### Row 的 mainAxisAlignment使用範例

```
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Row Example'),
        ),
        body: Center(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround, // 元件在Row主軸上對齊方式，空間的均分，兩端有留空
            children: <Widget>[
              Container(
                color: Colors.red,
                width: 50.0,
                height: 50.0,
              ),
              Container(
                color: Colors.green,
                width: 50.0,
                height: 50.0,
              ),
              Container(
                color: Colors.blue,
                width: 50.0,
                height: 50.0,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

Row 的 mainAxisAlignment使用範例

- 輸出結果

![](https://hackmd.io/_uploads/BJua0-LC3.png)

### Column 的 mainAxisAlignment使用範例

```
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Column Example'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center, // // 元件在Row主軸上對齊方式，置中
            children: <Widget>[
              Container(
                color: Colors.red,
                width: 50.0,
                height: 50.0,
              ),
              Container(
                color: Colors.green,
                width: 50.0,
                height: 50.0,
              ),
              Container(
                color: Colors.blue,
                width: 50.0,
                height: 50.0,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

Column 的 mainAxisAlignment使用範例

- 輸出結果

![](https://hackmd.io/_uploads/rJW_yzIC2.png)

## 四、Sizing widgets:  Expanded 元件

在Flutter中，若是使用的元件在呈現上超過了頁面大小，會出現Error與在畫面上呈現黃黑交錯的膠條，這個時候，我們可以選擇使用Expanded元件來避免這個問題

![](https://hackmd.io/_uploads/HkkOrzIR2.png)

- 報錯顯示

![](https://hackmd.io/_uploads/B1jjrMLAh.png)

### Expanded元件使用方式

```
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Row Example'),
        ),
        body: Center(
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Expanded( //使用Expended元件，避免圖片超過大小而出現Error
                child: Image.network(
                  'https://flutter.github.io/assets-for-api-docs/assets/widgets/owl.jpg',
                  fit: BoxFit.cover, //圖片填充方式
                ),
              ),
              Expanded(
                flex: 2,//可以更改係數來調整圖片格式，預設為1
                child: Image.network(
                  'https://flutter.github.io/assets-for-api-docs/assets/widgets/owl.jpg',
                  fit: BoxFit.cover, 
                ),
              ),
              Expanded(
                child: Image.network(
                  'https://flutter.github.io/assets-for-api-docs/assets/widgets/owl.jpg',
                  fit: BoxFit.cover, 
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

Expanded元件使用方式

- 輸出結果

![](https://hackmd.io/_uploads/r1RizGUC3.png)

我們也可以更改flex係數，來改變圖片呈現的大小比例，例如我們在剛剛的程式碼第二張圖片加上flex: 2的描述

![](https://hackmd.io/_uploads/ryovmGUC3.png)

- 輸出結果

可以看到第二張圖片的呈現比例變大，具有凸顯的效果

![](https://hackmd.io/_uploads/Hy0amz8Rh.png)

## 五、Packing widgets: 包裝元件

有時候，我們會需要元件間的距離更為緊密，例如: 製作星等的效果。那麼，我們就可以用mainAxisSize: MainAxisSize.min的指定方式，將Row的主軸設為最小，以達成此效果

### 星等包裝使用方式

```
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Star Icons'),
        ),
        body: Center(
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(Icons.star, color: Colors.green[500]),
              Icon(Icons.star, color: Colors.green[500]),
              Icon(Icons.star, color: Colors.green[500]),
              const Icon(Icons.star, color: Colors.black),
              const Icon(Icons.star, color: Colors.black),
            ],
          ),
        ),
      ),
    );
  }
}
```

星等包裝使用方式

- 輸出結果

![](https://hackmd.io/_uploads/HkpEVPP0n.png)
