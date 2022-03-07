<?
include "Lib.php";
  $isLogin = $_SESSION['isLogin'];
  
  $array = Array(
    "logInId" => $isLogin
  );

  $response = json_encode($array,JSON_UNESCAPED_UNICODE);

  echo $response;
?>
