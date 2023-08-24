<div class="row">
    <div class="col-md-12">
        <form id="filter" name="filter" class="form" method="POST" role="form" action="includes/submit.php">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Filtrar Dados</div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-2">
                            <div class="form-group">
                                <label class="form-label">Estado</label>
                                <select id="input_uf" name="input_uf[]" multiple="multiple" class="multi-select">
                                    <option value="29" selected>Bahia</option>
                                    <option value="53" selected>Distrito Federal</option>
                                    <option value="17" selected>Goiás</option>
                                    <option value="21" selected>Maranhão</option>
                                    <option value="51" selected>Mato Grosso</option>
                                    <option value="50" selected>Mato Grosso do Sul</option>
                                    <option value="31" selected>Minas Gerais</option>
                                    <option value="15" selected>Pará</option>
                                    <option value="41" selected>Paraná</option>
                                    <option value="22" selected>Piauí</option>
                                    <option value="11" selected>Rondônia</option>
                                    <option value="35" selected>São Paulo</option>
                                    <option value="17" selected>Tocantins</option>
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
                                <select id="input_territory" multiple="multiple" class="multi-select">
                                    <option value="assentamento" selected>Assentamento</option>
                                    <option value="car_privado" selected>CAR Privado</option>
                                    <option value="ti" selected>Território Indígena</option>
                                    <option value="quilombola" selected>Território Quilombola</option>
                                    <option value="uc" selected>Unidade de Conservação</option>
                                    <option value="vazio" selected>Vazio Fundiário</option>
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
                                    <input id="input_data_final" class="form-control" type="month" value="2023-01" min="2022-01" max="2023-08">
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