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
        //window.location.href = 'login.html';
    }
}

window.onload = checkSession;

mostrarPrimeiroAcesso = () => {
    document.getElementById('primeiroAcesso').style.display = 'block';
    document.getElementById('login').style.display = 'none';
    document.getElementById('recuperarSenha').style.display = 'none';
}

mostrarRecuperarSenha = () =>{
    document.getElementById('primeiroAcesso').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('recuperarSenha').style.display = 'block';
}

mostrarLogin = () =>{
    document.getElementById('primeiroAcesso').style.display = 'none';
    document.getElementById('login').style.display = 'block';
    document.getElementById('recuperarSenha').style.display = 'none';
}

mostrarLogin();

//primeiro acesso
document.getElementById('loja').addEventListener('change', function() {
    const lojaSelect = document.getElementById('loja');
    const novaLojaContainer = document.getElementById('novaLojaContainer');

    // Verifica se o usuário escolheu "Adicionar nova loja"
    if (lojaSelect.value === 'addNovaLoja') {
        novaLojaContainer.style.display = 'block'; // Mostra o campo para adicionar a nova loja
        document.getElementById('novaLoja').setAttribute('required', 'required'); // Define o campo como obrigatório
    } else {
        novaLojaContainer.style.display = 'none'; // Oculta o campo se outra loja for selecionada
        document.getElementById('novaLoja').removeAttribute('required'); // Remove a obrigatoriedade
    }
});

document.getElementById('perfilForm').addEventListener('submit', function(e) {
    const lojaSelect = document.getElementById('loja');
    const novaLojaInput = document.getElementById('novaLoja');

    // Se uma nova loja foi adicionada, substitua o valor do select com o nome da nova loja
    if (lojaSelect.value === 'addNovaLoja' && novaLojaInput.value.trim() !== '') {
        const novaLojaOption = new Option(novaLojaInput.value, novaLojaInput.value, true, true);
        lojaSelect.add(novaLojaOption);
        lojaSelect.value = novaLojaInput.value;
    }
});

