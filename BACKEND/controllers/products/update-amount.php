<?php

/**
 * $amount and $productId come from route
 * 
 * 
 */

require_once __DIR__ . '/../../models/db/connection.php';

use Respect\Validation\Validator as v;

try {
    v::intVal()->positive()->setName('ID')->check($productId);
    v::intVal()->positive()->setName('Quantidade')->check($amount);
      
} catch (Exception $e) {
  die(_json_encode([
    'error' => $e->getMessage()
  ]));
}


$sql = $pdo->prepare(
  "UPDATE products 
  SET `amount` = :amount
  WHERE id = :id"
);

$sql->execute([
  'id' => $productId,
  'amount' => $amount
]);


if ($sql->rowCount() == 1) {
  die('{"ok": true}');
  
} else {
  die('{"error": "Nenhum produto atualizado."}');
}

