<?php

$routesArray = array_filter(explode("/", $_SERVER['REQUEST_URI']));


/** CUANDO NO SE HACE NINGUNA PETICIÓN A LA API */
if (count($routesArray) <= 1) {
    $json = array(
        'status' => "404",
        'result' => 'Not found'
    );

    echo json_encode($json, http_response_code($json['status']));

    return;
}


/** CUANDO SI SE HACE PETICIÓN A LA API */
if (count($routesArray) == 2 && isset($_SERVER['REQUEST_METHOD'])) {

    /**                 1           2       ---> TABLA EN LA BD
     * localhost/api-transporte/estudiantes 
     * */
    $table = explode("?", $routesArray[2])[0];


    /** PETICIÓN GET */
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        include 'services/get.php';
    }



    /** PETICIÓN POST */
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        include 'services/post.php';
    }


    /** PETICIÓN PUT */
    if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        include 'services/put.php';
    }


    /** PETICIÓN DELETE */
    if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        $json = array(
            'status' => "200",
            'result' => 'Solicitud DELETE'
        );

        echo json_encode($json, http_response_code($json['status']));
    }

    return;
} else {
    /*
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $_SERVER['REQUEST_URI']);
    //curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Bearer xxx'));
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    //curl_setopt($ch, CURLOPT_BINARYTRANSFER, 1);
    curl_setopt($ch, CURLOPT_VERBOSE, 1);
    $picture = json_decode(curl_exec($ch),true);
    curl_close($ch);


    //Display the image in the browser
    header('Content-type: image/jpeg');
    echo $picture;
    */

    //echo '<img src="data:image/png;base64,' . base64_encode(file_get_contents("../" . $_SERVER['REQUEST_URI'])) . '">';

    //echo '<img src="data:image/png;base64,' . base64_encode(file_get_contents("public/uploaded_files/0fe15f058e569a1b01407fb92a8fae8d.png")) . '">';

    //echo $_SERVER['REQUEST_URI'];
}
