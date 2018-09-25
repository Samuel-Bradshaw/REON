<?php
    require_once('connect_db.php');
   // Retrieving the posted data.
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    // Sanitising URL supplied values.
    $product_id = filter_var($obj->product_id,  FILTER_SANITIZE_NUMBER_INT);
    
    try {
        $getProduct = $pdo->prepare(
            'SELECT p.*, c.category_name 
            FROM product AS p, category as c
            WHERE p.product_id = :product_id 
            AND p.category_id = c.category_id');
       
        // Binding the provided username to our prepared statement.
        $getProduct->bindParam(':product_id', $product_id, PDO::PARAM_INT);
        $getProduct->execute();
        $row = $getProduct->fetch(PDO::FETCH_OBJ);

        echo json_encode($row);
    }
    // Catching potential exceptions being thrown.
    catch(PDOException $e) {
       echo json_encode($e->getMessage());
    }
?>