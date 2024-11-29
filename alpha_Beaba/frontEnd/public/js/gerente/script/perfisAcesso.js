import { carregarCardUsuario, esconderModalCarregamento, mostrarModalCarregamento, verificarPermissao } from "../../utils.js"
import { alternadorPerfilAcesso, cadastrarPerfil, exportarPerfis, filtrarUsuarioNome } from "../controller/perfilController.js"

verificarPermissao('Perfis')

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('filtroUsuario').addEventListener('input', filtrarUsuarioNome)
    
    document.getElementById('exportarPerfis').addEventListener('click', exportarPerfis)
    
    document.getElementById('formCadUsuario').addEventListener('submit', async (e) => {
        e.preventDefault()
        mostrarModalCarregamento()
        try{
            await cadastrarPerfil()
        } finally{
            esconderModalCarregamento()
        }
    })

    window.onload = async () => {
        carregarCardUsuario()
        mostrarModalCarregamento()
        try{
            await alternadorPerfilAcesso()
        } finally{
            esconderModalCarregamento()
        }
    }

})