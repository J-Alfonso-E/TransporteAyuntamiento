<?php

require_once 'connection.php';

class GetModel {

    /** BUSQUEDA SIN FILTRO */
    static public function getData($table, $select, $orderBy, $orderMode, $startAt, $endAt) {

        $sql = "SELECT $select FROM  $table";

        /**APLICANDO LÍMITES Y ORDEN */
        if ($orderBy != null && $orderMode != null) {
            $sql .= " ORDER BY $orderBy $orderMode";
        }

        if ($startAt != null && $endAt != null) {
            $sql .= " LIMIT $startAt, $endAt";
        }

        $stmt = Connection::connect()->prepare($sql);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }

    /** BUSQUEDA SIN FILTRO CON RANGOS */
    static public function getDataRange($table, $select, $linkTo, $between1, $between2, $orderBy, $orderMode, $startAt, $endAt) {

        $sql = "SELECT $select FROM  $table WHERE $linkTo BETWEEN '$between1' AND '$between2'";

        /**APLICANDO LÍMITES Y ORDEN */
        if ($orderBy != null && $orderMode != null) {
            $sql .= " ORDER BY $orderBy $orderMode";
        }

        if ($startAt != null && $endAt != null) {
            $sql .= " LIMIT $startAt, $endAt";
        }

        $stmt = Connection::connect()->prepare($sql);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }

    /** BUSQUEDA SIN FILTRO ENTRE TABLAS RELACIONADAS */
    static public function getRelData($rel, $type, $select, $orderBy, $orderMode, $startAt, $endAt) {

        $relArray = explode(",", $rel);
        $typeArray = explode(",", $type);
        $innerJoinText = "";

        /** VERIFICACION DE MÁS DE UNA TABLA PARA PODER RELACIONAR */
        if (count($relArray) < 2) {
            return null;
        }
        foreach ($relArray as $key => $value) {
            if ($key > 0) {
                $innerJoinText .= " INNER JOIN $value ON $value.id_$typeArray[$key] = $relArray[0].id_$typeArray[$key] ";
            }
        }

        $sql = "SELECT $select FROM  $relArray[0] $innerJoinText";

        /**APLICANDO LÍMITES Y ORDEN */
        if ($orderBy != null && $orderMode != null) {
            $sql .= " ORDER BY $orderBy $orderMode";
        }

        if ($startAt != null && $endAt != null) {
            $sql .= " LIMIT $startAt, $endAt";
        }


        $stmt = Connection::connect()->prepare($sql);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }

    /** BUSQUEDA SIN FILTRO CON RANGOS ENTRE TABLAS RELACIONADAS */
    static public function getRelDataRange($rel, $type, $select, $linkTo, $between1, $between2, $orderBy, $orderMode, $startAt, $endAt, $group) {

        $relArray = explode(",", $rel);
        $typeArray = explode(",", $type);
        $innerJoinText = "";

        /** VERIFICACION DE MÁS DE UNA TABLA PARA PODER RELACIONAR */
        if (count($relArray) < 2) {
            return null;
        }
        foreach ($relArray as $key => $value) {
            if ($key > 0) {
                $innerJoinText .= " INNER JOIN $value ON $value.id_$typeArray[$key] = $relArray[0].id_$typeArray[$key] ";
            }
        }

        if ($group != null) {
            $select .= ", COUNT(*) as asistencias";
        }

        $sql = "SELECT $select FROM  $relArray[0] $innerJoinText WHERE $linkTo BETWEEN '$between1' AND '$between2'";

        /**APLICANDO LÍMITES Y ORDEN */
        if ($orderBy != null && $orderMode != null) {
            $sql .= " ORDER BY $orderBy $orderMode";
        }

        if ($startAt != null && $endAt != null) {
            $sql .= " LIMIT $startAt, $endAt";
        }

        /**PARCHE PARA AGREGAR GROUP BY */
        if ($group != null) {
            $sql .= " GROUP BY $group";
        }


        $stmt = Connection::connect()->prepare($sql);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }


    /**
     * ==================================== 
     * BUSQUEDA CON FILTRO 
     * ====================================
     * */

