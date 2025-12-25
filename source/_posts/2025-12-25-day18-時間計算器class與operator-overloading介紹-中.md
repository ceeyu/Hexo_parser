---
title: DAY18 時間計算器Class與operator overloading介紹(中)
date: 2025-12-25
tags: []
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10289298
---

## 題目:

設計一個類別包含以下功能:
private data: 存放年月日(西元)、存放時間
提供public member function(程式中會一一介紹)

- bool setTime()

- bool setData()

- int whatDate()//禮拜幾

- void output()

- int seconds()//今天過了幾秒

- bool isLeap()//回傳閏年
等等函式

input:
使用者會輸入一個年 月 日 時 分 秒與一數(正或負)秒數值，

output:
輸出yyyy-mm-dd(星期) hh:mm:ss ，時間為加上或減掉x秒的數值

而使用者可以持續輸入不同的x值，每輸入一次都會輸出一次對應的時間值，直到使用者輸入0時程式結束。

## 解釋與詳細介紹

### 第二部分:operator overloading介紹

在C++中，我們可以運用operator overloading(運算子多載)的方式來定義不同的運算符(像是+、-、)，讓他代表新的我們自行定義的使用方式。

### 第三部分:主功能解析-前置設定

```
class myDate
{
public:
    myDate(const int y, const int m, const int d);
    int getYear();
    int getMonth();
    int getDay();
    int getWeek(); //0~6 蔡勒公式
    bool setDate(const int y, const int m, const int d);
    bool isLeap(int y);//閏年
    void output(); //輸出 year-month-day (week)
private:
    int year;
    int month;
    int day;
    int week;
};
```

首先我們先設置會用到的private和public函式與變數。

### 第四部分:主功能解析-天數operator+

```
const myDate operator+(myDate &d, const int n) //d+n天
{
    int Y, M, D;
    Y = d.getYear();//年
    M = d.getMonth();//月
    D = d.getDay() + n;//日
    while (D > 28)
    {
        if (M == 1 || M == 3 || M == 5 || M == 7 || M == 8 || M == 10 || M == 12)
        {
            if (D > 31)
            {
                D = D - 31;
                M++;
            }
            else
            {
                break;
            }
        }
        else if (M == 4 || M == 6 || M == 9 || M == 11)
        {
            if (D > 30)
            {
                D = D - 30;
                M++;
            }
            else
            {
                break;
            }
        }
        else
        {
            if (d.isLeap(Y) == true)
            {
                if (D > 29)
                {
                    D = D - 29;
                    M++;
                }
                else
                {
                    break;
                }
            }
            else
            {
                if (D > 28)
                {
                    D = D - 28;
                    M++;
                }
                else
                {
                    break;
                }
            }
        }
        if (M > 12)
        {
            Y++;
            M = 1;
        }
    }
    return myDate(Y, M, D);
}
```

再來提到operator+的部分:
這裡注意到，因為年月日的變數為private，所以便需要以get()函式去"取值"。然後在第一個if迴圈中先判定各個月份的天數對應。其中要注意到二月的天數還需要考慮isLeap()閏年的判定式。而在月份判定的最外圈也需要將>12的數值視為年份的增加。且最後的return值是myDate(Y,M,D)

### 第五部分:主功能解析-天數operator-

```
const myDate operator-(myDate &d, const int n) //d-n天
{
    int Y, M, D;
    Y = d.getYear();
    M = d.getMonth();
    D = d.getDay() - n;
    while (D <= 0)
    {
        M--;
        if (M < 1)
        {
            Y--;
            M = 12;
        }
        if (M == 1 || M == 3 || M == 5 || M == 7 || M == 8 || M == 10 || M == 12)
        {
            D = D + 31;
        }
        else if (M == 4 || M == 6 || M == 9 || M == 11)
        {
            D = D + 30;
        }
        else
        {
            if (d.isLeap(Y) == true)
            {
                D = D + 29;
            }
            else
            {
                D = D + 28;
            }
        }
    }
    return myDate(Y, M, D);
}
```

這部分就是對於opreator-的重載設定

### 第六部分:主功能解析-get函式設定

```
myDate::myDate(const int y, const int m, const int d)
{
    year = y;
    month = m;
    day = d;
}
int myDate::getYear()
{
    return year;
}
int myDate::getMonth()
{
    return month;
}
int myDate::getDay()
{
    return day;
}
```

分別對每個get函式設定，讓它具有private變數的賦值。

```
int myDate::getWeek()
{
    int w, c, y, m = month, d = day, x = year;
    if (m == 1 || m == 2)
    {
        m = m + 12;
        x = x - 1;
        c = x / 100;
        y = x - c * 100;
        w = (y + (y / 4) + (c / 4) - 2 * c + 2 * m + (3 * (m + 1) / 5) + d + 1);
    }
    else
    {
        c = x / 100;
        y = x - c * 100;
        w = (y + (y / 4) + (c / 4) - 2 * c + 2 * m + (3 * (m + 1) / 5) + d + 1);
    }
    if (w >= 0)
    {
        week = w % 7;
        return week;
    }
    else
    {
        week = (w % 7 + 7) % 7;
        return week;
    }
}
```

而在getWeek()這裡需要運用蔡勒公式來計算星期。

### 第七部分:主功能解析-初始函式設定

```
bool myDate::setDate(const int y, const int m, const int d)
{
    if (m < 1 || m > 12)
    {
        month = 1;
        day = 1;
    }
    else
    {
        month = m;
        if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12)
        {
            if (d < 1 || d > 31)
            {
                month = 1;
                day = 1;
            }
            else
            {
                day = d;
            }
        }
        else if (m == 4 || m == 6 || m == 9 || m == 11)
        {
            if (d < 1 || d > 30)
            {
                month = 1;
                day = 1;
            }
            else
            {
                day = d;
            }
        }
        else if (isLeap(y) == true && m == 2)
        {
            if (d < 1 || d > 29)
            {
                month = 1;
                day = 1;
            }
            else
            {
                day = d;
            }
        }
        else
        {
            if (d < 1 || d > 28)
            {
                month = 1;
                day = 1;
            }
            else
            {
                day = d;
            }
        }
    }
    return true;
}
```

設定初始的date值。

```
bool myDate::isLeap(int y)
{
    if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0)
    {
        return true;
    }
    else
        return false;
}
void myDate::output()
{
    cout << year << "-" << month << "-" << day << " (" << getWeek() << ")";
}
```

再設定閏年值與output顯示方式

那剩下的部份我們明天繼續( • ̀ω•́ )

## 參考資料:

[https://www.geeksforgeeks.org/operator-overloading-c/](https://www.geeksforgeeks.org/operator-overloading-c/)

[https://github.com/samwang1228/c-university/blob/main/%E5%88%9D%E9%9A%8E%E7%A8%8B%E5%BC%8F/class_test.cpp](https://github.com/samwang1228/c-university/blob/main/%E5%88%9D%E9%9A%8E%E7%A8%8B%E5%BC%8F/class_test.cpp)
