---
title: DAY2 用HelloWorld窺探程式基本架構
date: 2022-09-03 02:00:00
tags: []

source: https://ithelp.ithome.com.tw/articles/10287413
series: C++ 基礎教學
categories:
  - C++ 基礎教學
---

## 題目:

請使用者輸入任意整數值，並讓程式輸出"Hello World!"

## 解法:

```
#include<iostream>
using namespace std;

int main()
{
    int x;  //令x為整數值
    cin >> x;  //輸入x
    cout << "Hello World!";  //輸出Hello World!
}
```

## 詳細解釋與介紹:

### 第一部分: 標頭檔與namespace

在未來我們打的每份程式的開頭幾乎都布滿了這兩行程式碼，而這出場率極高的code又代表了什麼意思呢~(ゝ∀･)

```
#include<iostream>
```

是讓程式可以使用iostream裡的輸入與輸出的標頭檔函式庫，而之後若要使用其他的函式庫也是仿照此方式匯入，如: #include<ctime>

```
using namespace std;
```

則可以讓你不用在每一行cin/cout、endl、或是函數前面打入"std::"的字串(若是以原本的標準式來打，cin就得變成 std::cin的方式)，以提升寫程式的效率!

### 第二部分: main()函式介紹

同樣也有著百分百出場率的的便是我們main()函式!

```
int main()
{
    int x;  //令x為整數值
    cin >> x;  //輸入x
    cout << "Hello World!";  //輸出Hello World!
}
```

只要看到  int main(){ 主程式 } 就可以知道中括號中包含的部分就是這個程式的主要程式敘述的地方!像這個程式主要執行的便如題目所示，可以分為

input:"當使用者輸入任意整數值"與
output:"Hello World"字串

的兩個事件。之後的鐵人賽中也會以將程式區分為input(輸入，使用者對電腦、鍵盤進行的動作，抑或是程式預先的執行指令)與output(輸出，電腦螢幕呈現的程式運行結果)的兩步驟來進行解題思路的分析。而當程式碼與所需功能越來越多時，也會在main()函式外出現其他的副程式或函示來輔助主程式的進行。

需要注意的是，我們常用大括號"{}"包夾著一個程式，而小括號"()"則伴隨著函示出現(有時中間會夾著變數的定義值或其他相關設定)。通常在換行撰寫程式時，我們也會用tab鍵的縮排功能使程式碼較為方便閱讀，這部分在往後介紹迴圈時也會再多加說明

### 第三部分: 主功能解析

如同剛剛提到的input與output拆分方式，我們要來實際介紹要如何以C++的寫法來完成這些事情了

```
int x;  //令x為整數值
    cin >> x;  //輸入x
    cout << "Hello World!";  //輸出Hello World!
```

首先我們要說明C++裡"變數"概念。C++在用到每個變數時都需要"宣告"其形態與名稱，否則就不可使用其宣告方式對映下常見型態表格:
![https://ithelp.ithome.com.tw/upload/images/20220902/20151593hvfusNb7tg.png](https://ithelp.ithome.com.tw/upload/images/20220902/20151593hvfusNb7tg.png)

並且在宣告變數名稱時須遵守三點原則
1.不可以數字作為開頭
2.不可使用特殊字元，如 * & ^ % . 中文字 等等
3.不可使用已存在C++內的關鍵字名詞，如:class、int、time...

這裡我們用int x;令了一個整數變數值，名稱為"x"，並用cin >> x;代表使用者會按下一個數字值並執行下行程式，也就是cout << "Hello World!";(C++中的cin>>便是輸入的意思；cout<<則是輸出)，而每行執行完的程式碼最後須加"；"作為分隔使用。

這樣就可以在terminal(終端機)中執行你的第一個程式碼了~那我們明天見!

### 參考資料:

[https://www.796t.com/content/1547346090.html](https://www.796t.com/content/1547346090.html)

[https://www.csie.ntu.edu.tw/~b98902112/cpp_and_algo/cpp/variable_type_and_declare.html](https://www.csie.ntu.edu.tw/~b98902112/cpp_and_algo/cpp/variable_type_and_declare.html)
