<?php
	
	require_once './db.php';

	$nombreP1 = $_POST["nombreP1"];
	$puntosP1 = $_POST["puntosP1"];

	$nombreP2 = $_POST["nombreP2"];
	$puntosP2 = $_POST["puntosP2"];

	$sqlP1 = "UPDATE jugadores SET max_score='".$puntosP1."', fecha='".$current_date."' WHERE username='".$nombreP1."'";

	$sqlP2 = "UPDATE jugadores SET max_score='".$puntosP2."', fecha='".$current_date."' WHERE username='".$nombreP2."'";

	if ($conn->query($sqlP1) === TRUE && $conn->query($sqlP2) === TRUE) {
	    echo "Record updated successfully";
	} else {
	    echo "Error updating record: " . $conn->error;
	}

	$conn->close();

	require_once 'Session.php';
	destruirSesion();
?>