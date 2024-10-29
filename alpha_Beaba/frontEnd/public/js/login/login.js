import { esconderElementos } from "../../utils.js";

function mostrarRecuperarSenha() {
    document.getElementById('recuperarSenha').style.display = 'flex';
    esconderElementos(['primeiroAcesso']);
}

function mostrarPrimeiroAcesso() {
    const elemento = document.getElementById('primeiroAcesso')
    elemento.style.display = 'flex'
    elementodocument.classList.add('show');
    esconderElementos(['recuperarSenha']);
}

function mostrarLogin() {
    document.getElementById('login').style.display = 'block';
    esconderElementos(['recuperarSenha', 'primeiroAcesso']);
}

function visualizarSenha() {
    const senha = document.getElementById('senha');
    if (senha.type === 'password') {
        senha.type = 'text';
    } else {
        senha.type = 'password';
    }
}

async function login() {
    const matricula = document.getElementById('matricula').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({matricula, senha})
        })

        if (response.ok){
            const data = await response.json()
            const {token, user} = data
            const {nome, tipoUsuario} = user

            sessionStorage.setItem('token', token)
            sessionStorage.setItem('matricula', matricula);
            sessionStorage.setItem('tipoUsuario', tipoUsuario);
            sessionStorage.setItem('nome', nome);

            //tipoUsuario = 1 -> administrador, tipoUsuario = 2 -> gerente, tipoUsuario = 3 -> caixa
            if (senha === 'Quero@2024#') {
                if (tipoUsuario === 3) {
                    window.location.href = 'caixa';
                    sessionStorage.setItem('mostrarPerfilUsuario', 'true'); //na pagina caixa.html, se mostrarPerfilUsuario for true, esignidica que é o primeiro acesso
                } else if (tipoUsuario === 2) {
                    window.location.href = 'gerente';
                    sessionStorage.setItem('mostrarPerfilUsuario', 'true');
                } else if (tipoUsuario === 1) {
                    window.location.href = 'admin';
                    sessionStorage.setItem('mostrarPerfilUsuario', 'true');
                } else {
                    alert('Perfil inválido para esse login');
                }
            } else {
                if (tipoUsuario === 3) {
                    window.location.href = 'caixa';
                } else if (tipoUsuario === 2) {
                    window.location.href = 'gerente';
                } else if (tipoUsuario === 1) {
                    window.location.href = 'index';
                } else {
                    alert('Perfil inválido para esse login');
                }
            }
        } else {
            alert('Matricula ou senha inválidos');
        }
    } catch (error) {
        console.error('Erro ao fazer login: ', error)
        alert('Erro ao fazer login')
    }
}

function isTokenExpirado(token) {
    //Divide o token JWT em três partes e seleciona a 2ª parte (payload) para decodificar e transforma em JSON
    const payload = JSON.parse(atob(token.split('.')[1])) //atob - Decodifica a string Base64
    const expiry = payload.exp; //exp é o tempo de expiração do token
    const now = Math.floor(Date.now() / 1000); //Math.floor(...): Arredonda o valor para baixo para obter um número inteiro.
    return now > expiry;
}

// Controle de timeout e múltiplos logins
function checkSession() {
    const token = sessionStorage.getItem('token');
    if (!token || isTokenExpirado(token)) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('matricula');
        sessionStorage.removeItem('tipoUsuario');
        sessionStorage.removeItem('nome');
        window.location.href = 'login.html';
    }
}

function logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('matricula');
    sessionStorage.removeItem('tipoUsuario');
    sessionStorage.removeItem('nome');
    window.location.href = 'login.html';
}

function recuperarSenha() {
    const email = document.getElementById('email').value;
    alert(`Instruções de recuperação de senha foram enviadas para ${email}`);
}

export { visualizarSenha, login, logout, mostrarRecuperarSenha, mostrarPrimeiroAcesso, mostrarLogin, recuperarSenha, checkSession };