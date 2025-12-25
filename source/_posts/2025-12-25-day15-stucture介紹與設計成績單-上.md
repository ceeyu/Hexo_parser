---
title: DAY15 stucture介紹與設計成績單(上)
date: 2022-09-16 15:00:00
tags: []

source: https://ithelp.ithome.com.tw/articles/10289295
series: C++ 基礎教學
categories:
  - C++ 基礎教學
---

## 題目:

宣告一個struct包含編號(int)、國英數社自(double)五科成績，程式一開始會輸入一個變數x，接者會輸入x份編號與國英數社自六個數字，每個人的總分為五科中任選四科最高的總和。最後再輸出最高分和最低分的編號與最高科四份總分平均

## 解法

```
#include <iostream>

using namespace std;

struct student
{
	int number;
  	double ch;
  	double en;
  	double ma;
  	double so;
  	double na;
  	double average;
};

int main()
{
  	int x, i, min, max;
  	student *data;
  	double total;
  
  	cin >> x;
  	data=new student[x];
  
  	for( i=0; i<x; i++ )
    {
      total=0;
      cin >> data[i].number;
      cin >> data[i].ch;
      min=data[i].ch;
      cin >> data[i].en;
      if( data[i].en < min )
      	min=data[i].en;
      cin >> data[i].ma;
      if( data[i].ma < min )
      	min=data[i].ma;
      cin >> data[i].so;
      if( data[i].so < min )
      	min=data[i].so;
      cin >> data[i].na;
      if( data[i].na < min )
      	min=data[i].na;
      total+=data[i].ch+data[i].en+data[i].ma+data[i].so+data[i].na-min;
      data[i].average=total/4.0;
    }
  	max=0; min=0;
  	for( i=1; i<x; i++ )
    {
      if( data[i].average > data[max].average )
        max=i;
      if( data[i].average < data[min].average )
        min=i;
    }
  	cout << data[max].number << " " << data[max].average << endl;
  	cout << data[min].number << " " << data[min].average << endl;
}
```

## 解釋與詳細介紹

### 第一部分:structure介紹

在前幾兩個禮拜中，我們先介紹了變數的設置與型態並自然地在程式中使用他們。但假設今天進到了一個大型的程式專案，抑或是程式中具有許多的變數型態與名稱，就算名稱已經有提到這個變數的功能，但在寫程式時仍會時常搞混。那麼這個時候，就是structure/class(structure為class的前身)登場的時候了!

今天我們先來介紹structure~ 在程式中我們會運用structure去將一群"有相關聯的型態變數們"以自己定義的"資料型態"起來如下範例:

```
struct student {
    char name[7];
    char id;
    float score;
    int rate;
};
```

這裡我們以一個名為student的"資料型態"將name,id,score,rate四個不同型態的變數列為他的"成員"。而若是要新增一個student型態的變數就可以用下述兩種方式

```
//第一種
struct student {
    char name[7];
    char id;
    float score;
    int rate;
}student1;//直接加在型態宣告的結束大括號後，分號前

//第二種
student student1;//student1為student型態的變數
```

第一種是直接加在型態宣告的結束大括號後，分號前；而第二種則是在宣告後，直接以student 變數名的方式創立。而在指定structure內的成員時，我們會運用型態變數.成員變數的方式指定(如:student1.id)。

### 第二部分:主功能解析

這部分就由明天再接棒繼續~ 大家可以先多吸收一下關於structure的概念知識~畢竟他與從前我們使用變數或函式的方法不太一樣，先弄清楚概念後再進到程式會更增加學習的效率(ゝ∀･)b

## 參考資料:

[https://cpp.enmingw32.dev/cheng-shi-ru/han-dui-stack/structure](https://cpp.enmingw32.dev/cheng-shi-ru/han-dui-stack/structure)

[https://ithelp.ithome.com.tw/articles/10282907](https://ithelp.ithome.com.tw/articles/10282907)
