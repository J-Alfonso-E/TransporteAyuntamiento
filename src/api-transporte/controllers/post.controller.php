<?php

include_once 'models/post.model.php';

class PostController {

    /**
     * PETICIÓN 'POST' PARA CREAR DATOS
     */
    static public function postData($table, $data) {

        $response = PostModel::postData($table, $data);

        $return = new PostController();
        $return->functionResponse($response);
    }

      /**
     * PETICIÓN 'POST' PARA EDITAR DATOS
     */
    static public function postDataEdit($table, $data, $id, $nameId) {

        $response = PostModel::postDataEdit($table, $data, $id, $nameId);

        $return = new PostController();
        $return->functionResponse($response);
    }



    /** LA RESPUESTA DEL CONTROLADOR */
    public function functionResponse($response) {

        if (!empty($response)) {
            $json = array(
                'status' => "200",
                'total' => count($response),
                'results' => $response
            );
        } else {
            $json = array(
                'status' => "404",
                'results' => 'Not found',
                'method' => 'Post'
            );
        }

        echo json_encode($json, http_response_code($json['status']));
    }
}
