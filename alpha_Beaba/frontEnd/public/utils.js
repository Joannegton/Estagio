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

function identificarBaixoEstoque() {
    console.log('identificarBaixoEstoque');
    const rows = document.querySelectorAll('tr');
    rows.forEach(row => {
        const quantMinima = row.querySelector('.quant-minima');
        const quantAtual = row.querySelector('.quant-atual');
        if (quantMinima && quantAtual) {
            const minimaValue = parseInt(quantMinima.textContent, 10);
            const atualValue = parseInt(quantAtual.textContent, 10);
            if (atualValue < minimaValue) {
                quantAtual.classList.add('quant-atual-baixa');
            }
        }
    });
}

function ordenarArray(array, propriedade, ordem = 'asc') {
    array.sort((a, b) => {
        if (!a || !b) return 0;
        if (!a[propriedade]) return 1; // Coloca 'a' no final se a propriedade for null ou undefined
        if (!b[propriedade]) return -1; // Coloca 'b' no final se a propriedade for null ou undefined
        return (ordem === 'asc') ? a[propriedade].localeCompare(b[propriedade]) : b[propriedade].localeCompare(a[propriedade]);
    });
}

function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = 'login'
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


function mostrarFiltros(mostrarFiltroId, containerFiltroId) {
    const filtroOptions = document.getElementById(mostrarFiltroId);
    const toggleButton = document.getElementById(containerFiltroId).querySelector('i');
    
    if (filtroOptions.classList.contains('show')) {
      filtroOptions.classList.remove('show');
      toggleButton.classList.remove('fa-chevron-up');
      toggleButton.classList.add('fa-chevron-down');
    } else {
      filtroOptions.classList.add('show');
      toggleButton.classList.remove('fa-chevron-down');
      toggleButton.classList.add('fa-chevron-up');
    }
  
}

function converterDataParaBR(dataISO) {
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR');
}

function converterDataHoraParaBR(dataISO) {
    const data = new Date(dataISO);
    const dataFormatada = data.toLocaleDateString('pt-BR', {
        timeZone: 'UTC',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    const horaFormatada = data.toLocaleTimeString('pt-BR', {
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit'
    });
    return `${dataFormatada} ${horaFormatada}`;
}



export {ordenarArray, converterDataParaBR, converterDataHoraParaBR, carregarDadosSelect, mostrarFiltros, mostrarElemento, mostrarMenu, alternador, alternador3, esconderElementos, identificarBaixoEstoque, logout}
