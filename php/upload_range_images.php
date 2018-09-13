<?php

header("Access-Control-Allow-Origin: *");

$new_dir_name =  str_replace(' ','_',$_POST['dir']);

if (!file_exists("../images/".$new_dir_name."/")) {
    mkdir("../images/$new_dir_name");
}

$target_dir = "../images/".$new_dir_name."/";

$actual_link = "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$target_files = array(
                    $target_dir . basename($_FILES["range_link_image"]["name"]),
                    $target_dir . basename($_FILES["range_page_image"]["name"])   
                     );
$uploadOk = 1;

$imageFileType1 = strtolower(pathinfo($target_files[0],PATHINFO_EXTENSION));
$imageFileType2 = strtolower(pathinfo($target_files[1],PATHINFO_EXTENSION));

$errorMsg = "";

try{

    // Check if image file is a actual image or fake image
    if(isset($_FILES["range_link_image"]) && isset($_FILES["range_page_image"])) {

        $check1 = getimagesize($_FILES["range_link_image"]["tmp_name"]);
        $check2 = getimagesize($_FILES["range_page_image"]["tmp_name"]);
        if($check1 !== false && $check2 !== false) {
            $uploadOk = 1;
        } else {
            $errorMsg = " Error: File selected is not an image.";
            $uploadOk = 0;
        }
    } else {
        $errorMsg = " Error: Files not selected.";
        $uploadOk = 0;
    }


    // Check if file already exists
    if (file_exists($target_files[0]) || file_exists($target_files[1])) {
        $errorMsg .= " Error: File already exists.";
        $uploadOk = 0;
    } 

    // Check file size                    
    if ($_FILES["range_link_image"]["size"] > 12000000) {
        $errorMsg .= " Error: your 'range link' file is too large (MAX size 12MB).";
        $uploadOk = 0;
    }
      if ($_FILES["range_page_image"]["size"] > 12000000) {
        $errorMsg .= " Error: your 'range page' file is too large (MAX size 12MB).";
        $uploadOk = 0;
    }

 
    // Allow certain file formats
    if($imageFileType1 != "jpg" && $imageFileType1 != "png" && $imageFileTypes1 != "jpeg"
    && $imageFileType1 != "gif") {
        $errorMsg .= " Error: Only JPG, JPEG, PNG & GIF files are allowed.";
        $uploadOk = 0;
    }

     if($imageFileType2 != "jpg" && $imageFileType2 != "png" && $imageFileTypes2 != "jpeg"
    && $imageFileType2 != "gif") {
        $errorMsg .= " Error: Only JPG, JPEG, PNG & GIF files are allowed.";
        $uploadOk = 0;
    }

    
    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo json_encode("Upload failed: " . $errorMsg);

    // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["range_link_image"]["tmp_name"], $target_files[0]) && 
                move_uploaded_file($_FILES["range_page_image"]["tmp_name"], $target_files[1])) {
           // echo json_encode("The files ". basename( $_FILES["range_link_image"]["name"]).
           //                 "and ". basename( $_FILES["range_page_image"]["name"]). " have been uploaded.");
            echo json_encode("Sucess! Images uploaded");
      
        } else {
            echo json_encode("Error: upload failed.");
        }
    }
  

} catch(Exception $e) {
        echo json_encode($e->getMessage());
}

?>