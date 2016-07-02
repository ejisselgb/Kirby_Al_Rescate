<?php
	
	require_once './db.php';

	$sql = "UPDATE jugadores SET  max_score='".$_POST["puntos"]."', vidas ='".$_POST["vidas"]."',fecha='".$current_date."' WHERE username='".$_POST["player"]."'";

	if ($conn->query($sql) === TRUE) {
	    echo "Record updated successfully";
	} else {
	    echo "Error updating record: " . $conn->error;
	}

	$conn->close();
?>