<?php
    require_once('connect_db.php');

     // Retrieving the posted data.
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    // Sanitising URL supplied values.


    $product_id = null;

    if(isset($obj->product_id)){
     $product_id = filter_var($obj->product_id,  FILTER_SANITIZE_NUMBER_INT);   
    }

    $folder = filter_var($obj->folder, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $filepaths = $obj->filepaths;

    try{

    for($i = 0; $i < sizeof($filepaths); $i++){
        
            //try {

                $filepath = filter_var($filepaths[$i], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW); 

                $query = "INSERT INTO downloadable (folder, `product_id`, `filepath`) VALUES (?, ?, ?)";
                
                $insertItem = $pdo->prepare($query);
                $insertItem->bindParam(1, $folder, PDO::PARAM_STR);
                $insertItem->bindParam(2, $product_id, PDO::PARAM_INT);
                $insertItem->bindParam(3, $filepath, PDO::PARAM_STR);
     

                $insertItem->execute();

          /*    }
            catch (Exception $e) {
                $error = $e->getMessage();
                echo json_encode($error);
            }*/
        
    }

    echo(json_encode("File details added to database"));

    } catch (Exception $e) {
                $error = $e->getMessage();
                echo json_encode($error);
            }


 

?>