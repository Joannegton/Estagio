import { esconderElementos } from "../utils.js"
import { API_URL } from "../config/config.js"

function mostrarRecuperarSenha() {
    document.getElementById('recuperarSenha').style.display = 'flex'
    esconderElementos(['primeiroAcesso'])
}

function mostrarPrimeiroAcesso() {
    const elemento = document.getElementById('primeiroAcesso')
    elemento.style.display = 'flex'
    elemento.document.classList.add('show')
    esconderElementos(['recuperarSenha'])
}

function mostrarLogin() {
    document.getElementById('login').style.display = 'block'
    esconderElementos(['recuperarSenha', 'primeiroAcesso'])
}

// Configuração de tentativas de login
const MAX_ATTEMPTS = 3
const LOCKOUT_TIME = 30 * 60 * 1000

function verificarBloqueioLogin() {
    const attempts = parseInt(localStorage.getItem('loginAttempts')) || 0;
    const lastAttemptTime = parseInt(localStorage.getItem('lastAttemptTime')) || 0;
    const currentTime = Date.now();
    return attempts >= MAX_ATTEMPTS && (currentTime - lastAttemptTime) < LOCKOUT_TIME;
}

function resetarTentativasLogin() {
    localStorage.setItem('loginAttempts', 0);
    localStorage.setItem('lastAttemptTime', 0);
}

function incrementarTentativasLogin() {
    const attempts = parseInt(localStorage.getItem('loginAttempts')) || 0;
    localStorage.setItem('loginAttempts', attempts + 1);
    localStorage.setItem('lastAttemptTime', Date.now());
}

async function login() {
    const matricula = document.getElementById('matricula').value;
    const senha = document.getElementById('senha').value;

    if (verificarBloqueioLogin()) {
        alert('Muitas tentativas de login. Por favor, tente novamente em 30 minutos.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ matricula, senha })
        });

        if (response.ok) {
            const { token, user } = await response.json();
            const { nome, tipoUsuario, workplace, email, cod_loja } = user;

            sessionStorage.setItem('token', token);
            localStorage.setItem('matricula', matricula);
            localStorage.setItem('nome', nome);
            localStorage.setItem('email', email);
            localStorage.setItem('workplace', workplace);
            localStorage.setItem('cod_loja', cod_loja);

            resetarTentativasLogin();

            let nomePerfil;
            switch (tipoUsuario) {
                case 1: nomePerfil = 'Administrador'; break;
                case 2: nomePerfil = 'Gerente'; break;
                case 3: nomePerfil = 'Caixa'; break;
                default:
                    alert('Tipo de usuário desconhecido');
                    return;
            }
            localStorage.setItem('tipoUsuario', nomePerfil);

            const pagina = tipoUsuario === 1 ? 'admin' : tipoUsuario === 2 ? 'gerente' : 'caixa';

            if (senha === 'Quero@2024#') {
                sessionStorage.setItem('mostrarPerfilUsuario', 'true');
            }

            window.location.href = pagina;
        } else {
            const errorData = await response.json();
            alert(errorData.message);
            incrementarTentativasLogin();
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login. Por favor, tente novamente mais tarde.');
    }
}

function visualizarSenha() {
    const senha = document.getElementById('senha')
    if (senha.type === 'password') {
        senha.type = 'text'
    } else {
        senha.type = 'password'
    }
}

function recuperarSenha() {
    const email = document.getElementById('email').value
    alert(`Instruções de recuperação de senha foram enviadas para ${email}`)
}

export { visualizarSenha, login, mostrarRecuperarSenha, mostrarPrimeiroAcesso, mostrarLogin, recuperarSenha }