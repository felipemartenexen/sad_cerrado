// Declare global variables
var data;
var uf;
var mun;
var territory;
var from_date;
var to_date;

// Function to extract input values and store them in global variables
function sendInfo() {
    from_date = $('#input_data_inicial').val();
    to_date = $('#input_data_final').val();
    uf = $('#input_uf').val();
    mun = $('#input_mun').val();
    territory = $('#input_territorio').val();
}

// Function to submit a form using POST request and handle the response
function submitFormWithPost(formSelector, successCallback) {
    var $form = $(formSelector);

    $form.submit(function (event) {
        event.preventDefault(); // Prevent the default form submission and page refresh

        $.post($(this).attr('action'), $(this).serialize(), function (response) {
            // Parse the JSON response received from the server
            if (successCallback) {
                successCallback(response);
            }
        }, 'json');
    });
}

// Submit the form with the id 'filter' and handle the response
submitFormWithPost('#filter', function (response) {
    console.log('Success!', response);

    // Convert values in the 'response' to numbers for specific properties
    data = converterValoresParaNumero(response, ['area']);

    // Extract input values and store them
    sendInfo();

    // Apply filters to the data based on input values
    data = applyMultiFilter(data, uf, mun, from_date, to_date, territory);

    // Uncomment the line below to view the filtered data
    // console.log(data);

    // Update the information on the webpage
    updateInfo();
});

// Run the form submission when the document is ready
$(document).ready(function () {
    var $form = $('#filter');
    $form.submit();
});

// Function to convert values of specific properties to numbers in an array of objects
function converterValoresParaNumero(array, propriedades) {
    return array.map(objeto => {
        const newObjeto = { ...objeto };
        for (const propriedade of propriedades) {
            newObjeto[propriedade] = Number(objeto[propriedade]);
        }
        return newObjeto;
    });
}

// Function to filter data based on multiple criteria
function applyMultiFilter(jsonData, codUfValues, codMunValues, from, to) {
    return jsonData.filter(item => {
        const isCodUfValid = codUfValues.includes(item.cod_uf);
        const isCodMunValid = codMunValues.includes(item.cod_mun);
        const isDetectDateValid = item.detect_dat >= from && item.detect_dat <= to;

        return isCodUfValid && isCodMunValid && isDetectDateValid;
    });
}

// Function to sum the values of a specific property in an array of objects
function somarValores(array, propriedade) {
    return array.reduce((total, objeto) => total + objeto[propriedade], 0);
}

// Function to update information on the webpage
function updateInfo() {
    // Calculate and display total area
    var areaTotal = somarValores(data, 'area');
    areaTotal = areaTotal / 10000;
    document.getElementById('area_alertas').innerHTML = areaTotal.toLocaleString();

    // Calculate and display total number of alerts
    var qtd_alertas = somarValores(data, 'count');
    document.getElementById('qtd_alertas').innerHTML = qtd_alertas.toLocaleString();

    // Calculate and display average number of alerts per unit area
    var media_alertas = areaTotal / qtd_alertas;
    document.getElementById('media_alertas').innerHTML = media_alertas.toLocaleString();

    // Call additional functions to update specific sections on the webpage
    comparacao_civil();
    rankingUF();
    rankingMun();
    rankingVegetation();
    rankingFundiario();
    rankingSize();
    comparacao_mun();
}


// Função para calcular a soma da propriedade 'area' com base no filtro 'month'
function calcularSomaPorMes(array, date) {
  const soma = array
    .filter(objeto => objeto.detect_dat === date)
    .reduce((total, objeto) => total + objeto.area, 0);
  return soma/10000;
}

// Função para calcular a soma da propriedade 'area' por 'uf' e ordenar de forma decrescente
function calcularSomaEOrdenarPorUf(array) {
  const somaPorCodUf = {};

  // Calcular a soma da propriedade 'area' por 'cod_mun'
  array.forEach(objeto => {
    const valorArea = isNaN(objeto.area) ? 0 : parseFloat(objeto.area);
    if (!somaPorCodUf[objeto.cod_uf]) {
      somaPorCodUf[objeto.cod_uf] = {
         cod_uf: objeto.cod_uf,
        nm_uf: objeto.nm_uf,
        soma: 0
      };
    }
    somaPorCodUf[objeto.cod_uf].soma += valorArea;
  });

  // Converter o resultado em um array de objetos { nm_mun, soma }
  const resultados = Object.values(somaPorCodUf).map(({ cod_uf, nm_uf, soma }) => ({
   cod_uf,
   nm_uf,
   soma: soma / 10000
  }));

  // Ordenar de forma decrescente com base na soma
  resultados.sort((a, b) => b.soma - a.soma);

  return resultados;

}

