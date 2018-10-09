<?php
    require_once('connect_db.php');

     // Retrieving the posted data.
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    // Sanitising URL supplied values.


    $name= filter_var($obj->name,  FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $link = filter_var($obj->link,  FILTER_SANITIZE_STRING);

   
        
            try { 

                $query = "INSERT INTO dealer (`name`, `link`) VALUES (?, ?)";
                
                $insertItem = $pdo->prepare($query);
                $insertItem->bindParam(1, $name, PDO::PARAM_STR);
                $insertItem->bindParam(2, $link, PDO::PARAM_STR);
     

                $insertItem->execute();
                echo(json_encode("Success!"));

              }
            catch (Exception $e) {
                $error = $e->getMessage();
                echo json_encode($error);
            }
        
        

      

?>