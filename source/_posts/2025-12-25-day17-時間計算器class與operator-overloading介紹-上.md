---
title: DAY17 時間計算器Class與operator overloading介紹(上)
date: 2025-12-25
tags: []
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10289297
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

## 解法

```
#include <iostream>
using namespace std;
class myDate
{
public:
    myDate(const int y, const int m, const int d);
    int getYear();
    int getMonth();
    int getDay();
    int getWeek(); //0\~6 蔡勒公式
    bool setDate(const int y, const int m, const int d);
    bool isLeap(int y);
    void output(); //輸出 year-month-day (week)
private:
    int year;
    int month;
    int day;
    int week;
};
const myDate operator+(myDate &d, const int n) //d+n天
{
    int Y, M, D;
    Y = d.getYear();
    M = d.getMonth();
    D = d.getDay() + n;
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
class myDateTime : public myDate
{
public:
    myDateTime(const int y, const int m, const int d, const int h, const int min, const int s);
    int getHour();
    int getMinute();
    int getSecond();
    bool setDateTime(const int y, const int m, const int d, const int h, const int min, const int s);
    void output(); //輸出 year-month-day (week) hour:minute:second
private:
    int hour;
    int minute;
    int second;
};
const myDateTime operator+(myDateTime &dt, const int s) //dt+s秒
{
    int dayUsed = 0, S, Min, H;
    S = dt.getSecond() + s;
    Min = dt.getMinute();
    H = dt.getHour();
    if (S < 60)
        return myDateTime(dt.getYear(), dt.getMonth(), dt.getDay(), H, Min, S);
    else
    {
        Min += S / 60;
        S %= 60;
    }
    if (Min < 60)
        return myDateTime(dt.getYear(), dt.getMonth(), dt.getDay(), H, Min, S);
    else
    {
        H += Min / 60;
        Min %= 60;
    }
    if (H < 60)
        return myDateTime(dt.getYear(), dt.getMonth(), dt.getDay(), H, Min, S);
    else
    {
        dayUsed = H / 24;
        H %= 24;
    }
    int Y, M, D;
    Y = dt.getYear();
    M = dt.getMonth();
    D = dt.getDay() + dayUsed;
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
            if (dt.isLeap(Y) == true)
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
    return myDateTime(Y, M, D, H, Min, S);
}
const myDateTime operator-(myDateTime &dt, const int s) //dt-s秒
{
    int dayUsed = 0, S, Min, H;
    S = dt.getSecond() - s;
    Min = dt.getMinute();
    H = dt.getHour();
    while (S < 0)
    {
        S += 60;
        Min -= 1;
    }
    while (Min < 0)
    {
        Min += 60;
        H -= 1;
    }
    while (H < 0)
    {
        H += 24;
        dayUsed++;
    }
    int Y, M, D;
    Y = dt.getYear();
    M = dt.getMonth();
    D = dt.getDay() - dayUsed;
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
            if (dt.isLeap(Y) == true)
            {
                D = D + 29;
            }
            else
            {
                D = D + 28;
            }
        }
    }
    return myDateTime(Y, M, D, H, Min, S);
}
myDateTime::myDateTime(const int y, const int m, const int d, const int h, const int min, const int s) : myDate(y, m, d)
{
    hour = h;
    minute = m;
    second = s;
}
int myDateTime::getHour()
{
    return hour;
}
int myDateTime::getMinute()
{
    return minute;
}
int myDateTime::getSecond()
{
    return second;
}
bool myDateTime::setDateTime(const int y, const int m, const int d, const int h, const int min, const int s)
{
    setDate(y, m, d);
    if (h < 0 || h > 23)
    {
        hour = 0;
        minute = 0;
        second = 0;
    }
    else
    {
        if (min < 0 || min > 59)
        {
            hour = 0;
            minute = 0;
            second = 0;
        }
        else
        {
            if (s < 0 || s > 59)
            {
                hour = 0;
                minute = 0;
                second = 0;
            }
        }
    }
    return true;
}
void myDateTime::output()
{
    cout << getYear() << "-" << getMonth() << "-" << getDay() << " (" << getWeek() << ") "<< getHour() << ":" << getMinute() << ":" << getSecond();
}
int main()
{
    int y, m, d,hr,min,sec, x;
    cin >> y >> m >> d >> hr >> min >> sec;
    myDateTime date(y, m, d,hr,min,sec), answer(1900, 1, 1,0,0,0);
    date.setDateTime(y, m, d,hr,min,sec);
    while (cin >> x)
    {
        if (x == 0)
            break;
        else if (x > 0)
        {
            answer = date + x;
            answer.output();
            cout << endl;
            date = answer;
        }
        else
        {
            x = -x;
            answer = date - x;
            answer.output();
            cout << endl;
            date = answer;
        }
    }
}
```

## 解釋與詳細介紹

### 第一部分:class介紹

昨天我們提到可以運用structure自己定義型態變數，而在他之後又有了class的概念，我們可以用class定義自己的型態與成員變數的數量與樣子，同時也可以定義這個成員變數是否可以被程式中其他的部分所使用(public)；或是僅能被同個類別的內部存取(private)。這樣的定義也能讓程式或專案中較為私密的資料不隨以開放給外人知曉，達到保密的效果(也許其他部分的程式不需要知道詳細數值)。

而我們會用下列的方式來表示class:

```
class MyClass {       // The class
  public:             // Access specifier
    int myNum;        // Attribute (int variable)
    string myString;  // Attribute (string variable)
  private:
    int money;        // Attribute (int variable)
};
```

會以private:/public:的方式區分成員屬性。

### 第二部分:主功能解析

這部分我們將明天講解，因為這份程式較大所以會分作三天介紹!

## 參考資料:

[https://www.w3schools.com/cpp/cpp_classes.asp](https://www.w3schools.com/cpp/cpp_classes.asp)

[https://github.com/samwang1228/c-university/blob/main/%E5%88%9D%E9%9A%8E%E7%A8%8B%E5%BC%8F/class_test.cpp](https://github.com/samwang1228/c-university/blob/main/%E5%88%9D%E9%9A%8E%E7%A8%8B%E5%BC%8F/class_test.cpp)