function calcularSomaEOrdenarPorMun(array) {
  const somaPorCodMun = {};
  // Calcular a soma da propriedade 'area' por 'cod_mun'
  array.forEach(objeto => {
    const valorArea = isNaN(objeto.area) ? 0 : parseFloat(objeto.area);
    if (!somaPorCodMun[objeto.cod_mun]) {
      somaPorCodMun[objeto.cod_mun] = {
        cod_mun: objeto.cod_mun,
        nm_mun: objeto.nm_mun,
        soma: 0
      };
    }
    somaPorCodMun[objeto.cod_mun].soma += valorArea;
  });

  // Converter o resultado em um array de objetos { nm_mun, soma }
  const resultados = Object.values(somaPorCodMun).map(({ cod_mun, nm_mun, soma }) => ({
   cod_mun,
   nm_mun,
   soma: soma / 10000
  }));

  // Ordenar de forma decrescente com base na soma
  resultados.sort((a, b) => b.soma - a.soma);

  return resultados;

}

function calcularSomaEOrdenarPorVeg(array) {
  const vegetationMapping = {
    2: 'Savanna',
    1: 'Campo',
    3: 'Floresta',
    4: 'Mata Seca',
    // Add more mappings as needed
  };

  const somaPorVeg = {};

  // Calcular a soma da propriedade 'area' por 'vegetation'
  array.forEach(objeto => {
    const valorArea = isNaN(objeto.area) ? 0 : parseFloat(objeto.area);
    const mappedVegetation = vegetationMapping[objeto.vegetation] || 'unknown';

    if (!somaPorVeg[mappedVegetation]) {
      somaPorVeg[mappedVegetation] = 0;
    }
    somaPorVeg[mappedVegetation] += valorArea;
  });

  // Converter o resultado em um único objeto { vegetation, soma }
  const resultado = Object.keys(somaPorVeg).reduce((acc, vegetation) => {
    acc[vegetation] = somaPorVeg[vegetation] / 10000;
    return acc;
  }, {});

  return resultado;
}

function calcularSomaEOrdenarPorFundiario(dataArray) {
  const result = {};

  for (const item of dataArray) {
    const { nm_projeto, nm_ti, nm_uc, imovel, nm_comunid, vazio, area } = item;

    if (nm_projeto !== null) {
      result['nm_projeto'] = (result['nm_projeto'] || 0) + (area / 10000);
    }

    if (nm_ti !== null) {
      result['nm_ti'] = (result['nm_ti'] || 0) + (area / 10000);
    }

    if (nm_uc !== null) {
      result['nm_uc'] = (result['nm_uc'] || 0) + (area / 10000);
    }

    if (imovel !== null) {
      result['imovel'] = (result['imovel'] || 0) + (area / 10000);
    }

    if (nm_comunid !== null) {
      result['nm_comunid'] = (result['nm_comunid'] || 0) + (area / 10000);
    }

    if (nm_projeto == null && nm_ti == null && nm_uc == null && imovel == null && nm_comunid == null) {
      result['vazio'] = (result['vazio'] || 0) + (area / 10000);
    }

  }

  return result;
}

function calcularSomaEOrdenarPorTamanho(data) {
  // Create an object to store the sums for each size category
  const sumsBySizeCategory = {};

  // Iterate through the data array
  data.forEach((item) => {
    const { size_category, area } = item;

    // If the size_category doesn't exist in sumsBySizeCategory, initialize it with 0
    if (!sumsBySizeCategory[size_category]) {
      sumsBySizeCategory[size_category] = 0;
    }

    // Add the area value to the sum for the corresponding size category
    sumsBySizeCategory[size_category] += area;
  });

  // Divide the summed areas by 10,000
  for (const sizeCategory in sumsBySizeCategory) {
    sumsBySizeCategory[sizeCategory] /= 10000;
  }

  return sumsBySizeCategory;
}

function getElementAtIndexOrZero(array, index) {
  if (index < array.length) {
    return array[index];
  } else {
    return '0';
  }
}

