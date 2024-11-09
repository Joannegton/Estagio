import { esconderElementos, alternador, mostrarMenu, mostrarElemento, desativarBotao, ativarBotao } from "../../utils.js"

async function mostrarPerfilAcesso(){
    await mostrarElemento('perfilAcesso', 'mostrarGestaoPerfil', () =>{
        alternadorPerfilAcesso()
    })
}



function alternadorPerfilAcesso() {
    const perfil = document.getElementById('mostrarPerfis')
    const cadastroPerfil = document.getElementById('mostrarCadastro')

    perfil.addEventListener('click', () => {
        alternador(perfil, perfil, cadastroPerfil, 'seletorPerfis', 'seletorCadastro', 'indicadorPerfil')
    })

    cadastroPerfil.addEventListener('click', () => {
        alternador(cadastroPerfil, perfil, cadastroPerfil, 'seletorCadastro', 'seletorPerfis', 'indicadorPerfil')
    })
}

function buscarNome() {
    /*
    const input = document.getElementById('filtroUsuario')
    const filtro = input.value.toLowerCase()
    const lista = document.getElementById('listaUsuarios')
    const usuarios = lista.getElementsByTagName('li')

    // Percorre a lista de usuários e oculta aqueles que não correspondem ao filtro
    for (let i = 0; i < usuarios.length; i++) {
        let usuario = usuarios[i].textContent || usuarios[i].innerText

        if (usuario.toLowerCase().indexOf(filtro) > -1) {
            usuarios[i].style.display = "" // Mostra o usuário
        } else {
            usuarios[i].style.display = "none" // Oculta o usuário
        }
    }*/
    alert('Buscar nome')
}

function exportarPerfis(){
    alert('Exportar Perfis')
}

function cadastroMassa() {
    const botao = document.getElementById('cadastrarMassa')
    if (botao.innerHTML === 'Cadastro em Massa') {
        document.getElementById('cadastroSimples').style.display = 'none'
        document.getElementById('cadastroMassa').style.display = 'flex'
        botao.innerHTML = 'Cadastro unitário'
    } else {
        document.getElementById('cadastroSimples').style.display = 'block'
        document.getElementById('cadastroMassa').style.display = 'none'
        botao.innerHTML = 'Cadastro em Massa'
    }
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
    console.log(localStorage.getItem('cod_loja'))

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

function mostrarInput(){
    document.getElementById('salvarEdicaoCaixa').style.display = 'block'
    esconderElementos(['BotaoAcaoPerfil'])

    let numeroCaixa = document.getElementById('numero-caixa')
    numeroCaixa.innerHTML = `
        <select id="select-numero-caixa">
            <option value="caixa 01">Caixa 01</option>
            <option value="caixa 02">Caixa 02</option>
            <option value="caixa 03">Caixa 03</option>
        </select>
    `
}

function salvarEdicaoCaixa(){
    let selectNumeroCaixa = document.getElementById('select-numero-caixa')
    let novoNumeroCaixa = selectNumeroCaixa.value

    document.getElementById('numero-caixa').innerText = novoNumeroCaixa

    document.getElementById('salvarEdicaoCaixa').style.display = 'none'
    document.getElementById('BotaoAcaoPerfil').style.display = 'block'
    selectNumeroCaixa.remove()
}

function deletarPerfil(){
    alert('Deletar Perfil')
}

export { 
    alternadorPerfilAcesso, 
    mostrarPerfilAcesso, 
    buscarNome,
    exportarPerfis, 
    cadastroMassa,
    cadastrarPerfil,
    mostrarInput,
    salvarEdicaoCaixa,
    deletarPerfil
}
