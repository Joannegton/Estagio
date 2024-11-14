import { ativarBotao, carregarDadosSelect, desativarBotao, filtrarPorNome, ordenarArray } from "../utils.js"
import { API_URL } from "../config/config.js"

let usuarios = []

// Visualização de sessoes
function renderizarTabelaUsuarios(usuariosParaRenderizar) {
    const tbody = document.getElementById('usuarios-tbody')
    tbody.innerHTML = ''

    let paginaAtual = 1
    let itensPorPagina = 10

    function renderizarPagina() {
        const inicio = (paginaAtual - 1) * itensPorPagina
        const fim = inicio + itensPorPagina
        const dadosLimitados = usuariosParaRenderizar.slice(inicio, fim)
        tbody.innerHTML = '' 

        dadosLimitados.forEach(usuario => {
            const tr = document.createElement('tr')

            tr.innerHTML = `
                <td data-label="Matricula" id="perfil-matricula${usuario.matricula}">${usuario.matricula}</td>
                <td data-label="Nome do Perfil" id="perfil-nome${usuario.matricula}">${usuario.nome_usuario}</td>
                <td data-label="Tipo de Usuário" id="perfil-tipoUsuario${usuario.matricula}">${usuario.tipo_usuario}</td>
                <td data-label="Loja" id="perfil-loja${usuario.matricula}">${usuario.nome_loja}</td>
                <td data-label="Ações" class="acoes" id="acoes">
                    <div id="containerBotaoAcao${usuario.matricula}">
                        <a href="#" class="botaoAcao" id="editarUsuarioPerfis${usuario.matricula}" title="Editar"><i class="fas fa-edit"></i></a>
                        <a href="#" class="botaoAcao" id="deletarUsuarioPerfis${usuario.matricula}" title="Excluir"><i class="fas fa-trash-alt"></i></a>
                    </div>
                    <div id="containerEditarBotaoAcaoUsuario${usuario.matricula}" style="display: none">
                        <a href="#" class="botaoAcao" id="salvarEditarUsuario${usuario.matricula}" title="Salvar"><i class="fas fa-save"></i></a>
                        <a href="#" class="botaoAcao" id="cancelarEditarUsuario${usuario.matricula}" title="Cancelar"><i class="fas fa-times"></i></a>
                    </div>
                </td>
            `
            tbody.appendChild(tr)

            // eventos de click
            document.getElementById(`editarUsuarioPerfis${usuario.matricula}`).addEventListener('click', async () => {
                await editarUsuario(usuario.matricula)
            })
            document.getElementById(`salvarEditarUsuario${usuario.matricula}`).addEventListener('click', async () => {
                await salvarEdicaoUsuario(usuario.matricula)
            })
            document.getElementById(`cancelarEditarUsuario${usuario.matricula}`).addEventListener('click', () => {
                cancelarEditar(usuario.matricula)
            })
            document.getElementById(`deletarUsuarioPerfis${usuario.matricula}`).addEventListener('click', async () => {
                deletarUsuario(usuario.matricula)
            })
        })

        // botões de paginação
        document.getElementById('pagInfoUsuarios').textContent = `Página ${paginaAtual} de ${Math.ceil(usuariosParaRenderizar.length / itensPorPagina)}`
        document.getElementById('pagAntUsuarios').disabled = paginaAtual === 1
        document.getElementById('proxPagUsuarios').disabled = fim >= usuariosParaRenderizar.length
    }

    // Eventos de clique para paginação
    document.getElementById('pagAntUsuarios').addEventListener('click', () => {
        if (paginaAtual > 1) {
            paginaAtual--
            renderizarPagina()
        }
    })

    document.getElementById('proxPagUsuarios').addEventListener('click', () => {
        if ((paginaAtual * itensPorPagina) < usuariosParaRenderizar.length) {
            paginaAtual++
            renderizarPagina()
        }
    })

    // Renderiza a primeira página
    renderizarPagina()
}

