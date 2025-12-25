---
title: 無職轉生～在資工系就拿出真本事٩(๑•̀ω•́๑)۶【Flutter Go in 30 Days】：Day25 再加一點點網格系統，Lists &amp; Grids(下)
date: 2025-12-25
tags: [flutter, list, grid]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10327968
---

# 肆、不同類型List處理---Create lists with spaced items

參見 [List with spaced items](https://docs.flutter.dev/cookbook/lists/spaced-items)

平時，我們可以透過Spacer、Expanded等元件來規劃列表空間，但是這些方式在有限置空間的ListTile內是無法實行的。因此，我們會運用LayoutBuilder和ConstrainedBox作為List內的空間規劃元件，均勻分隔ListTile事項與在空間不足時允許滾動。

參照以下步驟：

添加一個帶有SingleChildScrollView的 LayoutBuilder

在 SingleChildScrollView 裡面加一個 ConstrainedBox

1. $1

## 一、添加帶有SingleChildScrollView的 LayoutBuilder

我們需要創建一個LayoutBuilder，包含兩個回傳參數:

- BuildContext: 由LayoutBuilder提供的上下文的對象。

- BoxConstraints：父元件的約束條件。

```
LayoutBuilder(builder: (context, constraints) {
  return SingleChildScrollView( //確保在空間不足時可以滾動
    child: Placeholder(),
  );
});
```

## 二、在 SingleChildScrollView 裡面加一個 ConstrainedBox

- 在子元件內再放置一個BoxConstraints，並設定其有最大的可用空間

```
LayoutBuilder(builder: (context, constraints) {
  return SingleChildScrollView(
    child: ConstrainedBox( //在子元件內再放置一個BoxConstraints
      constraints: BoxConstraints(minHeight: constraints.maxHeight),
      child: Placeholder(),
    ),
  );
});
```

## 三、建立一個有Spacer的Column

- 新增具有spaceBetween的項目與子元件，或是在兩兩間用spacer()作分隔

```
LayoutBuilder(builder: (context, constraints) {
  return SingleChildScrollView(
    child: ConstrainedBox(
      constraints: BoxConstraints(minHeight: constraints.maxHeight),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          ItemWidget(text: 'Item 1'),
          ItemWidget(text: 'Item 2'),
          ItemWidget(text: 'Item 3'),
        ],
      ),
    ),
  );
});
```

## 四、SpacedList使用範例

```
import 'package:flutter/material.dart';

void main() => runApp(const SpacedItemsList());

class SpacedItemsList extends StatelessWidget {
  const SpacedItemsList({super.key});

  @override
  Widget build(BuildContext context) {
    const items = 4;

    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        cardTheme: CardTheme(color: Colors.blue.shade50),
        useMaterial3: true,
      ),
      home: Scaffold(
        body: LayoutBuilder(builder: (context, constraints) {
          return SingleChildScrollView(
            child: ConstrainedBox(
              constraints: BoxConstraints(minHeight: constraints.maxHeight),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: List.generate(
                    items, (index) => ItemWidget(text: 'Item $index')),
              ),
            ),
          );
        }),
      ),
    );
  }
}

class ItemWidget extends StatelessWidget {
  const ItemWidget({
    super.key,
    required this.text,
  });

  final String text;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: SizedBox(
        height: 100,
        child: Center(child: Text(text)),
      ),
    );
  }
}
```

SpacedList使用範例

- 輸出結果

可以看到項目間有了空隔的呈現!

![](https://hackmd.io/_uploads/SJqvcZyla.png)

# 伍、不同類型List處理---Work with long lists

參見: [Work with long lists](https://docs.flutter.dev/cookbook/lists/long-lists)

如同我們在MixedList用到的技巧，我們在呈現大量相同資料的時候可以運用 LongItemList 的方式來呈現!通常:

- ListView: 用在少項目的List情況

- ListView.builder: 用在大量項目的List情況

假設我們今天有10000筆資料，我們就可以用ListView.builder自動產生項目

```
List<String>.generate(10000, (i) => 'Item $i'),
```

並且，我們將其轉為Widgets的模式放在程式中，以下用ListTile元件作為釋例

```
ListView.builder(
  itemCount: items.length,
  prototypeItem: ListTile(
    title: Text(items.first),
  ),
  itemBuilder: (context, index) {
    return ListTile(
      title: Text(items[index]),
    );
  },
)
```

### LongItemList使用範例

```
import 'package:flutter/material.dart';

void main() {
  runApp(
    MyApp(
      items: List<String>.generate(10000, (i) => 'Item $i'),
    ),
  );
}

class MyApp extends StatelessWidget {
  final List<String> items;

  const MyApp({super.key, required this.items});

  @override
  Widget build(BuildContext context) {
    const title = 'Long List';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(
          title: const Text(title),
        ),
        body: ListView.builder(
          itemCount: items.length,
          prototypeItem: ListTile(
            title: Text(items.first),
          ),
          itemBuilder: (context, index) {
            return ListTile(
              title: Text(items[index]),
            );
          },
        ),
      ),
    );
  }
}
```

LongItemList使用範例

- 輸出結果

這樣我們就可以用簡單的程式碼實現長資料列表的輸出型式!

![](https://hackmd.io/_uploads/H1hfhZ1xp.png)
