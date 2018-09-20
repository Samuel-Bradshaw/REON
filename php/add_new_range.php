<?php
    require_once('connect_db.php');

     // Retrieving the posted data.
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    // Sanitising URL supplied values.
    $category_name = filter_var($obj->category_name, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $category_description = filter_var($obj->category_description, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $picture_1_filepath = filter_var($obj->picture_1_filepath, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $picture_2_filepath = filter_var($obj->picture_2_filepath, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $tile_picture_position =  filter_var($obj->tile_picture_position , FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);


    try {
        $query = "INSERT INTO category (`category_name`, `category_description`, `picture_1_filepath`, `picture_2_filepath`, `tile_picture_position`) VALUES (?, ?, ?, ?, ?)";
        $insertItem = $pdo->prepare($query);
        $insertItem->bindParam(1, $category_name, PDO::PARAM_STR);
        $insertItem->bindParam(2, $category_description, PDO::PARAM_STR);
        $insertItem->bindParam(3, $picture_1_filepath, PDO::PARAM_STR);
        $insertItem->bindParam(4, $picture_2_filepath, PDO::PARAM_STR);
        $insertItem->bindParam(5, $tile_picture_position, PDO::PARAM_STR);
        $insertItem->execute();
        echo json_encode($pdo->lastInsertId());
      }
    catch (Exception $e) {
        $error = $e->getMessage();
    }





?>