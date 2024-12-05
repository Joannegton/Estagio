import { alternador, converterDataHoraParaBR, converterDataParaBR, exportCsv } from "../../utils.js"
import { API_URL } from "../../config/config.js"

let remessas = []

let saidaTaloes = []

async function alternadorRelatorios() {
    const saidas = document.getElementById('mostrarSaidas')
    const entradas = document.getElementById('mostrarEntradas')
    await fetchRemessa()
    await fetchSaidas()
    await carregarEstoqueLoja()
    saidas.addEventListener('click', async () => {
        alternador(saidas, entradas, saidas, 'saidas', 'entradas', 'indicadorRelatorio')
    })

    entradas.addEventListener('click', () => {
        alternador(entradas, entradas, saidas, 'entradas', 'saidas', 'indicadorRelatorio')
    })
}

async function carregarEstoqueLoja() {
    document.getElementById('quantidadeEstoque').innerHTML = ''
    try { 
        const codLoja = localStorage.getItem('cod_loja')
        const response = await fetch(`${API_URL}/estoque/${codLoja}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message)
        }

        const estoque = await response.json()
        
        document.getElementById('quantidadeEstoque').innerHTML = estoque.quantidade_disponivel

    } catch (error) {
        console.error('Erro ao carregar estoque: ', error)
        alert('Erro ao carregar dados do estoque')
    }
}

async function fetchRemessa() {
    try {
        const codLoja = localStorage.getItem('cod_loja')
        const response = await fetch(`${API_URL}/taloes/${codLoja}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(!response.ok){
            const errorData = await response.json()
            throw new Error(errorData.message)
        }
        remessas = await response.json()
        renderizarEntradas(remessas)
    } catch (error) {
        console.error('Erro ao buscar remessas:', error.stack) 
        alert('Erro ao buscar remessas, consulte o Administrador do sistema')
    }
}

async function fetchSaidas() {
    try {
        const codLoja = localStorage.getItem('cod_loja')
        const response = await fetch(`${API_URL}/taloes/saida/${codLoja}`)
        if(!response.ok){
            const errorData = await response.json()
            throw new Error(errorData.message)
        }
        saidaTaloes = await response.json()
        console.log(codLoja)
        renderizarSaidas(saidaTaloes)
    } catch (error) {
        console.error('Erro ao buscar remessas:', error.stack) 
        alert('Erro ao buscar remessas, consulte o Administrador do sistema')
    }
}

function renderizarEntradas(listaRemessas){
    const tbody = document.getElementById('entradas-tbody')

    let paginaAtual = 1
    const itensPorPagina = 8

    const inicio = (paginaAtual - 1) * itensPorPagina
    const fim = inicio + itensPorPagina
    const dadosLimitados = listaRemessas.slice(inicio, fim)
    
    function renderizarTabelaEntradas(){
        tbody.innerHTML = ''
        dadosLimitados.forEach(item => {
            const dataEnvio = converterDataHoraParaBR(item.data_envio)
            const dataRecebimento = converterDataParaBR(item.data_recebimento_previsto)

            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td data-label="Data Envio" id="dataEnvio${item.numero_remessa}">${dataEnvio}</td>
                <td data-label="Remessa" id="numeroRemessa${item.numero_remessa}">${item.numero_remessa}</td>
                <td data-label="Quantidade" id="quantidade${item.numero_remessa}">${item.quantidade}</td>
                <td data-label="Data Recebimento/Prevista" id="dataRecebimento${item.numero_remessa}">${dataRecebimento}</td>
                <td data-label="Status" id="statusRemessa${item.numero_remessa}">${item.status}</td>
                <td data-label="Marcar Recebido" >
                    <a href="#" class="botaoAcao" id="alterarStatus${item.numero_remessa}"><i class="fas fa-edit"></i></a>
                </td>
            `    
            tbody.append(tr)

            //estilização status
            const status = document.getElementById(`statusRemessa${item.numero_remessa}`)
            if(status.innerText === 'Enviado'){
                status.style.backgroundColor = '#ffcf0f91'
                
            } else {
                status.style.backgroundColor = '#29ff3054'
            }

            // Estilização da data de entrega
            const dataEntregaElemento = document.getElementById(`dataRecebimento${item.numero_remessa}`)
            const dataEntrega = new Date(item.data_recebimento_previsto)
            const dataAtual = new Date()
    
            if(dataEntrega < dataAtual && item.status === 'Enviado'){
                dataEntregaElemento.style.backgroundColor = '#fc48488e'
            }

            document.getElementById(`alterarStatus${item.numero_remessa}`).addEventListener('click', async () =>{
                if (item.status === 'Recebido') {
                    alert(`Remessa ${item.numero_remessa} ja foi acceita.`)
                    return
                }
                await receberRemessa(item.numero_remessa)
                await carregarEstoqueLoja()
            })
        })
    }

    // botões de paginação
    document.getElementById('pagInfoEntradas').textContent = `Página ${paginaAtual} de ${Math.ceil(listaRemessas.length / itensPorPagina)}`
    document.getElementById('pagAntEntradas').disabled = paginaAtual === 1
    document.getElementById('proxPagEntradas').disabled =  fim >= listaRemessas.length

    // Evento de clique para paginação
    document.getElementById('proxPagEntradas').addEventListener('click', () => {
        if ((paginaAtual * itensPorPagina) < listaRemessas.length) {
            paginaAtual++
            renderizarTabelaEntradas()
        }
    })
    document.getElementById('pagAntEntradas').addEventListener('click', () => {
        if (paginaAtual > 1) {
            paginaAtual--
            renderizarTabelaEntradas()
        }
    })

    renderizarTabelaEntradas()
}

async function receberRemessa(remessa){
    try {
        const response = await fetch(`${API_URL}/taloes/${remessa}/accept`, {
            method: 'PUT', 
            headers:{
                "Content-Type": 'application/json'
            }
        })
        if(!response.ok){
            const errorData = await response.json()
            throw new Error(errorData.message)
        }
        await fetchRemessa()
    } catch (error) {
        console.error('Erro ao receber remessa: ', error.stack)
        alert('Erro ao aceitar remessa, tente novamente mais tarde.')
    }
}

function renderizarSaidas(listaTaloes){
    const tbody = document.getElementById('saidas-tbody')

    let paginaAtual = 1
    const itensPorPagina = 8

    const inicio = (paginaAtual - 1) * itensPorPagina
    const fim = inicio + itensPorPagina
    const dadosLimitados = listaTaloes.slice(inicio, fim)
    
    function renderizarTabelaSaida(){        
        tbody.innerHTML = ''
        dadosLimitados.forEach(item => {
            const dataSaida = converterDataParaBR(item.data_saida)

            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td data-label="Data">${dataSaida}</td>
                <td data-label="Colaborador">${item.nome_usuario}</td>
            `    
            tbody.append(tr)

        })
    }

    // botões de paginação
    document.getElementById('pagInfoSaidas').textContent = `Página ${paginaAtual} de ${Math.ceil(listaTaloes.length / itensPorPagina)}`
    document.getElementById('pagAntSaidas').disabled = paginaAtual === 1
    document.getElementById('proxPagSaidas').disabled =  fim >= listaTaloes.length


    renderizarTabelaSaida()
}

function exportarRelatorios(){
    exportCsv([remessas, saidaTaloes], 'Remessas')
}






export { alternadorRelatorios, exportarRelatorios, carregarEstoqueLoja }
