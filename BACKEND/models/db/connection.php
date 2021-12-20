<?php

try {
  $pdo = new PDO('mysql:host=localhost;dbname=store-cart;charset=utf8', 'root', '');
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  echo _json_encode([
    'error' => $e->getMessage()
  ]);
}
