import { alternador, converterDataHoraParaBR, converterDataParaBR, mostrarElemento } from "../../utils.js"

let remessas = []
function mostrarRelatorios() {
    mostrarElemento('relatorios', 'mostrarGestaoRelatorio',  () =>{
        alternadorRelatorios()
    })
}

async function alternadorRelatorios() {
    const saidas = document.getElementById('mostrarSaidas')
    const entradas = document.getElementById('mostrarEntradas')
    await fetchRemessa()
    await carregarEstoqueLoja()
    saidas.addEventListener('click', () => {
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
        const response = await fetch(`http://localhost:3000/api/estoque/${codLoja}`)
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message)
        }

        const estoque = await response.json()
        
        document.getElementById('quantidadeEstoque').innerHTML = estoque.quantidade_disponivel

    } catch (error) {
        
    }
}
async function fetchRemessa() {
    try {
        const codLoja = localStorage.getItem('cod_loja')
        const response = await fetch(`http://localhost:3000/api/taloes/${codLoja}`)
        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message)
        }
        remessas = await response.json()
        renderizarEntradas(remessas)
    } catch (error) {
        console.error('Erro ao buscar remessas:', error.stack) 
        //modificar
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

            document.getElementById(`alterarStatus${item.numero_remessa}`).addEventListener('click', () =>{receberRemessa(item.numero_remessa)})
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
        const response = await fetch(`http://localhost:3000/api/taloes/${remessa}`, {
            method: 'PUT',
            headers:{
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({status: 'Recebido'})
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

function exportarRelatorios(){
    alert('Exportar relatorios')
}






export { mostrarRelatorios, alternadorRelatorios, exportarRelatorios, carregarEstoqueLoja }
