<?php

	$sqlPlayer1 = "SELECT max_score FROM `jugadores` WHERE `username` = '".$_SESSION["p1"]."'";
	$sqlvidas = "SELECT vidas FROM `jugadores` WHERE `username` = '".$_SESSION["p1"]."'";
	$p1p = getPoints($sqlPlayer1);
    $p1vidas = getVidas($sqlvidas);


	function getPoints($sql){
		require './php_scripts/db.php';

		if ($result = $conn->query($sql)) {
		    
		    if($result->num_rows > 0){
				$row = $result->fetch_assoc();
				return $row["max_score"];
			}else{
				return false;
			}

		} else {
		    exit("Error de conexión");
		}
		$conn->close();	
	}

	function getVidas($sql){
		require './php_scripts/db.php';

		if ($result = $conn->query($sql)) {
		    
		    if($result->num_rows > 0){
				$row = $result->fetch_assoc();
				return $row["vidas"];
			}else{
				return false;
			}

		} else {
		    exit("Error de conexión");
		}
		$conn->close();	
	}


?>