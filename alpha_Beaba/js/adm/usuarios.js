import { carregarDadosSelect } from "../utils.js"

let usuarios = []

async function fetchUsuarios() {
    try {
        const response = await fetch('http://localhost:5000/usuarios', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error('Erro ao buscar usuários')
        }

        usuarios = await response.json()
        renderizarTabelaUsuarios(usuarios)
    } catch (error) {
        console.error('Erro ao buscar usuários:', error)
        alert('Erro ao buscar usuários, consulte o Administrador do sistema')
    }
}

function renderizarTabelaUsuarios(usuariosParaRenderizar) {
    const tbody = document.getElementById('usuarios-tbody')
    tbody.innerHTML = ''

    let paginaAtual = 1
    let itensPorPagina = 13

    const inicio = (paginaAtual - 1) * itensPorPagina
    const fim = inicio + itensPorPagina
    const dadosLimitados = usuariosParaRenderizar.slice(inicio, fim)

    dadosLimitados.forEach(usuario => {
        const tr = document.createElement('tr')

        tr.innerHTML = `
            <td data-label="Matricula" id="perfil-matricula${usuario.matricula}">${usuario.matricula}</td>
            <td data-label="Nome do Perfil" id="perfil-nome${usuario.matricula}">${usuario.nome_usuario}</td>
            <td data-label="Tipo de Usuário" id="perfil-tipoUsuario${usuario.matricula}">${usuario.tipo_usuario}</td>
            <td data-label="Loja" id="perfil-loja${usuario.matricula}">${usuario.nome_loja}</td>
            <td data-label="Ações" class="acoes" id="acoes">
                <div id="containerBotaoAcao${usuario.matricula}">
                    <a href="#" class="botaoAcao" id="editarUsuarioPerfis${usuario.matricula}"><i class="fas fa-edit"></i></a>
                    <a href="#" class="botaoAcao" id="deletarUsuarioPerfis${usuario.matricula}"><i class="fas fa-trash-alt"></i></a>
                </div>
                <a href="#" class="botaoAcao" id="salvarEditarUsuario${usuario.matricula}" style="display: none"><i class="fas fa-save"></i></a>
            </td>
        `
        tbody.appendChild(tr)

        // eventos de click
        document.getElementById(`editarUsuarioPerfis${usuario.matricula}`).addEventListener('click', () => {
            editarUsuario(usuario.matricula)
        })
        document.getElementById(`deletarUsuarioPerfis${usuario.matricula}`).addEventListener('click', () => {
            deletarUsuario(usuario.matricula)
        })
        document.getElementById(`salvarEditarUsuario${usuario.matricula}`).addEventListener('click', () => {
            salvarEdicaoUsuario(usuario.matricula)
        })

        //botões de paginação
        document.getElementById('pagInfoUsuarios').textContent = `Página ${paginaAtual} de ${Math.ceil(usuariosParaRenderizar.length / itensPorPagina)}`
        document.getElementById('pagAntUsuarios').disabled = paginaAtual === 1
        document.getElementById('proxPagUsuarios').disabled = fim >= usuariosParaRenderizar.length
    })
}

//ordenação e filtros
function ordenarUsuarios(event) {
    const ordenarPor = event.target.value

    usuarios.sort((a, b) => {
        if (!a || !b) {
            return 0
        }
        if (!a.nome_usuario) {
            return 1 // Coloca 'a' no final se 'nome_usuario' for null ou undefined
        }
        if (!b.nome_usuario) {
            return -1 // Coloca 'b' no final se 'nome_usuario' for null ou undefined
        }
        if (ordenarPor === 'asc') {
            return a.nome_usuario.localeCompare(b.nome_usuario)
        } else {
            return b.nome_usuario.localeCompare(a.nome_usuario)
        }
    })
    renderizarTabelaUsuarios(usuarios)
}

function ordenarLojaUsuarios(event) {
    const ordenarPor = event.target.value

    usuarios.sort((a, b) => {
        if (!a || !b) {
            return 0
        }
        if (!a.nome_loja) {
            return 1 // Coloca 'a' no final se 'nome_loja' for null ou undefined
        }
        if (!b.nome_loja) {
            return -1 // Coloca 'b' no final se 'nome_loja' for null ou undefined
        }
        if (ordenarPor === 'asc') {
            return a.nome_loja.localeCompare(b.nome_loja)
        } else {
            return b.nome_loja.localeCompare(a.nome_loja)
        }
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

//salvar, edição e deletar
async function salvarUsuario() {
    const matricula = document.getElementById('matriculaUsuario').value
    const tipoUsuario = document.getElementById('tipoUsuario').value
    const loja = document.getElementById('lojaUsuario').value

    try {
        const response = await fetch('http://localhost:5000/cadastrarUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({matricula, tipoUsuario, loja})
        })

        if (response.ok){
            alert('Usuário cadastrado com sucesso')
            document.getElementById('matriculaUsuario').value = ''
            document.getElementById('tipoUsuario').value = ''
            document.getElementById('lojaUsuario').value = ''
        }

    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error)
        alert('Erro ao cadastrar usuário, consulte o Administrador do sistema')
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

function salvarEdicaoUsuario(matricula) {
    var inputNome = document.getElementById(`input-nome${matricula}`)
    var selectPermissoes = document.getElementById(`select-tipoUsuario${matricula}`)

    var newNome = inputNome.value
    var newPermissoes = selectPermissoes.options[selectPermissoes.selectedIndex].text

    document.getElementById(`perfil-nome${matricula}`).innerText = newNome
    document.getElementById(`perfil-tipoUsuario${matricula}`).innerText = newPermissoes

    document.getElementById(`salvarEditarUsuario${matricula}`).style.display = 'none'
    document.getElementById(`containerBotaoAcao${matricula}`).style.display = 'block'
    inputNome.remove()
    selectPermissoes.remove()
}

function deletarUsuario(matricula){
    alert('deletarUsuario')
}

// carregar selects
function carregarSelectsTipoUsuario(){
    carregarDadosSelect('tipoUsuario', 'http://localhost:5000/perfis', 'id_perfil_acesso', 'descricao')
}
function carregarSelectsCadastroUsuario(){
    carregarDadosSelect('lojaUsuario', 'http://localhost:5000/lojas', 'id_loja', 'nome_loja')
}



export {usuarios, carregarSelectsTipoUsuario, carregarSelectsCadastroUsuario, ordenarUsuarios, ordenarLojaUsuarios, fetchUsuarios, renderizarTabelaUsuarios, salvarUsuario, editarUsuario, salvarEdicaoUsuario, deletarUsuario, filtrarUsuarioNome }