import { esconderElementos, mostrarElemento, mostrarMenu } from "../utils.js"

function mostrarPedidoTaloes() {
    mostrarElemento('estoqueTaloes', 'mostrarGestaoEstoque', () => {
        
    })
}

function reporEstoque(){
    alert('Repor estoque')
}

function exportarEstoque(){
    alert('Exportar estoque')
}


export { mostrarPedidoTaloes, reporEstoque, exportarEstoque }
