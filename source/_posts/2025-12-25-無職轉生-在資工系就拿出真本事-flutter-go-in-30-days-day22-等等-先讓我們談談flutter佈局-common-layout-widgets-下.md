---
title: "無職轉生～在資工系就拿出真本事٩(๑•̀ω•́๑)۶【Flutter Go in 30 Days】：Day22 等等，先讓我們談談Flutter佈局: Common layout widgets(下)"
date: 2025-12-25
tags: [flutter, layout]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10317414
---

# 肆、Standard widgets

## 三、ListView

類似於Column的延伸，當大小超過顯示範圍時可提供自動滾動效果

### ListView特性

- 相比起Column，使用彈性較低，但是針對滾動的效果較好

- 可以水平或是垂直地放置

- 當大小超過顯示範圍，即提供滾動效果

### ListView使用範例

```
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart' show debugPaintSizeEnabled;//用於檢視layout網格

void main() {
  debugPaintSizeEnabled = false; //設為true可取得虛擬網格對照
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
        body: Center(child:  _buildList()),
      ),
    );
  }

  
  Widget _buildList() {
    return ListView( //創建ListView項目
      children: [
        _tile('CineArts at the Empire', '85 W Portal Ave', Icons.theaters),
        _tile('The Castro Theater', '429 Castro St', Icons.theaters),
        _tile('Alamo Drafthouse Cinema', '2550 Mission St', Icons.theaters),
        _tile('Roxie Theater', '3117 16th St', Icons.theaters),
        _tile('United Artists Stonestown Twin', '501 Buckingham Way',
            Icons.theaters),
        _tile('AMC Metreon 16', '135 4th St #3000', Icons.theaters),
        const Divider(),
        _tile('K\'s Kitchen', '757 Monterey Blvd', Icons.restaurant),
        _tile('Emmy\'s Restaurant', '1923 Ocean Ave', Icons.restaurant),
        _tile(
            'Chaiya Thai Restaurant', '272 Claremont Blvd', Icons.restaurant),
        _tile('La Ciccia', '291 30th St', Icons.restaurant),
      ],
    );
  }

  ListTile _tile(String title, String subtitle, IconData icon) {
    return ListTile(
      title: Text(title,
          style: const TextStyle(
            fontWeight: FontWeight.w500,
            fontSize: 20,
          )),
      subtitle: Text(subtitle),
      leading: Icon(
        icon,
        color: Colors.blue[500],
      ),
    );
  }
}
```

ListView使用範例

- 輸出結果

可以看到因為項目尚未顯示完，出現滾動條

