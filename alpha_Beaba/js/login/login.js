import { esconderElementos } from "../utils.js";

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

async function login() {
    const matricula = document.getElementById('matricula').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({matricula, senha})
        })

        if (response.ok){
            const data = await response.json()
            const {nome, tipoUsuario} = data.user

            sessionStorage.setItem('matricula', matricula);
            sessionStorage.setItem('tipoUsuario', tipoUsuario);
            sessionStorage.setItem('nome', nome);
            //tipoUsuario = 1 -> administrador, tipoUsuario = 2 -> gerente, tipoUsuario = 3 -> caixa
            if (senha === 'Quero@2024#') {
                if (tipoUsuario === 3) {
                    window.location.href = 'caixa.html';
                    sessionStorage.setItem('mostrarPerfilUsuario', 'true'); //na pagina caixa.html, se mostrarPerfilUsuario for true, esignidica que é o primeiro acesso
                } else if (tipoUsuario === 2) {
                    window.location.href = 'gerente.html';
                    sessionStorage.setItem('mostrarPerfilUsuario', 'true');
                } else {
                    alert('Perfil inválido para esse login');
                }
            } else {
                if (tipoUsuario === 3) {
                    window.location.href = 'caixa.html';
                } else if (tipoUsuario === 2) {
                    window.location.href = 'gerente.html';
                } else if (tipoUsuario === 1) {
                    window.location.href = 'index.html';
                } else {
                    alert('Perfil inválido para esse login');
                }
            }
        } else {
            alert('Email ou senha inválidos');
        }
    } catch (error) {
        console.error('Erro ao fazer login: ', error)
        alert('Erro ao fazer login')
    }
}

// Controle de timeout e múltiplos logins
function checkSession() {
    if (!sessionStorage.getItem('auth')) {
        window.location.href = 'login.html';
    }
}

function logout() {
    sessionStorage.removeItem('auth');
    window.location.href = 'login.html';
}

function recuperarSenha() {
    const email = document.getElementById('email').value;
    alert(`Instruções de recuperação de senha foram enviadas para ${email}`);
}

export { login, logout, mostrarRecuperarSenha, mostrarPrimeiroAcesso, mostrarLogin, recuperarSenha, checkSession };