import { esconderElementos } from "../utils.js";

function mostrarRecuperarSenha(){
    document.getElementById('recuperarSenha').style.display = 'flex';
    esconderElementos(['primeiroAcesso']);
}

function mostrarPrimeiroAcesso(){
    document.getElementById('primeiroAcesso').style.display = 'flex';
    esconderElementos(['recuperarSenha']);
}

function mostrarLogin(){
    document.getElementById('login').style.display = 'block';
    esconderElementos(['recuperarSenha', 'primeiroAcesso']);
}
function login(){

}

function logout(){

}

function recuperarSenha(){
    alert('Senha recuperada com sucesso!')
}



export {login, logout, mostrarRecuperarSenha, mostrarPrimeiroAcesso, mostrarLogin, recuperarSenha }