#!/usr/bin/php-cgi
<?php
/** 
 * A file for adding newly registered users to the ProjectWixs database. Connects the registration page to the 
 * users table within the database.
 * 
 * -- Additional Notes --
 * - On password hash:  would prefer to use password_hash() function, but it is only available on > PHP v5.5. Sandcastle uses PHP v5.4.16 so MD5 is used here. 
 */
header("Access-Control-Allow-Origin: *");

require_once 'dbConfig.php';
 
$dsn = "pgsql:host=$host;port=$port;dbname=$db;user=$username;password=$password";

// Constants
// newly registered user can not be an admin and will not have any templates
define("NOT_ADMIN", false);
define("TEMP_COUNT", 0);
define("MAX_DATABASE_SIZE", 10);

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
            
            $fName_post = empty($_POST['first_name']) ? null : $_POST['first_name']; // set first name to form submission
            
            $lName_post = empty($_POST['last_name']) ? null : $_POST['last_name']; // set last name to form submission

            $password_post = empty($_POST['password']) ? null : $_POST['password']; // set password name to form submission
            
            $admin_post = NOT_ADMIN;
            $tempCount_post = TEMP_COUNT;

            $sessionID_post = empty($_POST['usid']) ? null : $_POST['usid']; // retrieve session id

            if (validInputs() && !alreadyExists() && !atCapacity()) { // inputs are valid, user does not already exist, and table is not full -> insert user
                insert_user();
                $responseObject['success']=true; // echoing a response that can be used to redirect page after AJAX call
            }
        } else { // request method is not POST
            $responseObject['message']="Invalid request. ";
        }
    }
} catch (PDOException $e) { 
    $responseObject['message']=$e->getMessage(); // report error message
}

/**
 * First checks if any inputs are missing, then validates and sanitizes certain inputs. 4 Rounds of validation.
 * 
 * @return boolean true if no inputs are mssing, and all inputs are valid. Then sanitizes them. False, if any of those
 * criteria are not met.
 * */
function validInputs() {
    global $email_post, $fName_post, $lName_post, $password_post, $admin_post, $tempCount_post;
    global $responseObject;

    // Round 1 -- Are inputs empty
    // does not check template count because field may be null
    if(empty($email_post) || empty($fName_post) || empty($lName_post) || empty($password_post)) {
        $responseObject['message']="One of more fields are missing. Please complete. ";
        return false; // invalid
    }

    // Round 2 -- Trimming inputs of trailing/leading whitespace
    $email_post = trim($email_post);
    $fName_post = trim($fName_post);
    $lName_post = trim($lName_post);
    $password_post = trim($password_post);


    // Round 3 -- Checking input lengths and validity
    // checking email length
    if(strlen($email_post) > 100) {
        $responseObject['message']="Invalid email: length too long. ";
        return false;
    }

    // checking first name length
    if(strlen($fName_post) > 50) {
        $responseObject['message']= "Invalid name: first name length too long. ";
        return false;
    }

    // checking last name length
    if(strlen($lName_post) > 50) {
        $responseObject['message']= "Invalid name: last name length too long. ";
        return false;
    }

    // checking password length
    if(strlen($password_post) > 100) {
        $responseObject['message']= "Invalid password: length too long. ";
        return false;
    }

    // checking password length
    if(strlen($password_post) < 8) {
        $responseObject['message']= "Invalid password: length too short. ";
        return false;
    }

    // checking if valid user email provided
    if(!filter_var($email_post, FILTER_VALIDATE_EMAIL)){
        $responseObject['message']= "Invalid email: formatting.  ";
        return false; // invalid
    }

    // checking if valid integer for user template count provided
    if(!(filter_var($tempCount_post, FILTER_VALIDATE_INT) === 0 || filter_var($tempCount_post, FILTER_VALIDATE_INT))) {
        $responseObject['message']= "Invalid template count: formatting. ";
        return false; // invalid
    }

    // Round 4 -- Sanitize inputs
    // if no inputs are missing or invalid, they are sanitized.
    $email_post = filter_var($email_post,FILTER_SANITIZE_EMAIL);
    $fName_post = filter_var($fName_post,FILTER_SANITIZE_STRING);
    $lName_post = filter_var($lName_post,FILTER_SANITIZE_STRING);
    $password_post = filter_var($password_post,FILTER_SANITIZE_STRING);
    $tempCount_post = filter_var($tempCount_post,FILTER_SANITIZE_NUMBER_INT);

    $password_post = md5($password_post); // hashing password for user's security

    return true; // tests passed -> valid
}

/**
 * Checks if the user count is already at the maximum specified users for the system
 * 
 * @return boolean true if at capacity, false if not
 */
function atCapacity() {
    global $pdo;
    global $responseObject;

    $sql_select = "SELECT * FROM users";
    $stmt = $pdo->prepare($sql_select);
    
    if($stmt->execute()) { // The query has executed successfully
        if ($stmt->rowCount() >= MAX_DATABASE_SIZE) { // another user with same email found
            $responseObject['message']="Database is at capacity. User not created. ";
            return true;
        } else { // database users not full
            return false;
        }
    } else {
        $responseObject['message']="Error querying users table: capacity. ";
    }
}

/**
 * Checks if the user's email already exists within the database and returns whether true or false.
 * 
 * @return boolean true if the user already exists, false if not
 */
function alreadyExists() {
    global $pdo;
    global $email_post;
    global $responseObject;

    // prepare statement for insert
    $sql_select = "SELECT email FROM users WHERE email = ? LIMIT 1";
    $stmt = $pdo->prepare($sql_select);

    // pass and bind values to the statement
    $stmt->bindValue(1, $email_post, PDO::PARAM_STR); // binding to strings

    if($stmt->execute()) { // The query has executed successfully
        if ($stmt->rowCount() > 0) { // another user with same email found
            $responseObject['message']="User with email already exists. Please register again. ";
            return true;
        } else {
            return false;
        }
    } else {
        $responseObject['message']="Error querying users table: already exists. ";
    }
}

/** 
 * Inserts a user (with necessary credentials) into the database. Sends a confirmation or error message upon completion.
 * */
function insert_user() {
    global $pdo;
    global $email_post, $fName_post, $lName_post, $password_post, $admin_post, $tempCount_post, $sessionID_post;
    global $responseObject;

     // prepare statement for insert
     $sql_insert = "INSERT INTO users (email, first_name, last_name, password, admin, template_count, session_id) VALUES (?,?,?,?,?,?,?)";
     $stmt = $pdo->prepare($sql_insert);
     
     // pass and bind values to the statement
     $stmt->bindValue(1, $email_post, PDO::PARAM_STR); // binding to strings
     $stmt->bindValue(2, $fName_post, PDO::PARAM_STR);
     $stmt->bindValue(3, $lName_post, PDO::PARAM_STR);
     $stmt->bindValue(4, $password_post, PDO::PARAM_STR);
     $stmt->bindValue(5, $admin_post, PDO::PARAM_BOOL); // bind to boolean
     $stmt->bindValue(6, $tempCount_post, PDO::PARAM_INT); // bind to integer
     $stmt->bindValue(7, $sessionID_post, PDO::PARAM_STR);
 
    if($stmt->execute()) { // The query has executed successfully
        $responseObject['message']="{$email_post} has been added. Welcome {$fName_post}. ";
    } else { // The query has failed
        $responseObject['message']="Error inserting the user. ";
    }
}

 echo json_encode($responseObject);
?>