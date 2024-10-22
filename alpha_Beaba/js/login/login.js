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

function login() {
    const matricula = document.getElementById('matricula').value;
    const senha = document.getElementById('senha').value;

    if (senha === 'Quero@2024#') {
        const tipoUsuario = getUserType(matricula); 

        if (tipoUsuario === 'caixa') {
            window.location.href = 'caixa.html';
            sessionStorage.setItem('mostrarPerfilUsuario', 'true');

        } else if (tipoUsuario === 'gerente') {
            window.location.href = 'gerente.html';
            sessionStorage.setItem('mostrarPerfilUsuario', 'true');

        } else {
            alert('Perfil inválido para esse login');
        }

    } else if (matricula === '123456' && senha === '123456') {
        const tipoUsuario = getUserType(matricula); // Replace with actual logic to get user type

        if (tipoUsuario === 'caixa') {
            window.location.href = 'caixa.html';

        } else if (tipoUsuario === 'gerente') {
            window.location.href = 'gerente.html';

        } else if (tipoUsuario === 'admin') {
            window.location.href = 'index.html';
        }
        
    } else {
        alert('Matrícula ou senha inválida');
    }
}

function getUserType(matricula) {
    return 'gerente';
}

// Controle de timeout e múltiplos logins
function checkSession() {
    if (!sessionStorage.getItem('auth')) {
        //window.location.href = 'login.html';
    }
}

function logout() {
    // Implement logout functionality
}

function recuperarSenha() {
    const email = document.getElementById('email').value;
    alert(`Instruções de recuperação de senha foram enviadas para ${email}`);
}

export { login, logout, mostrarRecuperarSenha, mostrarPrimeiroAcesso, mostrarLogin, recuperarSenha };