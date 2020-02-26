#!/usr/bin/php-cgi
<?php
/** 
 * A file for adding newly registered users to the ProjectWixs database. Connects the registration page to the 
 * users table within the database.
 * 
 * 
 * 
 * -- Additional Notes --
 * - Do not use any upper case for column names or table names within database (will cause error when binding PDO values)
 */

require_once 'dbConfig.php';
 
$dsn = "pgsql:host=$host;port=$port;dbname=$db;user=$username;password=$password";
 
try {
 // create a PostgreSQL database connection
 $pdo = new PDO($dsn);
 
 // display a message if connected to the PostgreSQL successfully
    if($pdo) { // connected successfully
        $email_post = 'tester2@email.com';
        $fName_post = 'Dray';
        $lName_post = 'Williams';
        $password_post = "password";
        $admin_post = false;
        $tempCount_post = 1;

        if (validInputs() && !alreadyExists()) { // inputs are valid and user does not already exist -> insert user
            insert_user();
        }
    }
} catch (PDOException $e) { 
    echo $e->getMessage(); // report error message
}

/**
 * First checks if any inputs are missing, then validates and sanitizes certain inputs. 4 Rounds of validation.
 * 
 * @return boolean true if no inputs are mssing, and all inputs are valid. Then sanitizes them. False, if any of those
 * criteria are not met.
 * */
function validInputs() {
    global $email_post, $fName_post, $lName_post, $password_post, $admin_post, $tempCount_post;

    // Round 1 -- Are inputs empty
    // does not check template count because field may be null
    if(empty($email_post) || empty($fName_post) || empty($lName_post) || empty($password_post)) {
        echo "One of more fields are missing. Please complete. ";
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
        echo "Invalid email: length too long. ";
        return false;
    }

    // checking first name length
    if(strlen($fName_post) > 50) {
        echo "Invalid name: first name length too long. ";
        return false;
    }

    // checking last name length
    if(strlen($lName_post) > 50) {
        echo "Invalid name: last name length too long. ";
        return false;
    }

    // checking password length
    if(strlen($password_post) > 100) {
        echo "Invalid password: length too long. ";
        return false;
    }

    // checking password length
    if(strlen($password_post) < 8) {
        echo "Invalid password: length too short. ";
        return false;
    }

    // checking if valid user email provided
    if(!filter_var($email_post, FILTER_VALIDATE_EMAIL)){
        echo "Invalid email: formatting.  ";
        return false; // invalid
    }

    // checking if valid integer for user template count provided
    if(!filter_var($tempCount_post, FILTER_VALIDATE_INT)){
        echo "Invalid template count: formatting. ";
        return false; // invalid
    }

    // Round 4 -- Sanitize inputs
    // if no inputs are missing or invalid, they are sanitized.
    $email_post = filter_var($email_post,FILTER_SANITIZE_EMAIL);
    $fName_post = filter_var($fName_post,FILTER_SANITIZE_STRING);
    $lName_post = filter_var($lName_post,FILTER_SANITIZE_STRING);
    $password_post = filter_var($password_post,FILTER_SANITIZE_STRING);
    $tempCount_post = filter_var($tempCount_post,FILTER_SANITIZE_NUMBER_INT);

    return true; // tests passed -> valid
}

/**
 * Checks if the user's email already exists within the database and returns whether true or false.
 * 
 * @return boolean true if the user already exists, false if not
 */
function alreadyExists() {
    global $pdo;
    global $email_post;

    // prepare statement for insert
    $sql_select = "SELECT email FROM users WHERE email = ? LIMIT 1";
    $stmt = $pdo->prepare($sql_select);

    // pass and bind values to the statement
    $stmt->bindValue(1, $email_post, PDO::PARAM_STR); // binding to strings

    if($stmt->execute()) { // The query has executed successfully
        if ($stmt->rowCount() > 0) { // another user with same email found
            echo "User with email already exists. Please register again. ";
            return true;
        } else {
            return false;
        }
    } else {
        echo "Error querying users table. ";
    }
}

/** 
 * Inserts a user (with necessary credentials) into the database. Sends a confirmation or error message upon completion.
 * */
function insert_user() {
    global $pdo;
    global $email_post, $fName_post, $lName_post, $password_post, $admin_post, $tempCount_post;

     // prepare statement for insert
     $sql_insert = "INSERT INTO users (email, first_name, last_name, password, admin, template_count) VALUES (?,?,?,?,?,?)";
     $stmt = $pdo->prepare($sql_insert);
     
     // pass and bind values to the statement
     $stmt->bindValue(1, $email_post, PDO::PARAM_STR); // binding to strings
     $stmt->bindValue(2, $fName_post, PDO::PARAM_STR);
     $stmt->bindValue(3, $lName_post, PDO::PARAM_STR);
     $stmt->bindValue(4, $password_post, PDO::PARAM_STR);
     $stmt->bindValue(5, $admin_post, PDO::PARAM_BOOL); // bind to boolean
     $stmt->bindValue(6, $tempCount_post, PDO::PARAM_INT); // bind to integer
 
    if($stmt->execute()) { // The query has executed successfully
        echo "{$email_post} has been added. Welcome {$fName_post}. ";
    } else { // The query has failed
        echo "Error inserting the user. ";
    }
}

?>