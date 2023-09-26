<div class="row">
    <div class="col-lg-12 col-md-12">
        <div class="card">
        <div class="card-header">
            <h3 class="card-title">Comparação Mensal e Anual</h3>
            <div class="card-options"> <a onclick='comparacao_civil()' class="btn btn-primary btn-sm">Ano Civil</a> <a onclick='comparacao_agricola()' class="btn btn-primary btn-sm ms-2">Ano Agrícola</a> </div>
        </div>
        <div class="card-body">
            <div class="chart-container">
                <canvas id="compare" class="h-375" width="644" height="375" style="display: block; box-sizing: border-box; height: 375px; width: 644px;"></canvas>
            </div>
        </div>  
        </div>
    </div>
    <div class="col-lg-6 col-md-12">
        <div class="card">
        <div class="card-header">
            <h3 class="card-title">Ranking por Estados</h3>
        </div>
        <div class="card-body">
            <div class="chart-container">
                <canvas id="ranking_uf" class="h-475" width="644" height="475" style="display: block; box-sizing: border-box; height: 475px; width: 644px;"></canvas>
            </div>
        </div>
        </div>
    </div>
    <div class="col-lg-6 col-md-12">
        <div class="card">
        <div class="card-header">
            <h3 class="card-title">Ranking por Município</h3>
        </div>
        <div class="card-body">
            <div class="chart-container">
                <canvas id="ranking_mun" class="h-475" width="644" height="475" style="display: block; box-sizing: border-box; height: 475px; width: 644px;"></canvas>
            </div>
        </div>
        </div>
    </div>
    <div class="col-lg-4 col-md-12">
        <div class="card">
        <div class="card-header">
            <h3 class="card-title">Tipos de Usos e Cobertura Afetados</h3>
        </div>
        <div class="card-body">
            <div class="chart-container">
                <canvas id="ranking_class" class="h-375" width="644" height="375" style="display: block; box-sizing: border-box; height: 375px; width: 644px;"></canvas>
            </div>
            <div id="legend"></div>
        </div>
        </div>
    </div>
    <div class="col-lg-4 col-md-12">
        <div class="card">
        <div class="card-header">
            <h3 class="card-title">Área por Recorte Fundiário</h3>
        </div>
        <div class="card-body">
            <div class="chart-container">
                <canvas id="ranking_fundiario" class="h-375" width="644" height="375" style="display: block; box-sizing: border-box; height: 375px; width: 644px;"></canvas>
            </div>
        </div>
        </div>
    </div>
    <div class="col-lg-4 col-md-12">
        <div class="card">
        <div class="card-header">
            <h3 class="card-title">Área por Tamanho do Alerta</h3>
        </div>
        <div class="card-body">
            <div class="chart-container">
                <canvas id="ranking_size" class="h-375" width="644" height="375" style="display: block; box-sizing: border-box; height: 375px; width: 644px;"></canvas>
            </div>
        </div>
        </div>
    </div>
    <div class="col-lg-12">
        <div class="card mg-b-20" id="map">
        <div class="card-header">
            <div class="card-title">Mapa</div>
            <div class="card-options"><a onclick='comparacao_mun()' class="btn btn-primary btn-sm ms-2">Municípios</a> </div>
        </div>
        <div class="card-body">
            <div class="ht-500" id="leaflet1" style="height:500px"></div>
        </div>
        </div>
    </div>
</div>