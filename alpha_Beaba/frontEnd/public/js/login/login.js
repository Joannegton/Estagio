import { esconderElementos } from "../../utils.js"

function mostrarRecuperarSenha() {
    document.getElementById('recuperarSenha').style.display = 'flex'
    esconderElementos(['primeiroAcesso'])
}

function mostrarPrimeiroAcesso() {
    const elemento = document.getElementById('primeiroAcesso')
    elemento.style.display = 'flex'
    elementodocument.classList.add('show')
    esconderElementos(['recuperarSenha'])
}

function mostrarLogin() {
    document.getElementById('login').style.display = 'block'
    esconderElementos(['recuperarSenha', 'primeiroAcesso'])
}

//arrumar para fomulario
async function login() {
    const matricula = document.getElementById('matricula').value
    const senha = document.getElementById('senha').value

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ matricula, senha })
        })
    
        if (response.ok) {
            const data = await response.json()
            const { token, user } = data
            const { nome, tipoUsuario, workplace, email } = user
    
            sessionStorage.setItem('token', token)
            localStorage.setItem('matricula', matricula)
            localStorage.setItem('nome', nome || '')
            localStorage.setItem('email', email || '')
            localStorage.setItem('workplace', workplace || '')

            let nomePerfil = ''
            switch (tipoUsuario) {
                case 1:
                    nomePerfil = 'Administrador'
                    break
                case 2:
                    nomePerfil = 'Gerente'
                    break
                case 3:
                    nomePerfil = 'Caixa'
                    break
                default:
                    alert('Tipo de usuário desconhecido')
                    return
            }
            localStorage.setItem('tipoUsuario', nomePerfil)
    
            let pagina = ''
            let mostrarPerfilUsuario = false
    
            if (senha === 'Quero@2024#') {
                mostrarPerfilUsuario = true
            }
    
            switch (tipoUsuario) {
                case 1:
                    pagina = 'admin'
                    break
                case 2:
                    pagina = 'gerente'
                    break
                case 3:
                    pagina = 'caixa'
                    break
                default:
                    alert('Tipo de usuário desconhecido')
                    return
            }
    
            if (mostrarPerfilUsuario) {
                sessionStorage.setItem('mostrarPerfilUsuario', 'true')
            }
    
            window.location.href = pagina
        } else {
            alert('Erro ao fazer login')
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

function recuperarSenha() {
    const email = document.getElementById('email').value
    alert(`Instruções de recuperação de senha foram enviadas para ${email}`)
}

export { visualizarSenha, login, mostrarRecuperarSenha, mostrarPrimeiroAcesso, mostrarLogin, recuperarSenha }