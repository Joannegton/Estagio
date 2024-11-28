import { alternador, exportCsv } from "../../utils.js"
import { API_URL } from "../../config/config.js"
import { usuarios } from "./usuariosController.js"


async function mostrarRelatorios() {
        alternadorRelatorios()
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

async function carregarDadosRelatorios() {
    try {
        await carregarDadosElemento(`${API_URL}/usuarios`, 'usuariosTotais')
    } catch (error) {
        console.error('Erro ao carregar dados de usuários:', error)
    }

    try {
        await carregarDadosElemento(`${API_URL}/loja`, 'lojasTotais')
    } catch (error) {
        console.error('Erro ao carregar dados de lojas:', error)
    }

    try {
        await carregarDadosElemento(`${API_URL}/taloes`, 'enviadosTotais')
    } catch (error) {
        console.error('Erro ao carregar dados de talões:', error)
    }
}


async function renderizartabelaEstoqueBaixo(){
    const tabelaEstoqueBaixo = document.getElementById('corpoTabelaEstoqueBaixo')
    tabelaEstoqueBaixo.innerHTML = ''
    
    try {
        const response = await fetch(`${API_URL}/estoque`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'            }
        })
        if(!response.ok){
            const errorData = await response.json()
            throw new Error(errorData.message)
        }
        const data = await response.json()
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
                window.location = '/envioTaloes'
            })
        })
        iconeEstoqueBaixo()
    } catch (error) {
        console.error('Erro:', error)
    }
    
}



let enviosChart

async function renderizarGrafico() {
    try {
        const response = await fetch(`${API_URL}/taloes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(!response.ok){
            const errorData = await response.json()
            throw new Error(errorData.message)
        }
        const data = await response.json()

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
    } catch (error) {
        console.error('Erro ao renderizar gráfico:', error)
    }
}

function exportarRelatorios(){
    exportCsv(usuarios, 'usuario')
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

async function carregarDadosElemento(url, elementoId) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message)
    }

    const data = await response.json()

    if (url.includes('usuarios')){
        usuarios.push(...data) // ... é o spread operator que serve para concatenar arrays 
    }
    


    document.getElementById(elementoId).textContent = data.length
}

export { mostrarRelatorios, alternadorRelatorios, exportarRelatorios, iconeEstoqueBaixo }