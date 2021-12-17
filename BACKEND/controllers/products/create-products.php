<?php

require_once __DIR__ . '/../../models/db/connection.php';

use Respect\Validation\Validator as v;

try {
    v::stringType()->length(3,30)->setName('Nome do produto')->check(trim(POST['name']));
    v::stringType()->length(3, 30)->setName('Categoria do Produto')->check(trim(POST['category']));
    v::floatVal()->positive()->setName('Preço')->check(POST['price']);
    v::intVal()->positive()->setName('Quantidade')->check(POST['amount']);
    v::BoolVal()->setName('Perecível')->check(POST['perishable']);
      
} catch (Exception $e) {
  die(_json_encode([
    'error' => $e->getMessage()
  ]));
}


$now = time();
$data = [
  'name' => mb_strtoupper(trim(POST['name'])),
  'category' => mb_strtolower(trim(POST['category'])),
  'price' => POST['price'],
  'amount' => POST['amount'],
  'perishable' => POST['perishable'],
];

$sql = $pdo->prepare(
  "INSERT INTO products 
  (`name`, `category`,`price`, `amount`, `perishable`, `created_at`, `last_edition`)
  VALUES
  (:name, :category, :price, :amount,  :perishable, {$now}, {$now})"
);

$sql->execute($data);


if ($sql->rowCount() < 1) {
  die('{"error": "Nenhum produto atualizado."}');
}


$data['id'] = $pdo->lastInsertId();
$data['last_edition'] = $now;
die(_json_encode($data));

