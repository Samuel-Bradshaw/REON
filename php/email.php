<?php
$myemail = 'samuelbradshaw2718@gmail.com';//<-----Put Your email address here.

$json =  file_get_contents('php://input');
$obj =  json_decode($json);
// Sanitising URL supplied values.
$message = filter_var($obj->message, FILTER_SANITIZE_STRING);
$email_address = filter_var($obj->email, FILTER_SANITIZE_EMAIL);


$to = $myemail;
$email_subject = "REON message form submission: $email_address";
$email_body = "$message \n From $email_address";
$headers = "From: $email_address\n";
$headers .= "Reply-To: $email_address";
if(mail($to, $email_subject, $email_body, $headers)){
	echo json_encode("success");
}else{

	echo json_encode("failure");
}


?>