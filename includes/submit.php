<?php
// Parâmetros de conexão com o banco de dados
include "init.php";

try {

    // Conexão com o banco de dados usando o PDO
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname;port=$dbport", $dbusername, $dbpassword);
    
    // Consulta SQL com parâmetros preparados  
    $sql = "SELECT 
                SUM(area) AS area,
                COUNT(*) AS count,
                detect_dat,
                nm_mun,
                cod_mun,
                nm_uf,
                cod_uf,
                nm_uc,
                nm_ti,
                imovel,
                nm_comunid,
                nm_projeto,
                vegetation,
                CASE 
                    WHEN area < 30000 THEN 'menor3ha'
                    WHEN area BETWEEN 30000 AND 50000 THEN '3a5ha'
                    WHEN area BETWEEN 50000 AND 100000 THEN '5a10ha'
                    WHEN area BETWEEN 100000 AND 500000 THEN '10a50ha'
                    WHEN area > 500000 THEN 'maior50ha'
                    ELSE 'Other' -- Handle any other cases as needed
                END AS size_category
            FROM alerta_v3
            GROUP BY 
                detect_dat,
                nm_mun,
                cod_mun,
                nm_uf,
                cod_uf,
                nm_uc,
                nm_ti,
                imovel,
                nm_comunid,
                nm_projeto,
                vegetation,
                area
                
            ORDER BY nm_mun, detect_dat;
            ";
            
    $stmt = $pdo->prepare($sql);

    // Executa a consultas
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
