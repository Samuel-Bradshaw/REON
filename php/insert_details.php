<?php
    require_once('connect_db.php');

     // Retrieving the posted data.
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    // Sanitising URL supplied values.

    $product_id = filter_var($obj->product_id,  FILTER_SANITIZE_NUMBER_INT);

    foreach($obj as $key => $value){
        if($key != "product_id"){

            $detail = filter_var($obj->$key, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW); 

            try {
                $query = "INSERT INTO detail (`detail`, `product_id`) VALUES (?, ?)";
                
                $insertItem = $pdo->prepare($query);
                $insertItem->bindParam(1, $detail, PDO::PARAM_STR);
                $insertItem->bindParam(2, $product_id, PDO::PARAM_INT);

                $insertItem->execute();
                echo json_encode($pdo->lastInsertId());
              }
            catch (Exception $e) {
                $error = $e->getMessage();
            }
        
        }
    }

?>