    /**USADO PARA LOGIN */
    static public function getDataFilter($table, $select, $linkTo, $equalTo, $orderBy, $orderMode, $startAt, $endAt) {

        /** SEPARANDO MULTIPLES CONDICIONES DE FILTRO */
        $linktoArray = explode("|", $linkTo);
        $equalToArray = explode("|", $equalTo);

        /**PASS */
        if (isset($linktoArray[0]) && $linktoArray[0] == 'username' && isset($linktoArray[1]) && $linktoArray[1] == 'pass') {
            $equalToArray[1] = md5($equalToArray[1]);
        }


        /** MILTIPLES FILTROS ALMACENADOS EN UNA VARIABLE */
        $linkToText = "";
        if (count($linktoArray) > 1) {
            foreach ($linktoArray as $key => $value) {
                if ($key > 0) {
                    $linkToText .= "AND " . $value . " = :" . $value . " ";
                }
            }
        }

        $sql = "SELECT $select FROM  $table WHERE $linktoArray[0] = :$linktoArray[0] $linkToText";


        /**APLICANDO FILTROS Y ORDEN */
        if ($orderBy != null && $orderMode != null) {
            $sql .= " ORDER BY $orderBy $orderMode";
        }

        if ($startAt != null && $endAt != null) {
            $sql .= " LIMIT $startAt, $endAt";
        }

        $stmt = Connection::connect()->prepare($sql);

        foreach ($linktoArray as $key => $value) {
            $stmt->bindParam(":" . $value, $equalToArray[$key], PDO::PARAM_STR);
        }

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }


    /** BUSQUEDA CON FILTRO CON RANGOS */
    static public function getDataRangeFilter($table, $select, $linkTo, $equalTo, $range, $between1, $between2, $orderBy, $orderMode, $startAt, $endAt) {

        /** SEPARANDO MULTIPLES CONDICIONES DE FILTRO */
        $linktoArray = explode("|", $linkTo);
        $equalToArray = explode("|", $equalTo);

        /** MILTIPLES FILTROS ALMACENADOS EN UNA VARIABLE */
        $linkToText = "";
        if (count($linktoArray) > 1) {
            foreach ($linktoArray as $key => $value) {
                if ($key > 0) {
                    $linkToText .= "AND " . $value . " = :" . $value . " ";
                }
            }
        }

        $sql = "SELECT $select FROM  $table WHERE $range BETWEEN '$between1' AND '$between2' AND $linktoArray[0] = :$linktoArray[0] $linkToText";


        /**APLICANDO FILTROS Y ORDEN */
        if ($orderBy != null && $orderMode != null) {
            $sql .= " ORDER BY $orderBy $orderMode";
        }

        if ($startAt != null && $endAt != null) {
            $sql .= " LIMIT $startAt, $endAt";
        }

        $stmt = Connection::connect()->prepare($sql);

        foreach ($linktoArray as $key => $value) {
            $stmt->bindParam(":" . $value, $equalToArray[$key], PDO::PARAM_STR);
        }

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }


    /**
     * ==================================== 
     * BUSQUEDA CON FILTRO DE TABLAS RELACIONADAS
     * ====================================
     * */
    static public function getRelDataFilter($rel, $type, $select, $linkTo, $equalTo, $orderBy, $orderMode, $startAt, $endAt) {


        $relArray = explode(",", $rel);
        $typeArray = explode(",", $type);
        $innerJoinText = "";

        /** VERIFICACION DE MÁS DE UNA TABLA PARA PODER RELACIONAR */
        if (count($relArray) < 2) {
            return null;
        }
        foreach ($relArray as $key => $value) {
            if ($key > 0) {
                $innerJoinText .= " INNER JOIN $value ON $value.id_$typeArray[$key]= $relArray[0].id_$typeArray[$key] ";
            }
        }

        # $sql = "SELECT $select FROM  $relArray[0] $innerJoinText";

        /** SEPARANDO MULTIPLES CONDICIONES DE FILTRO */
        $linktoArray = explode("|", $linkTo);
        $equalToArray = explode("|", $equalTo);

        /** MILTIPLES FILTROS ALMACENADOS EN UNA VARIABLE */
        $linkToText = "";
        if (count($linktoArray) > 1) {
            foreach ($linktoArray as $key => $value) {
                if ($key > 0) {
                    $linkToText .= "AND " . $value . " = :" . $value . " ";
                }
            }
        }


        $sql = "SELECT $select FROM  $relArray[0] $innerJoinText WHERE $linktoArray[0] = :$linktoArray[0] $linkToText";


        /**APLICANDO FILTROS Y ORDEN */
        if ($orderBy != null && $orderMode != null) {
            $sql .= " ORDER BY $orderBy $orderMode";
        }

        if ($startAt != null && $endAt != null) {
            $sql .= " LIMIT $startAt, $endAt";
        }


        $stmt = Connection::connect()->prepare($sql);

        foreach ($linktoArray as $key => $value) {
            $stmt->bindParam(":" . $value, $equalToArray[$key], PDO::PARAM_STR);
        }

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }
}