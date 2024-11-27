import { esconderModalCarregamento, mostrarModalCarregamento } from "../utils"
import { cadastrarPerfil, exportarPerfis, filtrarUsuarioNome } from "./perfil"

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
})