import { alternador, alternador3, mostrarMenu, esconderElementos, adicionarPaginacao } from "../utils.js"

function mostrarPerfil(){
    document.getElementById('perfil').style.display = 'block'
    esconderElementos(['envioTaloes', 'estoque', 'relatorios', 'manutencao', 'lojas', 'perfilUsuario'])
    adicionarPaginacao(dadosUsuarioGeral, renderizarTabelaUsuarios, 'pagAntUsuarios', 'proxPagUsuarios', 'Usuario' )
    mostrarMenu()
}

function mostrarPerfilUsuario(){
    document.getElementById('perfilUsuario').style.display = 'block'
    esconderElementos(['envioTaloes', 'estoque', 'relatorios', 'manutencao', 'lojas', 'perfil'])
    mostrarMenu()
}

const dadosUsuarioGeral = {
    paginaAtual: 1,
    itensPorPagina: 13,
    dadosUsuario: [
        { matricula: '123456', nome_perfil: 'Wellington Tavares Galbarini', tipoUsuario: 'Administrador' },
        { matricula: '654321', nome_perfil: 'Marcelo D3 da Silva', tipoUsuario: 'Gerente' },
        { matricula: '112233', nome_perfil: 'Ana Beatriz Oliveira', tipoUsuario: 'Caixa' },
        { matricula: '334455', nome_perfil: 'Carlos Henrique Souza', tipoUsuario: 'Caixa' },
        { matricula: '556677', nome_perfil: 'Joana Maria Santos', tipoUsuario: 'Administrador' },
        { matricula: '778899', nome_perfil: 'Roberto Lima Costa', tipoUsuario: 'Caixa' },
        { matricula: '998877', nome_perfil: 'Fernanda Alves Pereira', tipoUsuario: 'Gerente' },
        { matricula: '121314', nome_perfil: 'Lucas Mendes Ferreira', tipoUsuario: 'Caixa' },
        { matricula: '141516', nome_perfil: 'Juliana Prado Martins', tipoUsuario: 'Supervisor' },
        { matricula: '171819', nome_perfil: 'Ricardo Fagundes Torres', tipoUsuario: 'Administrador' },
        { matricula: '202122', nome_perfil: 'Maria Clara Araújo', tipoUsuario: 'Caixa' },
        { matricula: '232425', nome_perfil: 'Paulo Sérgio Ramos', tipoUsuario: 'Gerente' },
        { matricula: '262728', nome_perfil: 'Thiago Gomes Silva', tipoUsuario: 'Caixa' },
        { matricula: '293031', nome_perfil: 'Amanda Costa Rodrigues', tipoUsuario: 'Caixa' },
        { matricula: '323334', nome_perfil: 'Felipe Nogueira Lima', tipoUsuario: 'Gerente' }

    ]
}

function renderizarTabelaUsuarios(){
    const tbody = document.getElementById('usuarios-tbody')
    tbody.innerHTML = ''

    const inicio = (dadosUsuarioGeral.paginaAtual -1) * dadosUsuarioGeral.itensPorPagina
    const fim = inicio + dadosUsuarioGeral.itensPorPagina
    const dadosLimitados = dadosUsuarioGeral.dadosUsuario.slice(inicio, fim)

    dadosLimitados.forEach(item => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td data-label="Matricula" id="perfil-matricula${item.matricula}">${item.matricula}</td>
            <td data-label="Nome do Perfil" id="perfil-nome${item.matricula}">${item.nome_perfil}</td>
            <td data-label="Tipo de Usuário" id="perfil-tipoUsuario${item.matricula}">${item.tipoUsuario}</td>
            <td data-label="Ações" class="acoes" id="acoes">
                <div id="containerBotaoAcao${item.matricula}">
                    <a href="#" class="botaoAcao" id="editarUsuarioPerfis${item.matricula}"><i class="fas fa-edit"></i></a>
                    <a href="#" class="botaoAcao" id="deletarUsuarioPerfis${item.matricula}"><i class="fas fa-trash-alt"></i></a>
                </div>
                <a href="#" class="botaoAcao" id="salvarEditarUsuario${item.matricula}" style="display: none;"><i class="fas fa-save"></i></a>
            </td>
        `
        tbody.appendChild(tr)

        // eventos de click
        document.getElementById(`editarUsuarioPerfis${item.matricula}`).addEventListener('click', () => {
            editarUsuario(item.matricula)
        })
        document.getElementById(`deletarUsuarioPerfis${item.matricula}`).addEventListener('click', () => {
            deletarUsuario(item.matricula)
        })
        document.getElementById(`salvarEditarUsuario${item.matricula}`).addEventListener('click', () => {
            salvarEdicaoUsuario(item.matricula)
        })
        
        //botões de paginação
        document.getElementById('pagInfoUsuarios').textContent = `Página ${dadosUsuarioGeral.paginaAtual} de ${Math.ceil(dadosUsuarioGeral.dadosUsuario.length / dadosUsuarioGeral.itensPorPagina)}`
        document.getElementById('pagAntUsuarios').disabled = dadosUsuarioGeral.paginaAtual === 1
        document.getElementById('proxPagUsuarios').disabled =  fim >= dadosUsuarioGeral.dadosUsuario.length

    })
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

function editarUsuario(matricula) {
    document.getElementById(`containerBotaoAcao${matricula}`).style.display = 'none'
    document.getElementById(`salvarEditarUsuario${matricula}`).style.display = 'block'   

    var perfilNome = document.getElementById(`perfil-nome${matricula}`)
    var permissoes = document.getElementById(`perfil-tipoUsuario${matricula}`)
    var nome = perfilNome.innerText

    perfilNome.innerHTML = `<input type="text" id="input-nome${matricula}" value="${nome }">`;
    permissoes.innerHTML = `
        <select id="select-tipoUsuario${matricula}">
            <option value="todas">Administrador</option>
            <option value="manutencao">Gerente</option>
            <option value="estoque">Caixa</option>
        </select>
    `
}

function salvarEdicaoUsuario(matricula) {
    var inputNome = document.getElementById(`input-nome${matricula}`)
    var selectPermissoes = document.getElementById(`select-tipoUsuario${matricula}`)

    var newNome = inputNome.value
    var newPermissoes = selectPermissoes.options[selectPermissoes.selectedIndex].text

    document.getElementById(`perfil-nome${matricula}`).innerText = newNome
    document.getElementById(`perfil-tipoUsuario${matricula}`).innerText = newPermissoes;

    document.getElementById(`salvarEditarUsuario${matricula}`).style.display = 'none';
    document.getElementById(`containerBotaoAcao${matricula}`).style.display = 'block';
    inputNome.remove();
    selectPermissoes.remove();
}

function deletarUsuario(matricula){
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
