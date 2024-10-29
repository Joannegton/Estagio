import { carregarDadosSelect, enviarDados, mostrarElemento } from "../../utils.js"

function mostrarEnvioTaloes(){
    mostrarElemento('envioTaloes', 'mostrarEnvioTaloes', () => {
        carregarSelectsLojas()
        carregarSelectsFuncionarios()
    })
}

function enviarTalao(){
    const formulario = document.getElementById('formEnvioTalao')
    const formData = new FormData(formulario)

    const data = {
        lojaDestino: formData.get('lojaDestinataria'),
        dataEnvio: formData.get('dataHoraEvento'),
        quantidade: formData.get('quantidadeTaloes'),
        recebedor: formData.get('funcionarioRecebimento'),
        dataRecebimentoPrevisto: formData.get('dataEntregaPrevista')
    }

    const response = enviarDados('http://localhost:3000/enviarTaloes', data)
    if (response.success){
        alert('Talão enviado com sucesso')
        formulario.reset()
    } else {
        alert('Erro ao enviar talão, consulte o Administrador do sistema')
    }
}

function carregarSelectsLojas(){
    carregarDadosSelect('lojaDestinataria', 'http://localhost:3000/lojas', 'cod_loja', 'nome_loja')
}

function carregarSelectsFuncionarios(){
    carregarDadosSelect('funcionarioRecebimento', 'http://localhost:3000/usuarios', 'matricula', 'nome_usuario')
}


export { mostrarEnvioTaloes, enviarTalao }