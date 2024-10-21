import { adicionarPaginacao, esconderElementos, mostrarMenu } from "../utils.js"

function mostrarManutencao(){
    document.getElementById('manutencao').style.display = 'block'
    esconderElementos(['relatorios', 'envioTaloes', 'perfil', 'estoque', 'lojas', 'perfilUsuario'])
    adicionarPaginacao(dadosManutencaoGeral, renderizarTabelaManutencao, 'pagAntManutencao', 'proxPagManutencao', 'Manutencao')
    mostrarMenu()
}

const dadosManutencaoGeral = {
    paginaAtual: 1,
    itensPorPagina: 15,
    dadosManutencao: [
        { Remessa: '12545', dataEnvio: '12/05/2024', loja: 'Loja 1', quantidade: 50, recebimento: 'Wellington Tavares', dataEntrega: '2021-09-01',  status: 'enviado' },
        { Remessa: '12546', dataEnvio: '12/05/2024', loja: 'Loja 2', quantidade: 50, recebimento: 'Wellington Tavares', dataEntrega: '2021-09-01',  status: 'enviado' },
        { Remessa: '12547', dataEnvio: '12/05/2024', loja: 'Loja 3', quantidade: 50, recebimento: 'Wellington Tavares', dataEntrega: '2021-09-01',  status: 'enviado' },
        { Remessa: '12547', dataEnvio: '12/05/2024', loja: 'Loja 3', quantidade: 50, recebimento: 'Wellington Tavares', dataEntrega: '2021-09-01',  status: 'enviado' },
        { Remessa: '12547', dataEnvio: '12/05/2024', loja: 'Loja 3', quantidade: 50, recebimento: 'Wellington Tavares', dataEntrega: '2021-09-01',  status: 'enviado' },
        { Remessa: '12548', dataEnvio: '12/05/2024', loja: 'Loja 4', quantidade: 50, recebimento: 'Wellington Tavares', dataEntrega: '2021-09-01',  status: 'enviado' },
        { Remessa: '12548', dataEnvio: '12/05/2024', loja: 'Loja 4', quantidade: 50, recebimento: 'Wellington Tavares', dataEntrega: '2021-09-01',  status: 'enviado' },
        { Remessa: '12548', dataEnvio: '12/05/2024', loja: 'Loja 4', quantidade: 50, recebimento: 'Wellington Tavares', dataEntrega: '2021-09-01',  status: 'enviado' },
        { Remessa: '12548', dataEnvio: '12/05/2024', loja: 'Loja 4', quantidade: 50, recebimento: 'Wellington Tavares', dataEntrega: '2021-09-01',  status: 'enviado' },
        { Remessa: '12548', dataEnvio: '12/05/2024', loja: 'Loja 4', quantidade: 50, recebimento: 'Wellington Tavares', dataEntrega: '2021-09-01',  status: 'enviado' },
        { Remessa: '12548', dataEnvio: '12/05/2024', loja: 'Loja 4', quantidade: 50, recebimento: 'Wellington Tavares', dataEntrega: '2021-09-01',  status: 'enviado' },
        { Remessa: '12548', dataEnvio: '12/05/2024', loja: 'Loja 4', quantidade: 50, recebimento: 'Wellington Tavares', dataEntrega: '2021-09-01',  status: 'enviado' },
        { Remessa: '12548', dataEnvio: '12/05/2024', loja: 'Loja 4', quantidade: 50, recebimento: 'Wellington Tavares', dataEntrega: '2021-09-01',  status: 'enviado' },
        { Remessa: '12548', dataEnvio: '12/05/2024', loja: 'Loja 4', quantidade: 50, recebimento: 'Wellington Tavares', dataEntrega: '2021-09-01',  status: 'enviado' },
        { Remessa: '12548', dataEnvio: '12/05/2024', loja: 'Loja 4', quantidade: 50, recebimento: 'Wellington Tavares', dataEntrega: '2021-09-01',  status: 'enviado' },
        { Remessa: '12548', dataEnvio: '12/05/2024', loja: 'Loja 4', quantidade: 50, recebimento: 'Wellington Tavares', dataEntrega: '2021-09-01',  status: 'enviado' },
        { Remessa: '12548', dataEnvio: '12/05/2024', loja: 'Loja 4', quantidade: 50, recebimento: 'Wellington Tavares', dataEntrega: '2021-09-01',  status: 'enviado' },
        { Remessa: '12548', dataEnvio: '12/05/2024', loja: 'Loja 4', quantidade: 50, recebimento: 'Wellington Tavares', dataEntrega: '2021-09-01',  status: 'enviado' },
        { Remessa: '12548', dataEnvio: '12/05/2024', loja: 'Loja 4', quantidade: 50, recebimento: 'Wellington Tavares', dataEntrega: '2021-09-01',  status: 'enviado' },
        { Remessa: '12548', dataEnvio: '12/05/2024', loja: 'Loja 4', quantidade: 50, recebimento: 'Wellington Tavares', dataEntrega: '2021-09-01',  status: 'enviado' },
        { Remessa: '12548', dataEnvio: '12/05/2024', loja: 'Loja 4', quantidade: 50, recebimento: 'Wellington Tavares', dataEntrega: '2021-09-01',  status: 'enviado' },
        { Remessa: '12548', dataEnvio: '12/05/2024', loja: 'Loja 4', quantidade: 50, recebimento: 'Wellington Tavares', dataEntrega: '2021-09-01',  status: 'enviado' },
        { Remessa: '12548', dataEnvio: '12/05/2024', loja: 'Loja 4', quantidade: 50, recebimento: 'Wellington Tavares', dataEntrega: '2021-09-01',  status: 'enviado' },
    ]
}

