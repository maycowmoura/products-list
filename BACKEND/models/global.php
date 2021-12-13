<?php

date_default_timezone_set('America/Sao_Paulo');


function _json_encode($array) {
  return json_encode($array, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
}

function _json_decode($string) {
  return json_decode($string, true);
}

function filterString($string){
  return filter_var(addslashes($string), FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_BACKTICK);
}
