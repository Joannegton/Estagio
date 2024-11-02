import { carregarDadosSelect, esconderElementos, mostrarMenu } from "../../utils.js"

let usuarios = []

// Visualização de sessoes
function mostrarPerfilUsuario(){
    document.getElementById('perfilUsuario').style.display = 'block'
    esconderElementos(['envioTaloes', 'estoque', 'relatorios', 'manutencao', 'lojas', 'perfil'])
    mostrarMenu()
}

function renderizarTabelaUsuarios(usuariosParaRenderizar) {
    const tbody = document.getElementById('usuarios-tbody')
    tbody.innerHTML = ''

    let paginaAtual = 1
    let itensPorPagina = 10

    function renderizarPagina() {
        const inicio = (paginaAtual - 1) * itensPorPagina
        const fim = inicio + itensPorPagina
        const dadosLimitados = usuariosParaRenderizar.slice(inicio, fim)

        tbody.innerHTML = '' // Limpa a tabela antes de renderizar a nova página

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
                    <a href="#" class="botaoAcao" id="salvarEditarUsuario${usuario.matricula}" title="Salvar" style="display: none"><i class="fas fa-save"></i></a>
                </td>
            `
            tbody.appendChild(tr)

            // eventos de click
            document.getElementById(`editarUsuarioPerfis${usuario.matricula}`).addEventListener('click', () => {
                editarUsuario(usuario.matricula)
            })
            document.getElementById(`salvarEditarUsuario${usuario.matricula}`).addEventListener('click', () => {
                salvarEdicaoUsuario(usuario.matricula)
            })
            document.getElementById(`deletarUsuarioPerfis${usuario.matricula}`).addEventListener('click', () => {
                deletarUsuario(usuario.matricula)
            })
        })

        // Atualiza informações de paginação
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
        const response = await fetch('http://localhost:3000/api/usuarios')
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
    const formulario = document.getElementById('formCadUsuario')
    const formData = new FormData(formulario)

    if (!data.matricula || !data.tipoUsuario) {
        alert('Matrícula e tipo de usuário são obrigatórios')
        return
    }
    const data = { 
        matricula: formData.get('matriculaUsuario'), 
        nome: formData.get('nomeUsuario'),
        tipoUsuario: formData.get('tipoUsuario'), 
        loja: formData.get('lojaUsuario') 
    }

    try {
        const response = await fetch('http://localhost:3000/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            alert('Usuário cadastrado com sucesso')
            formulario.reset()
        } else {
            const errorData = await response.json()
            alert(`Erro ao cadastrar usuário: ${errorData.message || response.statusText}`)
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error)
        alert('Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.')
    }
}

function editarUsuario(matricula) {
    document.getElementById(`containerBotaoAcao${matricula}`).style.display = 'none'
    document.getElementById(`salvarEditarUsuario${matricula}`).style.display = 'block'   

    var perfilNome = document.getElementById(`perfil-nome${matricula}`)
    var permissoes = document.getElementById(`perfil-tipoUsuario${matricula}`)
    var nome = perfilNome.innerText

    perfilNome.innerHTML = `<input type="text" id="input-nome${matricula}" value="${nome }">`
    permissoes.innerHTML = `
        <select id="select-tipoUsuario${matricula}">
            <option value="1">Administrador</option>
            <option value="2">Gerente</option>
            <option value="3">Caixa</option>
        </select>
    `
}

async function salvarEdicaoUsuario(matricula) {
    const inputNome = document.getElementById(`input-nome${matricula}`)
    const selectTipoUsuario = document.getElementById(`select-tipoUsuario${matricula}`)

    const newNome = inputNome.value.trim()
    const newTipoText = selectTipoUsuario.options[selectTipoUsuario.selectedIndex].text
    const newTipoValue = selectTipoUsuario.value

    if (!newTipoValue) {
        alert('Tipo de usuário é obrigatórios')
        return
    }

    document.getElementById(`perfil-nome${matricula}`).innerText = newNome
    document.getElementById(`perfil-tipoUsuario${matricula}`).innerText = newTipoText

    document.getElementById(`salvarEditarUsuario${matricula}`).style.display = 'none'
    document.getElementById(`containerBotaoAcao${matricula}`).style.display = 'block'

    const data = {
        nome_usuario: newNome,
        id_perfil_acesso: newTipoValue
    }

    try {
        const response = await fetch(`http://localhost:3000/api/usuarios/${matricula}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            alert(`${newNome} atualizado com sucesso`)
            inputNome.remove()
            selectTipoUsuario.remove()
        } else {
            const errorData = await response.json()
            alert(`Erro ao atualizar usuário: ${errorData.message || response.statusText}`)
        }
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error)
        alert('Erro ao atualizar usuário. Por favor, tente novamente mais tarde.')
    }
}

async function deletarUsuario(matricula) {
    const confirmacao = confirm('Deseja realmente excluir este usuário?')

    if (confirmacao) {
        try {
            const response = await fetch(`http://localhost:3000/api/usuarios/${matricula}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
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
        }
    }
}

// carregar selects
function carregarSelectsCadastroUsuario(){
    carregarDadosSelect('lojaUsuario', 'http://localhost:3000/api/lojas', 'cod_loja', 'nome_loja')
    carregarDadosSelect('tipoUsuario', 'http://localhost:3000/api/perfis', 'id_perfil_acesso', 'perfil_descricao')
}

//ordenação e filtros
function ordenarUsuarios(event) {
    const ordenarPor = event.target.value

    usuarios.sort((a, b) => {
        if (!a || !b) return 0
        if (!a.nome_usuario) return 1 // Coloca 'a' no final se 'nome_usuario' for null ou undefined
        if (!b.nome_usuario) return -1 // Coloca 'b' no final se 'nome_usuario' for null ou undefined
        return (ordenarPor === 'asc') ? a.nome_usuario.localeCompare(b.nome_usuario) : b.nome_usuario.localeCompare(a.nome_usuario)
    })
    renderizarTabelaUsuarios(usuarios)
}

function ordenarLojaUsuarios(event) {
    const ordenarPor = event.target.value

    usuarios.sort((a, b) => {
        if (!a || !b) return 0
        if (!a.nome_loja) return 1 // Coloca 'a' no final se 'nome_loja' for null ou undefined
        if (!b.nome_loja) return -1 // Coloca 'b' no final se 'nome_loja' for null ou undefined
        return ordenarPor === 'asc' ? a.nome_loja.localeCompare(b.nome_loja) : b.nome_loja.localeCompare(a.nome_loja)
    })
    renderizarTabelaUsuarios(usuarios)
}

function filtrarUsuarioNome(event) {
    const filtro = event.target.value.toLowerCase()
    const usuariosFiltrados = usuarios.filter(usuario => {
        return usuario && usuario.nome_usuario && usuario.nome_usuario.toLowerCase().includes(filtro) //verifica se o usuario existe e se o nome do usuario não é null
    })
    renderizarTabelaUsuarios(usuariosFiltrados)
}
export { mostrarPerfilUsuario, carregarSelectsCadastroUsuario, ordenarUsuarios, ordenarLojaUsuarios, fetchUsuarios, createUser, filtrarUsuarioNome }