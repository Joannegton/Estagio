import { esconderElementos, alternador, mostrarMenu } from "../utils.js"

function mostrarRelatorios() {
    document.getElementById('relatorios').style.display = 'block'
    esconderElementos(['estoqueTaloes', 'perfilAcesso', 'editarLoja'])
    mostrarMenu()
}

function alternadorRelatorios() {
    const saidas = document.getElementById('mostrarSaidas')
    const entradas = document.getElementById('mostrarEntradas')

    saidas.addEventListener('click', () => {
        alternador(saidas, saidas, entradas, 'saidas', 'entradas', 'indicadorRelatorio')
    })

    entradas.addEventListener('click', () => {
        alternador(entradas, saidas, entradas, 'entradas', 'saidas', 'indicadorRelatorio')
    })
}

function exportarRelatorios(){
    alert('Exportar relatorios')
}


function alterarStatus(){
    document.getElementById('statusRemessa').innerText = 'Recebido'
}


export { mostrarRelatorios, alternadorRelatorios, exportarRelatorios, alterarStatus }
