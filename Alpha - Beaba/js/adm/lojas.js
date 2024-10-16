import { alternador, esconderElementos, mostrarMenu } from "../utils.js"

function alternadorLojas(){
    const lojas = document.getElementById('todasLojas');
    const cadastroLoja = document.getElementById('cadastroLoja');

    lojas.addEventListener('click', () => {
        alternador(lojas, lojas, cadastroLoja, 'seletorLojas', 'seletorCadastroLoja', 'indicadorLojas');
    })
    cadastroLoja.addEventListener('click', () => {
        alternador(lojas, cadastroLoja, lojas, 'seletorCadastroLoja', 'seletorLojas', 'indicadorLojas');
    })
}

function mostrarLojas(){
    document.getElementById('lojas').style.display = 'block'
    esconderElementos(['relatorios', 'envioTaloes', 'perfil', 'manutencao', 'estoque'])
    mostrarMenu()
}

export { mostrarLojas, alternadorLojas }