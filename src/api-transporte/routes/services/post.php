<?php

include_once 'controllers/post.controller.php';

if (isset($_POST)) {

    $columns = array();
    foreach (array_keys($_POST) as $key => $value) {
        array_push($columns, $value);
    }

    $response = new PostController();

    /**EDITAR */
    if (isset($_GET['edit'])) {
        $response->postDataEdit($table, $_POST, $_GET['id'], $_GET['nameId']);
    }
    /**CREAR DATOS */
    else {
        $response->postData($table, $_POST);
    }
}
