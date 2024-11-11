import {  exportarManutencao, filtarLojaManutencao, filtarStatusManutencao, mostrarManutencao, filtrarNomeLojaManutencao} from './manutencao.js'
import { alternadorRelatorios, exportarRelatorios, iconeEstoqueBaixo, mostrarRelatorios } from './relatorios.js'
import { mostrarMenu, logout, esconderElementos, mostrarFiltros, carregarCardUsuario, checkSession, mostrarModalCarregamento, esconderModalCarregamento, completeInformationsPerfil } from '../utils.js'
import { mostrarLojas, ordenarLoja, exportarLojas, salvarLoja } from './lojas.js'
import { mostrarEstoque, ordenarEstoque, ordenarLojaEstoque, exportarEstoque, filtrarNomeLoja } from './estoque.js'
import { enviarTalao, mostrarEnvioTaloes } from './envioTaloes.js'
import { mostrarModalCadastroPerfil, mostrarPerfil, salvarEditarPerfil, salvarPerfil } from './perfil.js'
import { filtrarUsuarioNome, ordenarLojaUsuarios, ordenarUsuarios, createUser } from './usuarios.js'
import { salvarEditarUsuario, mostrarPerfilUsuario, modalEditarSenha } from './perfilUsuario.js'

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

    document.getElementById('mostrarEnvioTaloes').addEventListener('click', async () => {
        mostrarModalCarregamento()
        try {
            await mostrarEnvioTaloes()
        } finally {
            esconderModalCarregamento()
        }
    })
    
    document.getElementById('mostrarEstoque').addEventListener('click', async () => {
        mostrarModalCarregamento()
        try {
            await mostrarEstoque()
        } finally {
            esconderModalCarregamento()
        }
    })
    
    document.getElementById('mostrarManutencao').addEventListener('click', async () => {
        mostrarModalCarregamento()
        try {
            await mostrarManutencao()
        } finally {
            esconderModalCarregamento()
        }
    })
    
    document.getElementById('mostrarPerfil').addEventListener('click', async () => {
        mostrarModalCarregamento()
        try {
            await mostrarPerfil()
        } finally {
            esconderModalCarregamento()
        }
    })
    
    document.getElementById('mostrarLojas').addEventListener('click', async () => {
        mostrarModalCarregamento()
        try {
            await mostrarLojas()
        } finally {
            esconderModalCarregamento()
        }
    })
    
    document.getElementById('mostrarRelatorio').addEventListener('click', async () => {
        mostrarModalCarregamento()
        try {
            await mostrarRelatorios()
        } finally {
            esconderModalCarregamento()
        }
    })

    // Card Usuario
    document.getElementById('usuario-info').addEventListener('click', mostrarPerfilUsuario)
    document.getElementById('sair-usuario').addEventListener('click', logout)
        
    // Mostrar menu e filtros para mobile
    document.getElementById('menuButton').addEventListener('click', mostrarMenu)
    document.getElementById('fechar').addEventListener('click', mostrarMenu)

    window.mostrarFiltros = mostrarFiltros //função usada no html

    // Envio de talões
    document.getElementById('formEnvioTalao').addEventListener('submit', async (e) =>{
        e.preventDefault()
        mostrarModalCarregamento()
        try {
            await enviarTalao()
        } finally{
            esconderModalCarregamento()
        }
        
    })

    // Estoque
    document.getElementById('filtrarNomeLoja').addEventListener('input', filtrarNomeLoja)
    
    document.getElementById('filtroLojaEstoque').addEventListener('change', ordenarLojaEstoque)

    document.getElementById('ordenarQntEstoque').addEventListener('change', ordenarEstoque)
    
    document.getElementById('exportarEstoque').addEventListener('click', exportarEstoque)
    
    // Manutenção
    document.getElementById('filtroManutencaoNomeLoja').addEventListener('input', filtrarNomeLojaManutencao)

    document.getElementById('filtroLojaManutencao').addEventListener('change', filtarLojaManutencao)

    document.getElementById('filtroStatusManutencao').addEventListener('change', filtarStatusManutencao)

    document.getElementById('exportarManutencao').addEventListener('click', exportarManutencao)
    
    // Usuario
    document.getElementById('formCadUsuario').addEventListener('submit', async event => {
        event.preventDefault()
        mostrarModalCarregamento()
        try{
            await createUser()
        }finally{
            esconderModalCarregamento()
        }
        
    })

    document.getElementById('filtroUsuarioPerfis').addEventListener('input', filtrarUsuarioNome)

    document.getElementById('ordenarUsuario').addEventListener('change', ordenarUsuarios)
 
    document.getElementById('ordenarLojaUsuario').addEventListener('change', ordenarLojaUsuarios)

    document.getElementById('exportarPerfis').addEventListener('click', exportarPerfis)


    // Perfil
    document.getElementById('mostrarCadastrarPerfil').addEventListener('click', mostrarModalCadastroPerfil)
    
    document.getElementById('perfilCadastroForm').addEventListener('submit', async (e) => {
        e.preventDefault()
        mostrarModalCadastroPerfil()
        try{
            await salvarPerfil()
        } finally{
            esconderElementos()
        }
    })  
    
    document.getElementById('fecharMostrarAddPerfil').addEventListener('click', ()=> {
        esconderElementos(['addPerfil'])
    })

    document.getElementById('fecharModalVisualizarPermissoes').addEventListener('click', () => {
        esconderElementos(['modalVisualizarPermissoes'])
    })

    document.getElementById('formSalvarEditarPermissoes').addEventListener('submit', async (e) => {
        e.preventDefault()
        mostrarModalCarregamento()
        try{
            const idPerfilAcesso = e.target.dataset.idPerfilAcesso
            await salvarEditarPerfil(idPerfilAcesso)
        } finally{
            esconderModalCarregamento()
        }
        
    })

    document.getElementById('fecharModalEditPermissoes').addEventListener('click', () => {
        esconderElementos(['modalEditPerfil'])
    })

    // Lojas
    document.getElementById('filtroLojaLojas').addEventListener('change', ordenarLoja)

    document.getElementById('exportarLojas').addEventListener('click', exportarLojas)

    document.getElementById('formSalvarLoja').addEventListener('submit', async (e) => {
        e.preventDefault()
        mostrarModalCarregamento()
        try{
            await salvarLoja()
        } finally{
            esconderModalCarregamento()
        }
    })   

    // Relatórios
    document.getElementById('exportarRelatorios').addEventListener('click', exportarRelatorios)
    
    //perfil de usuario
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
    

    // Carrega funcionalidades de relatórios pois é a página inicial
    window.onload = async () =>{
        mostrarModalCarregamento()
        try {
            checkSession()
            carregarCardUsuario()
            await alternadorRelatorios()
            iconeEstoqueBaixo()
            completeInformationsPerfil()
        } catch (error) {
            console.error('Erro ao carregar página', error)
            alert('Erro ao carregar página, tente novamente mais tarde')
        } finally{
            esconderModalCarregamento()
        }
    }
})
