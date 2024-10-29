import { alternador3, mostrarMenu, esconderElementos, mostrarElemento, enviarDados } from "../../utils.js"
import { carregarSelectsCadastroUsuario, carregarSelectsTipoUsuario, fetchUsuarios } from "./usuarios.js"

let perfis = []

function mostrarPerfil(){
    mostrarElemento('perfil', 'mostrarPerfil', ()=> {
        alternadorPerfil()
    })
}

function mostrarPerfilUsuario(){
    document.getElementById('perfilUsuario').style.display = 'block'
    esconderElementos(['envioTaloes', 'estoque', 'relatorios', 'manutencao', 'lojas', 'perfil'])
    mostrarMenu()
}

function alternadorPerfil() {
    fetchUsuarios()
    const usuarios = document.getElementById('usuarios')
    const cadastroUsuario = document.getElementById('cadastroUsuario')
    const perfisElemento = document.getElementById('perfis')

    usuarios.addEventListener('click', () => {
        alternador3(usuarios, [cadastroUsuario, perfisElemento], 'seletorUsuarios', ['seletorCadastro', 'seletorPerfis'], 'indicadorPerfis', 0)
        fetchUsuarios()
    })
    
    cadastroUsuario.addEventListener('click', () => {
        alternador3(cadastroUsuario, [usuarios, perfisElemento], 'seletorCadastro', ['seletorUsuarios', 'seletorPerfis'], 'indicadorPerfis', 1)
        carregarSelectsCadastroUsuario()
        carregarSelectsTipoUsuario()
    })
    
    perfisElemento.addEventListener('click', async () => {
        alternador3(perfisElemento, [usuarios, cadastroUsuario], 'seletorPerfis', ['seletorUsuarios', 'seletorCadastro'], 'indicadorPerfis', 2)
        await fetchPerfis()
        renderizarTabelaPerfis(perfis)
    })
}

function renderizarTabelaPerfis(perfisRenderizar){
    const tbody = document.getElementById('perfis-tbody')
    tbody.innerHTML = ''

    perfisRenderizar.forEach(perfil => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td data-label="Nome do Perfil" id="nome-perfil${perfil.id_perfil_acesso}">${perfil.perfil_descricao}</td>
            <td data-label="Permissões" id="perfil-permissoes${perfil.id_perfil_acesso}">
                <div class="container-permissoes">
                    <span class="visualizar" data-tipo="leitura" data-id="${perfil.id_perfil_acesso}">Leitura</span> | 
                    <span class="visualizar" data-tipo="escrita" data-id="${perfil.id_perfil_acesso}">Escrita</span> | 
                    <a href="#" class="botaoAcao" id="visualizarPermissoes${perfil.id_perfil_acesso}" style="margin-left: 5px"><i class="fas fa-eye"></i></a>
                </div>
            </td>
            <td data-label="Ações" class="acoes" id="acoesPerfis${perfil.id_perfil_acesso}">
                <div id="containerBotaoAcao">
                    <a href="#" class="botaoAcao" id="editarPerfis${perfil.id_perfil_acesso}"><i class="fas fa-edit"></i></a>
                    <a href="#" class="botaoAcao" id="deletarPerfis${perfil.id_perfil_acesso}"><i class="fas fa-trash-alt"></i></a>
                </div>
                <a href="#" class="botaoAcao" id="salvarEditarPerfis${perfil.id_perfil_acesso}" style="display: none"><i class="fas fa-save"></i></a>
            </td>
        `
        tbody.appendChild(tr)

        // eventos de click
        document.getElementById(`editarPerfis${perfil.id_perfil_acesso}`).addEventListener('click', () => {
            editarPerfil()
        })
        document.getElementById(`deletarPerfis${perfil.id_perfil_acesso}`).addEventListener('click', () => {
            deletarPerfil()
        })
        document.getElementById(`visualizarPermissoes${perfil.id_perfil_acesso}`).addEventListener('click', () => {
            modalVisualizarPermissoes()
        })
        document.getElementById(`salvarEditarPerfis${perfil.id_perfil_acesso}`).addEventListener('click', () => {
            salvarEditarPerfil()
        })

        // evento de mouseenter para mostrar permissões
        document.querySelectorAll(`#perfil-permissoes${perfil.id_perfil_acesso} .visualizar`).forEach(element => {
            element.addEventListener('mouseenter', function() {
                const tipo = this.getAttribute('data-tipo')
                const id = this.getAttribute('data-id')
                mostrarPermissoes(id, tipo)
            })
        })


    })
}

async function fetchPerfis() {
    try {
        const response = await fetch('http://localhost:3000/perfis')
        if (!response.ok) {
            throw new Error('Erro ao buscar perfis')
        }

        perfis = await response.json()
    } catch (error) {
        console.error('Erro ao buscar perfis:', error)
    }
}

// Perfil
async function salvarPerfil(){
    const formulario = document.getElementById('perfilCadastroForm')
    const formData = new FormData(formulario)

    const data = {
        nomePerfil: formData.get('nomePerfil'),
        permissoes: formData.getAll('permissoes')
    }

    const result = await enviarDados('http://localhost:3000/cadastrarPerfil', data)
    
    if(result.success){
        alert('Perfil cadastrado com sucesso!')
        formulario.reset()
    } else {
        alert('Erro ao cadastrar perfil.')
    }
}

function mostrarPermissoes(idPerfilAcesso, tipoPermissao){
    const perfil = perfis.find(p => p.id_perfil_acesso == idPerfilAcesso)

    const permissoes = {
        leitura: perfil.permissoes_leitura,
        escrita: perfil.permissoes_escrita
    }

    const data = permissoes[tipoPermissao]
    if (data){
        const element = document.querySelector(`.visualizar[data-id="${idPerfilAcesso}"][data-tipo="${tipoPermissao}"]`)
        element.setAttribute('data-content', data.join('\n')) // join - transforma o array em string separando por \n
    } else {
        console.error('Tipo de permissão não encontrado:', tipoPermissao)
    }
}

function modalVisualizarPermissoes(){
    document.getElementById('modalVisualizarPermissoes').style.display = 'flex'
}

function mostrarModalCadastroPerfil(){
    document.getElementById('addPerfil').style.display = 'flex'
    esconderElementos('tabelaPerfis')
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
    const confirmacao = confirm('Tem certeza que deseja deletar o perfil?')
    if (confirmacao) {
        alert('Perfil deletado com sucesso.')
    }
}

function exportarPerfis(){
    alert('exportarPerfis')
}

export { mostrarPerfil, mostrarPerfilUsuario, mostrarPermissoes, mostrarModalCadastroPerfil, salvarPerfil, mostrarModalEditPerfil, modalVisualizarPermissoes, editarPerfil, salvarEditarPerfil, deletarPerfil, exportarPerfis }