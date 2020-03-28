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
$responseObject['template'] = null;

$template = array(); // the array of possible templates to be returned

try {
    // create a PostgreSQL database connection
    $pdo = new PDO($dsn);
    
    // display a message if connected to the PostgreSQL successfully
       if($pdo) { // connected successfully
           if (($_SERVER['REQUEST_METHOD'] == 'POST')) {
               // Using empty test instead of isset function
               $template_id_post = empty($_POST['template_id']) ? null : $_POST['template_id']; // set template_id to form submission
   
               if (validInputs() && getTemplate()) {
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
    global $email_post, $template_id_post;
    global $responseObject;

    // Is email empty
    // does not check template count because field may be null
    if(empty($template_id_post)) {
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
function getTemplate() {
    global $pdo;
    global $template_id_post;
    global $responseObject;
    global $template;

    $sql_select = "SELECT * FROM templates WHERE template_id = ?";
    $stmt = $pdo->prepare($sql_select);

    // pass and bind values to the statement
    $stmt->bindValue(1, $template_id_post, PDO::PARAM_STR); // binding to string

    if($stmt->execute()) { // The query has executed successfully
        // we'll now we have the template
        if ($stmt->rowCount() > 0) {

            $template = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $responseObject['template']=$template;
            return true;

        } else {
            $responseObject['message']="Template with id {$template_id_post} does not exist. ";
            return false;
        }

    } else {
        $responseObject['message']="Error querying templates table. ";
    }
}

echo json_encode($responseObject);
?>