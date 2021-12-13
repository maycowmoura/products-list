<?php

require_once __DIR__ . '/../../models/db/connection.php';


$page = $_GET['page'] ?? 1;

$sql = $pdo->prepare('SELECT * FROM categories LIMIT :firstItem, 5');
$sql->bindValue(':firstItem', (($page - 1) * 5), PDO::PARAM_INT);
$sql->execute();

$result = $sql->fetchAll(PDO::FETCH_ASSOC);

die(
  _json_encode($result)
);


