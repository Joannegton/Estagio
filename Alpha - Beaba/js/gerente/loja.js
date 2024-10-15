import { esconderElementos, mostrarMenu } from "../utils.js"

function mostrarEditarLoja(){
    document.getElementById('editarLoja').style.display = 'block'
    esconderElementos(['estoqueTaloes', 'relatorios', 'perfilAcesso'])
    mostrarMenu()
}

function salvarLoja(){
    alert('Salvar loja')
}

export { mostrarEditarLoja, salvarLoja }
