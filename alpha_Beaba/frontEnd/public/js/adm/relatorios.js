import { alternador, mostrarElemento } from "../../utils.js"
import { mostrarEnvioTaloes } from "./envioTaloes.js"


function mostrarRelatorios() {
    mostrarElemento('relatorios', 'mostrarRelatorio', () =>{
        iconeEstoqueBaixo()
        alternadorRelatorios()
    })
}

async function alternadorRelatorios() {
    const geral = document.getElementById('mostrarTabelas')
    const seletorGrafico = document.getElementById('mostrarGrafico')

    await carregarDadosRelatorios()
    await renderizartabelaEstoqueBaixo()
    geral.addEventListener('click', () => {
        alternador(geral, geral, seletorGrafico, 'seletorTabela', 'enviosChart', 'indicadorRelatorios')
    })

    seletorGrafico.addEventListener('click', () => {
        renderizarGrafico()
        alternador(geral, seletorGrafico, geral, 'enviosChart', 'seletorTabela', 'indicadorRelatorios')
    })
}

function carregarDadosRelatorios() {
    return Promise.all([
        carregarDadosElemento('http://localhost:3000/api/usuarios', 'usuariosTotais'),
        carregarDadosElemento('http://localhost:3000/api/loja', 'lojasTotais'),
        carregarDadosElemento('http://localhost:3000/api/taloes', 'enviadosTotais')
    ])
}

async function renderizartabelaEstoqueBaixo(){
    const tabelaEstoqueBaixo = document.getElementById('corpoTabelaEstoqueBaixo')
    tabelaEstoqueBaixo.innerHTML = ''
    
    return fetch('http://localhost:3000/api/estoque')
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
                        <a href="#" class="botaoAcao" id="arrumarEstoqueLoja${estoque.cod_loja}" title="Enviar"><i class="fas fa-edit"></i></a>
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

function renderizarGrafico() {

    fetch('http://localhost:3000/api/taloes')
    .then(response => response.json())
    .then(data => {
        if (enviosChart) {
            enviosChart.destroy()
        }
    
        const ctx = document.getElementById('enviosChart').getContext('2d')
        const meses = {}
        data.forEach(talao => {
            const mes = new Date(talao.data_envio).toLocaleString('pt-BR', { month: 'long' })
            if (!meses[mes]) {
                meses[mes] = 0
            }
            meses[mes] += talao.quantidade
        })

        const monthOrder = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
        const labels = Object.keys(meses).sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b))
        const valores = labels.map(label => meses[label])

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

async function carregarDadosElemento(url, elementoId){
    const elemento = document.getElementById(elementoId)

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            elemento.textContent = data.length
        })
        .catch(error => {
            console.error('Erro:', error)
        })
}

export { mostrarRelatorios, alternadorRelatorios, exportarRelatorios, iconeEstoqueBaixo }