function comparacao_civil(){   

   var ctxCivil = document.getElementById("compare").getContext('2d');
   var config_radar_diagCivil = {
      type: 'bar',
      data: {
         labels: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
         datasets: [{
               label: "Área ha - 2022",
               data: [                    
                  calcularSomaPorMes(data, '2022-01'),
                  calcularSomaPorMes(data, '2022-02'),
                  calcularSomaPorMes(data, '2022-03'),
                  calcularSomaPorMes(data, '2022-04'),
                  calcularSomaPorMes(data, '2022-05'),
                  calcularSomaPorMes(data, '2022-06'),
                  calcularSomaPorMes(data, '2022-07'),
                  calcularSomaPorMes(data, '2022-08'),
                  calcularSomaPorMes(data, '2022-09'),
                  calcularSomaPorMes(data, '2022-10'),
                  calcularSomaPorMes(data, '2022-11'),
                  calcularSomaPorMes(data, '2022-12')                  
               ],
               borderColor: "#E44D59",
               borderWidth: "0",
               backgroundColor: "#E44D59"
         }, {
               label: "Área ha - 2023",
               data: [
                  calcularSomaPorMes(data, '2023-01'),
                  calcularSomaPorMes(data, '2023-02'),
                  calcularSomaPorMes(data, '2023-03'),
                  calcularSomaPorMes(data, '2023-04'),
                  calcularSomaPorMes(data, '2023-05'),
                  calcularSomaPorMes(data, '2023-06'),
                  calcularSomaPorMes(data, '2023-07'),
                  calcularSomaPorMes(data, '2023-08'),
                  calcularSomaPorMes(data, '2023-09'),
                  calcularSomaPorMes(data, '2023-10'),
                  calcularSomaPorMes(data, '2023-11'),
                  calcularSomaPorMes(data, '2023-12')           
               ],
               borderColor: "#72262C",
               borderWidth: "0",
               backgroundColor: "#72262C"
         }]
      },
      options: {
         responsive: true,
         maintainAspectRatio: false,
         scales: {
               x: {
                  barPercentage: 0.4,
                  barValueSpacing: 0,
                  barDatasetSpacing: 0,
                  barRadius: 0,
                  ticks: {
                     color: "#9ba6b5",
                  },
                  grid: {
                     color: 'rgba(119, 119, 142, 0.2)'
                  }
               },
               y: {
                  ticks: {
                     beginAtZero: true,
                     color: "#9ba6b5",
                  },
                  grid: {
                     color: 'rgba(119, 119, 142, 0.2)'
                  },
               }
         },
         legend: {
               labels: {
                  color: "#9ba6b5"
               },
         },
      }
   };

   if(window.bar_1 != undefined) 
   window.bar_1.destroy(); 
   window.bar_1 = new Chart(ctxCivil, config_radar_diagCivil);
}

