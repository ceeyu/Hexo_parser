---
title: DAY23 合併排序法(merge sort)介紹
date: 2025-12-25
tags: []
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10294882
---

## 合併排序法(merge sort)介紹

merge sort是一種以Conquer(合併) and divide(分割)的方式所結合而成的排序法。而他的精神就是以"將大問題分割為多個小問題一一擊破"若是小問題仍然難解，那就分割為更小的組件再擊破就可以了!當小問題解決後再結合起來，也就等同於原本的大問題也解決了!

舉例而言，我們有一數列為{26 5 77 61 11 59 15 48 19}

### 第一步:拆分(divide)

那麼第一步我們先實行"拆分"，將他依序分為:

- 26 5 77 61 11 | 59 15 48 19:分為左右兩塊

- 26 5 77 | 61 11 | 59 15 | 48 19:將左右兩塊各再拆分為共四塊

- 26 | 5 | 77 | 61 | 11 | 59 | 15 | 48 | 19:將26單獨移下，並將其餘四塊倆倆拆分

其中每一個|就代表一次的分割步驟，我們用divide的方式得到了數列的每個單獨項

### 第二步:合併(conquer)，或稱Merge

在這一步中，我們會將原本拆完的子元素用排序的方式一一合併起來

- 26 | 5 | 77 | 61 | 11 | 59 | 15 | 48 | 19:原本拆分完的字子元素

- [5 26] | [61 77] | [11 59] | [15 48] | [19]:將相鄰兩元素排序，因分割數為五，[19]直接移下

- [5 26 61 77] | [11 15 48 59] | [19]:將相鄰兩排序陣列結合排序，最後項[19]直接移下

- [5 11 15 26 48 59 61 77] | [19]:兩陣列結合排序

- [5 11 15 19 26 48 59 61 77] :排序完成

## merge sort pseudocode展示

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

pseudocode的意涵我們將於明天連同C++一起介紹~ 大家可以先實做看看數列的conquer and divide會讓明天的解釋更清楚喔!好好期待八⁽⁽٩(๑˃̶͈̀ ᗨ ˂̶͈́)۶⁾⁾

## 參考資料:

[https://kopu.chat/%E5%90%88%E4%BD%B5%E6%8E%92%E5%BA%8F-merge-sort/](https://kopu.chat/%E5%90%88%E4%BD%B5%E6%8E%92%E5%BA%8F-merge-sort/)

[https://alrightchiu.github.io/SecondRound/comparison-sort-merge-sorthe-bing-pai-xu-fa.html](https://alrightchiu.github.io/SecondRound/comparison-sort-merge-sorthe-bing-pai-xu-fa.html)
