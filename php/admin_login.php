<?php
    require_once('connect_db.php');
    
       // Retrieving the posted data.
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);

    $username = filter_var($obj->username, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $password = filter_var($obj->password, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

    // Attempting to query database table and retrieve data.
    try {
      $query = 'SELECT user_id, username, password FROM admin WHERE username = :username LIMIT 1;';
      $checkCredentials = $pdo->prepare($query);

           // Binding the provided username to our prepared statement.
          $checkCredentials->bindParam(':username', $username, PDO::PARAM_STR);
          $checkCredentials->execute();

          $row = $checkCredentials->fetch(PDO::FETCH_OBJ);



        if ($row === false) {
        // Could not find a user with that username!
          throw new Exception("Username not recognised.");

        } else {
          // Checking to see if the given password matches the hash stored in the user table.
          // Comparing the passwords.
          $storedPass = $row->password;
          // If password is verified as true, then the user can successfully log in.
          if (password_verify($password, $storedPass)){
              // Returning data as JSON.
              echo json_encode("Success!");
              exit;
          } else {
            // incorrect password
            throw new Exception('Incorrect password!');
        }
      }
    }
    // Catching potential exceptions being thrown.
  
    catch(Exception $e) {
       echo json_encode($e->getMessage());
    }
?>