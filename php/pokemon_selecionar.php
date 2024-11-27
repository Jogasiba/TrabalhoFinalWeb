<?php
    require 'banco.php';

    if(!isset($_GET['id'])){
        echo 'Erro: Id é obrigatório!';
        exit();
    }

    $id = $_GET['id'];

    $sql = "select * from pokemon where id = :id";

    $qry = $con->prepare($sql);
    $qry->bindParam(':id', $id, PDO::PARAM_INT);
    $qry->execute();
    $registros = $qry->fetchAll(PDO::FETCH_OBJ);
    echo json_encode($registros);
?>