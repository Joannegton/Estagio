import { alternador3, ativarBotao, desativarBotao, esconderElementos, exportCsv, mostrarModalFinalizado } from "../../utils.js"
import { carregarSelectsCadastroUsuario, fetchUsuarios } from "./usuariosController.js"
import { API_URL } from "../../config/config.js"

let perfis = []


function mostrarModalCadastroPerfil(){
    document.getElementById('addPerfil').style.display = 'flex'
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
                    <a href="#" class="botaoAcao" id="editarPerfis${perfil.id_perfil_acesso}"><i class="fas fa-edit" title="Editar"></i></a>
                    <a href="#" class="botaoAcao" id="deletarPerfis${perfil.id_perfil_acesso}"><i class="fas fa-trash-alt" title="Excluir"></i></a>
                </div>
            </td>
        `
        tbody.appendChild(tr)

        // eventos de click
        document.getElementById(`editarPerfis${perfil.id_perfil_acesso}`).addEventListener('click', () => editarPerfil(perfil.id_perfil_acesso))
        document.getElementById(`deletarPerfis${perfil.id_perfil_acesso}`).addEventListener('click', () => deletarPerfil(perfil.id_perfil_acesso))
        document.getElementById(`visualizarPermissoes${perfil.id_perfil_acesso}`).addEventListener('click', () => visualizarPermissoes(perfil.id_perfil_acesso))
       

        // evento de mouseenter para mostrar permissões
        document.querySelectorAll(`#perfil-permissoes${perfil.id_perfil_acesso} .visualizar`).forEach(element => {
            element.addEventListener('mouseenter', function() {
                const tipo = this.getAttribute('data-tipo')
                const id = this.getAttribute('data-id')
                mostrarPermissoesMouseOver(id, tipo)
            })
        }) 
    })
}

// alternador de sessões (Usuários, Cadastro de Usuários e Perfis)
async function alternadorPerfil() {
    try {
        await fetchUsuarios()
        const usuarios = document.getElementById('usuarios')
        const cadastroUsuario = document.getElementById('cadastroUsuario')
        const perfisElemento = document.getElementById('perfis')
        
        usuarios.addEventListener('click', async () => {
            alternador3(usuarios, [cadastroUsuario, perfisElemento], 'seletorUsuarios', ['seletorCadastro', 'seletorPerfis'], 'indicadorPerfis', 0)
            await fetchUsuarios()
        })
        
        cadastroUsuario.addEventListener('click', async () => {
            alternador3(cadastroUsuario, [usuarios, perfisElemento], 'seletorCadastro', ['seletorUsuarios', 'seletorPerfis'], 'indicadorPerfis', 1)
            await carregarSelectsCadastroUsuario()
        })
        
        perfisElemento.addEventListener('click', async () => {
            alternador3(perfisElemento, [usuarios, cadastroUsuario], 'seletorPerfis', ['seletorUsuarios', 'seletorCadastro'], 'indicadorPerfis', 2)
            await fetchPerfis()
        })
    } catch (error) {
        console.error('Erro ao carregar dados', error)
        alert('Erro ao carregar dados, tente novamente mais tarde')
    }
}

// buscar informações de perfis
async function fetchPerfis() {
    try {
        const response = await fetch(`${API_URL}/perfis`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message)
        }

        perfis = await response.json()
        renderizarTabelaPerfis(perfis)
    } catch (error) {
        console.error('Erro ao buscar perfis:', error)
        alert('Erro ao carregar perfis, tente novamente mais tarde')
    }
}

