<?php

// ini_set('html_errors', false);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// header('Content-Type: application/json; charset=utf-8');


require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/models/global.php';


define($_SERVER['REQUEST_METHOD'], json_decode(file_get_contents('php://input'), true));

$router = new \Bramus\Router\Router();


require_once __DIR__ . '/routes/products.php';


$router->set404(function () {
  echo (404);
});

$router->run();
