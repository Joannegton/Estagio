import { mostrarMenu, esconderElementos, alternador } from "../utils.js"

function mostrarRelatorios() {
    document.getElementById('relatorios').style.display = 'block'
    esconderElementos(['envioTaloes', 'estoque', 'perfil', 'manutencao', 'lojas'])
    mostrarMenu()
}

function alternadorRelatorios() {
    const geral = document.getElementById('mostrarTabelas');
    const seletorGrafico = document.getElementById('mostrarGrafico');

    geral.addEventListener('click', () => {
        alternador(geral, geral, seletorGrafico, 'seletorTabela', 'enviosChart', 'indicadorRelatorios');
    });

    seletorGrafico.addEventListener('click', () => {
        grafico();
        alternador(geral, seletorGrafico, geral, 'enviosChart', 'seletorTabela', 'indicadorRelatorios');
    });
}

function exportarRelatorios(){
    alert('Relatório exportado com sucesso!')
}

let enviosChart;

function grafico() {
    if (enviosChart) {
        enviosChart.destroy();
    }

    const ctx = document.getElementById('enviosChart').getContext('2d');
    enviosChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Envios de Talões',
                data: [12, 19, 3, 5, 2, 3, 10, 15, 20, 25, 30, 35],
                backgroundColor: '#c4df4e',
                borderColor: '#4CAF50',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Relatório de Envios de Talões por Mês'
                }
            }
        }
    })
}


export { mostrarRelatorios, alternadorRelatorios, exportarRelatorios }