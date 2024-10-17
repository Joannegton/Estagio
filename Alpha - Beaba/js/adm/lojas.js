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
    esconderElementos(['relatorios', 'envioTaloes', 'perfil', 'manutencao', 'estoque', 'perfilUsuario'])
    mostrarMenu()
}

function salvarLoja(){
    alert('Salvar loja')
}

function editarLoja(){
    document.getElementById('editarLoja').style.display = 'none'
    document.getElementById('salvarEditarLoja').style.display = 'block'

    var nomeLoja = document.getElementById('nomeLoja')
    var nome = nomeLoja.innerText

    nomeLoja.innerHTML = '<input type="text" id="input-nomeLoja" value="' + nome + '">'
}

function salvarEditarLoja(){
    var inputNome = document.getElementById('input-nomeLoja')
    var newNome = inputNome.value

    document.getElementById('nomeLoja').innerText = newNome

    document.getElementById('salvarEditarLoja').style.display = 'none'
    document.getElementById('editarLoja').style.display = 'block'
    inputNome.remove()
}

function ordenarLoja(){
    alert('Ordenar loja')
}

export { mostrarLojas, alternadorLojas, salvarLoja, editarLoja, salvarEditarLoja, ordenarLoja }