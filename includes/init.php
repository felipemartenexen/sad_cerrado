<?php
    ob_start();
    session_start();
    //  *************** For PostgreSQL
        $host = "localhost";
        $dbname = "sad_cerrado";
        $dbusername = "postgres";
        $dbpassword = "6278mart";
        $dbport = "5432";

        $dsn = "pgsql:host=$host;dbname=$dbname;port=$dbport";
        $opt = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false
        ];
        $pdo = new PDO($dsn, $dbusername, $dbpassword, $opt);
        

    include "php_functions.php";
    
?>
