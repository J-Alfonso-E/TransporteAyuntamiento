<?php

include_once 'controllers/put.controller.php';

if (isset($_GET['id']) && isset($_GET['nameId'])) {

    /**
     * CAPTURAR DATOS DEL FORMULARIO
     */

    $data = array();
    parse_str(file_get_contents('php://input'), $data);

    $response = new PutController();
    $response->putData($table,$data,$_GET['id'],$_GET['nameId']);
}
