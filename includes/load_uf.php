<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);
include "init.php" ;
header("Access-Control-Allow-Origin: *");

$geojson = array(
);

try {
	$dsn = "pgsql:host=$host;dbname=$dbname;port=$dbport";
	$opt = [
		PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
		PDO::ATTR_EMULATE_PREPARES   => false
	];
	$dbcon = new PDO("pgsql:host=$host;port=$dbport;dbname=$dbname;user=$dbusername;password=$dbpassword");
	$stmt = $dbcon->prepare("select nm_uf, sum(round(area/10000)) from alerta group by nm_uf order by sum desc");
	
	if($stmt->execute()){
		$id_count = 0;
		while($rowset = $stmt->fetch(PDO::FETCH_ASSOC)){
			$properties = $rowset;
			unset($properties['geojson']);		
				$feature =  $properties;						
			array_push($geojson, $feature);
			$id_count++;
		}
		header('Content-Type: application/json');
		echo json_encode($geojson, JSON_NUMERIC_CHECK);
		$dbcon = null;
		exit;
	} else {
		header('Content-Type: application/json');
		echo json_encode($geojson, JSON_NUMERIC_CHECK);
		$dbcon = null;
		exit;
	}
} catch (PDOException $e) {
	header('Content-Type: application/json');
	echo json_encode($geojson, JSON_NUMERIC_CHECK);
	$dbcon = null;
	exit;
}
?>