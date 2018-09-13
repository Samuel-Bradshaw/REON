<?php

header("Access-Control-Allow-Origin: *");

$target_dir = "../images/";
$url = $_SERVER['REQUEST_URI'];
/*
$parts = explode('/', $url);
$dir = "https://".$_SERVER['SERVER_NAME'];
for($i = 0; $i < count($parts) - 1; $i++){
    $dir .= $parts[$i] . "/";
}
*/
/*
$actual_link = "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
$errorMsg = "";

try{

    // Check if image file is a actual image or fake image
    if(isset($_FILES["fileToUpload"])) {

        $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
        if($check !== false) {
            $uploadOk = 1;
        } else {
            $errorMsg = " Error: File is not an image.";
            $uploadOk = 0;
        }
    }
    // Check if file already exists
    if (file_exists($target_file)) {
        $errorMsg .= " Error: File already exists.";
        $uploadOk = 0;
    }

    // Check file size                    
    if ($_FILES["fileToUpload"]["size"] > 12000000) {
        $errorMsg .= " Error: your file is too large.";
        $uploadOk = 0;
    }

    // Allow certain file formats
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
    && $imageFileType != "gif" ) {
        $errorMsg .= " Error: Only JPG, JPEG, PNG & GIF files are allowed.";
        $uploadOk = 0;
    }
    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo json_encode("Upload failed: " . $errorMsg);

    // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
            echo json_encode("The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.");
      
        } else {
            echo json_encode("Error: upload failed.");
        }
    }

} catch(Exception $e) {
        echo json_encode($e->getMessage());
}
*/
?>