#!/usr/bin/php-cgi
<?php
/** 
 * A file for adding newly registered users to the ProjectWixs database. Connects the registration page to the 
 * users table within the database.
 * 
 * 
 * 
 * -- Additional Notes --
 * - Do not use any upper case for column names or table names within database (will cause error when 
 * binding PDO values)
 * - On password hash:  Note that this constant is designed to change over time as new and stronger algorithms
 * are added to PHP. For that reason, the length of the result from using this identifier can change over time.
 *  Therefore, it is recommended to store the result in a database column that can expand beyond 60 characters
 * (255 characters would be a good choice).
 */
header("Access-Control-Allow-Origin: *");

require_once 'dbConfig.php';
 
$dsn = "pgsql:host=$host;port=$port;dbname=$db;user=$username;password=$password";

// newly registered user can not be an admin and will not have any templates
define("NOT_ADMIN", false);
define("TEMP_COUNT", 0);

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

            if (validInputs() && !alreadyExists()) { // inputs are valid and user does not already exist -> insert user
                insert_user();
            }
        } else { // request method is not POST
            echo "Invalid request";
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
    if(!(filter_var($tempCount_post, FILTER_VALIDATE_INT) === 0 || filter_var($tempCount_post, FILTER_VALIDATE_INT))) {
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

    $password_post = password_hash($password_post, PASSWORD_DEFAULT); // hashing password for user's security

    return true; // tests passed -> valid
}

/**
 * Checks if the user count is already at the maximum specified users for the system
 * 
 * @return boolean true if at capacity, false if not
 */
function atCapacity() {
    // generate query and if results are greater than 10/system limit, then return true, else false
    return true;
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

// possible json_encode()
?>