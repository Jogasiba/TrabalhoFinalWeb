<?php
    require 'banco.php';

    $sql = 'select * from pokemon order by id DESC';
    $qry = $con->prepare($sql);
    $qry->execute();

    $registros = $qry->fetchAll(PDO::FETCH_OBJ);
    echo json_encode($registros);
?>