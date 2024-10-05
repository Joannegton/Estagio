// auth.js
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulação de autenticação
    if (username === 'admin' && password === 'admin') {
        sessionStorage.setItem('auth', 'true');
        window.location.href = 'index.html';
    } else {
        alert('Usuário ou senha incorretos');
    }
});

document.getElementById('recuperarSenhaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;

    // Simulação de recuperação de senha
    alert(`Instruções de recuperação de senha foram enviadas para ${email}`);
});

// Controle de timeout e múltiplos logins
function checkSession() {
    if (!sessionStorage.getItem('auth')) {
        window.location.href = 'login.html';
    }
}

window.onload = checkSession;