<?php

header("Access-Control-Allow-Origin: *");

$new_dir_name =  str_replace(' ','_',$_POST['dir']);

if (!file_exists("../images/".$new_dir_name."/")) {
    mkdir("../images/".$new_dir_name);
}

$target_dir = "../images/".$new_dir_name."/";
$actual_link = "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$target_file = $target_dir . basename($_FILES["FileToUpload"]["name"]);
                   
$uploadOk = 1;

$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));


$errorMsg = "";

try{

    // Check if image file is a actual image or fake image
    if(isset($_FILES["FileToUpload"])) {

        $check = getimagesize($_FILES["FileToUpload"]["tmp_name"]);
 
        if($check !== false ) {
            $uploadOk = 1;
        } else {
            $errorMsg = " Error: File " . basename($_FILES["FileToUpload"]["name"])." is not an image.";
            $uploadOk = 0;
        }
    } else {
        $errorMsg = " Error: Files not selected.";
        $uploadOk = 0;
    }


    // Check if file already exists
    if (file_exists($target_file)) {
        $errorMsg .= " Error: File ". basename($_FILES["FileToUpload"]["name"])." already exists.";
        $uploadOk = 0;
    } 

    // Check file size                    
    if ($_FILES["FileToUpload"]["size"] > 30000000) {
        $errorMsg .= " Error: your file ". basename($_FILES["FileToUpload"]["name"])." is too large (MAX size 30MB).";
        $uploadOk = 0;
    }
      

 
    // Allow certain file formats
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileTypes != "jpeg"
    && $imageFileType != "gif") {
        $errorMsg .= " Error: Only JPG, JPEG, PNG & GIF files are allowed.";
        $uploadOk = 0;
    }

    
    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo json_encode("Upload failed: " . $errorMsg);

    // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["FileToUpload"]["tmp_name"], $target_file)) {
            echo json_encode("Success!");
      
        } else {
            echo json_encode("Error: upload of ". basename($_FILES["FileToUpload"]["name"])." failed.");
        }
    }
  

} catch(Exception $e) {
        echo json_encode($e->getMessage());
}

?>