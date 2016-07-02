<?php
	
	require_once './db.php';
	require_once './Session.php';

	$username = $_POST["username"];
	$password = $_POST["password"];

	$sql = "SELECT * FROM `jugadores` WHERE `username` = '".$username."' AND `password` = '".$password."'";

	
	if ($result = $conn->query($sql)) {
	    
	    if($result->num_rows > 0){
			while ($row = $result->fetch_assoc()) {
				initSesion();
				crearSesion($username,"Maquina");
				echo "<div>".$row["username"]." ¡Vamos a salvar el mundo de Kirby!, actualmente tienes ".$row["max_score"]." de oro y ".$row["vidas"]." puntos</div>";
				echo "<div>
						<a href='../index2.php'>¡Vamos al Mundo de Kirby!</a>
						<a href='../tienda.php'> ¡Ir a la tienda!</a>
				</div>";
			}
		}else{

			echo "Usuario no existe";
		    echo "<div>
						<a href='../index.html'>Volver!</a>
				</div>";

		}

	} else {
	    echo "Error en Conn";
	}

	$conn->close();
?>