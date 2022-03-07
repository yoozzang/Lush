<?
  include "Lib.php";

  $uid =$_POST['loginId'];
  $pwd =$_POST['loginPw'];

  $uid = mysqli_real_escape_string($connect, $uid);
  $pwd = mysqli_real_escape_string($connect, $pwd);

  $query = "select * from LUSH_members where uid='$uid' and pwd=md5('$pwd')";
  $result = mysqli_query($connect,$query);
  $data = mysqli_fetch_array($result);

  if($data){
    $_SESSION['isLogin'] ="OK";  
?>
    <script>
      location.href = '../';
    </script>
<?
  }else{
?>
<script>
  alert('로그인이 올바르지 않습니다.');
  history.back(1);
</script>
<?
  }
?>





