
<?php

require_once("init.php");

if(!empty($_GET['cod_uf'])) {
    $coun_id = $_GET["cod_uf"];           
	$query ="SELECT cod_mun, nm_uf, mn_mun FROM alerta WHERE cod_uf IN (11,51) GROUP BY cod_mun, nm_uf, mn_mun ORDER BY mn_mun, nm_uf";
	$results = runQuery($pdo, $query);
?>	
<?php
	foreach($results as $state) {
?>
	<option value="<?php echo $state["cod_mun"]; ?>" selected><?php echo $state["mn_mun"]; ?></option>
<?php
	}
}
?>