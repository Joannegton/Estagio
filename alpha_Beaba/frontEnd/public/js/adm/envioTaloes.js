import { carregarDadosSelect, enviarDados, mostrarElemento } from "../../utils.js"

function mostrarEnvioTaloes(){
    mostrarElemento('envioTaloes', 'mostrarEnvioTaloes', () => {
        carregarSelects()
    })
}

async function enviarTalao() {
    const formulario = document.getElementById('formEnvioTalao');
    const formData = new FormData(formulario);

    const data = {
        lojaDestino: formData.get('lojaDestinataria'),
        dataEnvio: formData.get('dataHoraEvento'),
        quantidade: formData.get('quantidadeTaloes'),
        recebedor: formData.get('funcionarioRecebimento'),
        dataRecebimentoPrevisto: formData.get('dataEntregaPrevista')
    };

    const response = await enviarDados('http://localhost:3000/api/enviarTaloes', data);

    if (response.success) {
        alert('Talão enviado com sucesso');
        formulario.reset();
    } else {
        alert(`Erro ao enviar talão: ${response.error}`);
    }
}


function carregarSelects(){
    carregarDadosSelect('lojaDestinataria', 'http://localhost:3000/api/lojas', 'cod_loja', 'nome_loja')
    carregarDadosSelect('funcionarioRecebimento', 'http://localhost:3000/api/usuarios', 'matricula', 'nome_usuario')
}



export { mostrarEnvioTaloes, enviarTalao }