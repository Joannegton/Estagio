import { modalEditarSenha, salvarEditarUsuario } from "../adm/perfilUsuario"

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('formEditUsuario').addEventListener('submit', (e) =>{
        e.preventDefault()
        salvarEditarUsuario()
    })
    document.getElementById('botaoEditarSenha').addEventListener('click', modalEditarSenha)
})