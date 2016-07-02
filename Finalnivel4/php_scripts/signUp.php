<?php
	
	require_once './db.php';
	require_once 'Session.php';

	$username = $_POST["username"];
	$password = $_POST["password"];

	$sql = "INSERT INTO `jugadores` (`id`, `username`, `password`, `max_score`, `fecha`) VALUES (NULL, '".$username."', '".$password."', '0', NULL);";

	
	if ($conn->query($sql) === TRUE) {
		$respuesta = array('estado' => 1,'mensaje'=> "Usuario registrado!");
			echo json_encode($respuesta);
		initSesion();
		crearSesion($username,"Maquina");
	} else {
		$respuesta = array('estado' => 1,'mensaje'=> "Error en el registro: " . $conn->error);
			echo json_encode($respuesta);
	}

	$conn->close();
?>