function renderizarTabelaManutencao() {
    const tbody = document.getElementById('manutencao-tbody')
    tbody.innerHTML = ''

    const inicio = (dadosManutencaoGeral.paginaAtual - 1) * dadosManutencaoGeral.itensPorPagina
    const fim = inicio + dadosManutencaoGeral.itensPorPagina
    const paginaDados = dadosManutencaoGeral.dadosManutencao.slice(inicio, fim)

    paginaDados.forEach(item => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td data-label="Remessa">${item.Remessa}</td>
            <td data-label="Data do Envio">${item.dataEnvio}</td>
            <td data-label="Loja Destino">${item.loja}</td>
            <td data-label="Quantidade">${item.quantidade}</td>
            <td data-label="Recebimento">${item.recebimento}</td>
            <td data-label="Data de Entrega" id="DataEntregaManutencao${item.Remessa}">${item.dataEntrega}</td>
            <td data-label="Status" id="statusManutencao${item.Remessa}">${item.status}</td>
            <td data-label="Ações" class="acoes">
                <div id="containerBotaoAcaoManutencao${item.Remessa}">
                    <a href="#" class="botaoAcao" id="editarEnvioTalao${item.Remessa}"><i class="fas fa-edit"></i></a>
                    <a href="#" class="botaoAcao" id="excluirEnvioTalao${item.Remessa}"><i class="fas fa-trash-alt"></i></a>
                </div>
                <a href="#" class="botaoAcao" id="salvarEdicaoTalao${item.Remessa}" style="display: none;"><i class="fas fa-save"></i></a>
            </td>
        `
        tbody.appendChild(tr)

        // Eventos de clique
        document.getElementById(`editarEnvioTalao${item.Remessa}`).addEventListener('click', () => {
            editarEnvioTalao(item.Remessa)
        });
        document.getElementById(`excluirEnvioTalao${item.Remessa}`).addEventListener('click', () => {
            excluirEnvioTalao(item.Remessa)
        });
        document.getElementById(`salvarEdicaoTalao${item.Remessa}`).addEventListener('click', () => {
            salvarEdicaoTalao(item.Remessa)
        });
    })

    // botões de paginação
    document.getElementById('pagInfoManutencao').textContent = `Página ${dadosManutencaoGeral.paginaAtual} de ${Math.ceil(dadosManutencaoGeral.dadosManutencao.length / dadosManutencaoGeral.itensPorPagina)}`
    document.getElementById('pagAntManutencao').disabled = dadosManutencaoGeral.paginaAtual === 1
    document.getElementById('proxPagManutencao').disabled =  fim >= dadosManutencaoGeral.dadosManutencao.length
}

function editarEnvioTalao(remessa) {
    document.getElementById(`containerBotaoAcaoManutencao${remessa}`).style.display = 'none'
    document.getElementById(`salvarEdicaoTalao${remessa}`).style.display = 'block'

    var statusManutencao = document.getElementById(`statusManutencao${remessa}`)
    var dataEntrega = document.getElementById(`DataEntregaManutencao${remessa}`)

    statusManutencao.innerHTML = `
        <select id="select-statusManutencao${remessa}">
            <option value="enviado">Enviado</option>
            <option value="finalizado">Recebido</option>
        </select>
    `
    dataEntrega.innerHTML = `<input type="date" id="input-DataEntregaManutencao${remessa}">`
}

function salvarEdicaoTalao(remessa) {
    var statusManutencao = document.getElementById(`select-statusManutencao${remessa}`);
    var dataEntrega = document.getElementById(`input-DataEntregaManutencao${remessa}`);

    var newStatusManutencao = statusManutencao.options[statusManutencao.selectedIndex].text;
    var newDataEntrega = dataEntrega.value;

    document.getElementById(`statusManutencao${remessa}`).innerText = newStatusManutencao;
    document.getElementById(`DataEntregaManutencao${remessa}`).innerText = newDataEntrega;

    document.getElementById(`salvarEdicaoTalao${remessa}`).style.display = 'none';
    document.getElementById(`containerBotaoAcaoManutencao${remessa}`).style.display = 'block';
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

export { renderizarTabelaManutencao, dadosManutencaoGeral, mostrarManutencao, editarEnvioTalao, salvarEdicaoTalao, filtarLojaManutencao, filtarStatusManutencao, exportarManutencao, excluirEnvioTalao }