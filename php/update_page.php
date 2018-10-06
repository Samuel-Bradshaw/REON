<?php

    require_once('connect_db.php');
   // Retrieving the posted data.
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    // Sanitising URL supplied values.
    $page_id = filter_var($obj->page_id,  FILTER_SANITIZE_NUMBER_INT);
    $copy = $obj->copy;
    $video_url = parse_str(parse_url($obj->video_url, PHP_URL_QUERY));
    $image_filepath =filter_var($obj->image_filepath, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    if(empty($image_filepath)){
        $image_filepath = null;
    }
   

    try{

         $updatePage = $pdo->prepare(
            'UPDATE page 
            SET copy = :copy, video_url = :video_url, image_filepath = :image_filepath 
            WHERE page_id = :page_id');

        $updatePage->bindParam(':page_id', $page_id, PDO::PARAM_INT);
        $updatePage->bindParam(':video_url', $video_url, PDO::PARAM_STR);
        $updatePage->bindParam(':copy', $copy, PDO::PARAM_STR);
        $updatePage->bindParam(':image_filepath', $image_filepath, PDO::PARAM_STR);

        $updatePage->execute();

        echo json_encode("Success!");

    }   // Catching potential exceptions being thrown.
    catch(PDOException $e) {
       echo json_encode($e->getMessage());
    }







?>