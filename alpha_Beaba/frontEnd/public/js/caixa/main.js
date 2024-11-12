import { carregarCardUsuario, completeInformationsPerfil, esconderModalCarregamento, logout, mostrarMenu, mostrarModalCarregamento } from "../utils.js"
import { modalEditarSenha, salvarEditarUsuario } from "../adm/perfilUsuario.js"
import { mostrarEnvioTaloes, mostrarPerfilUsuario, saidaTalao } from "./caixa.js"

document.addEventListener('DOMContentLoaded',() => {
    // Verifica se é o 1º acesso
    if (sessionStorage.getItem('mostrarPerfilUsuario') === 'true') {
        mostrarPerfilUsuario()
        sessionStorage.removeItem('mostrarPerfilUsuario')
    }

    // Menu
    if(window.innerWidth > 768){
        document.getElementById('menu').style.display = 'block'
    }

    document.getElementById('mostrarEnvioTaloes').addEventListener('click', mostrarEnvioTaloes)

    document.getElementById('usuario-info').addEventListener('click', mostrarPerfilUsuario)

    document.getElementById('sair-usuario').addEventListener('click', async () => {
        mostrarModalCarregamento()
        try{
            await logout()
        } finally{
            esconderModalCarregamento()
        }
    })

    // menu mobile
    document.getElementById('menuButton').addEventListener('click', mostrarMenu)
    document.getElementById('fechar').addEventListener('click', mostrarMenu)

    // saída de talão
    document.getElementById('formSaidaTalao').addEventListener('submit', async (e) => {
        e.preventDefault()
        mostrarModalCarregamento()
        try{
            await saidaTalao()
        } finally{
            esconderModalCarregamento()
        }
    })
    
    //perfil do usuario
    document.getElementById('formEditUsuario').addEventListener('submit', async (e) => {
        e.preventDefault()
        mostrarModalCarregamento()
        try{
            await salvarEditarUsuario()
        } finally{
            esconderModalCarregamento()
        }
    })

    document.getElementById('botaoEditarSenha').addEventListener('click', modalEditarSenha)


    window.onload = () => {
        carregarCardUsuario()
    }
})