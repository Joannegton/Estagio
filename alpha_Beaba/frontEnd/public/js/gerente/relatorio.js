import { esconderElementos, alternador, mostrarMenu, mostrarElemento } from "../../utils.js"

function mostrarRelatorios() {
    mostrarElemento('relatorios', 'mostrarGestaoRelatorio', () =>{
        alternadorRelatorios()
    })
}

function alternadorRelatorios() {
    const saidas = document.getElementById('mostrarSaidas')
    const entradas = document.getElementById('mostrarEntradas')

    saidas.addEventListener('click', () => {
        alternador(saidas, entradas, saidas, 'saidas', 'entradas', 'indicadorRelatorio')
    })

    entradas.addEventListener('click', () => {
        alternador(entradas, entradas, saidas, 'entradas', 'saidas', 'indicadorRelatorio')
    })
}

function exportarRelatorios(){
    alert('Exportar relatorios')
}


function alterarStatus(){
    document.getElementById('statusRemessa').innerText = 'Recebido'
}


export { mostrarRelatorios, alternadorRelatorios, exportarRelatorios, alterarStatus }