//buscar informações de usuarios
async function fetchUsuarios() {
    try {
        const response = await fetch(`${API_URL}/usuarios`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        if (!response.ok) {
            throw new Error('Erro ao buscar usuários')
        }

        usuarios = await response.json()
        renderizarTabelaUsuarios(usuarios)
    } catch (error) {
        console.error('Erro ao buscar usuários:', error)
        //modificar
        alert('Erro ao buscar usuários, consulte o Administrador do sistema')
    }
}

//salvar, edição e deletar
async function createUser() {
    desativarBotao('submitButtonUser')
    const formulario = document.getElementById('formCadUsuario')
    const formData = new FormData(formulario)

    const data = { 
        matricula: formData.get('matriculaUsuario'), 
        nome: formData.get('nomeUsuario'),
        tipoUsuario: formData.get('tipoUsuario'), 
        loja: formData.get('lojaUsuario') 
    }

    if (!data.matricula || !data.tipoUsuario) {
        alert('Matrícula e tipo de usuário são obrigatórios')
        return
    }

    if (data.tipoUsuario == 2) {
        try {
            const gerenteExistente = await verificarGerenteExistente(data.loja)
            if (gerenteExistente) {
                alert('Já existe um gerente cadastrado para esta loja')
                return
            }
        } catch (error) {
            console.error('Erro ao verificar gerente existente:', error)
            alert('Ocorreu um erro ao verificar o gerente existente')
            return
        }
    }

    try {
        const response = await fetch(`${API_URL}/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            alert('Usuário cadastrado com sucesso.')
            formulario.reset()
        } else {
            const errorData = await response.json()
            alert(errorData.message || 'Erro ao cadastrar usuário')
            return
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error)
        alert('Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.')
    } finally {
        ativarBotao('submitButtonUser')
    }
}

async function editarUsuario(matricula) {
    document.getElementById(`containerBotaoAcao${matricula}`).style.display = 'none'
    document.getElementById(`containerEditarBotaoAcaoUsuario${matricula}`).style.display = 'block'   

    const perfilNome = document.getElementById(`perfil-nome${matricula}`)
    var nome = perfilNome.innerText
    perfilNome.setAttribute('data-original-value', nome)
    perfilNome.innerHTML = `<input type="text" id="input-nome${matricula}" value="${nome}">`
    
    const perfil = document.getElementById(`perfil-tipoUsuario${matricula}`)
    let tipoUsuario = perfil.innerText
    perfil.setAttribute('data-original-value', tipoUsuario)
    perfil.innerHTML = `
        <select id="select-tipoUsuario${matricula}">
            <option>${tipoUsuario}</option>
        </select>
    `

    try {
        await carregarDadosSelect(`select-tipoUsuario${matricula}`, `${API_URL}/perfis`, 'id_perfil_acesso', 'perfil_descricao')
        const select = document.getElementById(`select-tipoUsuario${matricula}`)
        const options = select.options
        for (let i = 0; i < options.length; i++) {
            if (options[i].text === tipoUsuario) {
                select.value = options[i].value
                break
            }
        }
    } catch (error) {
        console.error('Erro ao carregar os dados do select:', error)
        alert('Erro ao carregar os dados do select. Por favor, tente novamente mais tarde.')
    }
}

async function salvarEdicaoUsuario(matricula) {
    desativarBotao(`salvarEditarUsuario${matricula}`)
    const inputNome = document.getElementById(`input-nome${matricula}`)
    const selectTipoUsuario = document.getElementById(`select-tipoUsuario${matricula}`)

    const newNome = inputNome.value.trim()
    const newTipoText = selectTipoUsuario.options[selectTipoUsuario.selectedIndex].text
    const newTipoValue = selectTipoUsuario.value

    document.getElementById(`perfil-nome${matricula}`).innerText = newNome
    document.getElementById(`perfil-tipoUsuario${matricula}`).innerText = newTipoText

    const data = {
        nome_usuario: newNome,
        id_perfil_acesso: newTipoValue
    }

    try {
        const response = await fetch(`${API_URL}/usuarios/${matricula}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            alert(`${newNome} atualizado com sucesso`)
            inputNome.remove()
            selectTipoUsuario.remove()
            document.getElementById(`containerEditarBotaoAcaoUsuario${matricula}`).style.display = 'none'
            document.getElementById(`containerBotaoAcao${matricula}`).style.display = 'block'
        } else {
            const errorData = await response.json()
            alert(`Erro ao atualizar usuário: ${errorData.message || response.statusText}`)
        }
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error)
        alert('Erro ao atualizar usuário. Por favor, tente novamente mais tarde.')
    } finally {
        ativarBotao(`salvarEditarUsuario${matricula}`)
    }
}

