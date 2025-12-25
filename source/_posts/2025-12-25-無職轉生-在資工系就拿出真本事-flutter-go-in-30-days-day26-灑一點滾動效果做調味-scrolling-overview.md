---
title: 無職轉生～在資工系就拿出真本事٩(๑•̀ω•́๑)۶【Flutter Go in 30 Days】：Day26 灑一點滾動效果做調味，Scrolling Overview
date: 2025-12-25
tags: [flutter, scrolling]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10333862
---

參見: [Flutter Scrolling](https://docs.flutter.dev/ui/layout/scrolling)

# 壹、Scrolling Overview

我們在前幾天的List&Grid中，介紹了不同的列表用法，其中在ListView, ListView.builder,GridView, GridView.builder 也使用到了基礎的滾動特效。而接續我們會介紹更多Flutter中關於「滾動效果」的特色與使用方法，方便我們在規劃app時能夠給予用戶更好的使用體驗!

## 一、Specialized scrollable widgets---DraggableScrollableSheet

參見: [DraggableScrollableSheet class](https://api.flutter.dev/flutter/widgets/DraggableScrollableSheet-class.html)

### DraggableScrollableSheet 格式與特性介紹

DraggableScrollableSheet 元件提供我們一個在特定螢幕大小範圍內可以滾動的效果，通常用於在視窗底部(Bottom)彈出資訊的欄位。以下提供本元件用法：

- 可滾動區域，child： DraggableScrollableSheet 包含一個可拖動的區域，用戶可以通過拖動此區域來展開或收縮內容。Child通常使用 ListView、Column 或 CustomScrollView 來實現滾動效果。這個範例中我們使用ListTile作為示範

builder 函數： 包含兩個參數：

- BuildContext: 內容上下文

- ScrollController。與滾動內容相關的控制器，可以使用它來控制滾動位置、監聽滾動事件以及實現一些自定義滾動效果。並且需要把它傳遞給使用的 Child Widget達成滾動效果（例如 ListView.builder）

外觀： 可以自定義背景顏色、邊框、陰影等。可以用 Container 包裝方便調整。
高度調整： 包含 initialChildSize、maxChildSizem與minChildSize，分別控制預設、最大、最小與父元件的高度比例，方便根據需求自由調整大小。

```
DraggableScrollableSheet(

          initialChildSize: 0.5, // 初始高度佔父元件的比例
          maxChildSize: 0.9,     // 最大高度佔父元件的比例
          minChildSize: 0.2,     // 最小高度佔父元件的比例
          
          builder: (BuildContext context, ScrollController scrollController) {
            return Container(
              color: Colors.blue[100],//背景顏色
              child: ListView.builder( //主要可滾動區域
                controller: scrollController,//滾動控制器
                itemCount: 25,
                itemBuilder: (BuildContext context, int index) {
                  return ListTile(title: Text('Item $index'));
                },
              ),
            );
          },
        ),
```

### DraggableScrollableSheet 使用範例

這個範例我們示範如何用DraggableScrollableSheet元件製作個預設佔有一半螢幕空間的List效果，index從0\~24

```
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({Key? key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('DraggableScrollableSheet'),
      ),
      body: SizedBox.expand(
        child: DraggableScrollableSheet(
          
          initialChildSize: 0.5, // 初始高度佔父元件的比例
          maxChildSize: 0.9,     // 最大高度佔父元件的比例
          minChildSize: 0.2,     // 最小高度佔父元件的比例

          builder: (BuildContext context, ScrollController scrollController) {
            return Container(
              color: Colors.blue[100],
              child: ListView.builder(
                controller: scrollController,
                itemCount: 25,
                itemBuilder: (BuildContext context, int index) {
                  return ListTile(title: Text('Item $index'));
                },
              ),
            );
          },
        ),
      ),
    );
  }
}
```

DraggableScrollableSheet 使用範例

- 輸出結果

藍色的List部分可以滾動，上方白色部分則可以放置原有的內容，不會跟著滾動!

![](https://hackmd.io/_uploads/HJExYqfx6.png)

## 二、Nested scrolling widgets ---SliverChildBuilderDelegate

參見: [SliverChildBuilderDelegate class](https://api.flutter.dev/flutter/widgets/SliverChildBuilderDelegate-class.html)
參見: [SliverList class](https://api.flutter.dev/flutter/widgets/SliverList-class.html)

當我們在視窗中需要多個滾動的事件，為了達成較為複雜的滾動嵌套事件，我們會使用SilverGrid、SilverList的方式來達成。而以下我們會用SliverChildBuilderDelegate元件來介紹如何靈活運用此複雜滾動效果!

### SliverChildBuilderDelegate 格式與特性介紹

以下提供本元件的範例用法：

SliverChildBuilderDelegatem元件建立一個包含兩個卡片的SliverList。 每個卡片內部包含

- 文字部分

- 一個有滾動的嵌套ListView.builder。

元件詳細內部功能細分如下:

**delegate** : 當我們使用字定義的元件時會使用此屬性，在CustomScrollView和Sliver中，"delegate"常用於定義子元件的生成方式來達到更靈活配置的行為

**SliverChildBuilderDelegate**:用於動態建立SliverList的子元件。

**(BuildContext context, int index)**：匿名函數，包含兩個參數：

- context用於建構widget

- index表示子元件的索引。 此釋例中，index的值在0和1之間，因為在childCount中設為2。

**Card**：每張卡片是Card widget，用於包裝內容並提供卡片效果。

**Column**：每個卡片內部包含一個Column，它包含了一個文字與一個嵌套ListView.builder的兩個子部分

**Text('Grid Item $ index')**：每個卡片的標題，其中$index是當前卡片的索引號碼。

**Expanded**：用於填滿剩餘可用空間，方便滾動不受限制。

**ListView.builder**：根據索引號碼建立10個ListTile子元件

```
delegate: SliverChildBuilderDelegate(
                (BuildContext context, int index) {
                  return Card( //卡片元件
                    margin: const EdgeInsets.all(8.0),
                    child: Column(
                      children: <Widget>[
                        Text('Grid Item $index'),
                        Expanded(
                          child: ListView.builder(
                            itemCount: 10, // 列表中的項目數
                            itemBuilder: (BuildContext context, int subIndex) {
                              return ListTile(
                                title: Text('Sub Item $subIndex'),
                              );
                            },
                          ),
                        ),
                      ],
                    ),
                  );
                },
                childCount: 2, //index值為0\~1
              ),
```

### SliverChildBuilderDelegate 使用範例

最外層我們使用CustomScrollView元件，預先設定

- semanticChildCount：此屬性用於設定自定義的語意(semantic)子元素的數量，這裡設定為4個。

- slivers：主要子元件，包含了由SliverGrid創建的自訂的滾動佈局。

接下來，slivers內具有兩個SliverGrid元件，分別包含了上面提及的SliverChildBuilderDelegate元件，其中

- 第一個SliverGrid內，有兩列SliverChildBuilderDelegate，並且每個卡片子索引ListTile由0\~9計算

- 第二個SliverGrid內，同樣有兩列SliverChildBuilderDelegate，並且每個卡片子索引ListTile做了"subindex+5"的變化，由5\~14計算

最後我們會再由semanticIndexOffset: 2代表兩行卡片間的 index (第一行為Griditem 0-1、第二行為2-3)，相差(偏移量)為2

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
          title: const Text('CustomScrollView Example'),
        ),
        body: CustomScrollView(
          semanticChildCount: 4,
          slivers: <Widget>[
            SliverGrid(
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
              ),
              delegate: SliverChildBuilderDelegate(
                (BuildContext context, int index) {
                  return Card(
                    margin: const EdgeInsets.all(8.0),
                    child: Column(
                      children: <Widget>[
                        Text('Grid Item $index'),//設為第二行的索引號Grid item0,1
                        Expanded(
                          child: ListView.builder(
                            itemCount: 10, // 列表中的項目數
                            itemBuilder: (BuildContext context, int subIndex) {
                              return ListTile(
                                title: Text('Sub Item $subIndex'), //設為卡片索引號，為0\~9
                              );
                            },
                          ),
                        ),
                      ],
                    ),
                  );
                },
                childCount: 2,
              ),
            ),
            SliverGrid(
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
              ),
              delegate: SliverChildBuilderDelegate(
                (BuildContext context, int index) {
                  return Card(
                    margin: const EdgeInsets.all(8.0),
                    child: Column(
                      children: <Widget>[
                        Text('Grid Item ${index + 2}'),//設為第二行的索引號Grid item2,3
                        Expanded(
                          child: ListView.builder(
                            itemCount: 10, // 列表中的項目數
                            itemBuilder: (BuildContext context, int subIndex) {
                              return ListTile(
                                title: Text('Sub Item ${subIndex + 5}'), //設為卡片索引號+5，為5\~14
                              );
                            },
                          ),
                        ),
                      ],
                    ),
                  );
                },
                childCount: 2,
                semanticIndexOffset: 2,//兩者語意項目索引的偏移量
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

- 輸出結果

![](https://hackmd.io/_uploads/Hy8XQoMep.png)
