#!/usr/bin/php-cgi
<?php
 
require_once 'dbconfig.php';
 
$dsn = "pgsql:host=$host;port=$port;dbname=$db;user=$username;password=$password";
 
try{
 // create a PostgreSQL database connection
 $conn = new PDO($dsn);
 
 // display a message if connected to the PostgreSQL successfully
 if($conn){
 echo "Connected to the <strong>$db</strong> database successfully!";
 }
}catch (PDOException $e){
 // report error message
 echo $e->getMessage();
}