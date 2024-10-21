import { esconderElementos, mostrarMenu } from "../utils.js"

function mostrarPedidoTaloes() {
    document.getElementById('estoqueTaloes').style.display = 'block'
    esconderElementos(['relatorios', 'perfilAcesso', 'editarLoja'])
    mostrarMenu()
}

function reporEstoque(){
    alert('Repor estoque')
}

function exportarEstoque(){
    alert('Exportar estoque')
}


export { mostrarPedidoTaloes, reporEstoque, exportarEstoque }
