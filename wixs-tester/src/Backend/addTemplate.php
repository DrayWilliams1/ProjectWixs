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

// Constants
define("MAX_TEMPLATE_COUNT", 4);

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

            $owner_email_post = empty($_POST['owner_email']) ? null : $_POST['owner_email']; // set owner_email to form submission

            $custom_name_post = empty($_POST['custom_name']) ? null : $_POST['custom_name']; // set custom_name to form submission

            $template_data_post = empty($_POST['template_data']) ? null : $_POST['template_data']; // set last_modified to form submission

            $last_modified_post = empty($_POST['last_modified']) ? null : $_POST['last_modified']; // set last_modified to form submission

            $is_active_post = false;
   
            if (validInputs() && !limitExceeded() && updateTemplate()) {
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
    global $owner_email_post, $last_modified_post, $custom_name_post, $template_data_post;
    global $responseObject;

    // Is email empty
    // does not check template count because field may be null
    if(empty($owner_email_post) || empty($last_modified_post) || empty($custom_name_post) || empty($template_data_post)) {
        $responseObject['message']="One of more fields are missing. Please complete. ";
        return false; // invalid
    }

    $owner_email_post = filter_var($owner_email_post, FILTER_SANITIZE_EMAIL);
    $custom_name_post = filter_var($custom_name_post,FILTER_SANITIZE_STRING);

    return true; // tests passed -> valid
}

function limitExceeded() {
    global $pdo;
    global $owner_email_post;
    global $responseObject;
    global $template;

    $sql_select = "SELECT * FROM templates WHERE owner_email = ?";
    $stmt = $pdo->prepare($sql_select);

    // pass and bind values to the statement
    $stmt->bindValue(1, $owner_email_post, PDO::PARAM_STR); // binding to string
    
    if($stmt->execute()) { // The query has executed successfully
        if ($stmt->rowCount() >= MAX_TEMPLATE_COUNT) { // another user with same email found
            $responseObject['message']="User is at template limit. Template not created. ";
            return true;
        } else { // database users not full
            return false;
        }
    } else {
        $responseObject['message']="Error querying template table: capacity. ";
    }
}

/**
 * Queries the database for the templates
 * 
 * @return boolean true if the templates were obtained, false if the user has no templates
 */
function updateTemplate() {
    global $pdo;
    global $owner_email_post, $template_data_post, $last_modified_post, $is_active_post, $custom_name_post;
    global $starterTemplate;
    global $responseObject;
    global $template;

    $sql_insert = "INSERT INTO templates (owner_email, custom_name, is_active, last_modified, template_data) VALUES (?,?,?,?,?)";

    $stmt = $pdo->prepare($sql_insert);

    // pass and bind values to the statement
    $stmt->bindValue(1, $owner_email_post, PDO::PARAM_STR); // binding to string
    $stmt->bindValue(2, $custom_name_post, PDO::PARAM_STR); // binding to string
    $stmt->bindValue(3, $is_active_post, PDO::PARAM_BOOL); // binding to string
    $stmt->bindValue(4, $last_modified_post, PDO::PARAM_STR); // binding to string
    $stmt->bindValue(5, $template_data_post, PDO::PARAM_STR); // binding to string

    if($stmt->execute()) { // The query has executed successfully
        $responseObject['message']="{$custom_name_post} has been added to the database. ";
        return true;

    } else {
        $responseObject['message']="Error querying templates table. ";
        return false;
    }
}

echo json_encode($responseObject);
?>