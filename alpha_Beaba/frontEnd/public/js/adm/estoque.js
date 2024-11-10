import { filtrarPorNome, identificarBaixoEstoque, mostrarElemento, ordenarArray } from "../utils.js"
import { API_URL } from "../config/config.js"

let estoque = []

// Funções de exibição
async function mostrarEstoque() {
    await mostrarElemento('estoque', 'mostrarEstoque', fetchEstoque)
}
    
function renderizarTabela(estoqueRenderizar) {
    let paginaAtual = 1
    const itensPorPagina = 10
    const tbody = document.getElementById('estoque-tbody')
    
    function paginarEstoque(){
        const inicio = (paginaAtual - 1) * itensPorPagina
        const fim = inicio + itensPorPagina
        const dadosLimitados = estoqueRenderizar.slice(inicio, fim)
        tbody.innerHTML = ''

        dadosLimitados.forEach(item => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td data-label="Loja" id="nomeLoja${item.cod_loja}">${item.nome_loja}</td>
                <td data-label="Quantidade Recomendada" id="qntRecomendada${item.cod_loja}" class="quant-recomendada">${item.quantidade_recomendada}</td>
                <td data-label="Quantidade Mínima" id="qntMinima${item.cod_loja}" class="quant-minima">${item.estoque_minimo}</td>
                <td data-label="Quantidade Atual" id="qntAtual${item.cod_loja}" class="quant-atual">${item.quantidade_disponivel}</td>
            `
            tbody.appendChild(tr)
        })

        //botões de paginação
        document.getElementById('pagInfo').textContent = `Página ${paginaAtual} de ${Math.ceil(estoqueRenderizar.length / itensPorPagina)}`
        document.getElementById('pagAnt').disabled = paginaAtual === 1
        document.getElementById('proxPag').disabled = fim >= estoqueRenderizar.length

        identificarBaixoEstoque()
    }

    //eventos de click dos botões de paginação
    document.getElementById('proxPag').addEventListener('click', () => {
        if((paginaAtual * itensPorPagina) < estoqueRenderizar.length) {
            paginaAtual++
            paginarEstoque()
        }
    })
    document.getElementById('pagAnt').addEventListener('click', () => {
        if(paginaAtual > 1) {
            paginaAtual--
            paginarEstoque()
        }
    })

    paginarEstoque()
}

async function fetchEstoque() {
    try {
        const response = await fetch(`${API_URL}/estoque`)
        if (!response.ok) {
            throw new Error('Erro ao buscar estoque')
        }

        estoque = await response.json()
        renderizarTabela(estoque)
    } catch (error) {
        console.error('Erro ao buscar estoque:', error)
    }
}

//filtros e ordenação
function filtrarNomeLoja(event){
    const filtro = event.target.value
    const estoqueFiltrados = filtrarPorNome(estoque, 'nome_loja', filtro)
    renderizarTabela(estoqueFiltrados)
}

function ordenarLojaEstoque(event) {
    const ordenarPor = event.target.value
    ordenarArray(estoque, 'nome_loja', ordenarPor)
    renderizarTabela(estoque)
}

function ordenarEstoque(event) {
    const ordenarPor = event.target.value
    ordenarArray(estoque, 'quantidade_disponivel', ordenarPor)
    renderizarTabela(estoque)
}

function exportarEstoque() {
    alert('exportando estoque')
}

export { renderizarTabela, ordenarEstoque, filtrarNomeLoja, mostrarEstoque, ordenarLojaEstoque, exportarEstoque }