---
title: 【開局地端紅隊小白與雲端資安的清晨Punch】Day12 DVWA 使用(SQL injection)
date: 2024-08-22 12:00:00
tags: [sql injection, 資訊安全, dvwa]

source: https://ithelp.ithome.com.tw/articles/10345746
series: 雲端資安
categories:
  - 雲端資安
---

# 陸、Usage(使用方式) --- SQL injection

參考: [DVWA 基礎篇](https://medium.com/@clannad716/dvwa-low-level-5355a2d5ca9d)

## 一、SQL injection

先觀察一般使用情況，再從使用者頁面輸入欄位執行SQL injection來檢查

### 假如設為 Easy

- 輸入: user ID

輸出: 如果ID存在，則輸出內容
![image](https://hackmd.io/_uploads/BJt9FPZAa.png)

injection: 1' oder by 2#
![image](https://hackmd.io/_uploads/BkLRcv-Ca.png)

### 假如設為 Medium

輸入:選擇 label User ID = 2
![image](https://hackmd.io/_uploads/SybwDDbAa.png)

輸出:
![image](https://hackmd.io/_uploads/SJuZOv-R6.png)

injection: 1' oder by 2#

![image](https://hackmd.io/_uploads/SJPNcw-Cp.png)

### 設為High

輸入:選擇想要切換的ID，按下submit
![image](https://hackmd.io/_uploads/HklIuw-A6.png)

輸出: ID資訊

![image](https://hackmd.io/_uploads/BJ6tuwbA6.png)

injection: 1' oder by 2#

### 假如Security設為"impossible"

- 輸入: 1' oder by 2#，按下 enter

![image](https://hackmd.io/_uploads/rkrmIDb0a.png)

- 原始網址(放大)

![image](https://hackmd.io/_uploads/rydCUP-CT.png)

- submit送出後，結果安全，並且可以觀察到網址有做過處理

![image](https://hackmd.io/_uploads/rJht8P-C6.png)

處理後網址
![image](https://hackmd.io/_uploads/S14nID-Cp.png)

## 二、Source Code 描述

### Low

註解：

- 輸入處理： 使用 $_REQUEST 來接收用戶輸入。這包括 GET 和 POST 請求，增加了攻擊面。

- SQL 查詢： 未使用任何 SQL 查詢的防護措施，直接將用戶輸入 $id 插入到查詢中。

- 結果處理： 將查詢結果直接輸出到頁面上。

可能的漏洞：

- SQL 注入（SQL Injection）： $id 的值直接插入到 SQL 查詢中，攻擊者可以利用此漏洞進行 SQL 注入攻擊。

```
<?php

if( isset( $_REQUEST[ 'Submit' ] ) ) {
    // Get input
    $id = $_REQUEST[ 'id' ];

    switch ($_DVWA['SQLI_DB']) {
        case MYSQL:
            // Check database
            $query  = "SELECT first_name, last_name FROM users WHERE user_id = '$id';";
            $result = mysqli_query($GLOBALS["___mysqli_ston"],  $query ) or die( '<pre>' . ((is_object($GLOBALS["___mysqli_ston"])) ? mysqli_error($GLOBALS["___mysqli_ston"]) : (($___mysqli_res = mysqli_connect_error()) ? $___mysqli_res : false)) . '</pre>' );

            // Get results
            while( $row = mysqli_fetch_assoc( $result ) ) {
                // Get values
                $first = $row["first_name"];
                $last  = $row["last_name"];

                // Feedback for end user
                echo "<pre>ID: {$id}<br />First name: {$first}<br />Surname: {$last}</pre>";
            }

            mysqli_close($GLOBALS["___mysqli_ston"]);
            break;
        case SQLITE:
            global $sqlite_db_connection;

            #$sqlite_db_connection = new SQLite3($_DVWA['SQLITE_DB']);
            #$sqlite_db_connection->enableExceptions(true);

            $query  = "SELECT first_name, last_name FROM users WHERE user_id = '$id';";
            #print $query;
            try {
                $results = $sqlite_db_connection->query($query);
            } catch (Exception $e) {
                echo 'Caught exception: ' . $e->getMessage();
                exit();
            }

            if ($results) {
                while ($row = $results->fetchArray()) {
                    // Get values
                    $first = $row["first_name"];
                    $last  = $row["last_name"];

                    // Feedback for end user
                    echo "<pre>ID: {$id}<br />First name: {$first}<br />Surname: {$last}</pre>";
                }
            } else {
                echo "Error in fetch ".$sqlite_db->lastErrorMsg();
            }
            break;
    } 
}

?>
```

### Medium

註解：

- 輸入處理： 使用 $_POST 接收用戶輸入，避免了 GET 請求，但依然存在一定風險。

- SQL 查詢： 對 MySQL 的輸入進行了 mysqli_real_escape_string 處理，以防止 SQL 注入。

- 結果處理： SQL 查詢結果直接輸出到頁面上。

可能的漏洞：

- SQL 注入（SQL Injection）： 雖然對 MySQL 使用了 mysqli_real_escape_string 進行處理，但對 SQLite 的處理沒有防護，且 mysqli_real_escape_string 也不能處理所有可能的注入情況。

- 輸出泄露： 查詢錯誤訊息或其他內部錯誤信息直接顯示在頁面上，可能會洩露有用的資訊給攻擊者。

```
<?php

if( isset( $_POST[ 'Submit' ] ) ) {
    // Get input
    $id = $_POST[ 'id' ];

    $id = mysqli_real_escape_string($GLOBALS["___mysqli_ston"], $id);

    switch ($_DVWA['SQLI_DB']) {
        case MYSQL:
            $query  = "SELECT first_name, last_name FROM users WHERE user_id = $id;";
            $result = mysqli_query($GLOBALS["___mysqli_ston"], $query) or die( '<pre>' . mysqli_error($GLOBALS["___mysqli_ston"]) . '</pre>' );

            // Get results
            while( $row = mysqli_fetch_assoc( $result ) ) {
                // Display values
                $first = $row["first_name"];
                $last  = $row["last_name"];

                // Feedback for end user
                echo "<pre>ID: {$id}<br />First name: {$first}<br />Surname: {$last}</pre>";
            }
            break;
        case SQLITE:
            global $sqlite_db_connection;

            $query  = "SELECT first_name, last_name FROM users WHERE user_id = $id;";
            #print $query;
            try {
                $results = $sqlite_db_connection->query($query);
            } catch (Exception $e) {
                echo 'Caught exception: ' . $e->getMessage();
                exit();
            }

            if ($results) {
                while ($row = $results->fetchArray()) {
                    // Get values
                    $first = $row["first_name"];
                    $last  = $row["last_name"];

                    // Feedback for end user
                    echo "<pre>ID: {$id}<br />First name: {$first}<br />Surname: {$last}</pre>";
                }
            } else {
                echo "Error in fetch ".$sqlite_db->lastErrorMsg();
            }
            break;
    }
}

// This is used later on in the index.php page
// Setting it here so we can close the database connection in here like in the rest of the source scripts
$query  = "SELECT COUNT(*) FROM users;";
$result = mysqli_query($GLOBALS["___mysqli_ston"],  $query ) or die( '<pre>' . ((is_object($GLOBALS["___mysqli_ston"])) ? mysqli_error($GLOBALS["___mysqli_ston"]) : (($___mysqli_res = mysqli_connect_error()) ? $___mysqli_res : false)) . '</pre>' );
$number_of_rows = mysqli_fetch_row( $result )[0];

mysqli_close($GLOBALS["___mysqli_ston"]);
?>
```

### High

註解：

- 輸入處理： 使用 $_REQUEST 接收用戶輸入，沒有過濾或驗證。

- SQL 查詢： 未使用任何 SQL 查詢的防護措施，直接將用戶輸入 $id 插入到查詢中。SQLite 和 MySQL 的查詢均未進行適當的保護。

- 結果處理： 查詢結果直接顯示給用戶，並且錯誤訊息也會顯示在頁面上。

可能的漏洞（繼續）：

- SQL 注入（SQL Injection）： 即使在 High 等級中對 MySQL 使用了 mysqli_real_escape_string，但對 SQLite 的處理方式仍然容易受到 SQL 注入攻擊。所有的 $id 變量都直接嵌入在 SQL 查詢中，這使得攻擊者可以通過修改 $id 來操控 SQL 查詢。例如，攻擊者可以傳入 ' OR '1'='1 來執行任意查詢。

- 錯誤信息泄露： 錯誤訊息（如 SQL 查詢錯誤）會被直接顯示給用戶，這樣會洩露有關系統的內部細節，可能會幫助攻擊者了解系統的結構或潛在的問題。

```
<?php

if( isset( $_REQUEST[ 'Submit' ] ) ) {
    // Get input
    $id = $_REQUEST[ 'id' ];

    switch ($_DVWA['SQLI_DB']) {
        case MYSQL:
            // Check database
            $query  = "SELECT first_name, last_name FROM users WHERE user_id = '$id';";
            $result = mysqli_query($GLOBALS["___mysqli_ston"],  $query ) or die( '<pre>' . ((is_object($GLOBALS["___mysqli_ston"])) ? mysqli_error($GLOBALS["___mysqli_ston"]) : (($___mysqli_res = mysqli_connect_error()) ? $___mysqli_res : false)) . '</pre>' );

            // Get results
            while( $row = mysqli_fetch_assoc( $result ) ) {
                // Get values
                $first = $row["first_name"];
                $last  = $row["last_name"];

                // Feedback for end user
                echo "<pre>ID: {$id}<br />First name: {$first}<br />Surname: {$last}</pre>";
            }

            mysqli_close($GLOBALS["___mysqli_ston"]);
            break;
        case SQLITE:
            global $sqlite_db_connection;

            #$sqlite_db_connection = new SQLite3($_DVWA['SQLITE_DB']);
            #$sqlite_db_connection->enableExceptions(true);

            $query  = "SELECT first_name, last_name FROM users WHERE user_id = '$id';";
            #print $query;
            try {
                $results = $sqlite_db_connection->query($query);
            } catch (Exception $e) {
                echo 'Caught exception: ' . $e->getMessage();
                exit();
            }

            if ($results) {
                while ($row = $results->fetchArray()) {
                    // Get values
                    $first = $row["first_name"];
                    $last  = $row["last_name"];

                    // Feedback for end user
                    echo "<pre>ID: {$id}<br />First name: {$first}<br />Surname: {$last}</pre>";
                }
            } else {
                echo "Error in fetch ".$sqlite_db->lastErrorMsg();
            }
            break;
    } 
}

?>
```

### Impossible

```
<?php

if( isset( $_GET[ 'Submit' ] ) ) {
    // Check Anti-CSRF token
    checkToken( $_REQUEST[ 'user_token' ], $_SESSION[ 'session_token' ], 'index.php' );

    // Get input
    $id = $_GET[ 'id' ];

    // Was a number entered?
    if(is_numeric( $id )) {
        $id = intval ($id);
        switch ($_DVWA['SQLI_DB']) {
            case MYSQL:
                // Check the database
                $data = $db->prepare( 'SELECT first_name, last_name FROM users WHERE user_id = (:id) LIMIT 1;' );
                $data->bindParam( ':id', $id, PDO::PARAM_INT );
                $data->execute();
                $row = $data->fetch();

                // Make sure only 1 result is returned
                if( $data->rowCount() == 1 ) {
                    // Get values
                    $first = $row[ 'first_name' ];
                    $last  = $row[ 'last_name' ];

                    // Feedback for end user
                    echo "<pre>ID: {$id}<br />First name: {$first}<br />Surname: {$last}</pre>";
                }
                break;
            case SQLITE:
                global $sqlite_db_connection;

                $stmt = $sqlite_db_connection->prepare('SELECT first_name, last_name FROM users WHERE user_id = :id LIMIT 1;' );
                $stmt->bindValue(':id',$id,SQLITE3_INTEGER);
                $result = $stmt->execute();
                $result->finalize();
                if ($result !== false) {
                    // There is no way to get the number of rows returned
                    // This checks the number of columns (not rows) just
                    // as a precaution, but it won't stop someone dumping
                    // multiple rows and viewing them one at a time.

                    $num_columns = $result->numColumns();
                    if ($num_columns == 2) {
                        $row = $result->fetchArray();

                        // Get values
                        $first = $row[ 'first_name' ];
                        $last  = $row[ 'last_name' ];

                        // Feedback for end user
                        echo "<pre>ID: {$id}<br />First name: {$first}<br />Surname: {$last}</pre>";
                    }
                }

                break;
        }
    }
}

// Generate Anti-CSRF token
generateSessionToken();

?>
```
