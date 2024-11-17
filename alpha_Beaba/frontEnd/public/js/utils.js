import { API_URL } from "./config/config.js"

function mostrarMenu() {
    const nav = document.getElementById('menu')
    if (window.innerWidth <= 1000) {
        nav.style.display = (nav.style.display === 'block') ? 'none' : 'block'
    }
}

// usuario logado
function carregarUsuario(){
    document.getElementById('nome_usuario').textContent = localStorage.getItem('nome')
    
    document.getElementById('matricula').value = localStorage.getItem('matricula')
    document.getElementById('nome').value = localStorage.getItem('nome')
    document.getElementById('email').value = localStorage.getItem('email')
    document.getElementById('workplace').value = localStorage.getItem('workplace')

}

function carregarCardUsuario(){
    document.getElementById('usuario-nome').textContent = localStorage.getItem('nome')
    document.getElementById('usuario-matricula').textContent = localStorage.getItem('tipoUsuario') + ' - ' + localStorage.getItem('matricula')  
}

//se não carregar os dados, mostra o modal de carregamento
function mostrarModalCarregamento() {
    let modal = document.getElementById('modalCarregamento')
    if (!modal) {
        modal = document.createElement('div')
        modal.id = 'modalCarregamento'
        modal.classList.add('modal')
        modal.innerHTML = `
            <div class="modalContent">
                <div class="carregar-pontos">
                    <div class="ponto"></div>
                    <div class="ponto"></div>
                    <div class="ponto"></div>
                </div>
            </div>`
        document.body.appendChild(modal)
    }
    modal.style.display = 'flex'
}

function esconderModalCarregamento() {
    const modal = document.getElementById('modalCarregamento')
    if (modal) {
        modal.style.display = 'none'
    }
}

// mostra o modal de finalização
function mostrarModalFinalizado() {
    let modal = document.getElementById('modalFinalizado')
    if (!modal) {
        modal = document.createElement('div')
        modal.id = 'modalFinalizado'
        modal.classList.add('modal')
        modal.innerHTML = `<i class="fas fa-check-circle botaoAcao check-simbolo"></i>`
        document.body.appendChild(modal)
    }
    modal.style.display = 'flex'
    setTimeout(esconderModalFinalizado, 1000) 
}

function esconderModalFinalizado() {
    const modal = document.getElementById('modalFinalizado')
    if (modal) {
        modal.style.display = 'none'
    }
}

