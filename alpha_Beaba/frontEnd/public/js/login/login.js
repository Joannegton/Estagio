import { esconderElementos, logout } from "../utils.js"
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

async function login() {
    const matricula = document.getElementById('matricula').value
    const senha = document.getElementById('senha').value

    if (verificarBloqueioLogin()) {
        alert('Muitas tentativas de login. Por favor, tente novamente em 30 minutos.')
        return
    }

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ matricula, senha })
        })

        if (response.ok) {
            const { token, user } = await response.json()
            const { nome, tipoUsuario, workplace, email, cod_loja } = user

            sessionStorage.setItem('token', token)
            localStorage.setItem('matricula', matricula)
            localStorage.setItem('nome', nome)
            localStorage.setItem('email', email)
            localStorage.setItem('workplace', workplace)
            localStorage.setItem('cod_loja', cod_loja)

            let nomePerfil
            switch (tipoUsuario) {
                case 1: nomePerfil = 'Administrador'; break
                case 2: nomePerfil = 'Gerente'; break
                case 3: nomePerfil = 'Caixa'; break
                default:
                    alert('Tipo de usuário desconhecido')
                    return
            }
            localStorage.setItem('tipoUsuario', nomePerfil)

            const pagina = tipoUsuario === 1 ? 'relatorios' : tipoUsuario === 2 ? 'relatoriosG' : 'caixa'

            if (senha === 'Quero@2024#') {
                sessionStorage.setItem('mostrarPerfilUsuario', 'true')
            }

            window.location.href = pagina
            resetarTentativasLogin()

        } else {
                const errorData = await response.json()
                if(errorData.code === 'MAX_SESSIONS'){
                    confirm("Número máximo de sessões atingido. Deseja encerrar a sessão ativa?")
                    if(confirm){
                        localStorage.setItem('matricula', matricula)
                        logout()
                    }
                    return
                }
                alert(errorData.message)
                incrementarTentativasLogin()
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error)
            alert('Erro ao fazer login. Por favor, tente novamente mais tarde.')
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

async function recuperarSenha() {
    const email = document.getElementById('email').value
    try {
        const response = await fetch(`${API_URL}/recuperarSenha`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })

        if (response.ok) {
            alert('Senha recuperada com sucesso. Verifique seu e-mail.')
            esconderElementos(['recuperarSenha'])
        }

    } catch (error) {
        console.error('Erro ao recuperar senha:', error)
        alert('Erro ao recuperar senha. Por favor, tente novamente mais tarde.')
        
    }
}

// Configuração de tentativas de login
const MAX_ATTEMPTS = 3
const LOCKOUT_TIME = 30 * 60 * 1000

function verificarBloqueioLogin() {
    const attempts = parseInt(localStorage.getItem('loginAttempts')) || 0
    const lastAttemptTime = parseInt(localStorage.getItem('lastAttemptTime')) || 0
    const currentTime = Date.now()
    return attempts >= MAX_ATTEMPTS && (currentTime - lastAttemptTime) < LOCKOUT_TIME
}

function resetarTentativasLogin() {
    localStorage.setItem('loginAttempts', 0)
    localStorage.setItem('lastAttemptTime', 0)
}

function incrementarTentativasLogin() {
    const attempts = parseInt(localStorage.getItem('loginAttempts')) || 0
    localStorage.setItem('loginAttempts', attempts + 1)
    localStorage.setItem('lastAttemptTime', Date.now())
}

export { visualizarSenha, login, mostrarRecuperarSenha, mostrarPrimeiroAcesso, mostrarLogin, recuperarSenha }