function cancelarEditar(matricula) {
    const perfilNome = document.getElementById(`perfil-nome${matricula}`)
    perfilNome.innerText = perfilNome.getAttribute('data-original-value')

    const perfil = document.getElementById(`perfil-tipoUsuario${matricula}`)
    perfil.innerText = perfil.getAttribute('data-original-value')

    document.getElementById(`containerEditarBotaoAcaoUsuario${matricula}`).style.display = 'none'
    document.getElementById(`containerBotaoAcao${matricula}`).style.display = 'block'

}

async function deletarUsuario(matricula) {
    desativarBotao(`deletarUsuarioPerfis${matricula}`)
    const confirmacao = confirm('Deseja realmente excluir este usuário?')
    if (confirmacao) {
        try {
            const response = await fetch(`${API_URL}/usuarios/${matricula}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                'authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })

            if (response.ok) {
                alert('Usuário deletado com sucesso')
                await fetchUsuarios()
            } else {
                const errorData = await response.json()
                alert(`Erro ao deletar usuário: ${errorData.message || response.statusText}`)
            }
        } catch (error) {
            console.error('Erro ao deletar usuário:', error)
            alert('Erro ao deletar usuário. Por favor, tente novamente mais tarde.')
        } finally{
            ativarBotao(`deletarUsuarioPerfis${matricula}`)
        }
    } else{
        ativarBotao(`deletarUsuarioPerfis${matricula}`)
    }
}

// carregar selects
async function carregarSelectsCadastroUsuario() {
    try {
        await carregarDadosSelect('tipoUsuario', `${API_URL}/perfis`, 'id_perfil_acesso', 'perfil_descricao');
        await carregarDadosSelect('lojaUsuario', `${API_URL}/loja`, 'cod_loja', 'nome_loja');
    } catch (error) {
        console.error('Erro ao carregar selects de cadastro de usuário:', error);
    }
}

//ordenação e filtros
function ordenarUsuarios(event) {
    const ordenarPor = event.target.value
    ordenarArray(usuarios, 'nome_usuario', ordenarPor)
    renderizarTabelaUsuarios(usuarios)
}

function ordenarLojaUsuarios(event) {
    const ordenarPor = event.target.value
    ordenarArray(usuarios, 'nome_loja', ordenarPor)
    renderizarTabelaUsuarios(usuarios)
}

function filtrarUsuarioNome(event) {
    const filtro = event.target.value
    const usuariosFiltrados = filtrarPorNome(usuarios, 'nome_usuario', filtro)
    renderizarTabelaUsuarios(usuariosFiltrados)
}

async function verificarGerenteExistente(loja) {
    try {
        const response = await fetch(`${API_URL}/loja/${loja}`)
        if (!response.ok) {
            throw new Error('Erro ao verificar gerente existente')
        }
        const data = await response.json()
        return data.gerente_id != null
    } catch (error) {
        console.error('Erro ao verificar gerente existente:', error)
        alert('Erro ao verificar gerente existente. Por favor, tente novamente mais tarde.')
        return false
    }
}

export { carregarSelectsCadastroUsuario, ordenarUsuarios, ordenarLojaUsuarios, fetchUsuarios, createUser, filtrarUsuarioNome }