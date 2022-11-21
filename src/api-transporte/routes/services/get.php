<?php

include_once 'controllers/get.controller.php';

/** $table - from 'routes.php' */
/**
 * Param: select , especifíca las tablas a consultar de la tabla
 * Param: linkTo , especifica el filtro de busqueda (WHERE)
 * Param: equalTo , especifica el valor del filtro
 * Param: orderBy , especifíca la tabla a tomar como referencia para ordenar
 * Param: orderMode , especifíca el tipo de orden
 * Param: startAt , especifíca el índice inicial de la consulta (LIMIT)
 * Param: endAt , especifíca la cantidad desde el índice inicial de la consulta (LIMIT)
 */


$select = $_GET['select'] ?? "*";
$orderBy = $_GET['orderBy'] ?? null;
$orderMode = $_GET['orderMode'] ?? null;
$startAt = $_GET['startAt'] ?? null;
$endAt = $_GET['endAt'] ?? null;

$response = new GetController();

/** 
 * ==========================
 * BUSQUEDA CON FILTRO 
 * ==========================
 * */
if (isset($_GET['linkTo']) && isset($_GET['equalTo'])) {

    /** 
     * =================================
     * BUSQUEDA CON FILTRO CON RANGO 
     * =================================
     * */
    if (isset($_GET['linkTo']) && isset($_GET['equalTo']) && isset($_GET['range']) && isset($_GET['between1']) && isset($_GET['between2'])) {
        $linkTo = $_GET['linkTo'];
        $equalTo = $_GET['equalTo'];
        $range = $_GET['range'];
        /** FALTA AGREGAR */
        /** 
         * ==========================
         * PETICIONES GET CON RANGO CON FILTRO
         * ==========================
         * */
        $response->getDataRangeFilter($table, $select, $linkTo, $equalTo, $range, $_GET['between1'], $_GET['between2'], $orderBy, $orderMode, $startAt, $endAt);
    } else {

        /** 
         * =================================
         * BUSQUEDA CON FILTRO SIN RANGO
         * =================================
         * */

        /** 
         * ===================================================
         * PETICIONES GET CON FILTRO ENTRE TABLAS RELACIONADAS
         * ===================================================
         * */
        if (isset($_GET['rel']) && isset($_GET['type']) && $table == "relations") {

            $linkTo = $_GET['linkTo'];
            $equalTo = $_GET['equalTo'];
            $rel = $_GET['rel'];
            $type = $_GET['type'];

            $response->getRelDataFilter($rel, $type, $select, $linkTo, $equalTo, $orderBy, $orderMode, $startAt, $endAt);
        } else {
            /** 
             * ==========================
             * PETICIONES GET CON FILTRO
             * ==========================
             * */
            $linkTo = $_GET['linkTo'];
            $equalTo = $_GET['equalTo'];
            $response->getDataFilter($table, $select, $linkTo, $equalTo, $orderBy, $orderMode, $startAt, $endAt);
        }
    }
}
/** 
 * ========================== ========================== ==========================
 * BUSQUEDAS SIN FILTRO 
 * ========================== ========================== ==========================
 * */
else {

    /** 
     * =================================
     * BUSQUEDAS SIN FILTRO CON RANGO 
     * =================================
     * */
    if (isset($_GET['linkTo']) && isset($_GET['between1']) && isset($_GET['between2'])) {
        $linkTo = $_GET['linkTo'];
        /** 
         * ===================================================
         * PETICIONES GET ENTRE TABLAS RELACIONADAS CON RANGO
         * ===================================================
         * */
        if (isset($_GET['rel']) && isset($_GET['type']) && $table == "relations") {
            $rel = $_GET['rel'];
            $type = $_GET['type'];
            /**PARCHE PARA GROUP BY */
            $group = $_GET['group'] ?? null;
            $response->getRelDataRange($rel, $type, $select, $linkTo, $_GET['between1'], $_GET['between2'], $orderBy, $orderMode, $startAt, $endAt, $group);
        } else {
            /** 
             * ==========================
             * PETICIONES GET CON RANGO
             * ==========================
             * */
            $response->getDataRange($table, $select, $linkTo, $_GET['between1'], $_GET['between2'], $orderBy, $orderMode, $startAt, $endAt);
        }
    } else {
        /** 
         * =================================
         * BUSQUEDAS SIN FILTRO SIN RANGO
         * =================================
         * */

        /** 
         * ===================================================
         * PETICIONES GET ENTRE TABLAS RELACIONADAS
         * ===================================================
         * */
        if (isset($_GET['rel']) && isset($_GET['type']) && $table == "relations") {
            $rel = $_GET['rel'];
            $type = $_GET['type'];
            $response->getRelData($rel, $type, $select, $orderBy, $orderMode, $startAt, $endAt);
        } else {
            /** 
             * ==========================
             * PETICIONES GET 
             * ==========================
             * */
            $response->getData($table, $select, $orderBy, $orderMode, $startAt, $endAt);
        }
    }
}
