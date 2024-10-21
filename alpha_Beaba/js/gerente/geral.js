import { alternadorPerfilAcesso, mostrarPerfilAcesso, buscarNome, exportarPerfis, cadastroMassa, cadastrarPerfil, mostrarInput, salvarEdicaoCaixa, deletarPerfil, mostrarPerfilUsuario } from './perfil.js';
import { alternadorRelatorios, mostrarRelatorios, exportarRelatorios, alterarStatus } from './relatorio.js';
import { mostrarPedidoTaloes, reporEstoque, exportarEstoque } from './estoque.js';
import { mostrarEditarLoja, salvarLoja } from './loja.js';
import { logout, mostrarMenu } from "../utils.js";


document.addEventListener('DOMContentLoaded', () => {
    // Identificar primeiro Acesso
    if(sessionStorage.getItem('mostrarPerfilUsuario') === 'true') {
        mostrarPerfilUsuario()
        sessionStorage.removeItem('mostrarPerfilUsuario')
    }

    // Menu navegação
    document.getElementById('mostrarGestaoEstoque').addEventListener('click', mostrarPedidoTaloes);
    document.getElementById('mostrarGestaoPerfil').addEventListener('click', ()=>{
        mostrarPerfilAcesso()
        alternadorPerfilAcesso()
    })
    document.getElementById('mostrarGestaoLoja').addEventListener('click', mostrarEditarLoja)
    document.getElementById('mostrarGestaoRelatorio').addEventListener('click', ()=>{
        mostrarRelatorios()
        alternadorRelatorios()
    })

    document.getElementById('usuario-info').addEventListener('click', mostrarPerfilUsuario)
    document.getElementById('sair-usuario').addEventListener('click', logout)

    // Estoque
    document.getElementById('reporEstoque').addEventListener('click', reporEstoque)
    document.getElementById('exportarEstoque').addEventListener('click', exportarEstoque);
    
    // Perfis
    

    document.getElementById('filtroUsuario').addEventListener('input', buscarNome)
    
    document.getElementById('exportarPerfis').addEventListener('click', exportarPerfis)

    document.getElementById('cadastrarMassa').addEventListener('click', cadastroMassa)
    
    document.getElementById('CadastrarPerfil').addEventListener('click', cadastrarPerfil)
    
    document.getElementById('editarCaixa').addEventListener('click', mostrarInput)
    
    document.getElementById('salvarEdicaoCaixa').addEventListener('click', salvarEdicaoCaixa)

    document.getElementById('deletarPerfil').addEventListener('click', deletarPerfil)

    // Ações relacionadas a Loja

    document.getElementById('salvarLoja').addEventListener('click', salvarLoja)

    // Ações relacionadas a relatorios
    

    document.getElementById('exportarRelatorios').addEventListener('click', exportarRelatorios)

    document.getElementById('alterarStatus').addEventListener('click', alterarStatus)

    // Menu
    window.mostrarMenu = () => {
        mostrarMenu()
    }
});


