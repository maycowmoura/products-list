<?php

// $router comes from index.php


$router->mount('/products', function () use ($router) {

  $router->get('/', function () {
    require_once __DIR__ . '/../controllers/products/get-products.php';
  });

  $router->post('/', function () {
    require_once __DIR__ . '/../controllers/products/create-products.php';
  });

  $router->put('/(\d+)', function ($productId) {
    require_once __DIR__ . '/../controllers/products/update-products.php';
  });

  $router->delete('/(\d+)', function ($id) {
    require_once __DIR__ . '/../controllers/products/delete-products.php';
  });

  $router->put('/(\d+)/amount/(\d+)', function ($productId, $amount) {
    require_once __DIR__ . '/../controllers/products/update-amount.php';
  });
});

