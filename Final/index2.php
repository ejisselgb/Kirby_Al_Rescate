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
	<title>Plataformas</title>

	<link rel="stylesheet" type="text/css" href="./css/style.css">

	<!--[if lt IE 9]>
 	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
 	<![endif]-->

 	<script src="./../../Libraries/Jquery/jquery-2.1.4.min.js"></script>
 	<script src="./../../Libraries/ThreeJS-r71/build/three.min.js"></script>
 	<script src="./../../Libraries/ThreeJSLibs/OrbitControls.js"></script>
 	<script src="./../../Libraries/ThreeJSLibs/DAT.GUI.min.js"></script>
 	<script src="./../../Libraries/ThreeJSLibs/Stats.js"></script>
 	<script src="./../../Libraries/ThreeJSLibs/threex.dynamictexture.js"></script>
 	<script src="./../../Libraries/ThreeJS-r71/examples/js/loaders/DDSLoader.js"></script>
 	<script src="./../../Libraries/ThreeJS-r71/examples/js/loaders/MTLLoader.js"></script>
 	<script src="./../../Libraries/ThreeJS-r71/examples/js/loaders/OBJMTLLoader.js"></script>
 	
 	<script src="./src/ObjectLoader.js"></script>
	<script src="./src/KeyEvents.js"></script>
 	<script src="./src/utils.js"></script>
 	<script src="./src/Sound.js"></script>
 	<script src="./src/Jugador.js"></script>
 	<script src="./src/Colisiones.js"></script>
 	<script src="./src/app.js"></script>
</head>
<body>
	<input type="hidden" id="p1" value="<?php echo $_SESSION['p1']; ?>">
	<input type="hidden" id="modelP1" value="<?php echo $_SESSION['p1Model']; ?>">
	<input type="hidden" id="textureP1" value="<?php echo $_SESSION['p1Texture']; ?>">
	<?php
		require './php_scripts/loadPoints.php';
	?>
	<input type="hidden" id="p1p" value="<?php echo $p1p; ?>">
	<input type="hidden" id="p1v" value="<?php echo $p1vidas; ?>">
	<div id="loadingScreen">
		<div id="loadingProgress">0%</div>
	</div>
	<canvas id="app"></canvas>
	<div id="MyGUI">
		<span id="tiempo">Tiempo: 0</span>
		<br></br>
		
	</div>
	<script>
	//Cuándo todo el código cargue, ejecuto este bloque.
		$(function(){
			webGLStart();
		});
	</script>
</body>
</html>