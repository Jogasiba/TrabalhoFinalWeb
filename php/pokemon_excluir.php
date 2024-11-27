<?php
    require 'banco.php';

    if(!isset($_GET['id'])){
        echo 'Erro: Id é obrigatório!';
        exit();
    }

    $id = $_GET['id'];

    $sql = "delete from pokemon where id = :id";

    $qry = $con->prepare($sql);
    $qry->bindParam(':id', $id, PDO::PARAM_INT);
    $qry->execute();
    $nr = $qry->rowCount();
    echo '' .$nr .' linhas excluidas!';
?>