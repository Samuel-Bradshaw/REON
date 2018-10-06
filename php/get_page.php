<?php 

    require_once('connect_db.php');
   // Retrieving the posted data.
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    // Sanitising URL supplied values.
    $page_id = filter_var($obj->page_id,  FILTER_SANITIZE_NUMBER_INT);
    
    try {
        $getPage = $pdo->prepare(
            'SELECT * FROM page WHERE page_id = :page_id');
       
        // Binding the provided username to our prepared statement.
        $getPage->bindParam(':page_id', $page_id, PDO::PARAM_INT);
        $getPage->execute();
        $row = $getPage->fetch(PDO::FETCH_OBJ);

        echo json_encode($row);
    }
    // Catching potential exceptions being thrown.
    catch(PDOException $e) {
       echo json_encode($e->getMessage());
    }

?>