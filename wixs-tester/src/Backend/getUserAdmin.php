#!/usr/bin/php-cgi
<?php
/** 
 * A file for obtaining all users. 
 * 
 * -- Additional Notes --
 * - Do not use any upper case for column names or table names within database (will cause error when 
 * binding PDO values)
 */
header("Access-Control-Allow-Origin: *");

require_once 'dbConfig.php';

$dsn = "pgsql:host=$host;port=$port;dbname=$db;user=$username;password=$password";

$responseObject = array();
$responseObject['success']=false; // whether the operation executed successfully
$responseObject['message']=""; // the message from the execution, error or success
$responseObject['users'] = null;

$users = array(); // the array of possible users to be returned

try {
    // create a PostgreSQL database connection
    $pdo = new PDO($dsn);
    
    // display a message if connected to the PostgreSQL successfully
       if($pdo) { // connected successfully
           if (($_SERVER['REQUEST_METHOD'] == 'POST')) {
               // Using empty test instead of isset function
   
               if ( getUsers()) {
                   $responseObject['success']=true; // echoing a response that can be used to redirect page after AJAX call
               } // otherwise, error, response message is displayed in alert
               
           } else { // request method is not POST
               $responseObject['message']="Invalid request. ";
           }
       }
   } catch (PDOException $e) { 
       $responseObject['message']=$e->getMessage(); // report error message
   }

/**
 * Returns all the users contained within the database
 */
function getUsers() {
    global $pdo;
    global $responseObject;
    global $users;

    $sql_select = "SELECT user_id, email, first_name, last_name, admin, template_count FROM users";
    $stmt = $pdo->prepare($sql_select);

    if($stmt->execute()) { // The query has executed successfully
        if ($stmt->rowCount() > 0) { // users exist

            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $responseObject['users']=$users;
            return true;

        } else {
            $responseObject['message']="No users exist. ";
            return false;
        }
    } else {
        $responseObject['message']="Error querying users table. ";
    }
}

echo json_encode($responseObject);
?>