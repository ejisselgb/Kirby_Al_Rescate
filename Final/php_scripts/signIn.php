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
				echo "<div>".$row["username"]." ¡Vamos a salvar el mundo de Kirby!, actualmente tienes ".$row["max_score"]."k de oro y ".$row["vidas"]." puntos</div>";
				echo "<div>Vamos a ver los atuendos disponibles para kirby</div>";
				echo "<div>
						
						<a href='../tienda.php'> ¡Ir a la tienda!</a>
				</div>";
			}
		}else{

			echo "El jugador no existe o es invalido, registrate y ayuda a kirby a salvar su mundo.";
		    echo "<div>
						<a href='../index.html'>Volver!</a>
				</div>";

		}

	} else {
	    echo "Error en Conn";
	}

	$conn->close();
?>