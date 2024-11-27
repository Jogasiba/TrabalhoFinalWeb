<?php
    require 'banco.php';

    $id = $_GET['id'];
    $numeroPokedex = $_GET['numeroPokedex'];
    $nome = $_GET['nome'];
    $tipo1 = $_GET['tipo1'];
    $tipo2 = $_GET['tipo2'];

    $sql = "update pokemon set numeroPokedex = :numeroPokedex, nome = :nome, tipo1 = :tipo1, 
            tipo2 = :tipo2 where id = :id";

    $qry = $con->prepare($sql);
    $qry->bindParam(':id', $id, PDO::PARAM_INT);
    $qry->bindParam(':numeroPokedex', $numeroPokedex, PDO::PARAM_INT);
    $qry->bindParam(':nome', $nome, PDO::PARAM_STR);
    $qry->bindParam(':tipo1', $tipo1, PDO::PARAM_STR);
    $qry->bindParam(':tipo2', $tipo2, PDO::PARAM_STR);
    $qry->execute();
    $nr = $qry->rowCount();
    echo '' .$nr .' linhas alteradas!';
?>