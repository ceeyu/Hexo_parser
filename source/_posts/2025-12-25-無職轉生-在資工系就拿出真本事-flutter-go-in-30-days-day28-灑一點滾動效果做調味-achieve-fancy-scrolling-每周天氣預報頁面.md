---
title: 無職轉生～在資工系就拿出真本事٩(๑•̀ω•́๑)۶【Flutter Go in 30 Days】：Day28 灑一點滾動效果做調味，Achieve fancy scrolling 每周天氣預報頁面
date: 2023-10-06 28:00:00
tags: [flutter, scrolling]

source: https://ithelp.ithome.com.tw/articles/10333873
series: Flutter 30天
categories:
  - Flutter 30天
---

# 參、Achieve fancy scrolling: 每周天氣預報頁面展示

參見: [https://docs.flutter.dev/ui/layout/scrolling/slivers](https://docs.flutter.dev/ui/layout/scrolling/slivers)
參見: [Building scrolling experiences in Flutter | Workshop Codelab](https://dartpad.dev/workshops.html?webserver=https://dartpad-workshops-io2021.web.app/getting_started_with_slivers&utm_source=google-io21&utm_medium=referral&utm_campaign=io21-resources)

結合昨天的分類描述，實際的程式碼編排如下:

## 三、使用範例

```
import 'package:flutter/material.dart';

void main() {
  runApp(const HorizonsApp());
}

class HorizonsApp extends StatelessWidget {
  const HorizonsApp({Key? key}) : super(key: key);

  // 本元件是此應用程式的root元件
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      // This is the theme of your application.
      theme: ThemeData.dark(),
      //使用自訂的ScrollBehavior讓不同平台的使用者體驗相同滾動效果
      scrollBehavior: const ConstantScrollBehavior(),
      title: 'Horizons Weather',
      home: Scaffold(
        body: CustomScrollView(
          slivers: <Widget>[
            SliverAppBar(
              pinned: true,
              stretch: true,
              onStretchTrigger: () async {
                print('Load new data!');
                // 等待 Server.requestNewData();
              },
              backgroundColor: Colors.teal[800],
              expandedHeight: 200.0,
              flexibleSpace: FlexibleSpaceBar(
                stretchModes: const [
                  StretchMode.zoomBackground,
                  StretchMode.fadeTitle,
                  StretchMode.blurBackground,
                ],
                title: const Text('Horizons'),
                background: DecoratedBox(
                  position: DecorationPosition.foreground,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.bottomCenter,
                      end: Alignment.center,
                      colors: <Color>[Colors.teal[800]!, Colors.transparent],
                    ),
                  ),
                  child: Image.network(
                    headerImage,
                    fit: BoxFit.cover,
                  ),
                ),
              ),
            ),
            const WeeklyForecastList(),
          ],
        ),
      ),
    );
  }
}

class WeeklyForecastList extends StatelessWidget {
  const WeeklyForecastList({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final DateTime currentDate = DateTime.now();
    final TextTheme textTheme = Theme.of(context).textTheme;

    return SliverList(
      delegate: SliverChildBuilderDelegate(
        (context, index) {
          final DailyForecast dailyForecast =
              Server.getDailyForecastByID(index);
          return Card(
            child: Row(
              children: <Widget>[
                SizedBox(
                  height: 200.0,
                  width: 200.0,
                  child: Stack(
                    fit: StackFit.expand,
                    children: <Widget>[
                      DecoratedBox(
                        position: DecorationPosition.foreground,
                        decoration: BoxDecoration(
                          gradient: RadialGradient(
                            colors: <Color>[
                              Colors.grey[800]!,
                              Colors.transparent
                            ],
                          ),
                        ),
                        child: Image.network(
                          dailyForecast.imageId,
                          fit: BoxFit.cover,
                        ),
                      ),
                      Center(
                        child: Text(
                          dailyForecast.getDate(currentDate.day).toString(),
                          style: textTheme.displayMedium,
                        ),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(20.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text(
                          dailyForecast.getWeekday(currentDate.weekday),
                          style: textTheme.headlineMedium,
                        ),
                        const SizedBox(height: 10.0),
                        Text(dailyForecast.description),
                      ],
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Text(
                    '${dailyForecast.highTemp} | ${dailyForecast.lowTemp} F',
                    style: textTheme.titleMedium,
                  ),
                ),
              ],
            ),
          );
        },
        childCount: 7,
      ),
    );
  }
}

// --------------------------------------------
// 下方為輔助資料的傳遞區域

const String baseAssetURL =
    'https://dartpad-workshops-io2021.web.app/getting_started_with_slivers/';
const String headerImage = '${baseAssetURL}assets/header.jpeg';

const Map<int, DailyForecast> _kDummyData = {
  0: DailyForecast(
    id: 0,
    imageId: '${baseAssetURL}assets/day_0.jpeg',
    highTemp: 73,
    lowTemp: 52,
    description:
        'Partly cloudy in the morning, with sun appearing in the afternoon.',
  ),
  1: DailyForecast(
    id: 1,
    imageId: '${baseAssetURL}assets/day_1.jpeg',
    highTemp: 70,
    lowTemp: 50,
    description: 'Partly sunny.',
  ),
  2: DailyForecast(
    id: 2,
    imageId: '${baseAssetURL}assets/day_2.jpeg',
    highTemp: 71,
    lowTemp: 55,
    description: 'Party cloudy.',
  ),
  3: DailyForecast(
    id: 3,
    imageId: '${baseAssetURL}assets/day_3.jpeg',
    highTemp: 74,
    lowTemp: 60,
    description: 'Thunderstorms in the evening.',
  ),
  4: DailyForecast(
    id: 4,
    imageId: '${baseAssetURL}assets/day_4.jpeg',
    highTemp: 67,
    lowTemp: 60,
    description: 'Severe thunderstorm warning.',
  ),
  5: DailyForecast(
    id: 5,
    imageId: '${baseAssetURL}assets/day_5.jpeg',
    highTemp: 73,
    lowTemp: 57,
    description: 'Cloudy with showers in the morning.',
  ),
  6: DailyForecast(
    id: 6,
    imageId: '${baseAssetURL}assets/day_6.jpeg',
    highTemp: 75,
    lowTemp: 58,
    description: 'Sun throughout the day.',
  ),
};

class Server {
  static List<DailyForecast> getDailyForecastList() =>
      _kDummyData.values.toList();

  static DailyForecast getDailyForecastByID(int id) {
    assert(id >= 0 && id <= 6);
    return _kDummyData[id]!;
  }
}

class DailyForecast {
  const DailyForecast({
    required this.id,
    required this.imageId,
    required this.highTemp,
    required this.lowTemp,
    required this.description,
  });

  final int id;
  final String imageId;
  final int highTemp;
  final int lowTemp;
  final String description;

  static const List<String> _weekdays = <String>[
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  String getWeekday(int today) {
    final int offset = today + id;
    final int day = offset >= 7 ? offset - 7 : offset;
    return _weekdays[day];
  }

  int getDate(int today) => today + id;
}

class ConstantScrollBehavior extends ScrollBehavior {
  const ConstantScrollBehavior();

  @override
  Widget buildScrollbar(
          BuildContext context, Widget child, ScrollableDetails details) =>
      child;

  @override
  Widget buildOverscrollIndicator(
          BuildContext context, Widget child, ScrollableDetails details) =>
      child;

  @override
  TargetPlatform getPlatform(BuildContext context) => TargetPlatform.macOS;

  @override
  ScrollPhysics getScrollPhysics(BuildContext context) =>
      const BouncingScrollPhysics(parent: AlwaysScrollableScrollPhysics());
}
```

- 輸出結果

我們可以看到頁面中，每一列由左至右代表一天的日期、星期、最高、最低溫的描述，並且列表的圖片會依據天氣而做不同的變化!

這樣我們就達成由滾動項目完成一個小型的天氣預報頁面呈現了!未來也可以把現在程式中固定的資料轉為由動態呼叫Server而得到最新的訊息來加以更新~

![](https://hackmd.io/_uploads/Hy_RDPOl6.png)

![](https://hackmd.io/_uploads/S1kg_wOep.png)
