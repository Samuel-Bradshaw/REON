<?php

header("Access-Control-Allow-Origin: *");

     // Retrieving the posted data.
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    // Sanitising URL supplied values.

    $dir_name = filter_var($obj->dir, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $dir_name = str_replace(' ','_',$dir_name);


//$dir_name =  str_replace(' ','_',$_POST['dir']);

$target_dir = "../support/".$dir_name;

// Get real path for our folder
$rootPath = realpath($target_dir);
try{

    // Initialize archive object
    $zip = new ZipArchive();
    $zip->open($target_dir, ZipArchive::CREATE | ZipArchive::OVERWRITE);

    // Create recursive directory iterator
    // @var SplFileInfo[] $files //
    $files = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($rootPath),
        RecursiveIteratorIterator::LEAVES_ONLY
    );

    foreach ($files as $name => $file)
    {
        // Skip directories (they would be added automatically)
        if (!$file->isDir())
        {
            // Get real and relative path for current file
            $filePath = $file->getRealPath();
            $relativePath = substr($filePath, strlen($rootPath) + 1);

            // Add current file to archive
            $zip->addFile($filePath, $relativePath);
        }
    }

    // Zip archive will be created only after closing object
    $zip->close();
    echo json_encode('Zip file created');

} 

catch(Exception $e) {
        echo json_encode($e->getMessage());
}


?>