import { ativarBotao, desativarBotao, esconderElementos, mostrarMenu } from "../../utils.js"

function mostrarPerfilUsuario(){
    document.getElementById('perfilUsuario').style.display = 'block'
    esconderElementos(['envioTaloes', 'estoque', 'relatorios', 'manutencao', 'lojas', 'perfil'])
    mostrarMenu()
    carregarUsuario()
}

function carregarUsuario(){
    document.getElementById('perfil_usuario').textContent = localStorage.getItem('tipoUsuario')
    document.getElementById('nome_usuario').textContent = localStorage.getItem('nome')
    
    document.getElementById('matricula').value = localStorage.getItem('matricula')
    document.getElementById('nome').value = localStorage.getItem('nome')
    document.getElementById('email').value = localStorage.getItem('email')
    document.getElementById('workplace').value = localStorage.getItem('workplace')

}
async function salvarEditarUsuario(){
    desativarBotao('submitButtonPerfilUsuario')
    const formulario = document.getElementById('formEditUsuario')
    const formData = new FormData(formulario)

    const data = {
        nome_usuario: formData.get('nome'),
        email: formData.get('email'),
        workplace: formData.get('workplace')
    }

    try {
        const response = await fetch('http://localhost:3000/api/usuario', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        if(response.status === 200){
            alert('Usuário editado com sucesso')
        } else {
            alert('Erro ao editar usuário')
        }
    } catch (error) {
        console.error('Erro ao editar usuário', error)
        alert('Erro ao editar usuário, tente novamente mais tarde')
    } finally {
        ativarBotao('submitButtonPerfilUsuario')
    }
}

export { salvarEditarUsuario, carregarUsuario, mostrarPerfilUsuario }