function comparacao_agricola(){   

   var ctxAgricola = document.getElementById("compare").getContext('2d');
   var config_radar_diagAgricola = {
      type: 'bar',
      data: {
         labels: [ "Ago", "Set", "Out", "Nov", "Dez", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul"],
         datasets: [{
               label: "Área ha - 2022",
               data: [                   
                  calcularSomaPorMes(data, '2022-08'),
                  calcularSomaPorMes(data, '2022-09'),
                  calcularSomaPorMes(data, '2022-10'),
                  calcularSomaPorMes(data, '2022-11'),
                  calcularSomaPorMes(data, '2022-12'),
                  calcularSomaPorMes(data, '2022-01'),
                  calcularSomaPorMes(data, '2022-02'),
                  calcularSomaPorMes(data, '2022-03'),
                  calcularSomaPorMes(data, '2022-04'),
                  calcularSomaPorMes(data, '2022-05'),
                  calcularSomaPorMes(data, '2022-06'),
                  calcularSomaPorMes(data, '2022-07')                
               ],
               borderColor: "#E44D59",
               borderWidth: "0",
               backgroundColor: "#E44D59"
         }, {
               label: "Área ha - 2023",
               data: [
                  calcularSomaPorMes(data, '2023-08'),
                  calcularSomaPorMes(data, '2023-09'),
                  calcularSomaPorMes(data, '2023-10'),
                  calcularSomaPorMes(data, '2023-11'),
                  calcularSomaPorMes(data, '2023-12'),
                  calcularSomaPorMes(data, '2023-01'),
                  calcularSomaPorMes(data, '2023-02'),
                  calcularSomaPorMes(data, '2023-03'),
                  calcularSomaPorMes(data, '2023-04'),
                  calcularSomaPorMes(data, '2023-05'),
                  calcularSomaPorMes(data, '2023-06'),
                  calcularSomaPorMes(data, '2023-07')     
               ],
               borderColor: "#72262C",
               borderWidth: "0",
               backgroundColor: "#72262C"
         }]
      },
      options: {
         responsive: true,
         maintainAspectRatio: false,
         scales: {
               x: {
                  barPercentage: 0.4,
                  barValueSpacing: 0,
                  barDatasetSpacing: 0,
                  barRadius: 0,
                  ticks: {
                     color: "#9ba6b5",
                  },
                  grid: {
                     color: 'rgba(119, 119, 142, 0.2)'
                  }
               },
               y: {
                  ticks: {
                     beginAtZero: true,
                     color: "#9ba6b5",
                  },
                  grid: {
                     color: 'rgba(119, 119, 142, 0.2)'
                  },
               }
         },
         legend: {
               labels: {
                  color: "#9ba6b5"
               },
         },
      }
   };

   if(window.bar_1 != undefined) 
   window.bar_1.destroy(); 
   window.bar_1 = new Chart(ctxAgricola, config_radar_diagAgricola);
}

function rankingUF(){

   var ctx_uf = document.getElementById("ranking_uf").getContext('2d');
   var conf_ranking_uf = {
      type: 'bar',
      data: {
         labels: [
               getElementAtIndexOrZero(calcularSomaEOrdenarPorUf(data),0).nm_uf,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorUf(data),1).nm_uf,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorUf(data),2).nm_uf,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorUf(data),3).nm_uf,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorUf(data),4).nm_uf,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorUf(data),5).nm_uf,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorUf(data),6).nm_uf,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorUf(data),7).nm_uf,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorUf(data),8).nm_uf,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorUf(data),9).nm_uf,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorUf(data),10).nm_uf,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorUf(data),11).nm_uf
         ],
         datasets: [{
               label: 'Área - ha',
               data: [
                  getElementAtIndexOrZero(calcularSomaEOrdenarPorUf(data),0).soma,
                  getElementAtIndexOrZero(calcularSomaEOrdenarPorUf(data),1).soma,
                  getElementAtIndexOrZero(calcularSomaEOrdenarPorUf(data),2).soma,
                  getElementAtIndexOrZero(calcularSomaEOrdenarPorUf(data),3).soma,
                  getElementAtIndexOrZero(calcularSomaEOrdenarPorUf(data),4).soma,
                  getElementAtIndexOrZero(calcularSomaEOrdenarPorUf(data),5).soma,
                  getElementAtIndexOrZero(calcularSomaEOrdenarPorUf(data),6).soma,
                  getElementAtIndexOrZero(calcularSomaEOrdenarPorUf(data),7).soma,
                  getElementAtIndexOrZero(calcularSomaEOrdenarPorUf(data),8).soma,
                  getElementAtIndexOrZero(calcularSomaEOrdenarPorUf(data),9).soma,
                  getElementAtIndexOrZero(calcularSomaEOrdenarPorUf(data),10).soma,
                  getElementAtIndexOrZero(calcularSomaEOrdenarPorUf(data),11).soma
               ],
               borderWidth: 2,
               backgroundColor: '#e44d59',
               borderColor: '#e44d59',
               borderWidth: 0.0,
               pointBackgroundColor: '#ffffff'
         }]
      },
      options: {
         indexAxis: 'y',
         responsive: true,
         maintainAspectRatio: false,
         legend: {
               display: true
         },
         scales: {
               y: {
                  ticks: {
                     beginAtZero: true,
                     stepSize: 150,
                     color: "#9ba6b5",
                  },
                  grid: {
                     color: 'rgba(119, 119, 142, 0.2)'
                  }
               },
               x: {
                  barPercentage: 0.4,
                  barValueSpacing: 0,
                  barDatasetSpacing: 0,
                  barRadius: 0,
                  ticks: {
                     display: true,
                     color: "#9ba6b5",
                  },
                  grid: {
                     display: false,
                     color: 'rgba(119, 119, 142, 0.2)'
                  }
               }
         },
         legend: {
               labels: {
                  fontColor: "#9ba6b5"
               },
         },
      }
   }

   //var chart_ranking_uf = new Chart(ctx_uf, conf_ranking_uf);

   if(window.bar_2 != undefined) 
   window.bar_2.destroy(); 
   window.bar_2 = new Chart(ctx_uf, conf_ranking_uf);
}

