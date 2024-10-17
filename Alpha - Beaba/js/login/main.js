import { esconderElementos } from "../utils.js"
import { login, mostrarLogin, mostrarPrimeiroAcesso, mostrarRecuperarSenha, recuperarSenha } from "./login.js"

document.addEventListener('DOMContentLoaded',() => {
    esconderElementos(['primeiroAcesso', 'recuperarSenha'])

    document.getElementById('mostrarPrimeiroAcesso').addEventListener('click', mostrarPrimeiroAcesso)
    document.getElementById('mostrarRecuperarSenha').addEventListener('click', mostrarRecuperarSenha)
    
    document.getElementById('fecharRecuperarSenha').addEventListener('click', mostrarLogin)
    document.getElementById('fecharMostrarLogin').addEventListener('click', mostrarLogin)
    
    document.getElementById('entrar').addEventListener('click', login)
    document.getElementById('recuperarSenha').addEventListener('click', recuperarSenha)
    
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        login();
    })



})