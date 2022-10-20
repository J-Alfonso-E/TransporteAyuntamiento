<?php

include_once 'connection.php';

class PutModel {

    /**
     * PETICIÓN PUT PARA EDITAR DATOS DE FORMA DINÁMICA
     */

    static public function putData($table, $data, $id, $nameId) {
        $set = "";
        foreach ($data as $key => $value) {
            $set .= $key . "=:" . $key . ",";
        }
        $set = substr($set, 0, -1);

        $sql = "UPDATE $table SET $set WHERE $nameId = :$nameId";

        $conection = Connection::connect();
        $stmt = $conection->prepare($sql);

        foreach ($data as $key => $value) {
            $stmt->bindParam(":" . $key, $data[$key], PDO::PARAM_STR);
        }
        $stmt->bindParam(":".$nameId,$id,PDO::PARAM_STR);

        if ($stmt->execute()) {
            $response = array(
                'result' => 'Solicitud PUT satisfactorio'
            );
            return $response;
        } else {
            return $conection->errorInfo();
        }
    }
    /* static public function putData($table, $data, $id, $nameId) {

        $columns = "";
        $params = "";

        foreach ($data as $key => $value) {
            $columns .= $key . ",";
            $params .= ":" . $key . ",";
        }

        $columns = substr($columns, 0, -1);
        $params = substr($params, 0, -1);

        $sql = "INSERT INTO $table ($columns) VALUES ($params)";

        $conection = Connection::connect();
        $stmt = $conection->prepare($sql);

        foreach ($data as $key => $value) {
            $stmt->bindParam(":".$key, $data[$key], PDO::PARAM_STR);
            
        }

        if ($stmt->execute()) {
            $response = array(
                'lastId' => $conection->lastInsertId(),
                'result' => 'Solicitud PUT satisfactorio'
            );
            return $response;
        } else {
            return $conection->errorInfo();
        }
    }*/
}
