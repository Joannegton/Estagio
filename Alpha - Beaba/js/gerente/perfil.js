import { esconderElementos, alternador, mostrarMenu } from "../utils.js"

function mostrarPerfilAcesso(){
    document.getElementById('perfilAcesso').style.display = 'block'
    esconderElementos(['estoqueTaloes', 'relatorios', 'editarLoja'])
    mostrarMenu()
}

function mostrarPerfilUsuario(){
    document.getElementById('perfilUsuario').style.display = 'block'
    esconderElementos(['estoqueTaloes', 'relatorios', 'editarLoja', 'perfilAcesso'])
    mostrarMenu()
}

function alternadorPerfilAcesso() {
    const perfil = document.getElementById('mostrarPerfis')
    const cadastroPerfil = document.getElementById('mostrarCadastro')

    perfil.addEventListener('click', () => {
        alternador(perfil, perfil, cadastroPerfil, 'seletorPerfis', 'seletorCadastro', 'indicadorPerfil')
    })

    cadastroPerfil.addEventListener('click', () => {
        alternador(cadastroPerfil, perfil, cadastroPerfil, 'seletorCadastro', 'seletorPerfis', 'indicadorPerfil')
    })
}

function buscarNome() {
    /*
    const input = document.getElementById('filtroUsuario')
    const filtro = input.value.toLowerCase()
    const lista = document.getElementById('listaUsuarios')
    const usuarios = lista.getElementsByTagName('li')

    // Percorre a lista de usuários e oculta aqueles que não correspondem ao filtro
    for (let i = 0; i < usuarios.length; i++) {
        let usuario = usuarios[i].textContent || usuarios[i].innerText

        if (usuario.toLowerCase().indexOf(filtro) > -1) {
            usuarios[i].style.display = "" // Mostra o usuário
        } else {
            usuarios[i].style.display = "none" // Oculta o usuário
        }
    }*/
    alert('Buscar nome')
}

function exportarPerfis(){
    alert('Exportar Perfis')
}

function cadastroMassa() {
    const botao = document.getElementById('cadastrarMassa')
    if (botao.innerHTML === 'Cadastro em Massa') {
        document.getElementById('cadastroSimples').style.display = 'none'
        document.getElementById('cadastroMassa').style.display = 'flex'
        botao.innerHTML = 'Cadastro unitário'
    } else {
        document.getElementById('cadastroSimples').style.display = 'block'
        document.getElementById('cadastroMassa').style.display = 'none'
        botao.innerHTML = 'Cadastro em Massa'
    }
}

function cadastrarPerfil(){
    alert('Cadastrar Perfil')
}

function mostrarInput(){
    document.getElementById('salvarEdicaoCaixa').style.display = 'block'
    esconderElementos(['BotaoAcaoPerfil'])

    let numeroCaixa = document.getElementById('numero-caixa')
    numeroCaixa.innerHTML = `
        <select id="select-numero-caixa">
            <option value="caixa 01">Caixa 01</option>
            <option value="caixa 02">Caixa 02</option>
            <option value="caixa 03">Caixa 03</option>
        </select>
    `
}

function salvarEdicaoCaixa(){
    let selectNumeroCaixa = document.getElementById('select-numero-caixa')
    let novoNumeroCaixa = selectNumeroCaixa.value

    document.getElementById('numero-caixa').innerText = novoNumeroCaixa

    document.getElementById('salvarEdicaoCaixa').style.display = 'none'
    document.getElementById('BotaoAcaoPerfil').style.display = 'block'
    selectNumeroCaixa.remove()
}

function deletarPerfil(){
    alert('Deletar Perfil')
}

export { 
    alternadorPerfilAcesso, 
    mostrarPerfilAcesso, 
    mostrarPerfilUsuario,
    buscarNome,
    exportarPerfis, 
    cadastroMassa,
    cadastrarPerfil,
    mostrarInput,
    salvarEdicaoCaixa,
    deletarPerfil
}
