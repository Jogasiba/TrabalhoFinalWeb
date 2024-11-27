<?php
    require 'banco.php';

    $numeroPokedex = $_GET['numeroPokedex'];
    $nome = $_GET['nome'];
    $tipo1 = $_GET['tipo1'];
    $tipo2 = $_GET['tipo2'];
    $imagem = $_GET['imagem'];

    $sql = "insert into pokemon (numeroPokedex, nome, tipo1, tipo2, imagem) values(:numeroPokedex, :nome, :tipo1, :tipo2, :imagem)";

    $qry = $con->prepare($sql);
    $qry->bindParam(':numeroPokedex', $numeroPokedex, PDO::PARAM_INT);
    $qry->bindParam(':nome', $nome, PDO::PARAM_STR);
    $qry->bindParam(':tipo1', $tipo1, PDO::PARAM_STR);
    $qry->bindParam(':tipo2', $tipo2, PDO::PARAM_STR);
    $qry->bindParam(':imagem', $imagem, PDO::PARAM_STR);
    $qry->execute();
    $nr = $qry->rowCount();
    echo $nr;
?>