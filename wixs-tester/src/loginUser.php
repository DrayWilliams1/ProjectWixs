#!/usr/bin/php-cgi
<?php
/** 
 * A file for checking whether a user email and password combo exists within the database and logs the user in
 * Connects the registration page to the users table within the database.
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

try {
 // create a PostgreSQL database connection
 $pdo = new PDO($dsn);
 
 // display a message if connected to the PostgreSQL successfully
    if($pdo) { // connected successfully
        if (($_SERVER['REQUEST_METHOD'] == 'POST')) {
            // Using empty test instead of isset function
            $email_post = empty($_POST['email']) ? null : $_POST['email']; // set email to form submission

            $password_post = empty($_POST['password']) ? null : $_POST['password']; // set password name to form submission

            if (validInputs() && accountExists()) { // inputs are valid and user does not already exist -> insert user
                echo true; // echoing a response that can be used to redirect page after AJAX call
            }
        } else { // request method is not POST
            echo "Invalid request. ";
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
    global $email_post, $password_post;

    // Round 1 -- Are inputs empty
    // does not check template count because field may be null
    if(empty($email_post) || empty($password_post)) {
        echo "One of more fields are missing. Please complete. ";
        return false; // invalid
    }

    // Round 2 -- Trimming inputs of trailing/leading whitespace
    $email_post = trim($email_post);
    $password_post = trim($password_post);


    // Round 3 -- Checking input lengths and validity
    // checking email length
    if(strlen($email_post) > 100) {
        echo "Invalid email: length too long. ";
        return false;
    }

    // checking password length (max)
    if(strlen($password_post) > 100) {
        echo "Invalid password: length too long. ";
        return false;
    }

    // checking password length (min)
    if(strlen($password_post) < 8) {
        echo "Invalid password: length too short. ";
        return false;
    }

    // checking if valid user email provided
    if(!filter_var($email_post, FILTER_VALIDATE_EMAIL)){
        echo "Invalid email: formatting.  ";
        return false; // invalid
    }

    // Round 4 -- Sanitize inputs
    // if no inputs are missing or invalid, they are sanitized.
    $email_post = filter_var($email_post,FILTER_SANITIZE_EMAIL);
    $password_post = filter_var($password_post,FILTER_SANITIZE_STRING);

    $password_post = password_hash($password_post, PASSWORD_DEFAULT); // hashing password for user's security

    return true; // tests passed -> valid
}

/**
 * Checks if the user password matches that which is in the database
 * 
 * @return boolean true if passwords match, false if not
 */
function passwordMatches() {
    // generate query that checks if submitted password matches that found in database
    return true;
}

/**
 * Checks if the user's account exists within the database with the macthing credentials returns whether true or false.
 * 
 * @return boolean true if the user already exists, false if not
 */
function accountExists() {
    global $pdo;
    global $email_post, $password_post;

    // prepare statement for insert
    $sql_select = "SELECT email FROM users WHERE email = ? LIMIT 1";
    $stmt = $pdo->prepare($sql_select);

    // pass and bind values to the statement
    $stmt->bindValue(1, $email_post, PDO::PARAM_STR); // binding to strings

    if($stmt->execute()) { // The query has executed successfully
        if ($stmt->rowCount() > 0) { // account with username found
            return true;
        } else {
            echo "User with email {$email_post} does not exist. Please login again or register account. ";
            return false;
        }
    } else {
        echo "Error querying users table. ";
    }
}
?>