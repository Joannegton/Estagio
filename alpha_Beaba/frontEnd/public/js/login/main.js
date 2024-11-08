import { esconderElementos, esconderModalCarregamento, mostrarModalCarregamento } from "../../utils.js"
import { login, mostrarLogin, mostrarPrimeiroAcesso, mostrarRecuperarSenha, recuperarSenha, visualizarSenha } from "./login.js"

document.addEventListener('DOMContentLoaded',() => {
    esconderElementos(['primeiroAcesso', 'recuperarSenha'])

    document.getElementById('mostrarPrimeiroAcesso').addEventListener('click', mostrarPrimeiroAcesso)
    document.getElementById('mostrarRecuperarSenha').addEventListener('click', mostrarRecuperarSenha)

    document.getElementById('fecharRecuperarSenha').addEventListener('click', mostrarLogin)
    document.getElementById('fecharMostrarLogin').addEventListener('click', mostrarLogin)

    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault()
        mostrarModalCarregamento()
        try{
            await login()
        } finally{
            esconderModalCarregamento()
        }
    })

    document.getElementById('visualizarSenha').addEventListener('click', visualizarSenha)

    document.getElementById('recuperarSenhaForm').addEventListener('submit', (event) => {
        event.preventDefault()
        recuperarSenha()
    })
})