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
$responseObject['user'] = null;

$user = array(); // the array of possible templates to be returned

try {
    // create a PostgreSQL database connection
    $pdo = new PDO($dsn);
    
    // display a message if connected to the PostgreSQL successfully
       if($pdo) { // connected successfully
           if (($_SERVER['REQUEST_METHOD'] == 'POST')) {
               // Using empty test instead of isset function
               $email_post = empty($_POST['email']) ? null : $_POST['email']; // set email to form submission
   
               if (validInputs() && getUser()) {
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
function validInputs() {
    global $email_post;
    global $responseObject;

    // Is email empty
    // does not check template count because field may be null
    if(empty($email_post)) {
        $responseObject['message']="One of more fields are missing. Please complete. ";
        return false; // invalid
    }

    // Is email valid (formatted properly)
    if(!filter_var($email_post, FILTER_VALIDATE_EMAIL)){
        $responseObject['message']="Invalid email: formatting.  ";
        return false; // invalid
    }

    // Sanitize email
    // if no inputs are missing or invalid, they are sanitized.
    $email_post = filter_var($email_post,FILTER_SANITIZE_EMAIL);

    return true; // tests passed -> valid
}

/**
 * Queries the database for the user
 */
function getUser() {
    global $pdo;
    global $email_post;
    global $responseObject;
    global $user;

    $sql_select = "SELECT email, first_name, last_name, admin FROM users WHERE email = ?";
    $stmt = $pdo->prepare($sql_select);

    // pass and bind values to the statement
    $stmt->bindValue(1, $email_post, PDO::PARAM_STR); // binding to string

    if($stmt->execute()) { // The query has executed successfully
        // we'll now we have the templates
        if ($stmt->rowCount() > 0) {

            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            $responseObject['user']=$user;
            return true;

        } else {
            $responseObject['message']="User with email {$email_post} does not exist in database. ";
            return false;
        }

    } else {
        $responseObject['message']="Error querying users table. ";
    }
}

echo json_encode($responseObject);
?>