import { alternador, alternador3, mostrarMenu, esconderElementos } from "../utils.js"

function mostrarPerfil(){
    document.getElementById('perfil').style.display = 'block'
    esconderElementos(['envioTaloes', 'estoque', 'relatorios', 'manutencao', 'lojas'])
    mostrarMenu()
}

function alternadorPerfil() {
    const perfis = document.getElementById('perfis');
    const cadastroPerfil = document.getElementById('cadastroPerfis');
    const tipoPerfil = document.getElementById('cadastroTipoPerfil');

    perfis.addEventListener('click', () => {
        alternador3(perfis, [cadastroPerfil, tipoPerfil], 'seletorPerfis', ['seletorCadastro', 'seletorTipoPerfil'], 'indicadorPerfis', 0);
    });
    
    cadastroPerfil.addEventListener('click', () => {
        alternador3(cadastroPerfil, [perfis, tipoPerfil], 'seletorCadastro', ['seletorPerfis', 'seletorTipoPerfil'], 'indicadorPerfis', 1);
    });
    
    tipoPerfil.addEventListener('click', () => {
        alternador3(tipoPerfil, [perfis, cadastroPerfil], 'seletorTipoPerfil', ['seletorPerfis', 'seletorCadastro'], 'indicadorPerfis', 2);
    });
}


function editarPerfil() {
    document.getElementById('containerBotaoAcao').style.display = 'none'
    
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

    document.getElementById('salvar').style.display = 'block'   
}

function salvarPerfil() {
    var inputNome = document.getElementById('input-nome')
    var selectPermissoes = document.getElementById('select-tipoUsuario')

    var newNome = inputNome.value
    var newPermissoes = selectPermissoes.options[selectPermissoes.selectedIndex].text

    document.getElementById('perfil-nome').innerText = newNome
    document.getElementById('perfil-tipoUsuario').innerText = newPermissoes;

    document.getElementById('salvar').style.display = 'none';
    document.getElementById('containerBotaoAcao').style.display = 'block';
    inputNome.remove();
    selectPermissoes.remove();
}

export { editarPerfil, salvarPerfil, mostrarPerfil, alternadorPerfil }
