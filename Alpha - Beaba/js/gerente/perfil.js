import { esconderElementos, alternador } from "../utils.js";

function alternadorPerfilAcesso() {
    const perfil = document.getElementById('mostrarPerfis');
    const cadastroPerfil = document.getElementById('mostrarCadastro');

    perfil.addEventListener('click', () => {
        alternador(perfil, perfil, cadastroPerfil, 'seletorPerfis', 'seletorCadastro', 'indicadorPerfil');
    });

    cadastroPerfil.addEventListener('click', () => {
        alternador(cadastroPerfil, perfil, cadastroPerfil, 'seletorCadastro', 'seletorPerfis', 'indicadorPerfil');
    });
}

function mostrarPerfilAcesso(){
    document.getElementById('perfilAcesso').style.display = 'block';
    esconderElementos(['estoqueTaloes', 'relatorios', 'editarLoja']);
}

function buscarNome() {
    const input = document.getElementById('filtroUsuario');
    /*const filtro = input.value.toLowerCase();
    const lista = document.getElementById('listaUsuarios');
    const usuarios = lista.getElementsByTagName('li');

    // Percorre a lista de usuários e oculta aqueles que não correspondem ao filtro
    for (let i = 0; i < usuarios.length; i++) {
        let usuario = usuarios[i].textContent || usuarios[i].innerText;

        if (usuario.toLowerCase().indexOf(filtro) > -1) {
            usuarios[i].style.display = ""; // Mostra o usuário
        } else {
            usuarios[i].style.display = "none"; // Oculta o usuário
        }
    }*/
    alert('Buscar nome');
}

function exportarPerfis(){
    alert('Exportar Perfis');
}

function cadastroMassa() {
    const botao = document.getElementById('cadastrarMassa');
    if (botao.innerHTML === 'Cadastro em Massa') {
        document.getElementById('cadastroSimples').style.display = 'none';
        document.getElementById('cadastroMassa').style.display = 'flex';
        botao.innerHTML = 'Cadastro unitário';
    } else {
        document.getElementById('cadastroSimples').style.display = 'block';
        document.getElementById('cadastroMassa').style.display = 'none';
        botao.innerHTML = 'Cadastro em Massa';
    }
}

export { 
    alternadorPerfilAcesso, 
    mostrarPerfilAcesso, 
    buscarNome,
    exportarPerfis, 
    cadastroMassa 
}
