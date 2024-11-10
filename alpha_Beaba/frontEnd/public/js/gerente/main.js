import { mostrarPerfilAcesso, exportarPerfis, cadastrarPerfil, filtrarUsuarioNome } from './perfil.js'
import { mostrarRelatorios, exportarRelatorios, alternadorRelatorios } from './relatorio.js'
import { mostrarPedidoTaloes, reporEstoque, exportarEstoque } from './estoque.js'
import { mostrarEditarLoja, salvarLoja } from './loja.js'
import { carregarCardUsuario, esconderModalCarregamento, logout, mostrarMenu, mostrarModalCarregamento } from "../utils.js"
import { modalEditarSenha, mostrarPerfilUsuario, salvarEditarUsuario } from '../adm/perfilUsuario.js'


document.addEventListener('DOMContentLoaded', () => {
    // Identificar primeiro Acesso
    if(sessionStorage.getItem('mostrarPerfilUsuario') === 'true') {
        mostrarPerfilUsuario()
        sessionStorage.removeItem('mostrarPerfilUsuario')
    }

    // Menu navegação
   /* document.getElementById('mostrarGestaoEstoque').addEventListener('click', async () =>{
        mostrarModalCarregamento()
        try{
            await mostrarPedidoTaloes()
        } finally{
            esconderModalCarregamento()
        }
    })*/

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


    // Estoque
    //document.getElementById('reporEstoque').addEventListener('click', reporEstoque)
    //document.getElementById('exportarEstoque').addEventListener('click', exportarEstoque)
    
    // Perfis
    document.getElementById('filtroUsuario').addEventListener('input', filtrarUsuarioNome)
    
    document.getElementById('exportarPerfis').addEventListener('click', exportarPerfis)
    
    document.getElementById('formCadUsuario').addEventListener('submit', async (e) => {
        e.preventDefault()
        mostrarModalCarregamento()
        try{
            await cadastrarPerfil()
        } finally{
            esconderModalCarregamento()
        }
    })

    // Ações relacionadas a Loja
    document.getElementById('formEditarLoja').addEventListener('submit', (e) => {
        e.preventDefault()
        salvarLoja()
    })

    // Ações relacionadas a relatorios
    document.getElementById('exportarRelatorios').addEventListener('click', exportarRelatorios)

    // perfil de usuario
    document.getElementById('formEditUsuario').addEventListener('submit', (e) =>{
        e.preventDefault()
        salvarEditarUsuario()
    })
    document.getElementById('botaoEditarSenha').addEventListener('click', modalEditarSenha)
    
    //carregamento da sessão inicial que é o Dashboard/relatorios
    window.onload = async () => {
        mostrarModalCarregamento()
        try {
            carregarCardUsuario()
            await alternadorRelatorios()
        } catch (error) {
            alert("Erro ao carregar dados")
        } finally{
            esconderModalCarregamento()
        }
    }

})


