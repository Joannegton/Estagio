import { alternador, esconderElementos, mostrarMenu } from "../utils.js"

function mostrarTaloes(){
    document.getElementById('taloes').style.display = 'block'
    esconderElementos(['relatorios', 'estoque', 'perfil', 'usuarios', 'lojas'])
    mostrarMenu()
}

function alternadorTaloes(){
    let manutencaoTaloes = document.getElementById('manutencaoTaloes')
    let envioTaloes = document.getElementById('envioTaloes')

    manutencaoTaloes.addEventListener('click', () => {
        alternador(manutencaoTaloes, manutencaoTaloes, envioTaloes, 'selectManutencao', 'selectEnvioTaloes', 'indicadorTaloes')
    })

    envioTaloes.addEventListener('click', () => {
        alternador(manutencaoTaloes, envioTaloes, manutencaoTaloes, 'selectEnvioTaloes', 'selectManutencao', 'indicadorTaloes')
    })
}

function enviarTalao(){
    alert('talão enviado')
}


// Manutenção de talões

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

export { mostrarTaloes, alternadorTaloes, enviarTalao, editarEnvioTalao, salvarEdicaoTalao, excluirEnvioTalao, filtarLojaManutencao, filtarStatusManutencao, exportarManutencao }