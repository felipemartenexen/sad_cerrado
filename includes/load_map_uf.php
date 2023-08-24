<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);
include "init.php" ;
header("Access-Control-Allow-Origin: *");

$geojson = array(
	 'type'      => 'FeatureCollection',
	 'features'  => array()
);

try {
	$dsn = "pgsql:host=$host;dbname=$dbname;port=$dbport";
	$opt = [
		PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
		PDO::ATTR_EMULATE_PREPARES   => false
	];
	$dbcon = new PDO("pgsql:host=$host;port=$dbport;dbname=$dbname;user=$dbusername;password=$dbpassword");
	$stmt = $dbcon->prepare("SELECT *,public.ST_AsGeoJSON(geom) AS geojson FROM cerrado_uf_simple");
	
	if($stmt->execute()){
		$id_count = 0;
		while($rowset = $stmt->fetch(PDO::FETCH_ASSOC)){
			$properties = $rowset;
			unset($properties['geojson']);
			unset($properties['geom']);
				$feature = array(
						 'type' => 'Feature',
						 //'id' => $id_count,
						 'properties' => $properties,
						 'geometry' => json_decode($rowset['geojson'], true)
				);
			array_push($geojson['features'], $feature);
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