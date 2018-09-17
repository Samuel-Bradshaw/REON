<?php
    require_once('connect_db.php');

     // Retrieving the posted data.
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    // Sanitising URL supplied values.
    $name = filter_var($obj->name, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $description = filter_var($obj->description, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $price = filter_var($obj->price,  FILTER_SANITIZE_NUMBER_FLOAT);
    $available = filter_var($obj->available, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $category_id = filter_var($obj->category_id,  FILTER_SANITIZE_NUMBER_INT);
    $leading_photo_filepath = filter_var($obj->leading_photo_filepath, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $long_description =  filter_var($obj->long_description, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    
    $youtube_url =  parse_str(parse_url($obj->youtube_url, PHP_URL_QUERY));


    try {
        $query = "INSERT INTO product (`name`, `description`, `price`, `available`, `category_id`, `leading_photo_filepath`, `long_description`, `youtube_url`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $insertItem = $pdo->prepare($query);
        $insertItem->bindParam(1, $name, PDO::PARAM_STR);
        $insertItem->bindParam(2, $description, PDO::PARAM_STR);
        $insertItem->bindParam(3, $price, PDO::PARAM_STR);
        $insertItem->bindParam(4, $available, PDO::PARAM_STR);
        $insertItem->bindParam(5, $category_id, PDO::PARAM_INT);
        $insertItem->bindParam(6, $leading_photo_filepath, PDO::PARAM_STR);
        $insertItem->bindParam(7, $long_description, PDO::PARAM_STR);
        $insertItem->bindParam(8, $youtube_url, PDO::PARAM_STR);

        $insertItem->execute();
        echo json_encode($pdo->lastInsertId());
      }
    catch (Exception $e) {
        echo json_encode($error = $e->getMessage());
    }





?>