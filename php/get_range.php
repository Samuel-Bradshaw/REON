<?php
    require_once('connect_db.php');
   // Retrieving the posted data.
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    // Sanitising URL supplied values.
    $category_id = filter_var($obj->category_id,  FILTER_SANITIZE_NUMBER_INT);
    
    try {
        $getCategory = $pdo->prepare('SELECT * FROM category WHERE category_id = :category_id LIMIT 1');
       
        // Binding the provided username to our prepared statement.
        $getCategory->bindParam(':category_id', $category_id, PDO::PARAM_INT);
        $getCategory->execute();
        $row = $getCategory->fetch(PDO::FETCH_OBJ);

        echo json_encode($row);
    }
    // Catching potential exceptions being thrown.
    catch(PDOException $e) {
       echo json_encode($e->getMessage());
    }
?>