---
title: DAY25 快速排序法(quick sort)介紹
date: 2025-12-25
tags: []
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10294884
---

## 快速排序法(quick sort)介紹

快速排序法(quick sort)是一種在數列裡面找"樞紐"(pivot)的方式遞迴地在左右群間找到更好的樞紐的方式。而他的概念也是Conquer(合併) and divide(分割)的原理。而我們在解釋完pseudocode後也會舉個例子作為示範，以利理解。

## quick sort pseudocode展示

```
template<class T>//T為一個"型別"
void QuickSort(T*a, const int left,const int right)
{
     if(left < right){
          int i = left, //i為陣列index最小值
                    j = right+1; //j為陣列index最大值
                    pivot = a[left];//隨意選出a[left]作為樞紐
          do{
               do i++; while(a[i] < pivot);//i由左到右檢視是否該值"小於"樞紐
               do j--; while(a[j] > pivot);//j由又到左檢視該值是否"大於"樞紐
          }while(i < j);//在i, j還沒交界時
          swap(a[left],a[j]);//若是重疊則交換兩者

          QuickSort(a, left, j-1);//對樞紐左半部繼續quicksort
          QuickSort(a, j+1, right);//對樞紐右半部繼續quicksort
     }
}
```

在這段pseudocode中，我們可以發現我們首先定義了一個陣列a，且設置左值與右值(代表indext的大小)，且先定義a[left]是樞紐(比較中間點)，藉由這個樞紐，配合運用i, j變數，我們可以逐一比較與檢察使左半部的數值"必定"小於樞紐；右半部則大於樞紐。

而在兩者交疊時(當j往左移碰到往右的i時)就會將兩者的值交換(swap)，並分別對樞紐的左右各半各再做一次Quick sort。

## 範例

一數列初始如下

- {[26 5 37 1 61 11 59 15 48 19]}:Left為index=1、Right為index=10(26的index為1，19的index為10)

- {[11 5 37 1 61 ]26 [ 59 15 48 19]}:Left為index=1、Right為index=5，將26作為pivot與11調換

- {[11 5 19 1  15]26 [ 59 61 48 37]}:37跟19swap、61跟15swap

- {[1 5 ]11 [19  15]26 [ 59 61 48 37]}:先對左半部分進行quicksort

- {1 5 11 15 19 26 [59 61 48 37]}:左半部排序完成

- {1 5 11 15 19 26 [48 61] 59 [37]}:59跟48swap並作為pivot

- {1 5 11 15 19 26 [48 37] 59 [61]}:37跟61swap

- {1 5 11 15 19 26 37 48 59 61}:排序完成

以上就是執行一次quicksort所歷經的步驟，再多操作幾次會更熟悉它的運作模式，同時也可以列出每個時段的left,right index來加深自己的印象喔!那我們明天見!(๑´ڡ`๑)