// salvar, editar, deletar e exportar perfis
async function salvarPerfil(){
    desativarBotao('submitButtonPerfil')
    const formulario = document.getElementById('perfilCadastroForm')
    const formData = new FormData(formulario)

    if (!formData.get('nomePerfil') || formData.getAll('permissoes').length === 0) {
        alert('Nome do perfil e Permissões são obrigatórios')
        return
    }
    const data = {
        nomePerfil: formData.get('nomePerfil'),
        permissoes: formData.getAll('permissoes')
    }

    try {
        const result = await fetch(`${API_URL}/perfis`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    
        if (!result.ok) {
            const errorData = await result.json()
            console.error(errorData.message)
        } 
        mostrarModalFinalizado()
        esconderElementos(['addPerfil'])
        formulario.reset()
        await fetchPerfis()
    } catch (error) {
        console.error('Erro ao salvar perfil:', error)
        alert('Erro ao salvar perfil. Por favor, tente novamente mais tarde.')     
    } finally {
        ativarBotao('submitButtonPerfil')
    }
}

function editarPerfil(idPerfilAcesso){
    const perfil = perfis.find(p => p.id_perfil_acesso == idPerfilAcesso)
    if(!perfil){
        alert('Perfil não encontrado')
        return
    }

    const { permissoes_escrita, permissoes_leitura, perfil_descricao } = perfil


    document.getElementById('nomePerfilTituloEdit').innerHTML = perfil_descricao

    // Marcar os checkboxes de acordo com as permissões do perfil
    const checkboxes = document.querySelectorAll('#formSalvarEditarPermissoes input[type="checkbox"]')
    checkboxes.forEach(checkbox => {
        const [tipo, modulo] = checkbox.value.split('_')
        checkbox.checked = tipo === 'leitura' ? permissoes_leitura.includes(modulo) : permissoes_escrita.includes(modulo)
    })

    // Armazenar o idPerfilAcesso no formulário
    document.getElementById('formSalvarEditarPermissoes').dataset.idPerfilAcesso = idPerfilAcesso

    // Mostra o modal de edição
    document.getElementById('modalEditPerfil').style.display = 'flex'
}

async function salvarEditarPerfil(idPerfilAcesso) {
    desativarBotao('submitButtonPerfilPermissoes')
    const formulario = document.getElementById('formSalvarEditarPermissoes')
    const formData = new FormData(formulario)

    const data = {
        permissoes: formData.getAll('permissoes')
    }

    try {
        const result = await fetch(`${API_URL}/perfis/${idPerfilAcesso}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    
        if (!result.ok) {
            const errorMessage = await result.text()
            console.error(errorMessage)
        }

        mostrarModalFinalizado()
        document.getElementById('modalEditPerfil').style.display = 'none'
        await fetchPerfis()
    } catch (error) {
        console.error('Erro ao salvar perfil:', error)
        alert('Erro ao salvar perfil. Por favor, tente novamente mais tarde.')     
        
    } finally {
        ativarBotao('submitButtonPerfilPermissoes')
    }
}

async function deletarPerfil(idPerfilAcesso){
    desativarBotao(`deletarPerfis${idPerfilAcesso}`)
    const confirmacao = confirm('Tem certeza que deseja deletar o perfil?')
    if (confirmacao) {
        try {
            const response = await fetch(`${API_URL}/perfis/${idPerfilAcesso}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok){
                const errorData = await response.json()
                throw new Error(errorData.message)
            }

            mostrarModalFinalizado()
            await fetchPerfis()
        } catch (error) {
            console.error('Erro ao deletar perfil: ', error)
            alert('Erro ao deletar perfil. Por favor, tente novamente mais tarde.')
        } finally {
            ativarBotao(`deletarPerfis${idPerfilAcesso}`)
        }
    }  
}

// vizualição de permissões
function mostrarPermissoesMouseOver(idPerfilAcesso, tipoPermissao){
    const perfil = perfis.find(p => p.id_perfil_acesso == idPerfilAcesso)

    if (!perfil){
        console.error('Perfil não encontrado:', idPerfilAcesso)
        return
    }

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

function visualizarPermissoes(idPerfilAcesso) {
    const perfil = perfis.find(p => p.id_perfil_acesso == idPerfilAcesso)
    if (!perfil) {
        alert('Perfil não encontrado')
        return
    }

    const { permissoes_escrita, permissoes_leitura, perfil_descricao } = perfil


    document.getElementById('nomePerfilTitulo').innerHTML = perfil_descricao

    // Marcar os checkboxes de acordo com as permissões do perfil e desabilitá-los
    const checkboxes = document.querySelectorAll('#corpoTabelaPermissoes input[type="checkbox"]')
    checkboxes.forEach(checkbox => {
        const [tipo, modulo] = checkbox.value.split('_')
        checkbox.checked = tipo === 'leitura' ? permissoes_leitura.includes(modulo) : permissoes_escrita.includes(modulo)
        checkbox.disabled = true // Desabilitar os checkboxes
    })

    // Mostrar o modal de visualização
    document.getElementById('modalVisualizarPermissoes').style.display = 'flex'
}


function exportarPerfis(){
    exportCsv(perfis, 'perfil')
}

export { alternadorPerfil, mostrarPermissoesMouseOver, mostrarModalCadastroPerfil, salvarPerfil,  salvarEditarPerfil, deletarPerfil, exportarPerfis }