![](https://hackmd.io/_uploads/rJv3CnOR3.png)

### debugPaintSizeEnabled虛擬網格檢視

我們在設計Layout時，也可以透過匯入import 'package:flutter/rendering.dart' show debugPaintSizeEnabled;來幫助我們檢視目前的佈局設計

以剛剛的ListView程式碼為例，我們可以將debugPaintSizeEnabled設為true，來取得虛擬網格

![](https://hackmd.io/_uploads/BymLkpdC3.png)

再度執行後，可以發現在原本的佈局上，出現了虛擬的格線與元件行進方向，幫助我們設計與規劃

![](https://hackmd.io/_uploads/rkvsy6dCh.png)

## 四、Stack

Stack 是一種控製佈局的元件，用於將子元件疊放在一起，類似於堆疊卡片或圖層。

### Stack 特性

- 允許在同一位置顯示多個子控件，這些子控件可以重疊或按照特定的順序堆疊

- Stack內容無法滾動

- Stack 组件允许您使用 clip 屬性来控制是否要剪切超出 Stack 渲染框的子元素

### Stack 使用範例

我們使用Stack元件，內含一個CircleAvatar，用於製作圓形頭像、一個Cotainer與Text，用於製作名稱標示

```
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

Widget _buildStack() {
  return Stack(    //使用Stack元件
    alignment: const Alignment(0.6, 0.6),
    children: [
      const CircleAvatar(    //製作圓形頭像
        backgroundImage: NetworkImage('https://flutter.github.io/assets-for-api-docs/assets/widgets/owl.jpg'),
        radius: 100,
      ),
      Container(
        decoration: const BoxDecoration(
          color: Colors.black45,
        ),
        child: const Text(
          'Owl A',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
      ),
    ],
  );
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Stack 示例'),
        ),
        body: _buildStack(),
      ),
    );
  }
}
```

Stack 使用範例

- 輸出結果

![](https://hackmd.io/_uploads/rko96K6R3.png)

# 伍、Material widgets

## Card

Card 是一個Material Design風格、用於顯示訊息的卡片佈局的元件。 Card 提供了圓角、邊框和陰影效果，使其看起來具有3D效果。這使得 Card 在創建各種信息、卡片列表、資料展示等方面非常有用。

### Cart特性

- 可以使用SizedBox來限制卡片的大小。

- 一個 Card 可以包含一個單一的子元件，這個子元件可以是包含多個小元件的容器，例如行（Row）、列（Column）或列表（List）。

- 具有圓角邊框和陰影，使其具有3D外觀。

- Card 的內容不能滾動。

### Cart使用範例

```
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

Widget _buildCard() {
  return SizedBox(
    height: 210,
    child: Card(
      elevation: 4,//陰影效果
      child: Column(
        children: [
          ListTile(
            title: const Text(
              '1625 Main Street',
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
            subtitle: const Text('My City, CA 99984'),
            leading: Icon(
              Icons.restaurant_menu,
              color: Colors.blue[500],
            ),
          ),
          const Divider(),
          ListTile(
            title: const Text(
              '(408) 555-1212',
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
            leading: Icon(
              Icons.contact_phone,
              color: Colors.blue[500],
            ),
          ),
          ListTile(
            title: const Text('costa@example.com'),
            leading: Icon(
              Icons.contact_mail,
              color: Colors.blue[500],
            ),
          ),
        ],
      ),
    ),
  );
}
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Card 示例'),
        ),
        body: _buildCard(),
      ),
    );
  }
}
```

- 輸出結果

![](https://hackmd.io/_uploads/HJ38fcTRh.png)

## ListTile

ListTile 是一個Material Design風格、用於創建列表項目的元件，它通常用於顯示一個項目的相關信息，包括文本、icon與其他的互動元素。

### ListTile特性

- 是一種特殊的行佈局小部件，可以容納多達三行文本和icon。

- 相比row而言，可使用的配置屬性選項較少，但更容易建造。

- 常與 Card 和 ListView元件配合使用。

### ListTile使用範例

以下範例展示了多種不同的Listile型態

```
import 'package:flutter/material.dart';

/// Flutter code sample for [ListTile].

void main() => runApp(const ListTileApp());

class ListTileApp extends StatelessWidget {
  const ListTileApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(useMaterial3: true),
      home: const ListTileExample(),
    );
  }
}

class ListTileExample extends StatelessWidget {
  const ListTileExample({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('ListTile Sample')),
      body: ListView(
        children: const <Widget>[
          Card(child: ListTile(title: Text('One-line ListTile'))),
          Card(
            child: ListTile(
              leading: FlutterLogo(),
              title: Text('One-line with leading widget'),
            ),
          ),
          Card(
            child: ListTile(
              title: Text('One-line with trailing widget'),
              trailing: Icon(Icons.more_vert),
            ),
          ),
          Card(
            child: ListTile(
              leading: FlutterLogo(),
              title: Text('One-line with both widgets'),
              trailing: Icon(Icons.more_vert),
            ),
          ),
          Card(
            child: ListTile(
              title: Text('One-line dense ListTile'),
              dense: true,
            ),
          ),
          Card(
            child: ListTile(
              leading: FlutterLogo(size: 56.0),
              title: Text('Two-line ListTile'),
              subtitle: Text('Here is a second line'),
              trailing: Icon(Icons.more_vert),
            ),
          ),
          Card(
            child: ListTile(
              leading: FlutterLogo(size: 72.0),
              title: Text('Three-line ListTile'),
              subtitle:
                  Text('A sufficiently long subtitle warrants three lines.'),
              trailing: Icon(Icons.more_vert),
              isThreeLine: true,
            ),
          ),
        ],
      ),
    );
  }
}
```

- 輸出結果

![](https://hackmd.io/_uploads/Sk4oy-LC2.png)
