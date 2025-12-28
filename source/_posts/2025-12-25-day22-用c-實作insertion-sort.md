---
title: "DAY22 用C++實作insertion sort"
date: 2025-12-25
tags: []
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10294881
---

## 題目: insertion sort 實作

運用C++語言來實做insertion sort!

## 解法

```
#include <iostream>
using namespace std;

void InsertionSort(int *arr, int size)
{
     for (int i = 1; i < size; i++)
     {
          int key = arr[i];
          int j = i - 1;
          while(key < arr[j] && j >= 0)
          // 這裡的j記得是>=0
          {
               arr[j + 1] = arr[j];
               j--;
          }

          arr[j + 1] = key;
     }
}

void PrintArray(int *arr, int size)
{
     for (int i = 0; i < size; i++)
     {
          cout << arr[i] << " ";
     }

     cout << endl;
}

int main()
{
     int *arr;
     int size;
     cout << "enter your array size: ";
     cin >> size;
     // 自行輸入陣列大小
     arr = new int[size];
     // 設置動態陣列

     cout << "enter your array num";
     for (int i = 0; i < size; i++)
     {
          cin >> arr[i];
          // 自行輸入陣列值
     }

     
     cout << "origin:" << endl;
     PrintArray(arr, size);

     InsertionSort(arr, size);

     cout << "sorted: " << endl;
     PrintArray(arr, size);
     return 0;
}
```

## 解釋與詳細介紹

### 第一部分:InsertionSort函式

```
void InsertionSort(int *arr, int size)
{
     for (int i = 1; i < size; i++)
     {
          int key = arr[i];
          int j = i - 1;
          while(key < arr[j] && j >= 0)
          // 這裡的j記得是>=0
          {
               arr[j + 1] = arr[j];
               j--;
          }

          arr[j + 1] = key;
     }
}
```

在這個函式中，我們可以對照昨天的pseudocode，今天所用的部分對應的分別如下(左邊是C++裡運用的，右邊是pseudocode運用的):

arr代表A
size對照A.length
i對照j
j對照i
key對照data

從這樣的對照中，我們可以簡單地看出C++和pseudocode的相同與相異之處，並且能夠知道pseudocode之所以能夠作為程式骨幹的原因!而程式撰寫的概念就同昨天介紹的。

### 第二部分:PrintArray函式

```
void PrintArray(int *arr, int size)
{
     for (int i = 0; i < size; i++)
     {
          cout << arr[i] << " ";
     }

     cout << endl;
}
```

我們這裡定義一個PrintArray，用for迴圈的方式讓程式最後可以輸出排序完的陣列數值。

### 第三部分:main函式

```
int main()
{
     int *arr;
     int size;
     cout << "enter your array size: ";
     cin >> size;
     // 自行輸入陣列大小
     arr = new int[size];
     // 設置動態陣列

     cout << "enter your array num: ";
     for (int i = 0; i < size; i++)
     {
          cin >> arr[i];
          // 自行輸入陣列值
     }

     
     cout << "origin:" << endl;
     PrintArray(arr, size);

     InsertionSort(arr, size);

     cout << "sorted: " << endl;
     PrintArray(arr, size);
     return 0;
}
```

最後我們講解主程式設計的方式，程式中會先顯示"enter your array size: "讓使用者輸入陣列大小，並以動態陣列的方式創建出一個arr，並顯示"enter your array num: "讓使用者依序輸入size個數字，且在"origin:"中以PrintArray顯示原來的陣列，並在"sorted"(已排序)中print用InsertionSort()後結果來比較。

### 第四部分:成果展示

![https://ithelp.ithome.com.tw/upload/images/20220923/20151593T2nVfDHxkU.png](https://ithelp.ithome.com.tw/upload/images/20220923/20151593T2nVfDHxkU.png)

用C++實際執行後是不是更了解insertion sort了呢?那我們明天見!(σ ′▽‵) ′▽‵)σ
