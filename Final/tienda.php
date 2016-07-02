<?php 
	require_once './php_scripts/Session.php';
	initSesion();
	if( !isset($_SESSION["p1"])){ 
		header("location: ./index.html");
	}
?>

<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="initial-scale=1, maximum-scale=1, width=device-width"><!--, user-scalable=no">-->
	<title>Tienda de Kirby</title>

	<link rel="stylesheet" type="text/css" href="./css/form.css">

	<!--[if lt IE 9]>
 	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
 	<![endif]-->

 	<script src="./../../Libraries/Jquery/jquery-2.1.4.min.js"></script>
</head>
<body>
	<style>
		.green{
			background-color: green;
			color: white;
		}
	</style>
	
	<div id="globalWrapper">
				<h1>Trajes de Kirby</h1>
				<?php
					require_once './php_scripts/loadPoints.php';
					echo "<div>Tu Oro ".$p1p."K</div>";
				?>
				<?php
					require "./php_scripts/db.php";

					$sql = "SELECT * FROM `personajes`";

					
					if ($result = $conn->query($sql)) {
					    
					    echo "<table border='1'>";
					    echo "<tr>
									<td>Modelo</td>
									<td>Nombre</td>
									<td>Costo del traje</td>
									<td>Estado P1</td>
									<td>J1</td>
					    		</tr>";


					    if($_SESSION["p1Model"] == ""){
								$estado1 = "<span class='green'>Seleccionado</span>";
							}else{
								$estado1 = "No seleccionado";
							}

					    	
					    while ($row = $result->fetch_assoc()) {
					    	echo "<tr>
					    			<td>
										<iframe scrolling='no' width='100' src='".$row['sample']."'></iframe>
					    			</td>
									<td>".$row['nombre']."</td>
									<td>".$row['score_to_play']."</td>";

							if($_SESSION["p1Model"] == $row["ruta"]){
								$estado1 = "<span class='green'>Seleccionado</span>";
							}else{
								$estado1 = "No seleccionado";
							}
									echo "<td>".$estado1."</td>";
									

							if($p1p >= $row['score_to_play']){
								echo "<td><button onclick='selectMe(\"".$row["ruta"]."\",\"p1\",\"".$row["textura"]."\")'>Usar Traje<button></td>";
							}else{
								echo "<td><button disabled >Usar Traje<button></td>";
							}
					    }
					    echo "</table>";

					} else {
					    echo "<span class='valid'>Error de comunicación, intente mas tarde</span>";
					}

					$conn->close();
				?>
				<a href="index2.php">
					<button>Empezar</button>
				</a>
				
	</div>

	<script>
		function selectMe(ruta,player,t){

		$.ajax({
					url:"./php_scripts/seleccionarPersonaje.php",
					method:"POST",
					data:{
						personaje: ruta,
						player: player,
						t:t
					}
				}).done(function(r){
					location.reload();
				});
		}
	</script>
</body>
</html>











