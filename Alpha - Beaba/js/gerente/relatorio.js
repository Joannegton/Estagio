import { esconderElementos, alternador } from "../utils.js";

function alternadorRelatorios() {
    const saidas = document.getElementById('mostrarSaidas');
    const entradas = document.getElementById('mostrarEntradas');

    saidas.addEventListener('click', () => {
        alternador(saidas, saidas, entradas, 'saidas', 'entradas', 'indicadorRelatorio');
    });

    entradas.addEventListener('click', () => {
        alternador(entradas, saidas, entradas, 'entradas', 'saidas', 'indicadorRelatorio');
    });
}

function mostrarRelatorios() {
    document.getElementById('relatorios').style.display = 'block';
    esconderElementos(['estoqueTaloes', 'perfilAcesso', 'editarLoja']);
}

export { mostrarRelatorios, alternadorRelatorios };
