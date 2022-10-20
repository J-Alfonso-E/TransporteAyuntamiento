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
}
