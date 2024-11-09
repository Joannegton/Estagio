import { esconderElementos, alternador, mostrarMenu, mostrarElemento, desativarBotao, ativarBotao, filtrarPorNome } from "../../utils.js"

let usuarios = []

async function mostrarPerfilAcesso(){
    mostrarElemento('perfilAcesso', 'mostrarGestaoPerfil', alternadorPerfilAcesso)
}

async function alternadorPerfilAcesso() {
    const perfil = document.getElementById('mostrarPerfis')
    const cadastroPerfil = document.getElementById('mostrarCadastro')

    await fetchUsuarios()

    perfil.addEventListener('click', async () => {
        alternador(perfil, perfil, cadastroPerfil, 'seletorPerfis', 'seletorCadastro', 'indicadorPerfil')
        await fetchUsuarios()
    })

    cadastroPerfil.addEventListener('click', () => {
        alternador(cadastroPerfil, perfil, cadastroPerfil, 'seletorCadastro', 'seletorPerfis', 'indicadorPerfil')
    })
}

async function fetchUsuarios(){
    const cod_loja = localStorage.getItem('cod_loja')
    try {
        const response = await fetch(`http://localhost:3000/api/usuarios/loja/${cod_loja}`)

        if(!response.ok){
            const errorData = await response.json()
            alert(errorData.message)
        }

        usuarios = await response.json()
        renderizarTabelaUsuarios(usuarios)
    } catch (error) {
        console.error('Erro ao buscar dados', error)
        alert('Erro ao buscar usuarios, teste sua conexão')
    }
}

function renderizarTabelaUsuarios(listaUsuario){
    const tbody = document.getElementById('perfis-tbody')

    let paginaAtual = 1
    const itensPorPagina = 10

    function renderizarTabela(){
        const inicio = (paginaAtual - 1) * itensPorPagina
        const fim = inicio + itensPorPagina
        const dadosLimitados = listaUsuario.slice(inicio, fim)
        tbody.innerHTML = ''

        dadosLimitados.forEach(usuario => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td data-label="Matricula" id="perfil-matricula${usuario.matricula}">${usuario.matricula}</td>
                <td data-label="Nome do Perfil" id="perfil-nome${usuario.matricula}">${usuario.nome_usuario}</td>
                <td data-label="Ações" class="acoes">
                    <a href="#" class="botaoAcao" id="deletarPerfil${usuario.matricula}"><i class="fas fa-trash-alt"></i></a>
                </td>
            `
            tbody.appendChild(tr)

            // Evento de clique
            document.getElementById(`deletarPerfil${usuario.matricula}`).addEventListener('click', async () => {
                await excluirUsuario(usuario.matricula)
            })
        })

        // botões de paginação
        document.getElementById('pagInfoUsuarios').textContent = `Página ${paginaAtual} de ${Math.ceil(listaUsuario.length / itensPorPagina)}`
        document.getElementById('pagAntUsuarios').disabled = paginaAtual === 1
        document.getElementById('proxPagUsuarios').disabled =  fim >= listaUsuario.length
    }

    // Evento de clique para paginação
    document.getElementById('proxPagUsuarios').addEventListener('click', () => {
        if ((paginaAtual * itensPorPagina) < listaTaloesEnviados.length) {
            paginaAtual++
            renderizarTabela()
        }
    })
    document.getElementById('pagAntUsuarios').addEventListener('click', () => {
        if (paginaAtual > 1) {
            paginaAtual--
            renderizarTabela()
        }
    })

    renderizarTabela()
}


async function cadastrarPerfil(){
    desativarBotao("CadastrarPerfil")
    const formulario = document.getElementById('formCadUsuario')
    const formData = new FormData(formulario)

    const dados = {
        matricula: formData.get('matricula'),
        nome: formData.get('nomeUsuario'),
        loja: localStorage.getItem('cod_loja')
    }

    try {
        const response = await fetch('http://localhost:3000/api/usuarios', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })

        if(!response.ok){
            const errorData = await response.json()
            alert(errorData.message || 'Erro ao cadastrar usuário')
            return
        }

        alert('Usuário cadastrado com sucesso.')
        formulario.reset()
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error)
        alert('Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.')
    } finally{
        ativarBotao('CadastrarPerfil')
    }
}

async function excluirUsuario(matricula){
    desativarBotao(`deletarPerfil${matricula}`)
    const confirmacao = confirm(`Tem certeza que deseja excluir ${matricula}?`)
    if(confirmacao){
        try {
            const response = await fetch(`http://localhost:3000/api/usuarios/${matricula}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(!response.ok){
                const errorData = await response.json()
                alert(errorData.message)
            }

            alert('Usuario deletado com sucesso')
            await fetchUsuarios()
        } catch (error) {
            console.error('Erro ao deletar usuario: ', error)
            alert('Erro ao deletar usuario. Por favor, tente novamente mais tarde.')
        } finally{
            ativarBotao(`deletarPerfil${matricula}`)
        }

    }
}


function filtrarUsuarioNome(event) {
    const filtro = event.target.value
    const usuariosFiltrados = filtrarPorNome(usuarios, 'nome_usuario', filtro)
    renderizarTabelaUsuarios(usuariosFiltrados)
}

function exportarPerfis(){
    alert('Exportar Perfis')
}


export { 
    mostrarPerfilAcesso, 
    filtrarUsuarioNome,
    exportarPerfis, 
    cadastrarPerfil
}
