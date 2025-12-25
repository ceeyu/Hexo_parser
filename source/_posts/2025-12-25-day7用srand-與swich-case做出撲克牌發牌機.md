---
title: DAY7用srand()與swich/case做出撲克牌發牌機
date: 2022-09-08 07:00:00
tags: []

source: https://ithelp.ithome.com.tw/articles/10288497
series: C++ 基礎教學
categories:
  - C++ 基礎教學
---

## 題目:

你的程式會讓使用者輸入兩個整數s,與x，s為srand的seed，然後亂數函式產生x張牌。（不用處理重複）

每一張牌，產生1\~4的亂數(代表花色，1=Spade, 2=Heart, 3=Diamond,4=Club)與一個1\~13的數字(代表數值，11=J, 12=Q, 13=K, 1=A)

並印出你的牌，例如D10或是HJ，且每一張牌都需要跳行

## 解法:

```
#include <iostream>
#include <cstdlib>

using namespace std;
int main()
{
  int s,x,sym,num;
  cin >> s >>x;
  srand(s);
  
  for(int i=0;i < x; i++)
  {
    sym=rand()%4+1;//代表花色
    num=rand()%13+1;//代表數值
    
    switch(sym)
    {
        case 1:
        	cout<<"S";
        	break;
        case 2:
        	cout<<"H";
        	break;
        case 3:
        	cout<<"D";
        	break;
        case 4:
        	cout<<"C";
        	break;
    }
    
    switch(num)
    {
      	case 1:
        	cout<<"A";
        	break;
    	case 2:
        	cout<<"2";
        	break;
    	case 3:
        	cout<<"3";
        	break;
    	case 4:
        	cout<<"4";
        	break;
    	case 5:
        	cout<<"5";
        	break;
    	case 6:
        	cout<<"6";
        	break;
    	case 7:
        	cout<<"7";
        	break;
    	case 8:
        	cout<<"8";
        	break;
    	case 9:
        	cout<<"9";
        	break;
    	case 10:
        	cout<<"10";
        	break;
    	case 11:
        	cout<<"J";
        	break;
    	case 12:
        	cout<<"Q";
        	break;
    	case 13:
        	cout<<"K";
        	break;
  	}
  cout << "\n";
}

return 0;

}
```

## 解釋與詳細介紹

### 第一部分:亂數介紹

在程式中，我們有時會需要程式自動產生一個亂數。而最基本的方法之一便是使用在cstdlib標頭檔中的srand()函式。我們可以先給予程式一個seed(種子)值，讓其可以對照既有的亂數表去取亂數。這個概念有點像是，在這個函式內計有一個很長且會循環的亂數表，在選定一個"種子"後，便會決定亂數的選取開頭。而為了代表隨機性，有時候我們也會配合時間函式time()去作為種子值。並以rand()代表當下的亂數值結果。

以下列程式為例:

```
#include <cstdlib>
#include <iostream>
#include <ctime>
using namespace std;
  
int main()
{
    srand(time(0));//設立種子值
    
    for (int i = 0; i < 4; i++)
        cout << rand() << " "; //輸出四個亂數值
    return 0;
}
```

上述寫法便可以使程式產生四個不同的亂數值，而rand()的範圍在[0, RAND_MAX)中。同時這個例子中因為for迴圈的執行式只有一行，所以大括號{}可以省略(若是兩行以上的情況則不能)。

### 第二部分:switch/case介紹

switch/case的方式是以一個條件式做為選擇條件，並連結到不同情況的條件應對的case的程式段來執行。像此題我們就會用這個方式來一一對應隨機數與"花色"和"數值"的表現方式。

```
switch(變數名稱或運算式) {
    case 符合數字或字元:
        陳述句一;
        break;
    case 符合數字或字元:
        陳述句二;
        break;
    default:
        陳述三;
        break;
}
```

要注意的是，在每個case結束後需要以一個break;作為結束。才能使程式正確執行，也就是當對應的case結束後會直接跳出程式段，而非繼續值形同段落的其他case。

### 第三部分:主功能解析

在這題中我們可以看到

input:整數s(seed),與x(產生牌數)
output:x個二位數，其中每數第一位代表"花色"、第二位代表"數值"，且表示規則如題目所示

這題我們先定義四個變數s,x,sym,num，且sym,num分別代表花色與數值，並以取於數的方式限定隨機數的範圍(注意在取完餘數記得+1才會是正確的結果)。並以for迴圈的方式使其能執行x遍。

```
sym=rand()%4+1;//代表花色
    num=rand()%13+1;//代表數值
```

在for迴圈主程式段中，來我們要運用到switch/case的寫法來幫助我們將隨機數對應到顯示的牌與花色代表樣子。我們先以sym作為亂數去對應了"花色"；num亂數對應"數值"

sym中:1\~4的代表花色，1=Spade(S), 2=Heart(H), 3=Diamond(D),4=Club(C)
num中:1\~13的數字，2\~10代表對應整數,11=J, 12=Q, 13=K, 1=A)

最後在程式末端輸出換行(\n)或空格(" ")符號作為牌與牌間的分隔。

### 第四部份:成果展示

![https://ithelp.ithome.com.tw/upload/images/20220908/20151593UzIkJJ9xIc.png](https://ithelp.ithome.com.tw/upload/images/20220908/20151593UzIkJJ9xIc.png)

這樣就可以用亂數結合程式的觀念做出自己的發牌機了!是不是很有趣呢~♪(^∇^*) 那我們明天見!

## 參考資料:

[https://www.programiz.com/cpp-programming/library-function/cstdlib/srand](https://www.programiz.com/cpp-programming/library-function/cstdlib/srand)

[https://stackoverflow.com/questions/1619627/what-does-seeding-mean](https://stackoverflow.com/questions/1619627/what-does-seeding-mean)

[https://www.geeksforgeeks.org/rand-and-srand-in-ccpp/](https://www.geeksforgeeks.org/rand-and-srand-in-ccpp/)

[https://openhome.cc/Gossip/CppGossip/switchStatement.html](https://openhome.cc/Gossip/CppGossip/switchStatement.html)
