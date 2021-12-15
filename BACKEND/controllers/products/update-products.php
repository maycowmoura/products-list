<?php

/**
 * $productId comes from route
 * 
 * 
 */

require_once __DIR__ . '/../../models/db/connection.php';

use Respect\Validation\Validator as v;

try {
    v::intVal()->positive()->setName('ID')->check($productId);
    v::stringType()->length(3,30)->setName('Nome do produto')->check(PUT['name']);
    v::stringType()->length(3, 30)->setName('Categoria do Produto')->check(PUT['category']);
    v::floatVal()->positive()->setName('Preço')->check(PUT['price']);
    v::intVal()->positive()->setName('Quantidade')->check(PUT['amount']);
    v::BoolVal()->setName('Perecível')->check(PUT['perishable']);
      
} catch (Exception $e) {
  die(_json_encode([
    'error' => $e->getMessage()
  ]));
}


$now = time();

$sql = $pdo->prepare(
  "UPDATE products 
  SET `name` = :name, `category` = :category, `price` = :price, `amount` = :amount, `perishable` = :perishable, last_edition = {$now}
  WHERE id = :id"
);

$sql->execute([
  'id' => $productId,
  'name' => PUT['name'],
  'category' => PUT['category'],
  'price' => PUT['price'],
  'amount' => PUT['amount'],
  'perishable' => PUT['perishable'],
]);


if ($sql->rowCount() == 1) {
  die('{"ok": true}');
} else {
  die('{"error": "Nenhum produto atualizado."}');
}

