import { alternadorPerfil, mostrarPerfil, editarUsuario, salvarEdicaoUsuario, filtrarUsuarioNome, exportarPerfis, deletarUsuario, salvarUsuario, salvarPerfil, mostrarModalCadastroPerfil, mostrarPerfilUsuario, editarPerfil, salvarEditarPerfil, deletarPerfil, modalVisualizarPermissoes } from './perfil.js'
import { dadosManutencaoGeral, editarEnvioTalao, excluirEnvioTalao, exportarManutencao, filtarLojaManutencao, filtarStatusManutencao, mostrarManutencao, salvarEdicaoTalao } from './manutencao.js'
import { mostrarLojas, alternadorLojas, ordenarLoja, editarLoja, salvarEditarLoja, salvarLoja, exportarLojas } from './lojas.js'
import { alternadorRelatorios, exportarRelatorios, iconeEstoqueBaixo, mostrarRelatorios } from './relatorios.js'
import { mostrarMenu, identificarBaixoEstoque, logout, esconderElementos, mostrarElemento } from '../utils.js'
import { dados, renderizarTabela, mostrarEstoque, filtrarLoja, exportarEstoque } from './estoque.js';
import { enviarTalao } from './envioTaloes.js'

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
    document.getElementById('filtroLoja').addEventListener('input', filtrarLoja)

    document.getElementById('exportarEstoque').addEventListener('click', exportarEstoque)

    

    // Manutenção
    document.getElementById('filtroLojaManutencao').addEventListener('change', filtarLojaManutencao)

    document.getElementById('filtroStatusManutencao').addEventListener('change', filtarStatusManutencao)

    document.getElementById('exportarManutencao').addEventListener('click', exportarManutencao)
    
    // Usuario
    document.getElementById('filtoUsuarioPerfis').addEventListener('input', filtrarUsuarioNome)

    document.getElementById('exportarPerfis').addEventListener('click', exportarPerfis)

    document.getElementById('salvarUsuario').addEventListener('click', salvarUsuario)

    // Perfil
    document.getElementById('cadastrarPerfil').addEventListener('click', mostrarModalCadastroPerfil)
    
    document.getElementById('salvarPerfil').addEventListener('click', salvarPerfil)  
    
    document.getElementById('fecharMostrarAddPerfil').addEventListener('click', ()=> {
        esconderElementos(['addPerfil'])
    })

    document.getElementById('editarPerfis').addEventListener('click', editarPerfil)

    document.getElementById('deletarPerfis').addEventListener('click', deletarPerfil)

    document.getElementById('visualizarPermissoes').addEventListener('click', modalVisualizarPermissoes)
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


    // Mostrar menu para mobile
    window.mostrarMenu = mostrarMenu

    // Carrega funcionalidades de relatórios pois é a página inicial
    window.onload = () =>{
        alternadorRelatorios()
        iconeEstoqueBaixo()
    }
})
