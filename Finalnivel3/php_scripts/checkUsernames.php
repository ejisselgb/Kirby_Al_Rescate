<?php
	require_once './db.php';

	$username = $_POST["username"];

	$sql = "SELECT username FROM `jugadores` WHERE `username` = '".$username."'";

	
	if ($result = $conn->query($sql)) {
	    
	    if($result->num_rows > 0){
	    	$respuesta = array('estado' => 0,'mensaje'=> "<span class='invalid'>El nombre de usuario Ya Existe</span>");
	    	echo json_encode($respuesta);
		}else{
			$respuesta = array('estado' => 1,'mensaje'=> "<span class='valid'>El nombre de usuario es válido</span>");
			echo json_encode($respuesta);
		}

	} else {
	    $respuesta = array('estado' => 0,'mensaje'=> "<span class='valid'>Error de comunicación, intente mas tarde</span>");
	    echo json_encode($respuesta);
	}

	$conn->close();
?>