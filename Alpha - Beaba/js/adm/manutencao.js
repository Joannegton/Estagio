import { esconderElementos, mostrarMenu } from "../utils.js"

function mostrarManutencao(){
    document.getElementById('manutencao').style.display = 'block'
    esconderElementos(['relatorios', 'envioTaloes', 'perfil', 'estoque', 'lojas', 'perfilUsuario'])
    mostrarMenu()
}

function editarEnvioTalao() {
    document.getElementById('containerBotaoAcaoManutencao').style.display = 'none'
    document.getElementById('salvarEdicaoTalao').style.display = 'block'

    var statusManutencao = document.getElementById('statusManutencao')
    var dataEntrega = document.getElementById('DataEntregaManutencao')

    statusManutencao.innerHTML = `
        <select id="select-statusManutencao">
            <option value="enviado">Enviado</option>
            <option value="finalizado">Recebido</option>
        </select>
    `
    dataEntrega.innerHTML = '<input type="date" id="input-DataEntregaManutencao">'

}

function salvarEdicaoTalao() {
    var statusManutencao = document.getElementById('select-statusManutencao');
    var dataEntrega = document.getElementById('input-DataEntregaManutencao');

    var newStatusManutencao = statusManutencao.options[statusManutencao.selectedIndex].text;
    var newDataEntrega = dataEntrega.value;

    document.getElementById('statusManutencao').innerText = newStatusManutencao;
    document.getElementById('DataEntregaManutencao').innerText = newDataEntrega;

    document.getElementById('salvarEdicaoTalao').style.display = 'none';
    document.getElementById('containerBotaoAcaoManutencao').style.display = 'block';
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

export { mostrarManutencao, editarEnvioTalao, salvarEdicaoTalao, filtarLojaManutencao, filtarStatusManutencao, exportarManutencao, excluirEnvioTalao }