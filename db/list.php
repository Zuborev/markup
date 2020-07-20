<?php
include_once 'config.php';
$result = $dbh->query("SELECT * FROM adress ORDER BY name ASC")->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($result);