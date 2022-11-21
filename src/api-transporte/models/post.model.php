<?php

include_once 'connection.php';

class PostModel {

    /**CREAR DATOS */
    static public function postData($table, $data) {

        /**IMAGE UPLOAD */
        $uploadFileMessage = PostModel::uploadFile();

        if ($uploadFileMessage) {
            //array_push($data, 'img');
            $data['img'] = $uploadFileMessage;
        }
        /**END IMAGE UPLOAD */

        /** ENCRYPT PASS */
        if(isset($data['pass'])){
            $data['pass'] = md5($data['pass']);
        }
        

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
            $stmt->bindParam(":" . $key, $data[$key], PDO::PARAM_STR);
        }

        if ($stmt->execute()) {
            $response = array(
                'lastId' => $conection->lastInsertId(),
                'result' => 'Alumno registrado exitosamente',
                'msg' => $uploadFileMessage ? "Imagen subida exitosamente" : "Error al subir imagen"
            );
            return $response;
        } else {
            return $conection->errorInfo();
        }
    }


    /**EDITAR DATOS */
    static public function postDataEdit($table, $data, $id, $nameId) {

        /**IMAGE UPLOAD */
        $uploadFileMessage = PostModel::uploadFile();

        if ($uploadFileMessage) {
            //array_push($data, 'img');
            $data['img'] = $uploadFileMessage;
        }
        /**END IMAGE UPLOAD */

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
        $stmt->bindParam(":" . $nameId, $id, PDO::PARAM_STR);

        if ($stmt->execute()) {
            $response = array(
                'result' => 'Alumno actualizado exitosamente',
                'msg' => $uploadFileMessage ? "Imagen subida exitosamente" : "Error al subir imagen"
            );
            return $response;
        } else {
            return $conection->errorInfo();
        }
    }


    static public function uploadFile() {
        if (count($_FILES)>0) {
            $fileTmpPath = $_FILES['img']['tmp_name'];
            $fileName = $_FILES['img']['name'];
            $fileSize = $_FILES['img']['size'];
            $fileType = $_FILES['img']['type'];
            $fileNameCmps = explode(".", $fileName);
            $fileExtension = strtolower(end($fileNameCmps));
            $newFileName = md5(time() . $fileName) . '.' . $fileExtension;
            // directory in which the uploaded file will be moved
            $uploadFileDir = 'public/uploaded_files/';
            if (!file_exists($uploadFileDir)) {
                mkdir($uploadFileDir, 0777, true);
            }

            $dest_path = $uploadFileDir . $newFileName;

            if (move_uploaded_file($fileTmpPath, $dest_path)) {
                $message = 'File is successfully uploaded.';
                $message = $dest_path;
            } else {
                $message = 'There was some error moving the file to upload directory. Please make sure the upload directory is writable by web server.';
                $message = null;
            }

            return $message;
        }
    }
}
