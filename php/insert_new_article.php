<?php
    require_once('connect_db.php');

     // Retrieving the posted data.
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    // Sanitising URL supplied values.

    $title = filter_var($obj->title, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $article = filter_var($obj->article, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
   // $image_filepath = filter_var($obj->image_filepath, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $date = date('Y-m-d');

        
    try {

        $query = "INSERT INTO news (`title`, `article`, `date`) VALUES (?, ?, ?)";
                
        $insertArticle = $pdo->prepare($query);
        $insertArticle->bindParam(1, $title, PDO::PARAM_STR);
        $insertArticle->bindParam(2, $article, PDO::PARAM_STR);
       // $insertArticle->bindParam(3, $image_filepath, PDO::PARAM_STR);s
        $insertArticle->bindParam(3, $date, PDO::PARAM_STR);


        $insertArticle->execute();

        echo json_encode("Success!");
        }
        catch (Exception $e) {
          $error = $e->getMessage();
            echo json_encode($error);
        }
        

?>