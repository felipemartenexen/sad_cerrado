<?php
// Parâmetros de conexão com o banco de dados
include "init.php";

try {

    // Conexão com o banco de dados usando o PDO
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname;port=$dbport", $dbusername, $dbpassword);
    
    // Recebe os inputs do formulário
    //$xmin = $_POST['xmin_input'];
    //$ymin = $_POST['ymin_input'];
    //$xmax = $_POST['xmax_input'];
    //$ymax = $_POST['ymax_input'];

    // Consulta SQL com parâmetros preparados  
    $sql = "select sum(area) as area, count(*), detect_dat, nm_mun, cod_mun, nm_uf, cod_uf,nm_uc, nm_ti, imovel, nm_comunid, nm_projeto, vegetation from alerta_v3
            group by detect_dat, nm_mun, cod_mun, nm_uf, cod_uf, nm_uc, nm_ti, imovel, nm_comunid, nm_projeto, vegetation
            order by nm_mun, detect_dat";
            
    $stmt = $pdo->prepare($sql);

    // Executa a consulta
    $stmt->execute();
    
    // Obtém os resultados da consulta
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Retorna os resultados como JSON
    header('Content-Type: application/json');
    echo json_encode($results);

} catch (PDOException $e) {
    // Trata erros de conexão ou consulta
    echo 'Erro: ' . $e->getMessage();

}
?>
