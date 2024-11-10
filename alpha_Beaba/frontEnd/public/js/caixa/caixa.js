import { carregarUsuario, esconderElementos } from "../../utils.js"
import { API_URL } from "../config/config.js"

function mostrarPerfilUsuario(){
    document.getElementById('perfilUsuario').style.display = 'block'
    esconderElementos(['saidaTaloes'])
    carregarUsuario()

}

function mostrarEnvioTaloes(){
    document.getElementById('saidaTaloes').style.display = 'block'
    esconderElementos(['perfilUsuario'])
}

async function saidaTalao(){
    const formulario = document.getElementById('formSaidaTalao')
    const formData = new FormData(formulario)

    const data = {
        numeroTalao: formData.get('numeroTalao'),
        matricula: localStorage.getItem('matricula'),
        cod_loja: localStorage.getItem('cod_loja')
    }
    
    if(!numeroTalao){
        alert('Código do talão é obrigatório')
        return
    }

    try {
        const response = await fetch(`${API_URL}/taloes/saida`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(!response.ok){
            const errorData = await response.json()
            alert(errorData.message || 'Erro ao solicitar talão')
            return
        }

        formulario.reset()
        alert('Entregue o talão ao cliente.')
    } catch (error) {
        console.error('Erro ao solicitar talão: ', error)
        alert('Erro ao solicitar talão. Consulte o administrador')
    }
}

export { mostrarPerfilUsuario, mostrarEnvioTaloes, saidaTalao }