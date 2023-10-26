<?php 

// http://127.0.0.1/phpmyadmin

$username=$_POST['username'];
$map_num=$_POST['map_num'];
$config=$_POST['config'];
$point_to=$_POST['signal'];
$conf_rating=$_POST['conf_rating'];


if($con){
    // echo "connection successful!";
    $sql="INSERT INTO `user_responses`(username,map_num,config,point_to,conf_rating)VALUES('$username','$map_num','$config','$point_to','$conf_rating')";
    $result=mysqli_query($con,$sql);
}else{
    die(mysqli_error($con));
}


?>