function rankingMun(){

   var ctx_mun = document.getElementById("ranking_mun").getContext('2d');
   var conf_ranking_mun = {
      type: 'bar',
      data: {
         labels: [
               getElementAtIndexOrZero(calcularSomaEOrdenarPorMun(data),0).nm_mun,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorMun(data),1).nm_mun,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorMun(data),2).nm_mun,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorMun(data),3).nm_mun,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorMun(data),4).nm_mun,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorMun(data),5).nm_mun,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorMun(data),6).nm_mun,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorMun(data),7).nm_mun,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorMun(data),8).nm_mun,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorMun(data),9).nm_mun,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorMun(data),10).nm_mun,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorMun(data),11).nm_mun
         ],
         datasets: [{
               label: 'Área - ha',
               data: [
               getElementAtIndexOrZero(calcularSomaEOrdenarPorMun(data),0).soma,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorMun(data),1).soma,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorMun(data),2).soma,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorMun(data),3).soma,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorMun(data),4).soma,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorMun(data),5).soma,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorMun(data),6).soma,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorMun(data),7).soma,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorMun(data),8).soma,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorMun(data),9).soma,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorMun(data),10).soma,
               getElementAtIndexOrZero(calcularSomaEOrdenarPorMun(data),11).soma
               ],
               borderWidth: 2,
               backgroundColor: '#e44d59',
               borderColor: '#e44d59',
               borderWidth: 0.0,
               pointBackgroundColor: '#ffffff'
         }]
      },
      options: {
         indexAxis: 'y',
         responsive: true,
         maintainAspectRatio: false,
         legend: {
               display: true
         },
         scales: {
               y: {
                  ticks: {
                     beginAtZero: true,
                     stepSize: 150,
                     color: "#9ba6b5",
                  },
                  grid: {
                     color: 'rgba(119, 119, 142, 0.2)'
                  }
               },
               x: {
                  barPercentage: 0.4,
                  barValueSpacing: 0,
                  barDatasetSpacing: 0,
                  barRadius: 0,
                  ticks: {
                     display: true,
                     color: "#9ba6b5",
                  },
                  grid: {
                     display: false,
                     color: 'rgba(119, 119, 142, 0.2)'
                  }
               }
         },
         legend: {
               labels: {
                  fontColor: "#9ba6b5"
               },
         },
      }
   }

   if(window.bar_3 != undefined) 
   window.bar_3.destroy(); 
   window.bar_3 = new Chart(ctx_mun, conf_ranking_mun);
}

