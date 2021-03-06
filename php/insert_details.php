<?php
    require_once('connect_db.php');

     // Retrieving the posted data.
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    // Sanitising URL supplied values.


    $product_id = filter_var($obj->product_id,  FILTER_SANITIZE_NUMBER_INT);
    $details = $obj->details;

    for($i = 0; $i < sizeof($details); $i++){
        
            try {

                $detail = filter_var($details[$i], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW); 

                $query = "INSERT INTO detail (`detail`, `product_id`) VALUES (?, ?)";
                
                $insertItem = $pdo->prepare($query);
                $insertItem->bindParam(1, $detail, PDO::PARAM_STR);
                $insertItem->bindParam(2, $product_id, PDO::PARAM_INT);

                $insertItem->execute();

              }
            catch (Exception $e) {
                $error = $e->getMessage();
                echo json_encode($error);
            }
        
        }

        echo(json_encode("Product details added to database"));

?>