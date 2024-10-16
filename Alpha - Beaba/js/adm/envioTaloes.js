import { esconderElementos, mostrarMenu } from "../utils.js"

function mostrarEnvioTaloes(){
    document.getElementById('envioTaloes').style.display = 'block'
    esconderElementos(['relatorios', 'estoque', 'perfil', 'manutencao', 'lojas'])
    mostrarMenu()
}

function enviarTalao(){
    alert('talão enviado')
}



export { mostrarEnvioTaloes, enviarTalao }