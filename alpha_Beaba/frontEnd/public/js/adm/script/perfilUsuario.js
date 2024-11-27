import { carregarCardUsuario, esconderModalCarregamento, mostrarModalCarregamento } from "../../utils.js"
import { modalEditarSenha, mostrarPerfilUsuario, salvarEditarUsuario } from "../controller/perfilUsuarioController.js"

document.addEventListener('DOMContentLoaded', () => {
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

        window.onload = () =>{
            carregarCardUsuario()
            mostrarPerfilUsuario()
        }
})    