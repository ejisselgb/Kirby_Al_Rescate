<?php

$server = "localhost";
	$user = "root";
	$pass = "";
	$db = "kirby_al_rescate";

	// Create connection
	$conn = new mysqli($server, $user, $pass, $db);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

	$current_date = date('Y-m-d H:i:s');