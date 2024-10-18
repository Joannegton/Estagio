import { alternador, alternador3, mostrarMenu, esconderElementos } from "../utils.js"

function mostrarPerfil(){
    document.getElementById('perfil').style.display = 'block'
    esconderElementos(['envioTaloes', 'estoque', 'relatorios', 'manutencao', 'lojas', 'perfilUsuario'])
    mostrarMenu()
}

function mostrarPerfilUsuario(){
    document.getElementById('perfilUsuario').style.display = 'block'
    esconderElementos(['envioTaloes', 'estoque', 'relatorios', 'manutencao', 'lojas', 'perfil'])
    mostrarMenu()
}


function alternadorPerfil() {
    const usuarios = document.getElementById('usuarios');
    const cadastroUsuario = document.getElementById('cadastroUsuario');
    const perfis = document.getElementById('perfis');

    usuarios.addEventListener('click', () => {
        alternador3(usuarios, [cadastroUsuario, perfis], 'seletorUsuarios', ['seletorCadastro', 'seletorPerfis'], 'indicadorPerfis', 0);
    });
    
    cadastroUsuario.addEventListener('click', () => {
        alternador3(cadastroUsuario, [usuarios, perfis], 'seletorCadastro', ['seletorUsuarios', 'seletorPerfis'], 'indicadorPerfis', 1);
    });
    
    perfis.addEventListener('click', () => {
        alternador3(perfis, [usuarios, cadastroUsuario], 'seletorPerfis', ['seletorUsuarios', 'seletorCadastro'], 'indicadorPerfis', 2);
        mostrarPermissoes()
    });
}

// Usuario
function salvarUsuario() {
    alert('salvarUsuario')
}

function editarUsuario() {
    document.getElementById('containerBotaoAcao').style.display = 'none'
    document.getElementById('salvarEditarUsuario').style.display = 'block'   

    var perfilNome = document.getElementById('perfil-nome')
    var permissoes = document.getElementById('perfil-tipoUsuario')
    var nome = perfilNome.innerText

    perfilNome.innerHTML = '<input type="text" id="input-nome" value="' + nome + '">';
    permissoes.innerHTML = `
        <select id="select-tipoUsuario">
            <option value="todas">Administrador</option>
            <option value="manutencao">Gerente</option>
            <option value="estoque">Caixa</option>
        </select>
    `
}

function salvarEdicaoUsuario() {
    var inputNome = document.getElementById('input-nome')
    var selectPermissoes = document.getElementById('select-tipoUsuario')

    var newNome = inputNome.value
    var newPermissoes = selectPermissoes.options[selectPermissoes.selectedIndex].text

    document.getElementById('perfil-nome').innerText = newNome
    document.getElementById('perfil-tipoUsuario').innerText = newPermissoes;

    document.getElementById('salvarEditarUsuario').style.display = 'none';
    document.getElementById('containerBotaoAcao').style.display = 'block';
    inputNome.remove();
    selectPermissoes.remove();
}

function deletarUsuario(){
    alert('deletarUsuario')
}

function filtrarUsuarioNome(){
    alert('filtrarUsuarioNome')
}

// Perfil
function mostrarPermissoes(){
    const permissoes = {
        leitura: ['Perfis', 'Usuarios', 'Lojas', 'Estoque'],
        escrita: ['Perfis', 'Usuarios', 'Lojas']
    }

    document.querySelectorAll('.visualizar').forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tipo = this.getAttribute('data-tipo');
            const data = permissoes[tipo];
            if (data) {
                this.setAttribute('data-content', data.join(', '));
            } else {
                console.error('Tipo de permissão não encontrado:', tipo);
            }
        })
    })
}

function modalVisualizarPermissoes(){
    document.getElementById('modalVisualizarPermissoes').style.display = 'flex'
}

function mostrarModalCadastroPerfil(){
    document.getElementById('addPerfil').style.display = 'flex'
    esconderElementos('tabelaPerfis')
}

function salvarPerfil(){
    alert('salvarPerfil')
}

function mostrarModalEditPerfil(){
    document.getElementById('modalEditPerfil').style.display = 'flex'
}

function editarPerfil(){
    mostrarModalEditPerfil()
}

function salvarEditarPerfil(){
    alert('Perfil Editado')
}

function deletarPerfil(){
    const confirmacao = confirm('Tem certeza que deseja deletar o perfil?');
    if (confirmacao) {
        alert('Perfil deletado com sucesso.');
    }
}

function exportarPerfis(){
    alert('exportarPerfis')
}

export { modalVisualizarPermissoes, deletarPerfil, mostrarModalCadastroPerfil, editarPerfil, salvarEditarPerfil, salvarPerfil, salvarUsuario, deletarUsuario, editarUsuario, salvarEdicaoUsuario, mostrarPerfil, alternadorPerfil, filtrarUsuarioNome, exportarPerfis, mostrarPerfilUsuario }
