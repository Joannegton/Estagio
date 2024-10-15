import { mostrarEditarLoja } from './loja.js';
import { mostrarPedidoTaloes, reporEstoque, exportarEstoque } from './estoque.js';
import { alternadorPerfilAcesso, mostrarPerfilAcesso, buscarNome, exportarPerfis, cadastroMassa } from './perfil.js';
import { alternadorRelatorios, mostrarRelatorios } from './relatorio.js';
import { mostrarMenu } from "../utils.js";


document.addEventListener('DOMContentLoaded', () => {

    // Estoque
    document.getElementById('mostrarGestaoEstoque').addEventListener('click', mostrarPedidoTaloes);
    document.getElementById('reporEstoque').addEventListener('click', reporEstoque)
    document.getElementById('exportarEstoque').addEventListener('click', exportarEstoque);
    
    // Perfis
    document.getElementById('mostrarGestaoPerfil').addEventListener('click', ()=>{
        mostrarPerfilAcesso()
        alternadorPerfilAcesso()
    })

    document.getElementById('filtroUsuario').addEventListener('input', buscarNome);
    
    document.getElementById('exportarPerfis').addEventListener('click', exportarPerfis);

    document.getElementById('cadastrarMassa').addEventListener('click', cadastroMassa);
    
    
    // Ações relacionadas a Loja
    document.getElementById('mostrarGestaoLoja').addEventListener('click', mostrarEditarLoja);

    // Ações relacionadas a relatorios
    document.getElementById('mostrarGestaoRelatorio').addEventListener('click', ()=>{
        mostrarRelatorios()
        alternadorRelatorios()
    });


    window.mostrarMenu = () => {
        mostrarMenu()
    }
});


