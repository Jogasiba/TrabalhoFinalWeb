<?php
    require 'banco.php';

    $sql = "delete from pokemon";

    $qry = $con->prepare(query: $sql);
    $qry->execute();
?>