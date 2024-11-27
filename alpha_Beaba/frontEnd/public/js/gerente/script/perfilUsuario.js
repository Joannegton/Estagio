import { modalEditarSenha, salvarEditarUsuario } from "../../adm/controller/perfilUsuarioController.js"

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('formEditUsuario').addEventListener('submit', (e) =>{
        e.preventDefault()
        salvarEditarUsuario()
    })
    document.getElementById('botaoEditarSenha').addEventListener('click', modalEditarSenha)
})