function rankingVegetation() {
    
   var dataVagetation = calcularSomaEOrdenarPorVeg(data);

   var ctx7 = document.getElementById('ranking_class');

   var areaVegetation = (
      (isNaN(dataVagetation['Campo']) ? 0 : dataVagetation['Campo']) +
      (isNaN(dataVagetation['Savanna']) ? 0 : dataVagetation['Savanna']) +
      (isNaN(dataVagetation['Floresta']) ? 0 : dataVagetation['Floresta'])
   );

    var datapie = {
        labels: [
         'Campo ',
         'Savana', 
         'Floresta' 
         ],
        datasets: [{
            data: [ dataVagetation['Campo'], dataVagetation['Savanna'], dataVagetation['Floresta'] ],
            backgroundColor: [ '#b8af4f', '#00ff00','#006400'],
            datalabels: {
            align: 'end',
            anchor: 'center',
            formatter: function(value) {
               return Math.round((value / areaVegetation ) * 100) + '%';
               }
            }
        }]
    };
    var optionpie = {
      plugins: {
      datalabels: {
        backgroundColor: function(context) {
          return context.dataset.backgroundColor;
        },
        borderRadius: 4,
        color: 'white',
        font: {
          weight: 'bold'
        },
        formatter: Math.round,
        padding: 6
      }
    },
        maintainAspectRatio: false,
        responsive: true,
        legend: {
            display: false,
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    };


   if(window.bar_4 != undefined) 
   window.bar_4.destroy(); 
   window.bar_4 = new Chart(ctx7, {
        plugins: [ChartDataLabels],
        type: 'pie',
        data: datapie,
        options: optionpie
    });
}

function rankingFundiario() {

    var dataFundiario = calcularSomaEOrdenarPorFundiario(data);

    var areaFundiario = (
      (isNaN(dataFundiario['vazio']) ? 0 : dataFundiario['vazio']) +
      (isNaN(dataFundiario['imovel']) ? 0 : dataFundiario['imovel']) +
      (isNaN(dataFundiario['nm_projeto']) ? 0 : dataFundiario['nm_projeto']) +
      (isNaN(dataFundiario['nm_ti']) ? 0 : dataFundiario['nm_ti']) +
      (isNaN(dataFundiario['nm_comunid']) ? 0 : dataFundiario['nm_comunid']) +
      (isNaN(dataFundiario['nm_uc']) ? 0 : dataFundiario['nm_uc'])
   );

    var datapie = {
        labels: ['Vazio Fundiário', 'Imóvel Privado', 'Assentamento', 'Território Indígena', 'Território Quilombola', 'Unidade de Conservação'],
        datasets: [{
            data: [ dataFundiario['vazio'], dataFundiario['imovel'], dataFundiario['nm_projeto'], dataFundiario['nm_ti'], dataFundiario['nm_comunid'], dataFundiario['nm_uc'] ],
            backgroundColor: ['#B63D47','#72262C', '#E44D59', '#FCEDEE', '#F4B7BC', '#EC828A'],
            datalabels: {
            align: 'end',
            anchor: 'center',
            formatter: function(value) {
               return Math.round((value / areaFundiario ) * 100) + '%';
               }
            }
        }],

    };
    var optionpie = {
      plugins: {
      datalabels: {
        backgroundColor: function(context) {
          return context.dataset.backgroundColor;
        },
        borderRadius: 4,
        color: 'white',
        font: {
          weight: 'bold'
        },
        formatter: Math.round,
        padding: 6
      }
    },
        maintainAspectRatio: false,
        responsive: true,
        legend: {
            display: false,
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    };

    var ctx8 = document.getElementById('ranking_fundiario');

   if(window.bar_5 != undefined) 
   window.bar_5.destroy(); 
   window.bar_5 = new Chart(ctx8, {
        plugins: [ChartDataLabels],
        type: 'pie',
        data: datapie,
        options: optionpie
    });
}

function rankingSize() {

   var dataSize = calcularSomaEOrdenarPorTamanho(data);

   var areaSize = (
   (isNaN(dataSize['menor3ha']) ? 0 : dataSize['menor3ha']) +
   (isNaN(dataSize['3a5ha']) ? 0 : dataSize['3a5ha']) +
   (isNaN(dataSize['5a10ha']) ? 0 : dataSize['5a10ha']) +
   (isNaN(dataSize['10a50ha']) ? 0 : dataSize['10a50ha']) +
   (isNaN(dataSize['maior50ha']) ? 0 : dataSize['maior50ha'])
   );

   var datapie = {
      labels: ['Menor 3ha', '3 a 5 ha', '5 a 10 ha', '10 a 50 ha', 'Acima de 50 ha'],
      datasets: [{
         data: [ dataSize['menor3ha'], dataSize['3a5ha'], dataSize['5a10ha'], dataSize['10a50ha'], dataSize['maior50ha']],
         backgroundColor: ['#F4B7BC','#EC828A', '#E44D59', '#B63D47', '#72262C'],
         datalabels: {
            align: 'end',
            anchor: 'center',
            formatter: function(value) {
               return Math.round((value / areaSize ) * 100) + '%';
               }
            }

      }]
   };
   var optionpie = {
      plugins: {
      datalabels: {
        backgroundColor: function(context) {
          return context.dataset.backgroundColor;
        },
        borderRadius: 4,
        color: 'white',
        font: {
          weight: 'bold'
        },
        formatter: Math.round,
        padding: 6
      }
    },
      maintainAspectRatio: false,
      responsive: true,
      legend: {
         display: false,
      },
      animation: {
         animateScale: true,
         animateRotate: true
      }
   };

   var ctx9 = document.getElementById('ranking_size');

   if(window.bar_6 != undefined) 
   window.bar_6.destroy(); 
   window.bar_6 = new Chart(ctx9, {
      plugins: [ChartDataLabels],
      type: 'pie',
      data: datapie,
      options: optionpie
   });
}

var map = L.map('leaflet1').setView([-14.179186142354169, -50.185546875], 4);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
}).addTo(map);	

