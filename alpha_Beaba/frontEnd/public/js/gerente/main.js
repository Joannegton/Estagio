import { mostrarPerfilAcesso, exportarPerfis, cadastrarPerfil, filtrarUsuarioNome } from './perfil.js'
import { mostrarRelatorios, exportarRelatorios, alternadorRelatorios } from './relatorio.js'
import { completeInformations, mostrarEditarLoja, salvarLoja } from './loja.js'
import { carregarCardUsuario, checkSession, esconderModalCarregamento, logout, mostrarMenu, mostrarModalCarregamento } from "../utils.js"
import { modalEditarSenha, mostrarPerfilUsuario, salvarEditarUsuario } from '../adm/perfilUsuario.js'


document.addEventListener('DOMContentLoaded', () => {
    // Identificar primeiro Acesso
    if(sessionStorage.getItem('mostrarPerfilUsuario') === 'true') {
        mostrarPerfilUsuario()
        sessionStorage.removeItem('mostrarPerfilUsuario')
    }

    // Menu
    if(window.innerWidth > 768){
        document.getElementById('menu').style.display = 'block'
    }

    document.getElementById('mostrarGestaoPerfil').addEventListener('click', async () => {
        mostrarModalCarregamento()
        try{
            await mostrarPerfilAcesso()
        } finally{
            esconderModalCarregamento()
        }
    })

    document.getElementById('mostrarGestaoLoja').addEventListener('click', async ()=> {
        mostrarModalCarregamento()
        try{
            await mostrarEditarLoja()
        }finally{
            esconderModalCarregamento()
        }
    })

    document.getElementById('mostrarGestaoRelatorio').addEventListener('click', async () => {
        mostrarModalCarregamento()
        try{
            await mostrarRelatorios()
        }finally{
            esconderModalCarregamento()
        }
    })

    document.getElementById('usuario-info').addEventListener('click', mostrarPerfilUsuario)
    document.getElementById('sair-usuario').addEventListener('click', async () => {
        mostrarModalCarregamento()
        try{
            await logout()
        } finally{
            esconderModalCarregamento()
        }
    })

    document.getElementById('menuButton').addEventListener('click', mostrarMenu)
    document.getElementById('fechar').addEventListener('click', mostrarMenu)
    

    // Ações relacionadas a relatorios
    document.getElementById('exportarRelatorios').addEventListener('click', exportarRelatorios)

    
    //carregamento da sessão inicial que é o Dashboard/relatorios
    window.onload = async () => {
        mostrarModalCarregamento()
        try {
            checkSession(2)
            carregarCardUsuario()
            await alternadorRelatorios()
            await completeInformations()
        } catch (error) {
            alert("Erro ao carregar dados")
        } finally{
            esconderModalCarregamento()
        }
    }

})


