import { enviarTalao, mostrarEnvioTaloes } from './envioTaloes.js';
import { exportarEstoque, filtrarLoja, mostrarEstoque } from './estoque.js';
import { editarEnvioTalao, excluirEnvioTalao, exportarManutencao, filtarLojaManutencao, filtarStatusManutencao, mostrarManutencao, salvarEdicaoTalao } from './manutencao.js';
import { alternadorPerfil, mostrarPerfil, editarUsuario, salvarEdicaoUsuario, filtrarUsuarioNome, exportarPerfis, deletarUsuario, salvarUsuario, salvarPerfil } from './perfil.js';
import { mostrarLojas, alternadorLojas, ordenarLoja, editarLoja, salvarEditarLoja, salvarLoja } from './lojas.js';
import { alternadorRelatorios, exportarRelatorios, mostrarRelatorios } from './relatorios.js';
import { mostrarMenu } from '../utils.js';

document.addEventListener('DOMContentLoaded', () => {
    // Menu navigation
    document.getElementById('mostrarEnvioTaloes').addEventListener('click', () =>{
        mostrarEnvioTaloes()
    })
    document.getElementById('mostrarEstoque').addEventListener('click', mostrarEstoque)
    document.getElementById('mostrarManutencao').addEventListener('click', mostrarManutencao)
    document.getElementById('mostrarPerfil').addEventListener('click', () => {
        mostrarPerfil()
        alternadorPerfil()
    })
    document.getElementById('mostrarLojas').addEventListener('click', () => {
        mostrarLojas()
        alternadorLojas()
    })
    document.getElementById('mostrarRelatorio').addEventListener('click', () => {
        mostrarRelatorios()
        alternadorRelatorios()
    })

    // Envio de talões
    document.getElementById('registrarEnvioTalao').addEventListener('click', enviarTalao)

    // Estoque
    document.getElementById('filtroLoja').addEventListener('input', filtrarLoja)

    document.getElementById('exportarEstoque').addEventListener('click', exportarEstoque)

    // Manutenção
    document.getElementById('filtroLojaManutencao').addEventListener('change', filtarLojaManutencao)

    document.getElementById('filtroStatusManutencao').addEventListener('change', filtarStatusManutencao)

    document.getElementById('exportarManutencao').addEventListener('click', exportarManutencao)
    
    document.getElementById('editarEnvioTalao').addEventListener('click', editarEnvioTalao)

    document.getElementById('salvarEdicaoTalao').addEventListener('click', salvarEdicaoTalao)
    
    document.getElementById('excluirEnvioTalao').addEventListener('click', excluirEnvioTalao)
    
    // Perfil
    document.getElementById('filtoUsuarioPerfis').addEventListener('input', filtrarUsuarioNome)

    document.getElementById('exportarPerfis').addEventListener('click', exportarPerfis)

    document.getElementById('editarUsuarioPerfis').addEventListener('click', editarUsuario)

    document.getElementById('salvarEditarUsuario').addEventListener('click', salvarEdicaoUsuario)

    document.getElementById('deletarUsuarioPerfis').addEventListener('click', deletarUsuario)

    document.getElementById('salvarUsuario').addEventListener('click', salvarUsuario)

    document.getElementById('salvarPerfil').addEventListener('click', salvarPerfil)   

    // Lojas
    document.getElementById('filtroLojaLojas').addEventListener('change', ordenarLoja)

    document.getElementById('editarLoja').addEventListener('click', editarLoja)

    document.getElementById('salvarEditarLoja').addEventListener('click', salvarEditarLoja)

    document.getElementById('salvarLoja').addEventListener('click', salvarLoja)   

    // Relatórios
    document.getElementById('exportarRelatorios').addEventListener('click', exportarRelatorios)
    
    window.mostrarMenu = mostrarMenu

    window.onload = () =>{
        alternadorRelatorios()
    }
})
