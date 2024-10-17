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
    esconderElementos(['editarLoja'])
    document.getElementById('salvarEditarLoja').style.display = 'block'

    let nomeLoja = document.getElementById('nomeLoja')
    let nome = nomeLoja.innerText

    let qntCaixas = document.getElementById('qntCaixas')
    let qnt = parseInt(qntCaixas.innerText)

    nomeLoja.innerHTML = '<input type="text" id="input-nomeLoja" value="' + nome + '">'
    qntCaixas.innerHTML = '<input type="number" id="input-qntCaixas" value="' + qnt + '">'
    
}

function salvarEditarLoja(){
    let inputNome = document.getElementById('input-nomeLoja')
    let newNome = inputNome.value

    let inputQnt = document.getElementById('input-qntCaixas')
    let novaQnt = inputQnt.value

    document.getElementById('nomeLoja').innerText = newNome
    document.getElementById('qntCaixas').innerText = novaQnt

    esconderElementos(['salvarEditarLoja'])
    document.getElementById('editarLoja').style.display = 'block'
    inputNome.remove()
    inputQnt.remove()
}

function ordenarLoja(){
    alert('Ordenar loja')
}

function exportarLojas(){
    alert('Exportar lojas')
}


export { mostrarLojas, exportarLojas, alternadorLojas, salvarLoja, editarLoja, salvarEditarLoja, ordenarLoja }