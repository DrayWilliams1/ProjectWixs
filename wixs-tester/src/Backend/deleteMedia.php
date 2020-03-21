#!/usr/bin/php-cgi
<?php
/** 
 * A file for obtaining a user from the database, matched by their email
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
$responseObject['template'] = null;

$template = array(); // the array of possible templates to be returned

try {
    // create a PostgreSQL database connection
    $pdo = new PDO($dsn);
    
    // display a message if connected to the PostgreSQL successfully
       if($pdo) { // connected successfully
           if (($_SERVER['REQUEST_METHOD'] == 'POST')) {
               // Using empty test instead of isset function
			   $file_post = empty($_POST['content_id']) ? null : $_POST['content_id']; 
               if ( deleteContent()) {
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
 * First checks if any inputs are missing, then validates and sanitizes certain inputs.
 * 
 * @return boolean true if no inputs are mssing, and all inputs are valid. Then sanitizes them. False, if any of those
 * criteria are not met.
 * */

/**
 * Queries the database for the user
 */
function deleteContent() {
    global $pdo;
    global $file_post;
    global $responseObject;
    global $template;

    $sql_delete = "Delete FROM content WHERE content_id = ?";
    $stmt = $pdo->prepare($sql_delete);

    // pass and bind values to the statement
    $stmt->bindValue(1, $file_post, PDO::PARAM_STR); // binding to string

	if($stmt->execute()) { // The query has executed successfully
        // we'll now we have the templates
        if ($stmt->rowCount() > 0) {
			
			$responseObject['message']="File with id {$file_post} has been deleted from database";
            return true;

        } else {
            $responseObject['message']="File with id {$file_post} does not exist in database. ";
            return false;
        }

    } else {
        $responseObject['message']="Error querying content table. ";
    }
}


echo json_encode($responseObject);
?>