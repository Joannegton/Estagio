import { alternador, mostrarElemento } from "../../utils.js"
import { mostrarEnvioTaloes } from "./envioTaloes.js"


function mostrarRelatorios() {
    mostrarElemento('relatorios', 'mostrarRelatorio', () =>{
        iconeEstoqueBaixo()
        alternadorRelatorios()
    })
}

function alternadorRelatorios() {
    const geral = document.getElementById('mostrarTabelas')
    const seletorGrafico = document.getElementById('mostrarGrafico')

    carregarDadosRelatorios()
    renderizartabelaEstoqueBaixo()
    geral.addEventListener('click', () => {
        alternador(geral, geral, seletorGrafico, 'seletorTabela', 'enviosChart', 'indicadorRelatorios')
    })

    seletorGrafico.addEventListener('click', () => {
        renderizarGrafico()
        alternador(geral, seletorGrafico, geral, 'enviosChart', 'seletorTabela', 'indicadorRelatorios')
    })
}

async function carregarDadosRelatorios(){    
    carregarDadosElemento('http://localhost:3000/usuarios', 'usuariosTotais')

    carregarDadosElemento('http://localhost:3000/lojas', 'lojasTotais')

    carregarDadosElemento('http://localhost:3000/taloes', 'enviadosTotais')
}

function renderizartabelaEstoqueBaixo(){
    const tabelaEstoqueBaixo = document.getElementById('corpoTabelaEstoqueBaixo')

    fetch('http://localhost:3000/estoque')
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => a.quantidade_disponivel - b.quantidade_disponivel)

            const top5EstoqueBaixo = data.slice(0, 5)

            top5EstoqueBaixo.forEach(estoque => {
                const tr = document.createElement('tr')
                tr.innerHTML = `
                    <td data-label="Loja" id="${estoque.cod_loja}">${estoque.nome_loja}</td>
                    <td data-label="Quantidade" class="quantidade" id="${estoque.cod_loja}">${estoque.quantidade_disponivel}</td>
                    <td data-label="Quantidade Mínima" class="quantidadeMinima" id="${estoque.cod_loja}">${estoque.estoque_minimo}</td>
                    <td data-label="Enviar" class="acoes">
                        <a href="#" class="botaoAcao" id="arrumarEstoqueLoja${estoque.cod_loja}"><i class="fas fa-edit"></i></a>
                    </td>
                `
                tabelaEstoqueBaixo.appendChild(tr)

                document.getElementById(`arrumarEstoqueLoja${estoque.cod_loja}`).addEventListener('click', () => {
                    mostrarEnvioTaloes()
                })
            })
            iconeEstoqueBaixo()
        })
        .catch(error => {
            console.error('Erro:', error)
        })
    
}



let enviosChart
/*
function renderizarGrafico() {

    fetch('http://localhost:3000/taloes')
    .then(response => response.json())
    .then(data => {
        if (enviosChart) {
            enviosChart.destroy()
        }
    
        const ctx = document.getElementById('enviosChart').getContext('2d')
        const meses = {}
        data.forEach(talao => {
            const mes = new Date(talao.data_envio).toLocaleString('default', { month: 'long' })
            if (!meses[mes]) {
                meses[mes] = 0
            }
            meses[mes] += ClipboardItem.quantidade
        })

        const labels = Object.keys(meses)
            const valores = Object.values(meses)
        enviosChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Envios de Talões',
                    data: valores,
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
    })  
    .catch(error => {
        console.error('Erro:', error)
    })  
}*/

function renderizarGrafico() {
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

function exportarRelatorios(){
    alert('Relatório exportado com sucesso!')
}

function iconeEstoqueBaixo(){
    const rows = document.querySelectorAll("#corpoTabelaEstoqueBaixo tr")
    rows.forEach(row => {
        const quantidade = row.querySelector(".quantidade")
        const quantidadeMinima = row.querySelector(".quantidadeMinima")

        if (quantidade && quantidadeMinima) {
            const quantidadeInt = parseInt(quantidade.textContent, 10)
            const quantidadeMinimaInt = parseInt(quantidadeMinima.textContent, 10)

            if (quantidadeInt < quantidadeMinimaInt) {
                if (!quantidade.innerHTML.includes('low-stock')) {
                    quantidade.innerHTML += ' <span class="low-stock">!</span>'
                }
            }
        }
    })
}

function carregarDadosElemento(url, elementoId){
    const elemento = document.getElementById(elementoId)

    fetch(url)
        .then(response => response.json())
        .then(data => {
            elemento.textContent = data.length
        })
        .catch(error => {
            console.error('Erro:', error)
        })
}

export { mostrarRelatorios, alternadorRelatorios, exportarRelatorios, iconeEstoqueBaixo }