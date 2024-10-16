import { alternador, esconderElementos, mostrarMenu } from "../utils.js"

function mostrarUsuarios(){
    document.getElementById('usuarios').style.display = 'block'
    esconderElementos(['relatorios', 'taloes', 'perfil', 'estoque', 'lojas'])
    mostrarMenu()
}

function alternadorUsuario(){
    const usuarios = document.getElementById('usuarios');
    const cadastroUsuario = document.getElementById('cadastroUsuario');

    usuarios.addEventListener('click', () => {
        alternador(usuarios, usuarios, cadastroUsuario, 'seletorUsuarios', 'seletorCadastroUsuario', 'indicadorPerfis')
    })

    cadastroUsuario.addEventListener('click', () => {
        alternador(cadastroUsuario, usuarios, cadastroUsuario, 'seletorCadastroUsuario', 'seletorUsuarios', 'indicadorPerfis')
    });
}


export { mostrarUsuarios, alternadorUsuario }