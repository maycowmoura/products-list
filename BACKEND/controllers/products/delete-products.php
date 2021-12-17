<?php

/**
 * the $id comes from the route
 * 
 */

require_once __DIR__ . '/../../models/db/connection.php';

$sql = $pdo->prepare('DELETE FROM products WHERE `id` = :id');
$sql->execute([
  'id' => $id
]);


if($sql->rowCount() == 1){
  die('{"ok": true}');
} else {
  die('{"error": "Nenhum produto deletado."}');
}


