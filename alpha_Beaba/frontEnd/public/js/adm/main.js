import {  exportarManutencao, filtarLojaManutencao, filtarStatusManutencao, mostrarManutencao, filtrarNomeLojaManutencao} from './manutencao.js'
import { alternadorRelatorios, exportarRelatorios, iconeEstoqueBaixo, mostrarRelatorios } from './relatorios.js'
import { mostrarMenu, logout, esconderElementos, mostrarFiltros, carregarCardUsuario, checkSession, mostrarModalCarregamento, esconderModalCarregamento } from '../../utils.js'
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

    document.getElementById('mostrarEnvioTaloes').addEventListener('click', mostrarEnvioTaloes)
    document.getElementById('mostrarEstoque').addEventListener('click', mostrarEstoque)
    document.getElementById('mostrarManutencao').addEventListener('click', mostrarManutencao)
    document.getElementById('mostrarPerfil').addEventListener('click', mostrarPerfil)
    document.getElementById('mostrarLojas').addEventListener('click', mostrarLojas)
    document.getElementById('mostrarRelatorio').addEventListener('click', mostrarRelatorios)

    // Card Usuario
    document.getElementById('usuario-info').addEventListener('click', mostrarPerfilUsuario)
    document.getElementById('sair-usuario').addEventListener('click', logout)

    // Envio de talões
    document.getElementById('formEnvioTalao').addEventListener('submit', (e) =>{
        e.preventDefault()
        enviarTalao()
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
    document.getElementById('formCadUsuario').addEventListener('submit', event => {
        event.preventDefault()
        createUser()
    })

    document.getElementById('filtroUsuarioPerfis').addEventListener('input', filtrarUsuarioNome)

    document.getElementById('ordenarUsuario').addEventListener('change', ordenarUsuarios)
 
    document.getElementById('ordenarLojaUsuario').addEventListener('change', ordenarLojaUsuarios)

    document.getElementById('exportarPerfis').addEventListener('click', exportarPerfis)


    // Perfil
    document.getElementById('mostrarCadastrarPerfil').addEventListener('click', mostrarModalCadastroPerfil)
    
    document.getElementById('perfilCadastroForm').addEventListener('submit', (e) => {
        e.preventDefault()
        salvarPerfil()
    })  
    
    document.getElementById('fecharMostrarAddPerfil').addEventListener('click', ()=> {
        esconderElementos(['addPerfil'])
    })

    document.getElementById('fecharModalVisualizarPermissoes').addEventListener('click', () => {
        esconderElementos(['modalVisualizarPermissoes'])
    })

    document.getElementById('formSalvarEditarPermissoes').addEventListener('submit', e => {
        e.preventDefault();
        const idPerfilAcesso = e.target.dataset.idPerfilAcesso
        salvarEditarPerfil(idPerfilAcesso)
    })
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
    
    //perfil de usuario
    document.getElementById('formEditUsuario').addEventListener('submit', (e) => {
        e.preventDefault()
        salvarEditarUsuario()
    })

    document.getElementById('botaoEditarSenha').addEventListener('click', modalEditarSenha)
    
    



    // Mostrar menu e filtros para mobile
    window.mostrarMenu = mostrarMenu
    window.mostrarFiltros = mostrarFiltros

    // Carrega funcionalidades de relatórios pois é a página inicial
    window.onload = async () =>{
        mostrarModalCarregamento()
        try {
            checkSession()
            carregarCardUsuario()
            await alternadorRelatorios()
            iconeEstoqueBaixo()
        } catch (error) {
            console.error('Erro ao carregar página', error)
            alert('Erro ao carregar página, tente novamente mais tarde')
        } finally{
            esconderModalCarregamento()
        }
    }
})
