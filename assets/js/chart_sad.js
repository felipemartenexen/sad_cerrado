$(function() {
	"use strict";

    /* Bar-Chart1 Ranking Esdados*/
    var ctx = document.getElementById("chartBar2").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Bahia", "Distrito Federal", "Goiás", "Maranhão", "Mato Grosso", "Pará", "Tocantis", "Piauí", "Paraná", "Minas Gerais"],
            datasets: [{
                label: 'Alertas',
                data: [200, 450, 290, 367, 256, 543, 345, 290, 367, 367],
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
    });

    /* Bar-Chart-comparação-mensal-anual*/
    var ctx = document.getElementById("chartBar1");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
            datasets: [{
                label: "2022",
                data: [65, 59, 80, 81, 56, 55, 40, 20, 100, 80, 50, 30],
                borderColor: "#e44d59",
                borderWidth: "0",
                backgroundColor: "#e44d59"
            }, {
                label: "2023",
                data: [28, 48, 40],
                borderColor: "#dc8c8c",
                borderWidth: "0",
                backgroundColor: "#dc8c8c"
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
    });

    /*bar_chart Ranking por municipio */
    var ctx = document.getElementById("chartBar3").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Bahia", "Distrito Federal", "Goiás", "Maranhão", "Mato Grosso", "Pará", "Tocantis", "Piauí", "Paraná", "Minas Gerais"],
            datasets: [{
                label: 'Alertas',
                data: [200, 450, 290, 367, 256, 543, 345, 290, 367, 367],
                borderWidth: 2,
                backgroundColor: '#e44d59',
                borderColor: '#e44d59',
                borderWidth: 0,
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
    });

    /* Pie Chart*/
    var datapie = {
        labels: ['Floresta', 'Campo', 'Savana'],
        datasets: [{
            data: [ 20, 30, 25],
            backgroundColor: ['#006400', '#b8af4f', '#00ff00']
        }]
    };
    var optionpie = {
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

    var ctx7 = document.getElementById('ranking_class');
    var myPieChart7 = new Chart(ctx7, {
        type: 'pie',
        data: datapie,
        options: optionpie
    });


});



function rankingUF(){

    var ctx_uf = document.getElementById("ranking_uf").getContext('2d');
    var conf_ranking_uf = {
        type: 'bar',
        data: {
            labels: [
                calcularSomaEOrdenarPorUf(data)[0].nm_uf,
                calcularSomaEOrdenarPorUf(data)[1].nm_uf,
                calcularSomaEOrdenarPorUf(data)[2].nm_uf,
                calcularSomaEOrdenarPorUf(data)[3].nm_uf,
                calcularSomaEOrdenarPorUf(data)[4].nm_uf,
                calcularSomaEOrdenarPorUf(data)[5].nm_uf,
                calcularSomaEOrdenarPorUf(data)[6].nm_uf,
                calcularSomaEOrdenarPorUf(data)[7].nm_uf,
                calcularSomaEOrdenarPorUf(data)[8].nm_uf,
                calcularSomaEOrdenarPorUf(data)[9].nm_uf,
                calcularSomaEOrdenarPorUf(data)[10].nm_uf,
                calcularSomaEOrdenarPorUf(data)[11].nm_uf,
                calcularSomaEOrdenarPorUf(data)[12].nm_uf
            ],
            datasets: [{
                label: 'Alertas',
                data: [
                    calcularSomaEOrdenarPorUf[0].soma,
                    calcularSomaEOrdenarPorUf[1].soma,
                    calcularSomaEOrdenarPorUf[2].soma,
                    calcularSomaEOrdenarPorUf[3].soma,
                    calcularSomaEOrdenarPorUf[4].soma,
                    calcularSomaEOrdenarPorUf[5].soma,
                    calcularSomaEOrdenarPorUf[6].soma,
                    calcularSomaEOrdenarPorUf[7].soma,
                    calcularSomaEOrdenarPorUf[8].soma,
                    calcularSomaEOrdenarPorUf[9].soma,
                    calcularSomaEOrdenarPorUf[10].soma,
                    calcularSomaEOrdenarPorUf[11].soma,
                    calcularSomaEOrdenarPorUf[12].soma,
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
    };

    var chart_ranking_uf = new Chart(ctx_uf, conf_ranking_uf);
}

function rankingMun(){

    var ctx_mun = document.getElementById("ranking_mun").getContext('2d');
    var conf_ranking_mun = {
        type: 'bar',
        data: {
            labels: [
                alertByMun[0].mn_mun,
                alertByMun[1].mn_mun,
                alertByMun[2].mn_mun,
                alertByMun[3].mn_mun,
                alertByMun[4].mn_mun,
                alertByMun[5].mn_mun,
                alertByMun[6].mn_mun,
                alertByMun[7].mn_mun,
                alertByMun[8].mn_mun,
                alertByMun[9].mn_mun,
                alertByMun[10].mn_mun,
                alertByMun[11].mn_mun,
                alertByMun[12].mn_mun
            ],
            datasets: [{
                label: 'Alertas',
                data: [
                    alertByMun[0].sum,
                    alertByMun[1].sum,
                    alertByMun[2].sum,
                    alertByMun[3].sum,
                    alertByMun[4].sum,
                    alertByMun[5].sum,
                    alertByMun[6].sum,
                    alertByMun[7].sum,
                    alertByMun[8].sum,
                    alertByMun[9].sum,
                    alertByMun[10].sum,
                    alertByMun[11].sum,
                    alertByMun[12].sum,
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
    };

    var chart_ranking_mun = new Chart(ctx_mun, conf_ranking_mun);
}

function rankingVegetation() {
    var datapie = {
        labels: ['Savana', 'Campo', 'Floresta'],
        datasets: [{
            data: [ vegetation[1].sum, vegetation[2].sum, vegetation[3].sum ],
            backgroundColor: ['#00ff00','#006400', '#b8af4f']
        }]
    };
    var optionpie = {
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

    var ctx7 = document.getElementById('ranking_class');
    var myPieChart7 = new Chart(ctx7, {
        type: 'pie',
        data: datapie,
        options: optionpie
    });
}