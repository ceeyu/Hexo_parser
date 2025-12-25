---
title: 無職轉生～在資工系就拿出真本事٩(๑•̀ω•́๑)۶【Flutter Go in 30 Days】：Day24 再加一點點網格系統，Lists &amp; Grids(中)
date: 2023-10-02 24:00:00
tags: [flutter, list, grid]

source: https://ithelp.ithome.com.tw/articles/10327964
series: Flutter 30天
categories:
  - Flutter 30天
---

# 參、不同類型List處理---Create lists with different types of items

參見: [Create lists with different types of items](https://docs.flutter.dev/cookbook/lists/mixed-list)

在List中，也有許多不同類型的變化可以作使用，包含以下幾個場景:

- 當List內有不同樣式的子元件

- List內需要額外的空格空間

- List內需要有多項類似的項目需呈現

倘若List內部需要有不同的子元件組成時，結構上，我們會遵照以下兩個步驟進行

1. ---
title: 無職轉生～在資工系就拿出真本事٩(๑•̀ω•́๑)۶【Flutter Go in 30 Days】：Day24 再加一點點網格系統，Lists &amp; Grids(中)
date: 2025-12-25
tags: [flutter, list, grid]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10327964
---



2. ---
title: 無職轉生～在資工系就拿出真本事٩(๑•̀ω•́๑)۶【Flutter Go in 30 Days】：Day24 再加一點點網格系統，Lists &amp; Grids(中)
date: 2025-12-25
tags: [flutter, list, grid]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10327964
---



## 一、建立不同型別物件的資料來源

### 1. 建立Class

在這段程式碼中，我們建立了三種Classes

ListItem

**buildTitle(BuildContext context)**：用於建立清單項目的標題部分，傳回一個顯示標題的Widget

**buildSubtitle(BuildContext context)**：用於建立清單項目的副標題部分，傳回一個顯示副標題的Widget

HeadingItem

**final String heading**：儲存標題的字串。

**HeadingItem(this.heading)**：建構函數，用於初始化HeadingItem類別，傳入標題作為參數。

**buildTitle(BuildContext context)**：實作ListItem 的 buildTitle，建構標題部分的Text元件，並使用headlineSmall樣式。

**buildSubtitle(BuildContext context)**：實作ListItem 的 buildSubtitle，這裡菜用傳回一個空的SizedBox小部件，表示沒有副標題。

MessageItem

**final String sender**：儲存發送者的名稱的字串。

**final String body**：儲存訊息的字串。

**MessageItem(this.sender, this.body)**：建構函數，用於初始化MessageItem類別的，傳入發送者名稱和訊息作為參數。

**buildTitle(BuildContext context)**：實作ListItem，建構標題Text，並顯示發送者名稱。

**buildSubtitle(BuildContext context)**：實作ListItem，建構副標題Text，並顯示訊息。

```
abstract class ListItem {
  Widget buildTitle(BuildContext context);

  Widget buildSubtitle(BuildContext context);
}

class HeadingItem implements ListItem {
  final String heading;

  HeadingItem(this.heading);

  @override
  Widget buildTitle(BuildContext context) {
    return Text(
      heading,
      style: Theme.of(context).textTheme.headlineSmall,
    );
  }

  @override
  Widget buildSubtitle(BuildContext context) => const SizedBox.shrink();
}

class MessageItem implements ListItem {
  final String sender;
  final String body;

  MessageItem(this.sender, this.body);

  @override
  Widget buildTitle(BuildContext context) => Text(sender);

  @override
  Widget buildSubtitle(BuildContext context) => Text(body);
}
```

### 2. 建立ListItem

這段程式碼創建了一個 items 的列表，包含了1000個不同類型的列表項目。 用於模擬一個清單視圖的資料來源。 在產生這些清單項目時，程式碼使用了List.generate函數，index從0到999，並根據不同的index值來建立不同類型的清單項目。

我們以 (index % 6) 作為條件

- 當餘數為零時會建立一個HeadingItem (標題)

- 當餘數「不」為零時，建立一個MessageItem (訊息內文)

```
final items = List<ListItem>.generate(
  1000,
  (i) => i % 6 == 0 
      ? HeadingItem('Heading $i')
      : MessageItem('Sender $i', 'Message body $i'),
);
```

## 二、轉為Widgets

我們可以使用 ListView.builder() 元件來將剛剛所呈現不同資料來源的項目轉為Widgets的方式。並且，ListView.builder()是動態產生的方式，不會一次將所有資料產生完畢，而會隨著資訊滾動的範圍呈現，助於提高效率!

- itemCount: 代表項目長度

- itemBuilder: 根據項目類型，將不同型別的物件轉為Widgets。會依據不同的index做出相對的ListTile差別

```
ListView.builder(
  itemCount: items.length, //item項目長度
  itemBuilder: (context, index) { //根據項目類型將不同型別的物件轉為Widgets
    final item = items[index];
    return ListTile(
      title: item.buildTitle(context),
      subtitle: item.buildSubtitle(context),
    );
  },
)
```

## 三、MixedList使用範例

我們將上述程式結合如下:

```
import 'package:flutter/material.dart';

void main() {
  runApp(
    MyApp(
      items: List<ListItem>.generate(
        1000,
        (i) => i % 6 == 0
            ? HeadingItem('Heading $i')
            : MessageItem('Sender $i', 'Message body $i'),
      ),
    ),
  );
}

class MyApp extends StatelessWidget {
  final List<ListItem> items;

  const MyApp({super.key, required this.items});

  @override
  Widget build(BuildContext context) {
    const title = 'Mixed List';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(
          title: const Text(title),
        ),
        body: ListView.builder(
          // Let the ListView know how many items it needs to build.
          itemCount: items.length,
          // Provide a builder function. This is where the magic happens.
          // Convert each item into a widget based on the type of item it is.
          itemBuilder: (context, index) {
            final item = items[index];

            return ListTile(
              title: item.buildTitle(context),
              subtitle: item.buildSubtitle(context),
            );
          },
        ),
      ),
    );
  }
}

/// The base class for the different types of items the list can contain.
abstract class ListItem {
  /// The title line to show in a list item.
  Widget buildTitle(BuildContext context);

  /// The subtitle line, if any, to show in a list item.
  Widget buildSubtitle(BuildContext context);
}

/// A ListItem that contains data to display a heading.
class HeadingItem implements ListItem {
  final String heading;

  HeadingItem(this.heading);

  @override
  Widget buildTitle(BuildContext context) {
    return Text(
      heading,
      style: Theme.of(context).textTheme.headlineSmall,
    );
  }

  @override
  Widget buildSubtitle(BuildContext context) => const SizedBox.shrink();
}

/// A ListItem that contains data to display a message.
class MessageItem implements ListItem {
  final String sender;
  final String body;

  MessageItem(this.sender, this.body);

  @override
  Widget buildTitle(BuildContext context) => Text(sender);

  @override
  Widget buildSubtitle(BuildContext context) => Text(body);
}
```

- 輸出結果

我們可以看到，透過上面的程式便可產出以每六個子訊息具有一個標題的Mixed List效果，並且藉由滑輪可以看到具有所有index 0\~999的結果。這種方式適合具有相同型態大量資訊的列表作為使用，並可藉由不同定義的資料元素來加以組合、展現。

Index 0-9
Index 990-999

![](https://hackmd.io/_uploads/rygf-mjy6.png)
![](https://hackmd.io/_uploads/SyGVZ7jJT.png)
