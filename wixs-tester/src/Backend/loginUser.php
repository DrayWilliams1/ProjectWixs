#!/usr/bin/php-cgi
<?php
/** 
 * A file for checking whether a user email and password combo exists within the database and logs the user in
 * Connects the registration page to the users table within the database.
 * 
 * -- Additional Notes --
 * - Do not use any upper case for column names or table names within database (will cause error when 
 * binding PDO values)
 * - On password hash:  would prefer to use password_hash() function, but it is only available on > PHP v5.5. Sandcastle uses PHP v5.4.16 so MD5 is used here. 
 */
header("Access-Control-Allow-Origin: *");

require_once 'dbConfig.php';
 
$dsn = "pgsql:host=$host;port=$port;dbname=$db;user=$username;password=$password";

$responseObject = array();
$responseObject['success']=false; // whether the operation executed successfully
$responseObject['message']=""; // the message from the execution, error or success

try {
 // create a PostgreSQL database connection
 $pdo = new PDO($dsn);
 
 // display a message if connected to the PostgreSQL successfully
    if($pdo) { // connected successfully
        if (($_SERVER['REQUEST_METHOD'] == 'POST')) {
            // Using empty test instead of isset function
            $email_post = empty($_POST['email']) ? null : $_POST['email']; // set email to form submission

            $password_post = empty($_POST['password']) ? null : $_POST['password']; // set password name to form submission

            $session_id = empty($_POST['usid']) ? null : $_POST['usid']; // retrieve session id

            if (validInputs() && accountExists() && updateSession()) {
                $responseObject['success']=true; // echoing a response that can be used to redirect page after AJAX call
            } // otherwise, error, response message is displayed in alert
            
        } else { // request method is not POST
            $responseObject['message']="Invalid request. ";
        }
    }
} catch (PDOException $e) { 
    $responseObject['message']=$e->getMessage(); // report error message
}

function updateSession() {
    global $pdo;
    global $responseObject;
    global $session_id, $email_post;

    $sql_update = "UPDATE users SET session_id = ? WHERE email = ?";
    $stmt = $pdo->prepare($sql_update);

    // pass and bind values to the statement
    $stmt->bindValue(1, $session_id, PDO::PARAM_STR); // binding to strings
    $stmt->bindValue(2, $email_post, PDO::PARAM_STR); // binding to strings
    
    if($stmt->execute()) { // The query has executed successfully
        return true;
    } else {
        $responseObject['message']="Error querying users table: update session. ";
        return false;
    }
}

/**
 * First checks if any inputs are missing, then validates and sanitizes certain inputs. 4 Rounds of validation.
 * 
 * @return boolean true if no inputs are mssing, and all inputs are valid. Then sanitizes them. False, if any of those
 * criteria are not met.
 * */
function validInputs() {
    global $email_post, $password_post;
    global $responseObject;

    // Round 1 -- Are inputs empty
    // does not check template count because field may be null
    if(empty($email_post) || empty($password_post)) {
        $responseObject['message']="One of more fields are missing. Please complete. ";
        return false; // invalid
    }

    // Round 2 -- Trimming inputs of trailing/leading whitespace
    $email_post = trim($email_post);
    $password_post = trim($password_post);


    // Round 3 -- Checking input lengths and validity
    // checking email length
    if(strlen($email_post) > 100) {
        $responseObject['message']="Invalid email: length too long. ";
        return false;
    }

    // checking password length (max)
    if(strlen($password_post) > 100) {
        $responseObject['message']="Invalid password: length too long. ";
        return false;
    }

    // checking password length (min)
    if(strlen($password_post) < 8) {
        $responseObject['message']="Invalid password: length too short. ";
        return false;
    }

    // checking if valid user email provided
    if(!filter_var($email_post, FILTER_VALIDATE_EMAIL)){
        $responseObject['message']="Invalid email: formatting.  ";
        return false; // invalid
    }

    // Round 4 -- Sanitize inputs
    // if no inputs are missing or invalid, they are sanitized.
    $email_post = filter_var($email_post,FILTER_SANITIZE_EMAIL);
    $password_post = filter_var($password_post,FILTER_SANITIZE_STRING);

    $password_post = md5($password_post); // hashing password for user's security

    return true; // tests passed -> valid
}


/**
 * Checks if the user's account exists within the database with the macthing credentials returns whether true or false.
 * 
 * @return boolean true if the user already exists, false if not
 */
function accountExists() {
    global $pdo;
    global $email_post, $password_post;
    global $responseObject;

    // prepare statement for insert
    $sql_select = "SELECT * FROM users WHERE email = ? LIMIT 1";
    $stmt = $pdo->prepare($sql_select);

    // pass and bind values to the statement
    $stmt->bindValue(1, $email_post, PDO::PARAM_STR); // binding to string

    if($stmt->execute()) { // The query has executed successfully
        if ($stmt->rowCount() > 0) { // account with username found
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if($password_post == $user['password']) { // the inputted password matches that of the user's account in the database

                // TODO: give user a session id with a update statement

                return true;
            } else {
                $responseObject['message']="Account with email {$email_post} exists, however, password is incorrect. ";
            }
        } else {
            $responseObject['message']="User with email {$email_post} does not exist. Please login again or register account. ";
            return false;
        }
    } else {
        $responseObject['message']="Error querying users table. ";
    }
}


echo json_encode($responseObject);
?>