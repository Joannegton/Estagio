import { ativarBotao, converterDataHoraParaBR, converterDataParaBR, desativarBotao, filtrarArray, mostrarElemento, ordenarArray } from "../../utils.js"

let envioTaloes = []

//funções de exibição
async function mostrarManutencao(){
    await mostrarElemento('manutencao', 'mostrarManutencao', fetchEnvioTaloes)
}

async function fetchEnvioTaloes() {
    try {
        const response = await fetch('http://localhost:3000/api/taloes')
        if(!response.ok){
            throw new Error('Erro ao buscar remessas')
        }

        envioTaloes = await response.json()
        renderizarTabelaManutencao(envioTaloes)
    } catch (error) {
        console.error('Erro ao buscar talões:', error) 
        //modificar
        alert('Erro ao buscar taloes, consulte o Administrador do sistema')
    }
}

function renderizarTabelaManutencao(listaTaloesEnviados) {
    const tbody = document.getElementById('manutencao-tbody')

    let paginaAtual = 1
    const itensPorPagina = 10

    function renderizarTabela(){
        const inicio = (paginaAtual - 1) * itensPorPagina
        const fim = inicio + itensPorPagina
        const dadosLimitados = listaTaloesEnviados.slice(inicio, fim)
        tbody.innerHTML = ''

        dadosLimitados.forEach(item => {
            const dataEnvio = converterDataHoraParaBR(item.data_envio)
            const dataRecebimentoPrevisto = converterDataParaBR(item.data_recebimento_previsto)
    
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td data-label="Remessa">${item.numero_remessa}</td>
                <td data-label="Data do Envio">${dataEnvio}</td>
                <td data-label="Loja Destino">${item.nome_loja}</td>
                <td data-label="Quantidade">${item.quantidade}</td>
                <td data-label="Recebimento">${item.nome_usuario}</td>
                <td data-label="Data de Entrega" id="DataEntregaManutencao${item.numero_remessa}">${dataRecebimentoPrevisto}</td>
                <td data-label="Status" id="statusManutencao${item.numero_remessa}">${item.status}</td>
                <td data-label="Ações" class="acoes">
                    <div id="containerBotaoAcaoManutencao${item.numero_remessa}">
                        <a href="#" class="botaoAcao" id="editarEnvioTalao${item.numero_remessa}" title="Editar"><i class="fas fa-edit"></i></a>
                        <a href="#" class="botaoAcao" id="excluirEnvioTalao${item.numero_remessa}" title="Exluir"><i class="fas fa-trash-alt"></i></a>
                    </div>
                    <div id="containerEditarBotaoAcaoManutencao${item.numero_remessa}" style="display: none;">
                        <a href="#" class="botaoAcao" id="salvarEdicaoTalao${item.numero_remessa}" title="Salvar"><i class="fas fa-save"></i></a>
                        <a href="#" class="botaoAcao" id="cancelarEditarTalao${item.numero_remessa}" title="Cancelar"><i class="fas fa-times"></i></a>
                    </div>
                </td>
            `
            tbody.appendChild(tr)
    
            // Eventos de clique
            document.getElementById(`editarEnvioTalao${item.numero_remessa}`).addEventListener('click', () => {
                editarEnvioTalao(item.numero_remessa)
            })
            document.getElementById(`excluirEnvioTalao${item.numero_remessa}`).addEventListener('click', () => {
                excluirEnvioTalao(item.numero_remessa)
            })
            document.getElementById(`salvarEdicaoTalao${item.numero_remessa}`).addEventListener('click', () => {
                salvarEdicaoTalao(item.numero_remessa)
            })
            document.getElementById(`cancelarEditarTalao${item.numero_remessa}`).addEventListener('click', () => {
                cancelarEdicao(item.numero_remessa)
            })
            
            // Estilização do status
            const status = document.getElementById(`statusManutencao${item.numero_remessa}`)
            if(status.innerText === 'Enviado'){
                status.style.backgroundColor = '#ffcf0f91'
            } else {
                status.style.backgroundColor = '#29ff3054'
            }
    
            // Estilização da data de entrega
            const dataEntregaElemento = document.getElementById(`DataEntregaManutencao${item.numero_remessa}`)
            const dataEntrega = new Date(item.data_recebimento_previsto)
            const dataAtual = new Date()
    
            if(dataEntrega < dataAtual && item.status === 'Enviado'){
                dataEntregaElemento.style.backgroundColor = '#fc48488e'
            }
    
        })
    
        // botões de paginação
        document.getElementById('pagInfoManutencao').textContent = `Página ${paginaAtual} de ${Math.ceil(listaTaloesEnviados.length / itensPorPagina)}`
        document.getElementById('pagAntManutencao').disabled = paginaAtual === 1
        document.getElementById('proxPagManutencao').disabled =  fim >= listaTaloesEnviados.length
    
    }

    // Evento de clique para paginação
    document.getElementById('proxPagManutencao').addEventListener('click', () => {
        if ((paginaAtual * itensPorPagina) < listaTaloesEnviados.length) {
            paginaAtual++
            renderizarTabela()
        }
    })
    document.getElementById('pagAntManutencao').addEventListener('click', () => {
        if (paginaAtual > 1) {
            paginaAtual--
            renderizarTabela()
        }
    })

    renderizarTabela()   

}

//edição e deletar remessa
function editarEnvioTalao(numero_remessa) {
    document.getElementById(`containerBotaoAcaoManutencao${numero_remessa}`).style.display = 'none'
    document.getElementById(`containerEditarBotaoAcaoManutencao${numero_remessa}`).style.display = 'block'

    var statusManutencao = document.getElementById(`statusManutencao${numero_remessa}`)
    let statusAtual = statusManutencao.innerText.trim()
    statusManutencao.setAttribute('data-original-value', statusAtual)
    statusManutencao.innerHTML = `
        <select id="select-statusManutencao${numero_remessa}">
            <option value="enviado" ${statusAtual === 'Enviado' ? 'selected' : ''}>Enviado</option>
            <option value="recebido" ${statusAtual === 'Recebido' ? 'selected' : ''}>Recebido</option>
        </select>
    `
    var dataEntrega = document.getElementById(`DataEntregaManutencao${numero_remessa}`)
    let dataAtual = dataEntrega.innerText
    dataEntrega.setAttribute('data-original-value', dataAtual)
    // Converte a data para o formato yyyy-mm-dd
    let partesData = dataAtual.split('/');
    let dataFormatada = `${partesData[2]}-${partesData[1]}-${partesData[0]}`;
    dataEntrega.innerHTML = `<input type="date" id="input-DataEntregaManutencao${numero_remessa}" value="${dataFormatada}">`;
}

async function salvarEdicaoTalao(numero_remessa) {
    desativarBotao(`salvarEdicaoTalao${numero_remessa}`)
    var statusManutencao = document.getElementById(`select-statusManutencao${numero_remessa}`)
    var dataEntrega = document.getElementById(`input-DataEntregaManutencao${numero_remessa}`)

    var newStatusManutencao = statusManutencao.options[statusManutencao.selectedIndex].text
    var newDataEntrega = dataEntrega.value
    
    const data = {
        data_recebimento_previsto: newDataEntrega,
        status: newStatusManutencao
    }

    try {
        const response = await fetch(`http://localhost:3000/api/taloes/${numero_remessa}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            alert(`Dados atualizado com sucesso`)
            statusManutencao.remove()
            dataEntrega.remove()
            await fetchEnvioTaloes()
            document.getElementById(`containerEditarBotaoAcaoManutencao${numero_remessa}`).style.display = 'none'
            document.getElementById(`containerBotaoAcaoManutencao${numero_remessa}`).style.display = 'block'
        } else{
            const errorData = await response.json()
            alert(`Erro ao atualizar: ${errorData.message || response.statusText}`)
        }
    
    } catch (error) {
        console.error('Erro ao atualizar manutenção:', error)
        alert('Erro ao atualizar os dados. Por favor, tente novamente mais tarde.')
    } finally {
        ativarBotao(`salvarEdicaoTalao${numero_remessa}`)
    }
}

function cancelarEdicao(numero_remessa) {
    const statusManutencao = document.getElementById(`statusManutencao${numero_remessa}`)
    const statusAtual = statusManutencao.getAttribute('data-original-value')
    statusManutencao.innerText = statusAtual

    var dataEntrega = document.getElementById(`DataEntregaManutencao${numero_remessa}`)
    var dataAtual = dataEntrega.getAttribute('data-original-value')
    dataEntrega.innerText = dataAtual

    document.getElementById(`containerEditarBotaoAcaoManutencao${numero_remessa}`).style.display = 'none'
    document.getElementById(`containerBotaoAcaoManutencao${numero_remessa}`).style.display = 'block'
}

async function excluirEnvioTalao(numero_remessa) {
    const confirmacao = confirm('Deseja realmente excluir esta Remessa?')
    desativarBotao(`excluirEnvioTalao${numero_remessa}`)

    if (confirmacao) {
        try {
            const response = await fetch(`http://localhost:3000/api/taloes/${numero_remessa}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.ok) {
                alert('Remessa deletada com sucesso')
                await fetchEnvioTaloes()
            } else {
                const errorData = await response.json()
                alert(`Erro ao deletar Remessa: ${errorData.message || response.statusText}`)
            }
        } catch (error) {
            console.error('Erro ao deletar remessa:', error)
            alert('Erro ao deletar remessa. Por favor, tente novamente mais tarde.')
        } finally {
            ativarBotao(`excluirEnvioTalao${numero_remessa}`)
        }
    } 
}

//filtros e ordenações
function filtarLojaManutencao(event) {
    const ordenarPor = event.target.value
    ordenarArray(envioTaloes, 'nome_loja', ordenarPor)
    renderizarTabelaManutencao(envioTaloes)
}

function filtarStatusManutencao(event) {
    const filtro = event.target.value
    const itensFiltrados = filtrarArray(envioTaloes, 'status', filtro, 'status')
    renderizarTabelaManutencao(itensFiltrados)
}

function filtrarNomeLojaManutencao(event){
    const filtro = event.target.value
    const itensFiltrados = filtrarArray(envioTaloes, 'nome_loja', filtro)
    renderizarTabelaManutencao(itensFiltrados)
}

function exportarManutencao() {
    alert('Exportando manutenção')
}

export { renderizarTabelaManutencao, filtrarNomeLojaManutencao, mostrarManutencao, editarEnvioTalao, salvarEdicaoTalao, filtarLojaManutencao, filtarStatusManutencao, exportarManutencao, excluirEnvioTalao }