function filterGeoJSONByProperty(geoJSON, propertyName, filterValues) {
  // Check if the GeoJSON is valid
  if (!geoJSON || !geoJSON.features || !Array.isArray(geoJSON.features)) {
    throw new Error('Invalid GeoJSON input');
  }

  // Filter the GeoJSON features based on the propertyName and filterValues
  const filteredFeatures = geoJSON.features.filter((feature) => {
    const propertyValue = feature.properties[propertyName];
    return filterValues.includes(propertyValue);
  });

  // Create a new GeoJSON object with the filtered features
  const filteredGeoJSON = {
    type: 'FeatureCollection',
    features: filteredFeatures,
  };

  return filteredGeoJSON;
}

var layer_mun = L.geoJSON(layer_mun).addTo(map);

function comparacao_mun(){
   if(map.hasLayer(layer_mun)){
      map.removeLayer(layer_mun)
      var data_mun = inserirAreaMun(mun_geo, calcularSomaEOrdenarPorMun(data))
      var filter_mun = filterGeoJSONByProperty(data_mun, 'CD_MUN', mun)
      layer_mun = L.geoJSON(filter_mun, {
         style: style,
         onEachFeature: onEachFeatureMun
      }).addTo(map);
      map.fitBounds(layer_mun.getBounds())
   }
}

function inserirAreaMun(geojsonPath, jsonFilePath) {
   try {
      // Read the GeoJSON file
      const geojson = geojsonPath;

      // Read the JSON file with corresponding datas
      const jsonData = jsonFilePath;

      // Create a mapping of cod_mun to the data in the JSON file
      const codMunMapping = {};
      jsonData.forEach(item => {         
         codMunMapping[item.cod_mun] = item.soma; // Replace 'value' with the actual property you want to insert
      });

      // Update the GeoJSON properties with the values from the JSON file
      geojson.features.forEach(feature => {
         const codMun = feature.properties.CD_MUN;         
         if (codMunMapping[codMun]) {
         feature.properties.soma = codMunMapping[codMun];
         } else {           
         feature.properties.soma = 0; // Set a default value if COD_MUN doesn't match in the JSON file
         }
      });

      // Save the updated GeoJSON back to a file or return it
      // fs.writeFileSync(outputPath, JSON.stringify(geojson, null, 2), 'utf8');
      
      // Uncomment the above line if you want to save the updated GeoJSON to a file

      return geojson; // Return the updated GeoJSON if needed
      
   } catch (error) {
      console.error('An error occurred:', error);
      return null;
   }
}

function getColor(d) {
    return d > 10000 ? '#72262C' :
           d > 5000  ? '#B63D47' :
           d > 2000  ? '#E44D59' :
           d > 1000  ? '#EC828A' :
           d > 500  ? '#F4B7BC' :
           d > 200   ? '#FCEDEE' :
                      '#FCEDEE';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.soma),
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);

}

function resetHighlightMun(e) {
   layer_mun.resetStyle(e.target);
   info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeatureMun(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlightMun,
        click: zoomToFeature
    });
}

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
   if(map.hasLayer(layer_mun)){
      this._div.innerHTML = '<h4>Desmatamento</h4>' +  (props ?
        '<b>' + props.NM_MUN + '</b><br />' + props.soma.toLocaleString() + ' ha'
        : '');
   } else {
      this._div.innerHTML = '<h4>Desmatamento</h4>' +  (props ?
        '<b>' + props.NM_UF + '</b><br />' + props.soma.toLocaleString() + ' ha'
        : '');
   }

};

info.addTo(map);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0,  500, 1000, 2000, 5000, 10000],
        labels = ['0', '500', '1.000', '2.000', '5.000', '10.000'];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            labels[i] + (labels[i + 1] ? '&ndash;' + labels[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

function translateToEnglish(){
   alert("Calm down my friend... Don't hurry...")
}

var stateSelect = document.getElementById("input_uf");

function multiSelectMun(){   
        
   var citySelect = document.getElementById("input_mun");

   citySelect.innerHTML  = '';

   $('#input_mun').multipleSelect('refresh');

   const selectedStates = Array.from(stateSelect.selectedOptions).map(option => option.value);

   selectedStates.forEach(state => {
      if (citiesByState[state]) {         
            $('#input_mun').append(citiesByState[state]).multipleSelect('refresh');       
      }
   });

}

$('#input_uf').multipleSelect('refreshOptions', {
      filter: false,
      onClick: function() {
         multiSelectMun()
      },
      onClose: function(){
         multiSelectMun()
      }
})
