import { ativarBotao, carregarDadosSelect, desativarBotao, mostrarElemento } from "../../utils.js"
import { API_URL } from "../config/config.js"

async function mostrarEnvioTaloes(){
    await mostrarElemento('envioTaloes', 'mostrarEnvioTaloes', carregarSelects)
}

async function enviarTalao() {
    desativarBotao('submitButtonTalao')
    const formulario = document.getElementById('formEnvioTalao')
    const formData = new FormData(formulario)

    const data = {
        lojaDestino: formData.get('lojaDestinataria'),
        dataEnvio: formData.get('dataHoraEvento'),
        quantidade: formData.get('quantidadeTaloes'),
        recebedor: formData.get('funcionarioRecebimento'),
        dataRecebimentoPrevisto: formData.get('dataEntregaPrevista')
    }

    try {
        const response = await fetch(`${API_URL}/taloes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    
        if (response.ok) {
            alert('Talão enviado com sucesso!')
            formulario.reset()
        } else {
            alert('Erro ao enviar talão!')
        }
    } catch (error) {
        console.error('Erro ao enviar talão:', error)
        alert('Erro ao enviar talão, tente novamente mais tarde')
    } finally {
        ativarBotao('submitButtonTalao')
    }
}


async function carregarSelects() {
    try {
        await carregarDadosSelect('lojaDestinataria', `${API_URL}/loja`, 'cod_loja', 'nome_loja')
    } catch (error) {
        console.error('Erro ao carregar os dados do select de loja:', error)
        alert('Erro ao carregar os dados do select de loja. Por favor, tente novamente mais tarde.')
        return
    }

    const lojaSelect = document.getElementById('lojaDestinataria')
    if (!lojaSelect.dataset.eventAdded) {
        lojaSelect.addEventListener('change', async (event) => {
            const codLoja = event.target.value
            try {
                const response = await fetch(`${API_URL}/loja/${codLoja}`)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json()
                await carregarGerente(data.gerente_id)
            } catch (error) {
                console.error('Erro ao carregar os dados da loja:', error)
                alert('Erro ao carregar os dados da loja. Por favor, tente novamente mais tarde.')
            }
        })
        lojaSelect.dataset.eventAdded = true
    }
}

async function carregarGerente(gerenteId) {
    const funcionarioSelect = document.getElementById('funcionarioRecebimento')
    funcionarioSelect.innerHTML = '' // Limpa o select

    if (!gerenteId) {
        const option = document.createElement('option')
        option.value = ''
        option.textContent = ''
        funcionarioSelect.appendChild(option)
        return
    }

    try {
        const response = await fetch(`${API_URL}/usuarios/${gerenteId}`)
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        const option = document.createElement('option')
        option.value = data.matricula
        option.textContent = data.nome_usuario
        funcionarioSelect.appendChild(option)
    } catch (error) {
        console.error('Erro ao carregar gerente:', error)
    }
}



export { mostrarEnvioTaloes, enviarTalao }