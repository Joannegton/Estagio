import { ativarBotao, carregarCardUsuario, carregarUsuario, desativarBotao, esconderElementos, mostrarMenu, mostrarModalFinalizado } from "../../utils.js"
import { API_URL } from "../../config/config.js"

function mostrarPerfilUsuario(){
    carregarUsuario()
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
        const response = await fetch(`${API_URL}/usuarios/${localStorage.getItem('matricula')}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(!response.ok){
            const errorData = await response.json()
            throw new Error(errorData.message)
        }
        
        mostrarModalFinalizado()
        localStorage.setItem('nome', data.nome_usuario)
        localStorage.setItem('email', data.email)
        localStorage.setItem('workplace', data.workplace)
        carregarCardUsuario()
    } catch (error) {
        console.error('Erro ao editar usuário', error)
        alert('Erro ao editar usuário, tente novamente mais tarde')
    } finally {
        ativarBotao('submitButtonPerfilUsuario')
    }
}

function modalEditarSenha(){
    const modal = document.createElement('article')
    modal.id = 'modalEditarSenha'
    modal.classList.add('modal')
    modal.style.display = 'flex'
    modal.innerHTML = `
        <aside class="modalContent">
            <div class="fechar">
                <i class="fas fa-times close-icon" id="fecharModalEditarSenha"></i>
            </div>
            
            <form id="formEditarSenha">
            <h2>Editar Senha</h2>
                <label for="senhaAtual">Senha Atual</label>
                <input type="password" id="senhaAtual" name="senhaAtual" required>  
                <label for="novaSenha">Nova Senha</label>
                <input type="password" id="novaSenha" name="novaSenha" required>
                <label for="confirmarSenha">Confirmar Senha</label>
                <input type="password" id="confirmarSenha" name="confirmarSenha" required>
                <button type="submit" id="submitButtonEditarSenha">Salvar</button>
            </form>
        </aside>
    `
    document.body.appendChild(modal)

    document.getElementById('fecharModalEditarSenha').addEventListener('click', () => {
        esconderElementos(['modalEditarSenha'])
    })

    document.getElementById('formEditarSenha').addEventListener('submit', async (e) => {
        e.preventDefault()
        await salvarEditarSenha()
    })

}

async function salvarEditarSenha(){
    desativarBotao('submitButtonEditarSenha')
    const formulario = document.getElementById('formEditarSenha')
    const formData = new FormData(formulario)

    const data = {
        senhaAtual: formData.get('senhaAtual'),
        novaSenha: formData.get('novaSenha'),
        confirmarSenha: formData.get('confirmarSenha')
    }

    try {
        const response = await fetch(`${API_URL}/usuarios/${localStorage.getItem('matricula')}/senha`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(!response.ok){
            const errorData = await response.json()
            throw new Error(errorData.message)
        }

        mostrarModalFinalizado()
    } catch (error) {
        console.error('Erro ao editar senha', error)
        alert('Erro ao editar senha, tente novamente mais tarde')
    } finally {
        esconderElementos(['modalEditarSenha'])
    }
}


export { salvarEditarUsuario, mostrarPerfilUsuario, modalEditarSenha }