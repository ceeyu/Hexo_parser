---
title: DAY24 用C++實作merge sort
date: 2022-09-25 24:00:00
tags: []

source: https://ithelp.ithome.com.tw/articles/10294883
series: C++ 基礎教學
categories:
  - C++ 基礎教學
---

## pseudocode詳細解釋

```
Merge(arr_1[], arr_2[]){
  p 為 arr_1[]的起始 index;
  q 為 arr_2[]的起始 index;
  while(arr_1 && arr_2 尚未scan完畢){
    if (p.data < q.data) then{
      p.data 先輸出到一個新的 array;
      p = p + 1;
    }
    else{
      q.data 先輸出到一個新的 array;
      q = q + 1;
    }
    
    while(arr_1尚未scan完畢){
      複製 arr_1 剩下的 data 到新的 array 裡;
    }
    while(arr_2尚未scan完畢){
      複製 arr_2 剩下的 data 到新的 array 裡;
    }
  }
}

MergeSort(A[], head, tail){
  if(head < tail){
    mid = (head + tail) / 2;
    MergeSort(arr, head, mid);
    MergeSort(arr, mid+1, tail);
    Merge(arr, head, mid, tail);
  }
}
```

### 第一部分:Merge

```
Merge(arr_1[], arr_2[]){ //arr_1是左相鄰陣列,arr_2是右相鄰陣列
  p 為 arr_1[]的起始 index;
  q 為 arr_2[]的起始 index;
  while(arr_1 && arr_2 尚未scan完畢){
    if (p.data < q.data) then{ //若是p.data的值較小
      p.data 先輸出到一個新的 array;
      p = p + 1;
    }
    else{ //若是q.data的值較小
      q.data 先輸出到一個新的 array;
      q = q + 1;
    }
    
    while(arr_1尚未scan完畢){
      複製 arr_1 剩下的 data 到新的 array 裡;
    }
    while(arr_2尚未scan完畢){
      複製 arr_2 剩下的 data 到新的 array 裡;
    }
  }
}
```

第一個while中，我們首先會將原始陣列分為左右兩半，並字左右陣列的第一index的"值"依序比較大小並放入新的arr(目標陣列)中。而在第二個while中我們所做的就是將未比對到的陣列先copied進目標arr中表示待比較。而merge主要做的便是"比較、結合"的兩個動作。

### 第二部分:merge sort

```
MergeSort(A[], head, tail){
  if(head < tail){
    mid = (head + tail) / 2;
    MergeSort(arr, head, mid);
    MergeSort(arr, mid+1, tail);
    Merge(arr, head, mid, tail);
  }
}
```

在MergeSort的副程式中，我們定義了頭、尾與中間點，而MergeSort就是以迴圈方式，不斷的定義左右兩塊與重複執行merge的動作直到目標陣列建立完成。

## 題目:merge sort實作

運用C++語言來實做merge sort!

## 解法

```
#include <iostream>
#include <vector>

const int Max = 1000;

void Merge(std::vector<int> &Array, int front, int mid, int end){

    // 利用 std::vector 的constructor, 
    // 把array[front]~array[mid]放進 LeftSub[]
    // 把array[mid+1]~array[end]放進 RightSub[]
    std::vector<int> LeftSub(Array.begin()+front, Array.begin()+mid+1),
                     RightSub(Array.begin()+mid+1, Array.begin()+end+1);

    LeftSub.insert(LeftSub.end(), Max);      // 在LeftSub[]尾端加入值為 Max 的元素
    RightSub.insert(RightSub.end(), Max);    // 在RightSub[]尾端加入值為 Max 的元素

    int idxLeft = 0, idxRight = 0;

    for (int i = front; i <= end; i++) {

        if (LeftSub[idxLeft] <= RightSub[idxRight] ) {
            Array[i] = LeftSub[idxLeft];
            idxLeft++;
        }
        else{
            Array[i] = RightSub[idxRight];
            idxRight++;
        }
    }
}

void MergeSort(std::vector<int> &array, int front, int end){
                                         // front與end為矩陣範圍
    if (front < end) {                   // 表示目前的矩陣範圍是有效的
        int mid = (front+end)/2;         // mid即是將矩陣對半分的index
        MergeSort(array, front, mid);    // 繼續divide矩陣的前半段subarray
        MergeSort(array, mid+1, end);    // 繼續divide矩陣的後半段subarray
        Merge(array, front, mid, end);   // 將兩個subarray做比較, 並合併出排序後的矩陣
    }
}

void PrintArray(std::vector<int> &array){
    for (int i = 0; i < array.size(); i++) {
        std::cout << array[i] << " ";
    }
    std::cout << std::endl;
}

int main() {

    int arr[] = {26,5,77,61,11,59,15,48,19};
    std::vector<int> array(arr, arr+sizeof(arr)/sizeof(int));

    std::cout << "original:\n";
    PrintArray(array);

    MergeSort(array, 0, 8);
    std::cout << "sorted:\n";
    PrintArray(array);

    return 0;
}
```

## 解釋與詳細介紹

