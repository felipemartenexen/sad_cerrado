<div class="row">
    <div class="col-md-12">
        <form method="post" class="card">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Filtrar Dados</div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-2">
                            <div class="form-group">
                            <form  id="filter" name="filter" class="form" method="POST" role="form" action="includes/submit.php">  
                                <label class="form-label">Estado</label>
                                <select id="input_uf" name="input_uf[]" multiple="multiple" class="multi-select" onChange="getState();">
                                <?php
                                    foreach ($stateResult as $state) {
                                        ?>
                                            <option value="<?php echo $state["cod_uf"]; ?>" selected><?php echo $state["nm_uf"]; ?></option>
                                            <?php
                                    }
                                ?>  
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-2"> 
                            <div class="form-group">
                                <label class="form-label">Município</label>
                                    <select id="input_mun" name="input_mun[]" multiple="multiple" class="multi-select">  
                                                                             
                                    </select>
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="form-group">
                                <label class="form-label">Recorte Fundiário</label>
                                <select id="input_cat" multiple="multiple" class="multi-select">
                                    <option value="29" selected>Assentamento</option>
                                    <option value="53" selected>CAR Privado</option>
                                    <option value="52" selected>Território Indígena</option>
                                    <option value="21" selected>Território Quilombola</option>
                                    <option value="51" selected>Unidade de Conservação</option>
                                    <option value="50" selected>Vazio Fundiário</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-2">
                            <div class="form-group">
                                <label class="form-label">Data Início</label>
                                <div class="input-group">                                                                                
                                    <input id="input_data_inicial" class="form-control" type="month" value="2022-01" min="2022-01" max="2023-01">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-2">
                            <div class="form-group">
                                <label class="form-label">Data Fim</label>
                                <div class="input-group">                                                                                
                                    <input id="input_data_final" class="form-control" type="month" value="2023-01" min="2022-01" max="2023-01">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-1">
                            <div class="form-group">
                                <div class="input-group">                                                                                
                                    <button id='atualizar' type="submit" class="btn btn-primary mt-1 mb-1"> <i class="fa fa-search"></i> <span>Buscar</span></button>
                                </div>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>