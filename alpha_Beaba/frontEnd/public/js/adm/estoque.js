import { identificarBaixoEstoque, mostrarElemento } from "../../utils.js"

let estoque = []

function mostrarEstoque() {
    mostrarElemento('estoque', 'mostrarEstoque', fetchEstoque)
}
    
async function fetchEstoque() {
    try {
        const response = await fetch('http://localhost:3000/api/estoque')
        if (!response.ok) {
            throw new Error('Erro ao buscar estoque')
        }

        estoque = await response.json()
        renderizarTabela(estoque)
    } catch (error) {
        console.error('Erro ao buscar estoque:', error)
    }
}
    
function renderizarTabela(estoqueRenderizar) {
    let paginaAtual = 1
    const itensPorPagina = 8
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




function filtrarLoja() {
    alert('filtrando loja')
}

function exportarEstoque() {
    alert('exportando estoque')
}

export { renderizarTabela, mostrarEstoque, filtrarLoja, exportarEstoque }