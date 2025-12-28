---
title: "無職轉生～在資工系就拿出真本事٩(๑•̀ω•́๑)۶【Flutter Go in 30 Days】：Day21 等等，先讓我們談談Flutter佈局： Common layout widgets(上)"
date: 2025-12-25
tags: [flutter, grid layout]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10317413
---

# 參、Common layout widgets

接續在Basic Widgets後，我們將介紹一些常用於「佈局」的元件，主要分為兩種，Standard widgets與Material widgets。前者為IOS-Style(Cupertino)與Android-Style(Material)皆可以使用的標準元件；後者則為Material專用的元件。雖然有些元件在先前有稍加提過用法，但這裡將會在這些元件在「佈局」的功能上多加著墨!

### Standard widgets目錄

Standard widgets

- Container

- GridView

- ListView

- Stack

### Material widgets目錄

Material widgets

- Card

- ListTile

# 肆、Standard widgets

## 一、Container

我們通常使用Container作為元件間的填充、分隔、加入間距，並且也可以透過將Container置入顏色或圖片的方式，作為更改佈局背景的方式!

### 元件邊框概念

下圖為Container由外而內的邊距名詞，與CSS相同，分別是

- margin: 元件與元件間的距離

- border: 元件外邊框

- padding: 元件內部間距

- content: 元件內容

![](https://hackmd.io/_uploads/BJsSCiuRh.png)

### Container特性

- 可以添加 padding, margins, borders

- 可以更改background(顏色或是圖片)

- 可以包含**一個**子元件(例如: Column, Row, 或是複雜元件)

### Container使用範例

在這個範例中，由一個Column(_buildImageColumn)與兩個Row(_buildImageRow)所組成，同時，Row會再呼叫_buildDecoratedImage來繪製圖像

- _buildImageColumn: **使用Container**，將背景顏色改為灰色

- _buildImageRow: 呼叫兩次_buildDecoratedImage來繪製一行中的兩個圖像

- _buildDecoratedImage: **使用Container**為每個圖像增加圓角的邊框(border)與margin

```
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Decorated Images Example'),
        ),
        body: ImageColumnWidget(),
      ),
    );
  }
}

class ImageColumnWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: _buildImageColumn(),
    );
  }

  Widget _buildDecoratedImage(String imageUrl) => Expanded(
        child: Container(
          decoration: BoxDecoration(
            border: Border.all(width: 10, color: Colors.black38),
            borderRadius: const BorderRadius.all(Radius.circular(8)),
          ),
          margin: const EdgeInsets.all(4),
          child: Image.network(imageUrl), 
        ),
      );

  Widget _buildImageRow(String imageUrl) => Row(
        children: [
          _buildDecoratedImage(imageUrl),
          _buildDecoratedImage(imageUrl),
        ],
      );

  Widget _buildImageColumn() {
    return Container(
      decoration: const BoxDecoration(
        color: Colors.black26,//顏色改為灰色
      ),
      child: Column(
        children: [
          _buildImageRow('https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg'),
          _buildImageRow('https://cdn.pixabay.com/photo/2023/05/14/17/46/ducklings-7993465_1280.jpg'),
        ],
      ),
    );
  }
}
```

Container使用範例

- 輸出結果

![](https://hackmd.io/_uploads/Hy7iB2ORh.png)

## 二、GridView

GridView為一個二維列表元件，我們可以使用GridView所提供的兩種預設模式，或是使用自定義模式。並且當GridView檢視內容超出所視範圍時，會自動滾動

### GridView特性

預設模式

- GridView.count: 可以指定「列數」

- GridView.extent: 可以指定圖塊的最大寬度

將元件放置GridView中
超出渲染範圍時可自動滾動

### GridView使用範例

在這個範例中，我們在

_buildGrid函數: 使用GridView.extent元件來創造一個GridView，限制最大的寬度大小為200像素，

_buildGridTileList函數: 使用List.generate函數來產生圖片，並依照index對應

_getImageUrl函數: 用於對應index與圖片，這裡使用三張圖片，並用index取餘數的方式獲取應對圖片

```
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart' show debugPaintSizeEnabled;

void main() {
  debugPaintSizeEnabled = false; // Set to true for visual layout
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter layout demo',
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Flutter layout demo'),
        ),
        body: Center(child:_buildGrid()),
      ),
    );
  }

  Widget _buildGrid() => GridView.extent(
      maxCrossAxisExtent: 200,//最大寬度為200px
      padding: const EdgeInsets.all(4),
      mainAxisSpacing: 4,
      crossAxisSpacing: 4,
      children: _buildGridTileList(30));

 List<Container> _buildGridTileList(int count) => List.generate(
      count,
      (i) => Container(
          child: Image.network(
              _getImageUrl(i)))); //對應圖片

//圖片對應函數，也可以用assets的方式匯入圖片
  String _getImageUrl(int index) {
    if (index%3 == 0) {
      return 'https://media.istockphoto.com/id/1337655602/photo/cute-ducklings-in-the-morning.jpg?s=612x612&w=0&k=20&c=q68U3WEE8dCcxPnYqRak63BT2C5TNdcqzId3cbwVJG4=';
    } else if (index%3 == 1) {
      return 'https://cdn.pixabay.com/photo/2017/07/18/18/24/dove-2516641_640.jpg';
    } else if (index%3 == 2) {
      return 'https://cdn.pixabay.com/photo/2014/10/01/10/44/animal-468228_640.jpg';
    } else {
      return ''; 
    }
  }

}
```

- 輸出結果

![](https://hackmd.io/_uploads/B1YEjh_Rn.png)
