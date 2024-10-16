import { esconderElementos, mostrarMenu } from "../utils.js"

function mostrarEstoque(){
    document.getElementById('estoque').style.display = 'block'
    esconderElementos(['relatorios', 'envioTaloes', 'perfil', 'manutencao', 'lojas'])
    mostrarMenu()
}

function filtrarLoja(){
    alert('filtrando loja')
}

function exportarEstoque(){
    alert('exportando estoque')
}

export { mostrarEstoque, filtrarLoja, exportarEstoque }