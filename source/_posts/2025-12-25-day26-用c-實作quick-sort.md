---
title: "DAY26  用C++實作quick sort"
date: 2025-12-25
tags: []
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10294885
---

## 題目:

運用C++語言來實做quick sort

## 解法

```
#include <iostream>
using namespace std;
 
int partition(int arr[], int start, int end)
{
 
    int pivot = arr[start];
 
    int count = 0;
    for (int i = start + 1; i <= end; i++){
        if (arr[i] <= pivot)
            count++;
    }
 
    // Giving pivot element its correct position
    int pivotIndex = start + count;
    swap(arr[pivotIndex], arr[start]);
 
    // Sorting left and right parts of the pivot element
    int i = start, j = end;
 
    while (i < pivotIndex && j > pivotIndex){
 
        while (arr[i] <= pivot) {
            i++;
        }
 
        while (arr[j] > pivot) {
            j--;
        }
 
        if (i < pivotIndex && j > pivotIndex){
            swap(arr[i++], arr[j--]);
        }
    }
 
    return pivotIndex;
}
 
void quickSort(int arr[], int start, int end)
{
    // base case
    if (start >= end)
    {
        return;
    }
        
 
    // partitioning the array
    int p = partition(arr, start, end);
 
    // Sorting the left part
    quickSort(arr, start, p - 1);
 
    // Sorting the right part
    quickSort(arr, p + 1, end);
}
 
int main()
{
 
    int arr[] = {26, 5, 37, 1, 61, 11, 59, 15, 48, 19};
    int n = 10;
 
    quickSort(arr, 0, n - 1);
 
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
 
    return 0;
}
```

## 解釋與詳細介紹

### 第一部分:partition

```
int partition(int arr[], int start, int end)
{
    int pivot = arr[start];//設置第一位為pivot
    int count = 0;
    for (int i = start + 1; i <= end; i++){
        if (arr[i] <= pivot)
            count++;
    }
 
    // Giving pivot element its correct position
    int pivotIndex = start + count;
    swap(arr[pivotIndex], arr[start]);
 
    // Sorting left and right parts of the pivot element
    int i = start, j = end;
 
    while (i < pivotIndex && j > pivotIndex){
 
        while (arr[i] <= pivot) {
            i++;
        }
 
        while (arr[j] > pivot) {
            j--;
        }
 
        if (i < pivotIndex && j > pivotIndex){
            swap(arr[i++], arr[j--]);
        }
    }
 
    return pivotIndex;
}
```

在partition的步驟中，我們進行了pivot與左右indext的比對與調換(swap)的動作，可以參照pseudocode的格式。

### 第二部分:quicksort

```
void quickSort(int arr[], int start, int end)
{
    // base case
    if (start >= end)
    {
        return;
    }       
 
    // partitioning the array
    int p = partition(arr, start, end);
 
    // Sorting the left part
    quickSort(arr, start, p - 1);
 
    // Sorting the right part
    quickSort(arr, p + 1, end);
}
```

在quicksort()函式裡就會將原本的arr分成arr[start]~arr[pivotIndex-1]跟arr[pivotIndex+1]~arr[end]的兩塊去分別執行。

### 第三部分:main函式

```
int main()
{
 
    int arr[] = {26, 5, 37, 1, 61, 11, 59, 15, 48, 19};
    int n = 10;
 
    quickSort(arr, 0, n - 1);
 
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
 
    return 0;
}
```

main函式的地方我們就以昨天提到的陣列作為例子，帶入此auicksort()函式進行排序驗證，再印出成果。

#### 第四部分:成果展示

![https://ithelp.ithome.com.tw/upload/images/20220927/20151593SvJoCFLKXs.png](https://ithelp.ithome.com.tw/upload/images/20220927/20151593SvJoCFLKXs.png)

今天的成果部份我們是採用線上C++ compiler: [https://www.onlinegdb.com/online_c++compiler](http://)
的方式去執行，在沒有帶電腦卻仍想練習code的情況下，線上編譯器也是個好選擇喔!而在本機端下載的軟體執行速度會比較快與功能比較多~ ୧༼ ヘ ᗜ ヘ ༽୨

## 參考資料:

[https://www.geeksforgeeks.org/cpp-program-for-quicksort/](https://www.geeksforgeeks.org/cpp-program-for-quicksort/)
