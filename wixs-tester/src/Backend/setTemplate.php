#!/usr/bin/php-cgi
<?php
/** 
 * A file for obtaining a single template by its id
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

$template = array(); // the array of possible templates to be returned

try {
    // create a PostgreSQL database connection
    $pdo = new PDO($dsn);
    
    // display a message if connected to the PostgreSQL successfully
       if($pdo) { // connected successfully
           if (($_SERVER['REQUEST_METHOD'] == 'POST')) {
               // Using empty test instead of isset function
               $template_id_post = empty($_POST['template_id']) ? null : $_POST['template_id']; // set template_id to form submission

               $template_data_post = empty($_POST['template_data']) ? null : $_POST['template_data']; // set template_data to form submission

               $last_modified_post = empty($_POST['last_modified']) ? null : $_POST['last_modified']; // set last_modified to form submission
   
               if (validInputs() && updateTemplate()) {
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
    global $template_data_post, $template_id_post, $last_modified_post;
    global $responseObject;

    // Is email empty
    // does not check template count because field may be null
    if(empty($template_id_post) || empty($template_data_post) || empty($last_modified_post)) {
        $responseObject['message']="One of more fields are missing. Please complete. ";
        return false; // invalid
    }

    return true; // tests passed -> valid
}

/**
 * Queries the database for the templates
 * 
 * @return boolean true if the templates were obtained, false if the user has no templates
 */
function updateTemplate() {
    global $pdo;
    global $template_id_post, $template_data_post, $last_modified_post;
    global $responseObject;
    global $template;

    $sql_update = "UPDATE templates SET template_data = ?, last_modified = ? WHERE template_id = ?";
    $stmt = $pdo->prepare($sql_update);

    // pass and bind values to the statement
    $stmt->bindValue(1, $template_data_post, PDO::PARAM_STR); // binding to string
    $stmt->bindValue(2, $last_modified_post, PDO::PARAM_STR); // binding to string
    $stmt->bindValue(3, $template_id_post, PDO::PARAM_STR); // binding to string

    if($stmt->execute()) { // The query has executed successfully
        $responseObject['message']="Changes to template with id {$template_id_post} have been saved to database. ";
        return true;

    } else {
        $responseObject['message']="Error querying templates table. ";
    }
}

echo json_encode($responseObject);
?>