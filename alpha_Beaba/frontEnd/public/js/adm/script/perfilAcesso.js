import { carregarCardUsuario, esconderElementos, esconderModalCarregamento, mostrarModalCarregamento } from "../../utils.js"
import { alternadorPerfil, exportarPerfis, mostrarModalCadastroPerfil, salvarEditarPerfil, salvarPerfil } from "../controller/perfilController.js"
import { createUser, filtrarUsuarioNome, ordenarLojaUsuarios, ordenarUsuarios } from "../controller/usuariosController.js"

document.addEventListener('DOMContentLoaded', () => {
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

    //Usuarios
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

    window.onload = async () => {
        mostrarModalCarregamento()
        try{
            carregarCardUsuario()
            await alternadorPerfil()
        }finally{
            esconderModalCarregamento()
        }
    }

})