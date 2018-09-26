<?php
    require_once('connect_db.php');

     // Retrieving the posted data.
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    // Sanitising URL supplied values.
    $category_name = filter_var($obj->category_name, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $category_description = filter_var($obj->category_description, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $main_page_picture = filter_var($obj->main_page_picture , FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);


    try {

        $query = "INSERT INTO category (`category_name`, `category_description`, `main_page_picture`) VALUES (?, ?, ?)";
        $insertItem = $pdo->prepare($query);
        $insertItem->bindParam(1, $category_name, PDO::PARAM_STR);
        $insertItem->bindParam(2, $category_description, PDO::PARAM_STR);
        $insertItem->bindParam(3, $main_page_picture, PDO::PARAM_STR);
        $insertItem->execute();
        echo json_encode($pdo->lastInsertId());
      }
    catch (Exception $e) {
        $error = $e->getMessage();
    }





?>