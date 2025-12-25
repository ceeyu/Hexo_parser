---
title: 無職轉生～在資工系就拿出真本事٩(๑•̀ω•́๑)۶【Flutter Go in 30 Days】：Day23 再加一點點網格系統，Lists &amp; Grids(上)
date: 2025-12-25
tags: [flutter, list, grid]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10327954
---

# 壹、Lists

參見: [Flutter Use lists](https://docs.flutter.dev/cookbook/lists/basic-list)

接下來，我們將針對 List&Grids 進行更詳盡的介紹!包含從基本的ListView元件，更深入探討他的進階運用、網格的編排等!

## 一、Create and use

首先我們簡易複習一下，經過昨天的介紹，我們可以很簡單的構建一個基本的ListView範例，如下所示

### ListView 基本範例複習

```
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'Basic List';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(
          title: const Text(title),
        ),
        body: ListView(
          children: const <Widget>[
            ListTile(
              leading: Icon(Icons.map),
              title: Text('Map'),
            ),
            ListTile(
              leading: Icon(Icons.photo_album),
              title: Text('Album'),
            ),
            ListTile(
              leading: Icon(Icons.phone),
              title: Text('Phone'),
            ),
          ],
        ),
      ),
    );
  }
}
```

ListView 基本範例複習

- 輸出結果

![](https://hackmd.io/_uploads/SkGS7TqJT.png)

## 二、Create a horizontal list

若是我們不想採取「垂直」條列的方式，我們也可以透過使用scrollDirection: Axis.horizontal的調整方式，將方向變為「水平」條列

```
scrollDirection: Axis.horizontal,//將ListView滾動方向從預設的「垂直」改為「水平」
```

### 水平方向ListView使用範例

以下的範例便是用scrollDirection: Axis.horizontal的方式，呈現一個水平方向條列的ListView項目，由五個不同顏色的Container水平排列所組成。可以注意到，這裡我們並沒有使用到 Row元件，僅是由scrollDirection的改動來更換條列方式，並且方向的優先序位為由左到右依序呈現。

```
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'Horizontal List';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(
          title: const Text(title),
        ),
        body: Container(
          margin: const EdgeInsets.symmetric(vertical: 20),
          height: 200,
          child: ListView(
            scrollDirection: Axis.horizontal,//設置為水平方向滾動
            children: <Widget>[
              Container(
                width: 160,
                color: Colors.red,
              ),
              Container(
                width: 160,
                color: Colors.blue,
              ),
              Container(
                width: 160,
                color: Colors.green,
              ),
              Container(
                width: 160,
                color: Colors.yellow,
              ),
              Container(
                width: 160,
                color: Colors.orange,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

水平方向ListView使用範例

- 輸出結果

![](https://hackmd.io/_uploads/Sk0Ada9Jp.png)

# 貳、Grids

[Create a grid list](https://docs.flutter.dev/cookbook/lists/grid-lists)

有時候，我們呈現的資料不一定為List的模式(例如: 一行為一個資料區塊)，而是可能為「網格」的呈現方式，那我們便可以使用Grid List的方式來呈現!

## 一、Create a grid view

### GridView.count特性

在這段程式中，有以下幾點特性

crossAxisCount: 2：指定網格佈局中的列數為2，因此會產生一個包含兩列的網格。

List.generate(100, (index) { ... })：使用List.generate函數來產生一個包含100個資料的清單。 每筆資料皆為置中Text，並顯示在列表中的索引位置，例如"Item 0"，"Item 1"。

```
GridView.count(
  crossAxisCount: 2, //指定列數的數量為2
  children: List.generate(100, (index) {//產生100個子元件，每個元件皆為顯示index位置的置中Text
    return Center(
      child: Text(
        'Item $index',
        style: Theme.of(context).textTheme.headlineSmall,
      ),
    );
  }),
),
```

### GridView.count使用範例

```
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'Grid List';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(
          title: const Text(title),
        ),
        body: GridView.count(
          crossAxisCount: 2, //指定列數的數量為2
          children: List.generate(100, (index) {//產生100個子元件，每個元件皆為顯示index位置的置中Text
            return Center(
              child: Text(
                'Item $index',
                style: Theme.of(context).textTheme.headlineSmall,
              ),
            );
          }),
        ),
      ),
    );
  }
}
```

GridView.count使用範例

- 輸出結果

![](https://hackmd.io/_uploads/H1dhyRc1T.png)
