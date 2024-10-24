function mostrarMenu() {
    const nav = document.getElementById('menu')
    if (window.innerWidth <= 1000) {
        nav.style.display = (nav.style.display === 'block') ? 'none' : 'block'
    }
}

function mostrarElemento(elementoId, linkAtivarId, funcoesAdicional = () => {}) {
    const links = document.querySelectorAll('#menu ul li a')
    links.forEach(link => link.classList.remove('ativo'))
    if (linkAtivarId) {
        document.getElementById(linkAtivarId).classList.add('ativo')
    }
    esconderElementos(['relatorios', 'envioTaloes', 'perfil', 'manutencao', 'lojas', 'perfilUsuario', 'estoque', 'estoqueTaloes', 'perfilAcesso', 'editarLoja', 'perfilUsuario'])
    document.getElementById(elementoId).style.display = 'block'
    mostrarMenu()
    funcoesAdicional()
}


// Função para alternar entre elementos
function alternador(elementoAtivo, elementoDesativar, elementoAtivar, ativar, desativar, indicador) {
    elementoDesativar.classList.add('ativo')
    elementoDesativar.classList.remove('inativo')
    elementoAtivar.classList.add('inativo')
    elementoAtivar.classList.remove('ativo')

    if(ativar == 'seletorTabela'){
        document.getElementById(ativar).style.display = 'grid'
    } else{
        document.getElementById(ativar).style.display = 'block'
    }
    document.getElementById(desativar).style.display = 'none'
    document.getElementById(indicador).style.transform = elementoAtivo === elementoDesativar ? 'translateX(0)' : 'translateX(100%)'
}

function alternador3(elementoAtivo, elementosDesativar, ativar, desativarArr, indicador, posicao) {
    elementosDesativar.forEach((elemento, index) => {
        elemento.classList.add('inativo')
        elemento.classList.remove('ativo')
        document.getElementById(desativarArr[index]).style.display = 'none'
    })

    elementoAtivo.classList.add('ativo')
    elementoAtivo.classList.remove('inativo')
    document.getElementById(ativar).style.display = 'block'

    document.getElementById(indicador).style.transform = `translateX(${posicao * 100}%)` 
}

function esconderElementos(ids) {
    ids.forEach(id => {
        const elemento = document.getElementById(id)
        if(elemento){
            elemento.style.display = 'none'
        }
    })
}

function identificarBaixoEstoque(){
    const rows = document.querySelectorAll('tr')
    rows.forEach(row => {
        const quantRecomendada = row.querySelector('.quant-minima')
        const quantAtual = row.querySelector('.quant-atual')
        if (quantRecomendada && quantAtual) {
            const recomendadaValue = parseInt(quantRecomendada.textContent, 10)
            const atualValue = parseInt(quantAtual.textContent, 10)
            if (atualValue < recomendadaValue) {
                quantAtual.classList.add('quant-atual-baixa')
            }
        }
    })
}

function adicionarPaginacao(dados, renderizarFunc, pagAntId, proxPagId, tabela) {
    document.getElementById(pagAntId).addEventListener('click', () => {
        if (dados.paginaAtual > 1) {
            dados.paginaAtual--
            renderizarFunc()
        }
    })

    document.getElementById(proxPagId).addEventListener('click', () => {
        if ((dados.paginaAtual * dados.itensPorPagina) < dados[`dados${tabela}`].length) {
            dados.paginaAtual++
            renderizarFunc()
        }
    })
    renderizarFunc()
}

function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = 'login.html'
}

async function carregarDadosSelect(idSelect, url, value, textContent) {
    const select = document.getElementById(idSelect)
    select.innerHTML = ''

    try {
        const response = await fetch(url)
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        
        data.forEach(item => {
            const option = document.createElement('option')
            option.value = item[value]
            option.textContent = item[textContent]
            select.appendChild(option)
        })
    } catch (error) {
        console.error('Falha ao carregar os Dados:', error)
    }
}

export {carregarDadosSelect, mostrarElemento, adicionarPaginacao, mostrarMenu, alternador, alternador3, esconderElementos, identificarBaixoEstoque, logout}
