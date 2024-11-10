import { mostrarElemento } from "../utils.js"

async function mostrarPedidoTaloes() {
    await mostrarElemento('estoque', 'mostrarGestaoEstoque', () => {
        
    })
}

function reporEstoque(){
    alert('Repor estoque')
}

function exportarEstoque(){
    alert('Exportar estoque')
}


export { mostrarPedidoTaloes, reporEstoque, exportarEstoque }
