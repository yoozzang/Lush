<?php

error_reporting(1);
ini_set('display_errors', 1);
session_start();   // 세션 함수 on

if(mysqli_connect_error()){
  echo "mysql 접속중 오류";
  echo mysqli_connect_error();
}
// $connect = mysqli_connect("서버", "DBid", "DBpw", "DBname")


$connect = mysqli_connect("localhost", "mjb1209", "whdqls9512!", "mjb1209");