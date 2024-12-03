import { modalEditarSenha, mostrarPerfilUsuario, salvarEditarUsuario } from "../../adm/controller/perfilUsuarioController.js"
import { carregarCardUsuario } from "../../utils.js"

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('formEditUsuario').addEventListener('submit', (e) =>{
        e.preventDefault()
        salvarEditarUsuario()
    })
    document.getElementById('botaoEditarSenha').addEventListener('click', modalEditarSenha)

    window.onload = () => {
        carregarCardUsuario()
        mostrarPerfilUsuario()
    }
})

