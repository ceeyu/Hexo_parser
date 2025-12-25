---
title: DAY16 stucture介紹與設計成績單(下)
date: 2025-12-25
tags: []
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10289296
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

### 第二部分:主功能解析-前置設定

```
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
```

首先我們令一個名為"student"的structure變數將五科成績與平均成員變數(double)設置出來。

### 第三部分:主功能解析-main函式與成績計算

```
int x, i, min, max;
  	student *data;//設定pointer
  	double total;
  
  	cin >> x;//人數
  	data=new student[x];//設定動態陣列
  
  	for( i=0; i<x; i++ )
    {
      total=0;
      cin >> data[i].number;//編號(或座號)
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

    }
```

我們先將變數定義後，設定一個pointer:*data，來定義動態陣列。

再來在for迴圈內按照"編號、國(ch)、英(en)、數(ma)、社(so)、自(na)"的順序輸入，同時用if迴圈檢查該生五個成績值的最小值是誰，並帶到min中。

```
total+=data[i].ch+data[i].en+data[i].ma+data[i].so+data[i].na-min;
      data[i].average=total/4.0;
```

再將最後結果扣除最終的min值並帶入結果進data.average變數得到平均。

### 第四部分:主功能解析-main函式min/max設置與輸出結果

```
max=0; min=0;
  	for( i=1; i<x; i++ )//有i份data
    {
      if( data[i].average > data[max].average )
        max=i;//總和最大值
      if( data[i].average < data[min].average )
        min=i;//總和最小值
    }
```

這裡我們用迴圈方式設定平均成績最高值與最低值。

```
cout << data[max].number << " " << data[max].average << endl;
  	cout << data[min].number << " " << data[min].average << endl;
```

最後再輸出平均分最高和最低的編號和對應的平均就結束了

### 第五部分:成果展示

![https://ithelp.ithome.com.tw/upload/images/20220917/201515936XlIefSvzY.png](https://ithelp.ithome.com.tw/upload/images/20220917/201515936XlIefSvzY.png)

**註釋:**
x=3，有三位學生
編號1: 10 10 10 10 0
編號2: 10 10 10 0 0
編號3: 10 10 0 0 0
最高者:編號1，前四高平均值:10
最低者:編號3，前四高平均值:5

那我們明天見⁽⁽٩(๑˃̶͈̀ ᗨ ˂̶͈́)۶⁾⁾
