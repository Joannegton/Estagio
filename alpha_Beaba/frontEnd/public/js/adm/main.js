import {  exportarManutencao, filtarLojaManutencao, filtarStatusManutencao, mostrarManutencao} from './manutencao.js'
import { alternadorRelatorios, exportarRelatorios, iconeEstoqueBaixo, mostrarRelatorios } from './relatorios.js'
import { mostrarMenu, logout, esconderElementos, mostrarFiltros } from '../../utils.js'
import { mostrarLojas, ordenarLoja, salvarLoja, exportarLojas } from './lojas.js'
import { mostrarEstoque, filtrarLoja, exportarEstoque } from './estoque.js';
import { enviarTalao, mostrarEnvioTaloes } from './envioTaloes.js'
import { mostrarModalCadastroPerfil, mostrarPerfil, mostrarPerfilUsuario, salvarEditarPerfil, salvarPerfil } from './perfil.js';
import { filtrarUsuarioNome, ordenarLojaUsuarios, ordenarUsuarios, salvarUsuario } from './usuarios.js';

document.addEventListener('DOMContentLoaded', () => {
    // Identificar primeiro Acesso
    if(sessionStorage.getItem('mostrarPerfilUsuario') === 'true') {
        mostrarPerfilUsuario()
        sessionStorage.removeItem('mostrarPerfilUsuario')
    }

    // Menu navigation

    if(window.innerWidth > 768){
        document.getElementById('menu').style.display = 'block'
    }
    document.getElementById('mostrarEnvioTaloes').addEventListener('click', () =>{
        mostrarEnvioTaloes()
    })
    document.getElementById('mostrarEstoque').addEventListener('click', mostrarEstoque)
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
    document.getElementById('formEnvioTalao').addEventListener('submit', (e) =>{
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
    
    document.getElementById('perfilCadastroForm').addEventListener('submit', (e) => {
        e.preventDefault()
        salvarPerfil()
    })  
    
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

    document.getElementById('formSalvarLoja').addEventListener('submit', (e) => {
        e.preventDefault()
        salvarLoja()
    })   


    // Relatórios
    document.getElementById('exportarRelatorios').addEventListener('click', exportarRelatorios)
    


    // Mostrar menu e filtros para mobile
    window.mostrarMenu = mostrarMenu
    window.mostrarFiltros = mostrarFiltros

    // Carrega funcionalidades de relatórios pois é a página inicial
    window.onload = () =>{
        alternadorRelatorios()
        iconeEstoqueBaixo()
    }
})
