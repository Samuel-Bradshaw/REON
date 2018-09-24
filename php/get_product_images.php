<?php
    require_once('connect_db.php');
   // Retrieving the posted data.
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    // Sanitising URL supplied values.
    $product_id = filter_var($obj->product_id,  FILTER_SANITIZE_NUMBER_INT);
    
    try {
        $getpicture = $pdo->prepare('SELECT filepath FROM picture WHERE product_id = :product_id');
       
        // Binding the provided username to our prepared statement.
        $getpicture->bindParam(':product_id', $product_id, PDO::PARAM_INT);
        $getpicture->execute();

        $data = array();

         while($row = $getpicture->fetch(PDO::FETCH_OBJ)) {
            // Assigning each row of data to an associative array.
            $data[] = $row;
        }

        echo json_encode($data);
    }
    // Catching potential exceptions being thrown.
    catch(PDOException $e) {
       echo json_encode($e->getMessage());
    }
?>