<?php
    require_once('connect_db.php');
   // Retrieving the posted data.
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    // Sanitising URL supplied values.
    $category_id = filter_var($obj->category_id,  FILTER_SANITIZE_NUMBER_INT);
    
    try {
        $getProducts = $pdo->prepare('SELECT * FROM product WHERE category_id = :category_id');

       
        // Binding the provided username to our prepared statement.
        $getProducts->bindParam(':category_id', $category_id, PDO::PARAM_INT);
        $getProducts->execute();
        
        // Declaring an empty array to store the data we retrieve from the database in.
        $data = array();
          // Fetching the row.
        while($row = $getProducts->fetch(PDO::FETCH_OBJ)) {
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