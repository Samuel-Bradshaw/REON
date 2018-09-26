<?php
    require_once('connect_db.php');

     // Retrieving the posted data.
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    // Sanitising URL supplied values.


    $category_id = filter_var($obj->category_id,  FILTER_SANITIZE_NUMBER_INT);
    $filepaths = $obj->image_filepaths;

    for($i = 0; $i < sizeof($filepaths); $i++){
        
            try {

                $filepath = filter_var($filepaths[$i], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW); 

                $query = "INSERT INTO category_image (`category_id`, `filepath`) VALUES (?, ?)";
                
                $insertItem = $pdo->prepare($query);
                $insertItem->bindParam(1, $category_id, PDO::PARAM_INT);
                $insertItem->bindParam(2, $filepath, PDO::PARAM_STR);
     

                $insertItem->execute();

              }
            catch (Exception $e) {
                $error = $e->getMessage();
                echo json_encode($error);
            }
        
        }

        echo(json_encode("Image details added to database"));

?>