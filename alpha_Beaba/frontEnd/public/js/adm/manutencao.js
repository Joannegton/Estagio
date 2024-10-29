import { adicionarPaginacao, converterDataHoraParaBR, converterDataParaBR, mostrarElemento } from "../../utils.js"

let envioTaloes = []

function mostrarManutencao(){
    mostrarElemento('manutencao', 'mostrarManutencao', () => {
        adicionarPaginacao( envioTaloes, fetchEnvioTaloes, 'pagAntManutencao', 'proxPagManutencao', 'Manutencao')
    })
}

async function fetchEnvioTaloes() {
    try {
        const response = await fetch('http://localhost:3000/api/taloes')

        if(!response.ok){
            throw new Error('Erro ao buscar envio de talões')
        }

        envioTaloes = await response.json()
        renderizarTabelaManutencao(envioTaloes)
    } catch (error) {
        console.error('Erro ao buscar envio de talões:', error) 
    }
}

function renderizarTabelaManutencao(listaTaloesEnviados) {
    const tbody = document.getElementById('manutencao-tbody')
    tbody.innerHTML = ''

    const paginaAtual = 1
    const itensPorPagina = 15

    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const dadosLimitados = listaTaloesEnviados.slice(inicio, fim)

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
                    <a href="#" class="botaoAcao" id="editarEnvioTalao${item.numero_remessa}"><i class="fas fa-edit"></i></a>
                    <a href="#" class="botaoAcao" id="excluirEnvioTalao${item.numero_remessa}"><i class="fas fa-trash-alt"></i></a>
                </div>
                <a href="#" class="botaoAcao" id="salvarEdicaoTalao${item.numero_remessa}" style="display: none;"><i class="fas fa-save"></i></a>
            </td>
        `
        tbody.appendChild(tr)

        // Eventos de clique
        document.getElementById(`editarEnvioTalao${item.numero_remessa}`).addEventListener('click', () => {
            editarEnvioTalao(item.numero_remessa)
        });
        document.getElementById(`excluirEnvioTalao${item.numero_remessa}`).addEventListener('click', () => {
            excluirEnvioTalao(item.numero_remessa)
        });
        document.getElementById(`salvarEdicaoTalao${item.numero_remessa}`).addEventListener('click', () => {
            salvarEdicaoTalao(item.numero_remessa)
        });
    })

    // botões de paginação
    document.getElementById('pagInfoManutencao').textContent = `Página ${paginaAtual} de ${Math.ceil(listaTaloesEnviados.length / itensPorPagina)}`
    document.getElementById('pagAntManutencao').disabled = paginaAtual === 1
    document.getElementById('proxPagManutencao').disabled =  fim >= listaTaloesEnviados.length
}

function editarEnvioTalao(numero_remessa) {
    document.getElementById(`containerBotaoAcaoManutencao${numero_remessa}`).style.display = 'none'
    document.getElementById(`salvarEdicaoTalao${numero_remessa}`).style.display = 'block'

    var statusManutencao = document.getElementById(`statusManutencao${numero_remessa}`)
    var dataEntrega = document.getElementById(`DataEntregaManutencao${numero_remessa}`)

    statusManutencao.innerHTML = `
        <select id="select-statusManutencao${numero_remessa}">
            <option value="enviado">Enviado</option>
            <option value="finalizado">Recebido</option>
        </select>
    `
    dataEntrega.innerHTML = `<input type="date" id="input-DataEntregaManutencao${numero_remessa}">`
}

function salvarEdicaoTalao(numero_remessa) {
    var statusManutencao = document.getElementById(`select-statusManutencao${numero_remessa}`);
    var dataEntrega = document.getElementById(`input-DataEntregaManutencao${numero_remessa}`);

    var newStatusManutencao = statusManutencao.options[statusManutencao.selectedIndex].text;
    var newDataEntrega = dataEntrega.value;

    document.getElementById(`statusManutencao${numero_remessa}`).innerText = newStatusManutencao;
    document.getElementById(`DataEntregaManutencao${numero_remessa}`).innerText = newDataEntrega;

    document.getElementById(`salvarEdicaoTalao${numero_remessa}`).style.display = 'none';
    document.getElementById(`containerBotaoAcaoManutencao${numero_remessa}`).style.display = 'block';
    statusManutencao.remove();
    dataEntrega.remove();
}

function excluirEnvioTalao() {
    alert('Excluindo envio de talão')
}

function filtarLojaManutencao() {
    alert('Filtrando loja')
}

function filtarStatusManutencao() {
    alert('Filtrando status')
}

function exportarManutencao() {
    alert('Exportando manutenção')
}

export { renderizarTabelaManutencao,  mostrarManutencao, editarEnvioTalao, salvarEdicaoTalao, filtarLojaManutencao, filtarStatusManutencao, exportarManutencao, excluirEnvioTalao }