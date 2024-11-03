import { carregarDadosSelect, mostrarElemento } from "../../utils.js"

function mostrarEnvioTaloes(){
    mostrarElemento('envioTaloes', 'mostrarEnvioTaloes', () => {
        carregarSelects()
    })
}

async function enviarTalao() {
    const formulario = document.getElementById('formEnvioTalao')
    const formData = new FormData(formulario)

    const data = {
        lojaDestino: formData.get('lojaDestinataria'),
        dataEnvio: formData.get('dataHoraEvento'),
        quantidade: formData.get('quantidadeTaloes'),
        recebedor: formData.get('funcionarioRecebimento'),
        dataRecebimentoPrevisto: formData.get('dataEntregaPrevista')
    }

    const response = await fetch('http://localhost:3000/api/taloes', {
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
}


function carregarSelects() {
    carregarDadosSelect('lojaDestinataria', 'http://localhost:3000/api/loja', 'cod_loja', 'nome_loja')

    const lojaSelect = document.getElementById('lojaDestinataria')
    if (!lojaSelect.dataset.eventAdded) {
        lojaSelect.addEventListener('change', async (event) => {
            const codLoja = event.target.value
            const response = await fetch(`http://localhost:3000/api/loja/${codLoja}`)
            const data = await response.json()

            carregarGerente(data.gerente_id)
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
        const response = await fetch(`http://localhost:3000/api/usuarios/${gerenteId}`)
        
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