// função para mostrar sessão e inicializar
async function mostrarElemento(elementoId, linkAtivarId, funcoesAdicional) {
    const links = document.querySelectorAll('#menu ul li a')
    links.forEach(link => link.classList.remove('ativo'))
    if (linkAtivarId) {
        document.getElementById(linkAtivarId).classList.add('ativo')
    }
    esconderElementos(['relatorios', 'envioTaloes', 'perfil', 'manutencao', 'lojas', 'perfilUsuario', 'estoque', 'estoqueTaloes', 'perfilAcesso', 'editarLoja', 'perfilUsuario'])
    document.getElementById(elementoId).style.display = 'block'
    mostrarMenu()
    await funcoesAdicional()
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

//função para esconder elementos
function esconderElementos(ids) {
    ids.forEach(id => {
        const elemento = document.getElementById(id)
        if(elemento){
            elemento.style.display = 'none'
        }
    })
}

//ordenaçao e filtros
function ordenarArray(array, propriedade, ordem = 'asc') {
    array.sort((a, b) => {
        if (!a || !b) return 0
        if (!a[propriedade]) return 1 // Coloca 'a' no final se a propriedade for null ou undefined
        if (!b[propriedade]) return -1 // Coloca 'b' no final se a propriedade for null ou undefined

        const propA = a[propriedade]
        const propB = b[propriedade]

        if (typeof propA === 'string' && typeof propB === 'string') {
            return (ordem === 'asc') ? propA.localeCompare(propB) : propB.localeCompare(propA)
        } else if (typeof propA === 'number' && typeof propB === 'number') {
            return (ordem === 'asc') ? propA - propB : propB - propA
        } else {
            return 0
        }
    })
}

function filtrarArray(array, propriedade, filtro, tipo = 'texto') {
    const filtroLowerCase = filtro.toLowerCase()

    if (tipo === 'status' && filtroLowerCase === 'todas') {
        return array // Retorna a lista completa
    }

    return array.filter(item => {
        if (!item || !item[propriedade]) return false

        if (tipo === 'texto') { // Filtro em geral
            return item[propriedade].toLowerCase().includes(filtroLowerCase)
        } else if (tipo === 'status') { // Filtrar por status de envio
            return item[propriedade].toLowerCase() === filtroLowerCase
        }

        return false
    })
}

function filtrarPorNome(array, propriedade, filtro) {
    const filtroLowerCase = filtro.toLowerCase()
    return array.filter(item => {
        return item && item[propriedade] && item[propriedade].toLowerCase().includes(filtroLowerCase)
    })
}

// pegar link workplace
function getWorkplaceLink(matricula, listaUsuarios) {
    const usuario = listaUsuarios.find(user => user.matricula === matricula)
    return usuario ? usuario.workplace : '#'
}

// Controle de sessão e logout
function checkSession(id_perfil_acesso) {
    const token = sessionStorage.getItem('token')
    const { expirado, tipoUsuario } = isTokenExpirado(token)
            
    if (!token ||expirado) {
        alert('Sessão expirada. Faça login novamente.')
        handleSessionInvalid()
        return
    }
        
        
    if (tipoUsuario !== id_perfil_acesso) {
        alert('Você não tem acesso a esta página.')
        handleSessionInvalid()
        return
    }
    
}

//lidar com sessão invalida
function handleSessionInvalid() {
    sessionStorage.clear()
    localStorage.clear()
    window.location.href = '/'
}

function isTokenExpirado(token) {
    //Divide o token JWT em três partes e seleciona a 2ª parte (payload) para decodificar e transforma em JSON
    const payload = JSON.parse(atob(token.split('.')[1])) //atob - Decodifica a string Base64
    const expiry = payload.exp //exp é o tempo de expiração do token
    const now = Math.floor(Date.now() / 1000) //Math.floor(...): Arredonda o valor para baixo para obter um número inteiro.
    const tipoUsuario = payload.tipoUsuario
    const expirado = now > expiry

    return { expirado, tipoUsuario }
}

async function logout() {
    const matricula = localStorage.getItem('matricula')
    try {
        const response = await fetch(`${API_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ matricula })
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message)
        }
        handleSessionInvalid()

    } catch (error) {
        console.error('Erro ao realizar logout:', error)
    }
}

// carregar dados em selects
async function carregarDadosSelect(idSelect, url, value, textContent) {
    const select = document.getElementById(idSelect)
    select.innerHTML = ' '

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
    
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message)
    }

    const data = await response.json()
    
    data.forEach(item => {
        const option = document.createElement('option')
        option.value = item[value]
        option.textContent = item[textContent]
        select.appendChild(option)
    })

}

//função para identificar estoque baixo e alertar
function identificarBaixoEstoque() {
    const rows = document.querySelectorAll('tr')
    rows.forEach(row => {
        const quantMinima = row.querySelector('.quant-minima')
        const quantAtual = row.querySelector('.quant-atual')
        if (quantMinima && quantAtual) {
            const minimaValue = parseInt(quantMinima.textContent, 10)
            const atualValue = parseInt(quantAtual.textContent, 10)
            if (atualValue < minimaValue) {
                quantAtual.classList.add('quant-atual-baixa')
            }
        }
    })
}

// mostrar no mobile
function mostrarFiltros(mostrarFiltroId, containerFiltroId) {
    const filtroOptions = document.getElementById(mostrarFiltroId)
    const toggleButton = document.getElementById(containerFiltroId).querySelector('i')
    
    if (filtroOptions.classList.contains('show')) {
      filtroOptions.classList.remove('show')
      toggleButton.classList.remove('fa-chevron-up')
      toggleButton.classList.add('fa-chevron-down')
    } else {
      filtroOptions.classList.add('show')
      toggleButton.classList.remove('fa-chevron-down')
      toggleButton.classList.add('fa-chevron-up')
    }
  
}

// conversão data e hora
function converterDataParaBR(dataISO) {
    const data = new Date(dataISO)
    return data.toLocaleDateString('pt-BR')
}

function converterDataHoraParaBR(dataISO) {
    const data = new Date(dataISO)
    const dataFormatada = data.toLocaleDateString('pt-BR', {
        timeZone: 'UTC',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })
    const horaFormatada = data.toLocaleTimeString('pt-BR', {
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit'
    })
    return `${dataFormatada} ${horaFormatada}`
}

function desativarBotao(elementoId) {
    const botao = document.getElementById(elementoId)
    if (botao) {
        botao.disabled = true
    }
}

function ativarBotao(elementoId) {
    const botao = document.getElementById(elementoId)
    if (botao) {
        botao.disabled = false
    }
}



export {mostrarModalFinalizado, getWorkplaceLink, mostrarModalCarregamento, carregarUsuario, esconderModalCarregamento, desativarBotao, checkSession, carregarCardUsuario, ativarBotao, ordenarArray, filtrarArray, filtrarPorNome, converterDataParaBR, converterDataHoraParaBR, carregarDadosSelect,identificarBaixoEstoque, mostrarFiltros, mostrarElemento, mostrarMenu, alternador, alternador3, esconderElementos, logout}
