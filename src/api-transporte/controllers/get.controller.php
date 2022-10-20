<?php

require_once 'models/get.model.php';

class GetController {


    /** BUSQUEDA SIN FILTRO */
    static public function getData($table, $select, $orderBy, $orderMode, $startAt, $endAt) {

        $response = GetModel::getData($table, $select, $orderBy, $orderMode, $startAt, $endAt);

        $return = new GetController();
        $return->functionResponse($response);
    }

    /** BUSQUEDA SIN FILTRO CON RANGOS */
    static public function getDataRange($table, $select, $linkTo, $between1, $between2, $orderBy, $orderMode, $startAt, $endAt) {

        $response = GetModel::getDataRange($table, $select, $linkTo, $between1, $between2, $orderBy, $orderMode, $startAt, $endAt);

        $return = new GetController();
        $return->functionResponse($response);
    }


    /** BUSQUEDA SIN FILTRO ENTRE TABLAS RELACIONADAS */
    static public function getRelData($rel, $type, $select, $orderBy, $orderMode, $startAt, $endAt) {

        $response = GetModel::getRelData($rel, $type, $select, $orderBy, $orderMode, $startAt, $endAt);

        $return = new GetController();
        $return->functionResponse($response);
    }

    /** BUSQUEDA SIN FILTRO CON RANGO ENTRE TABLAS RELACIONADAS */
    static public function getRelDataRange($rel, $type, $select, $linkTo, $between1, $between2, $orderBy, $orderMode, $startAt, $endAt, $group) {

        $response = GetModel::getRelDataRange($rel, $type, $select, $linkTo, $between1, $between2, $orderBy, $orderMode, $startAt, $endAt, $group);

        $return = new GetController();
        $return->functionResponse($response);
    }


    /** BUSQUEDA CON FILTRO */
    static public function getDataFilter($table, $select, $linkTo, $equalTo, $orderBy, $orderMode, $startAt, $endAt) {

        $response = GetModel::getDataFilter($table, $select, $linkTo, $equalTo, $orderBy, $orderMode, $startAt, $endAt);

        $return = new GetController();
        $return->functionResponse($response);
    }

    /** BUSQUEDA CON FILTRO ENTRE TABLAS RELACIONADAS */
    static public function getRelDataFilter($rel, $type, $select, $linkTo, $equalTo, $orderBy, $orderMode, $startAt, $endAt) {

        $response = GetModel::getRelDataFilter($rel, $type, $select, $linkTo, $equalTo, $orderBy, $orderMode, $startAt, $endAt);

        $return = new GetController();
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
                'results' => 'Not found'
            );
        }

        echo json_encode($json, http_response_code($json['status']));
    }
}
