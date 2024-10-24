import {  exportarManutencao, filtarLojaManutencao, filtarStatusManutencao, mostrarManutencao} from './manutencao.js'
import { alternadorRelatorios, exportarRelatorios, iconeEstoqueBaixo, mostrarRelatorios } from './relatorios.js'
import { mostrarMenu, logout, esconderElementos, mostrarElemento, mostrarFiltros } from '../utils.js'
import { mostrarLojas, ordenarLoja, salvarLoja, exportarLojas } from './lojas.js'
import { mostrarEstoque, filtrarLoja, exportarEstoque } from './estoque.js';
import { enviarTalao } from './envioTaloes.js'
import { deletarPerfil, editarPerfil, mostrarModalCadastroPerfil, mostrarPerfil, mostrarPerfilUsuario, salvarEditarPerfil } from './perfil.js';
import { filtrarUsuarioNome, ordenarLojaUsuarios, ordenarUsuarios, salvarUsuario } from './usuarios.js';

document.addEventListener('DOMContentLoaded', () => {
    // Menu navigation
    document.getElementById('mostrarEnvioTaloes').addEventListener('click', () =>{
        mostrarElemento('envioTaloes', 'mostrarEnvioTaloes', () => {})
    })
    document.getElementById('mostrarEstoque').addEventListener('click', () => {
        mostrarEstoque()
    })
    document.getElementById('mostrarManutencao').addEventListener('click', mostrarManutencao)
    document.getElementById('mostrarPerfil').addEventListener('click', () => {
        mostrarPerfil()
    })
    document.getElementById('mostrarLojas').addEventListener('click', () => {
        mostrarLojas()
    })
    document.getElementById('mostrarRelatorio').addEventListener('click', () => {
        mostrarRelatorios()
    })
    document.getElementById('usuario-info').addEventListener('click', mostrarPerfilUsuario)
    document.getElementById('sair-usuario').addEventListener('click', logout)

    // Envio de talões
    document.getElementById('registrarEnvioTalao').addEventListener('submit', (e) =>{
        e.preventDefault()
        enviarTalao()
    })

    // Estoque
    document.getElementById('filtroLojaEstoque').addEventListener('input', filtrarLoja)

    document.getElementById('exportarEstoque').addEventListener('click', exportarEstoque)

    // Manutenção
    document.getElementById('filtroManutencaoNomeLoja').addEventListener('input', () => {})

    document.getElementById('filtroLojaManutencao').addEventListener('change', filtarLojaManutencao)

    document.getElementById('filtroStatusManutencao').addEventListener('change', filtarStatusManutencao)

    document.getElementById('exportarManutencao').addEventListener('click', exportarManutencao)
    
    // Usuario
    document.getElementById('filtroUsuarioPerfis').addEventListener('input', filtrarUsuarioNome)

    document.getElementById('ordenarUsuario').addEventListener('change', ordenarUsuarios)
 
    document.getElementById('ordenarLojaUsuario').addEventListener('change', ordenarLojaUsuarios)

    document.getElementById('exportarPerfis').addEventListener('click', exportarPerfis)

    document.getElementById('formCadUsuario').addEventListener('submit', event => {
        event.preventDefault()
        salvarUsuario()
    })

    // Perfil
    document.getElementById('cadastrarPerfil').addEventListener('click', mostrarModalCadastroPerfil)
    
    document.getElementById('salvarPerfil').addEventListener('click', salvarPerfil)  
    
    document.getElementById('fecharMostrarAddPerfil').addEventListener('click', ()=> {
        esconderElementos(['addPerfil'])
    })

    //document.getElementById('editarPerfis').addEventListener('click', editarPerfil)

    //document.getElementById('deletarPerfis').addEventListener('click', deletarPerfil)

    //document.getElementById('visualizarPermissoes').addEventListener('click', modalVisualizarPermissoes)
    document.getElementById('fecharModalVisualizarPermissoes').addEventListener('click', () => {
        esconderElementos(['modalVisualizarPermissoes'])
    })

    document.getElementById('formSalvarEditarPermissoes').addEventListener('submit', salvarEditarPerfil)
    document.getElementById('fecharModalEditPermissoes').addEventListener('click', () => {
        esconderElementos(['modalEditPerfil'])
    })


    // Lojas
    document.getElementById('filtroLojaLojas').addEventListener('change', ordenarLoja)

    document.getElementById('exportarLojas').addEventListener('click', exportarLojas)

    document.getElementById('salvarLoja').addEventListener('submit', salvarLoja)   


    // Relatórios
    document.getElementById('exportarRelatorios').addEventListener('click', exportarRelatorios)
    
    document.getElementById('arrumarEstoqueLoja').addEventListener('click', mostrarEnvioTaloes)


    // Mostrar menu e filtros para mobile
    window.mostrarMenu = mostrarMenu
    window.mostrarFiltros = mostrarFiltros

    // Carrega funcionalidades de relatórios pois é a página inicial
    window.onload = () =>{
        alternadorRelatorios()
        iconeEstoqueBaixo()
    }
})
