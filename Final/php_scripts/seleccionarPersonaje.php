<?php
	$ruta = $_POST["personaje"];
	$player = $_POST["player"];
	$textura = $_POST["t"];

	require "Session.php";
	initSesion();
	saveModel($player,$ruta,$textura);

?>