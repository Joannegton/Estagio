import { mostrarPerfilAcesso, buscarNome, exportarPerfis, cadastroMassa, cadastrarPerfil, mostrarInput, salvarEdicaoCaixa, deletarPerfil } from './perfil.js'
import { mostrarRelatorios, exportarRelatorios, alternadorRelatorios } from './relatorio.js'
import { mostrarPedidoTaloes, reporEstoque, exportarEstoque } from './estoque.js'
import { mostrarEditarLoja, salvarLoja } from './loja.js'
import { carregarCardUsuario, esconderModalCarregamento, logout, mostrarMenu, mostrarModalCarregamento } from "../../utils.js"
import { modalEditarSenha, mostrarPerfilUsuario, salvarEditarUsuario } from '../adm/perfilUsuario.js'


document.addEventListener('DOMContentLoaded', () => {
    // Identificar primeiro Acesso
    if(sessionStorage.getItem('mostrarPerfilUsuario') === 'true') {
        mostrarPerfilUsuario()
        sessionStorage.removeItem('mostrarPerfilUsuario')
    }

    // Menu navegação
    document.getElementById('mostrarGestaoEstoque').addEventListener('click', async () =>{
        try{
            await mostrarPedidoTaloes()
        } finally{
            esconderModalCarregamento()
        }
    })

    document.getElementById('mostrarGestaoPerfil').addEventListener('click', mostrarPerfilAcesso)
    document.getElementById('mostrarGestaoLoja').addEventListener('click', mostrarEditarLoja)
    document.getElementById('mostrarGestaoRelatorio').addEventListener('click', mostrarRelatorios)

    document.getElementById('usuario-info').addEventListener('click', mostrarPerfilUsuario)
    document.getElementById('sair-usuario').addEventListener('click', logout)

    // Estoque
    document.getElementById('reporEstoque').addEventListener('click', reporEstoque)
    document.getElementById('exportarEstoque').addEventListener('click', exportarEstoque)
    
    // Perfis
    document.getElementById('filtroUsuario').addEventListener('input', buscarNome)
    
    document.getElementById('exportarPerfis').addEventListener('click', exportarPerfis)

    document.getElementById('cadastrarMassa').addEventListener('click', cadastroMassa)
    
    document.getElementById('formCadUsuario').addEventListener('submit', async (e) => {
        e.preventDefault()
        mostrarModalCarregamento()
        try{
            await cadastrarPerfil()
        } finally{
            esconderModalCarregamento()
        }
    })
    
    document.getElementById('editarCaixa').addEventListener('click', mostrarInput)
    
    document.getElementById('salvarEdicaoCaixa').addEventListener('click', salvarEdicaoCaixa)

    document.getElementById('deletarPerfil').addEventListener('click', deletarPerfil)

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

    // Menu
    window.mostrarMenu = () => {
        mostrarMenu()
    }

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


