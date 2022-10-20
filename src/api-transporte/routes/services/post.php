<?php

include_once 'controllers/post.controller.php';

if (isset($_POST)) {

    $columns = array();
    foreach (array_keys($_POST) as $key => $value) {
        array_push($columns, $value);
    }

    $response = new PostController();
    $response->postData($table,$_POST);
}