### 第一部分:merge

```
void Merge(std::vector<int> &Array, int front, int mid, int end){

    // 利用 std::vector 的constructor, 
    // 把array[front]~array[mid]放進 LeftSub[]
    // 把array[mid+1]~array[end]放進 RightSub[]
    std::vector<int> LeftSub(Array.begin()+front, Array.begin()+mid+1),
                     RightSub(Array.begin()+mid+1, Array.begin()+end+1);

    LeftSub.insert(LeftSub.end(), Max);      // 在LeftSub[]尾端加入值為 Max 的元素
    RightSub.insert(RightSub.end(), Max);    // 在RightSub[]尾端加入值為 Max 的元素

    int idxLeft = 0, idxRight = 0;

    for (int i = front; i <= end; i++) {

        if (LeftSub[idxLeft] <= RightSub[idxRight] ) {
            Array[i] = LeftSub[idxLeft];
            idxLeft++;
        }
        else{
            Array[i] = RightSub[idxRight];
            idxRight++;
        }
    }
}
```

在Merge()中，我們用LeftSub 和 RightSub的方式定義了左子陣列和右子陣列，左代表了原始arr自頭到中(array[front]~array[mid])、右則代表了中到後(array[mid+1]~array[end])。

而這裡我們用到了C++ 的vector作為容器(container)，可以先將其想為一個使用上更方便的array，若之後有時間我們再進行介紹!

```
LeftSub.insert(LeftSub.end(), Max);      // 在LeftSub[]尾端加入值為 Max 的元素
    RightSub.insert(RightSub.end(), Max);    // 在RightSub[]尾端加入值為 Max 的元素
```

這兩行分別是在左右兩子陣列中的末端(.end()是末端的意思)加上(.insert()是插入數值的意思)一個Max值作為最尾端的表示，因為沒有數值會大於最大值，所以我們可以藉由插入的Max去確認兩子陣列到達最末端。而這題因為我們採用的是固定值的陣列，自行設定的Max是1000(或是也可以用INT_MAX代替)。

```
for (int i = front; i <= end; i++) {

        if (LeftSub[idxLeft] <= RightSub[idxRight] ) {
            Array[i] = LeftSub[idxLeft];
            idxLeft++;
        }
        else{
            Array[i] = RightSub[idxRight];
            idxRight++;
        }
    }
```

for迴圈部分採用了以i變數來循序比較數值，並將較小的質優先放入目標array直到結束(因為先放入的元素會在較前面，以達成從小排序到大的目的)。

### 第二部分:MergeSort

```
void MergeSort(std::vector<int> &array, int front, int end){
                                         // front與end為矩陣範圍
    if (front < end) {                   // 表示目前的矩陣範圍是有效的
        int mid = (front+end)/2;         // mid即是將矩陣對半分的index
        MergeSort(array, front, mid);    // 繼續divide矩陣的前半段subarray
        MergeSort(array, mid+1, end);    // 繼續divide矩陣的後半段subarray
        Merge(array, front, mid, end);   // 將兩個subarray做比較, 並合併出排序後的矩陣
    }
}
```

MergeSort的部分便是用if迴圈不斷判斷與重複分出前半、後半arr的動作並持續merge出最終陣列的順序。

### 第三部分:PrintArray與main函式

```
void PrintArray(std::vector<int> &array){
    for (int i = 0; i < array.size(); i++) {
        std::cout << array[i] << " ";
    }
    std::cout << std::endl;
}

int main() {

    int arr[] = {26,5,77,61,11,59,15,48,19};
    std::vector<int> array(arr, arr+sizeof(arr)/sizeof(int));

    std::cout << "original:\n";
    PrintArray(array);

    MergeSort(array, 0, 8);
    std::cout << "sorted:\n";
    PrintArray(array);

    return 0;
}
```

我們設置了一個PrintArray()函式來輸出結果；而在main函式中我們定義了昨天舉例的陣列為固定值的arr[]作為示範，並用vector設置陣列大小(array)與輸出排序前(origin)與排序後(sorted)的數列值。

### 第四部分:成果展示

![https://ithelp.ithome.com.tw/upload/images/20220925/20151593vfqpXg1pxr.png](https://ithelp.ithome.com.tw/upload/images/20220925/20151593vfqpXg1pxr.png)

是不是跟插入排序法的方式不太一樣呢?那我們明天見!ヽ(=^･ω･^=)丿!

## 參考資料:

[https://kopu.chat/%E5%90%88%E4%BD%B5%E6%8E%92%E5%BA%8F-merge-sort/](https://kopu.chat/%E5%90%88%E4%BD%B5%E6%8E%92%E5%BA%8F-merge-sort/)

[https://alrightchiu.github.io/SecondRound/comparison-sort-merge-sorthe-bing-pai-xu-fa.html](https://alrightchiu.github.io/SecondRound/comparison-sort-merge-sorthe-bing-pai-xu-fa.html)

[https://mropengate.blogspot.com/2015/07/cc-vector-stl.html](https://mropengate.blogspot.com/2015/07/cc-vector-stl.html)
