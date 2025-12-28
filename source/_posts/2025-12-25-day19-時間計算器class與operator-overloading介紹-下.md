---
title: "DAY19 時間計算器Class與operator overloading介紹(下)"
date: 2025-12-25
tags: []
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10289299
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

### 第八部分:秒數operator+

```
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
```

我們先設定一個&d的pointer與三個成員函式dt.getSecond()、dt.getMinute()、dt.getHour()與成員變數S, Min, H，並用迴圈設立"時、分、秒"分別的限制條件。而在天數部分的設置也需要再配合昨天設計的月份與閏年搭配。最後再回傳myDateTime()值

### 第八部分:秒數operator-

```
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
```

仿照上述建立operator-的部分。

### 第九部分:函式設立

```
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
```

設立函式的設定值。

```
ool myDateTime::setDateTime(const int y, const int m, const int d, const int h, const int min, const int s)
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
```

與建立setTime()的boolean值來判斷是否為初始值。

```
void myDateTime::output()
{
    cout << getYear() << "-" << getMonth() << "-" << getDay() << " (" << getWeek() << ") "<< getHour() << ":" << getMinute() << ":" << getSecond();
}
```

設立myDateTime()的output函式。

### 第十部分:main函式

```
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

設立主程式的執行序，使用者會先輸入年月日時分秒，再輸入一x值，會先判定x的正負值(若為0則結束程式)，而正、負的迴圈中會分別對應operator+/-的使用(也就是使用者的時間加上x秒或是減掉x秒)且程式會持續執行到使用者輸入0為止。

### 第十一部份:成果展示

加
![https://ithelp.ithome.com.tw/upload/images/20220920/201515934WhnDHcgFg.png](https://ithelp.ithome.com.tw/upload/images/20220920/201515934WhnDHcgFg.png)

減
![https://ithelp.ithome.com.tw/upload/images/20220920/201515936iKdb5AlC5.png](https://ithelp.ithome.com.tw/upload/images/20220920/201515936iKdb5AlC5.png)
這三天裡我們學習運由較多函式組成的專案練習，來加深大家在class與operator的使用，可能要花上比較多時間習慣稍大型的專案的執行模式與思路!會稍微有些不習慣、不適應都是正常的，只要一步步堅持下去才可以讓程式的思維在腦袋裡扎根、穩固! 那我們明天見₍ᐢ •͈ ༝ •͈ ᐢ₎♡

## 參考資料:

[https://github.com/samwang1228/c-university/blob/main/%E5%88%9D%E9%9A%8E%E7%A8%8B%E5%BC%8F/class_test.cpp](https://github.com/samwang1228/c-university/blob/main/%E5%88%9D%E9%9A%8E%E7%A8%8B%E5%BC%8F/class_test.cpp)
