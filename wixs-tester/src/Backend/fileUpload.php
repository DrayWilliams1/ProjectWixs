#!/usr/bin/php-cgi
<?php 
/** 
 * A file for uploading files to the sandcastle server
 */
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");

require_once 'dbConfig.php';

$dsn = "pgsql:host=$host;port=$port;dbname=$db;user=$username;password=$password";

$responseObject = array();
$upload_dir = 'uploads/';
$server_url = 'http://cosc.brocku.ca/~c4f00g02/projectWixs';
$file_location = ''; // for database entry
$file_name = ''; // for database entry

try {
    // create a PostgreSQL database connection
    $pdo = new PDO($dsn);

    if($pdo) {
        if (($_SERVER['REQUEST_METHOD'] == 'POST')) {
            // Using empty test instead of isset function
            //$email_post = empty($_POST['email']) ? null : $_POST['email']; // set email to form submission

            $email_post = empty($_POST['user']) ? null : $_POST['user']; // set email to form submission

            if(fileUpload() && insertFile()) {
                $responseObject['message']="File has been uploaded and entered into database";
                $responseObject['error']=false;
            }

        } else { // request method is not POST
            $responseObject['message']="Invalid request. "; 
        }
    }
} catch (PDOException $e) {
    $responseObject['message']=$e->getMessage(); // report error message
}

/**
 * Uploads file to Brock's sandcastle server
 */
function fileUpload() {
    global $responseObject, $upload_dir, $server_url;
    global $file_location, $file_name;
    global $email_post;

    if($_FILES['avatar']) {
        $avatar_name = $_FILES["avatar"]["name"];
        $avatar_tmp_name = $_FILES["avatar"]["tmp_name"];
        $error = $_FILES["avatar"]["error"];
        
        if($error > 0) {
            $responseObject = array(
                "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!"
            );
            return false; // error occurred

        } else {
            $random_name = $email_post."-".rand(1000,1000000)."-".$avatar_name;
            $upload_name = $upload_dir.strtolower($random_name);
            $upload_name = preg_replace('/\s+/', '-', $upload_name);
    
            if(move_uploaded_file($avatar_tmp_name , $upload_name)) {
                $responseObject = array(
                    "status" => "success",
                    "error" => false,
                    "message" => "File uploaded successfully",
                    "url" => $server_url."/".$upload_name
                  );
                
                  //$file_location = $server_url."/".$upload_name;
                  $file_location = $server_url."/".$upload_name;
                  $file_name = $random_name;
                  return true; // success

            } else {
                $responseObject = array(
                    "status" => "error",
                    "error" => true,
                    "message" => "Error uploading the file!"
                );
                return false; // error occurred
            }
        }
    } else {
        $responseObject = array(
            "status" => "error",
            "error" => true,
            "message" => "No file was sent!"
        );
        return false; // error occurred
    }  
}

/**
 * Inserts a tuple into the content table of the database.
 */
function insertFile() {
    global $pdo;
    global $responseObject;
    global $email_post;
    global $file_location, $file_name;
    
    if($_FILES['avatar']) {
        // prepare statement for insert
        $sql_insert = "INSERT INTO content (owner_email, file_name, file_size, file_location, file_type) VALUES (?,?,?,?,?)";
        $stmt = $pdo->prepare($sql_insert);

        // pass and bind values to the statement
        $stmt->bindValue(1, $email_post, PDO::PARAM_STR); // binding to strings
        $stmt->bindValue(2, $file_name, PDO::PARAM_STR);
        $stmt->bindValue(3, $_FILES["avatar"]["size"], PDO::PARAM_INT);
        $stmt->bindValue(4, $file_location, PDO::PARAM_STR);
        $stmt->bindValue(5, $_FILES["avatar"]["type"], PDO::PARAM_STR);

        if($stmt->execute()) { // The query has executed successfully
            $responseObject['database_message']="{$email_post}'s content has been added to database. ";
        } else {
            $responseObject['message']="Error querying content table. ";
            return false;
        }
    }    
    return true;
}

echo json_encode($responseObject);
?>