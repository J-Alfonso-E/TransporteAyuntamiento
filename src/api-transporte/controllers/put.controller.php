<?php

include_once 'models/put.model.php';

class PutController {

    /**
     * PETICIÓN 'PUT' PARA EDITAR DATOS
     */
    static public function putData($table, $data, $id, $nameId) {

        $response = PutModel::putData($table, $data, $id, $nameId);
        

        $return = new PutController();
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
                'method' => 'Put'
            );
        }

        echo json_encode($json, http_response_code($json['status']));
    }
}
