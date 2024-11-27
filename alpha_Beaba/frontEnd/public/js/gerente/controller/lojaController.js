import { mostrarModalFinalizado } from "../../utils.js"
import { API_URL } from "../../config/config.js"
import { alternadorRelatorios } from "./relatorioController.js"

let loja = {}

async function fetchLoja(){
    try {
        const codLoja = localStorage.getItem('cod_loja')
        const response = await fetch(`${API_URL}/loja/${codLoja}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message)
        }
        loja = await response.json()
    } catch (error) {
        console.error("Erro ao buscar loja: ", error.stack)
        alert('Erro ao buscar dados')
    }
}

function carregarDadosLoja(loja) {
    localStorage.setItem('nome_loja', loja.nome_loja)
    const endereco = loja.endereco_loja.split('- ')

    document.getElementById('nomeLoja').value = loja.nome_loja
    document.getElementById('enderecoLoja').value = endereco[0]
    document.getElementById('telefone').value = loja.telefone
    document.getElementById('quantidadeMinimaTaloes').value = loja.estoque_minimo
    document.getElementById('cepLoja').value = endereco[1]
    document.getElementById('cidadeEstadoLoja').value = endereco[2]
}

async function salvarLoja(){
    const formulario = document.getElementById('formEditarLoja')
    const formData = new FormData(formulario)

    const endereco = formData.get('enderecoLoja')
    const  cep = formData.get('cepLoja')
    const cidadeEstado = formData.get('cidadeEstadoLoja')

    const enderecoCompleto = `${endereco}- ${cep}- ${cidadeEstado}`

    const data = {
        nome_loja: formData.get('nomeLoja'),
        endereco_loja: enderecoCompleto,
        telefone: formData.get('telefone'),
        estoque_minimo: formData.get('quantidadeMinimaTaloes')
    }

    if (!data.nome_loja || !data.endereco_loja || !data.telefone ) {
        alert('Por favor, complete os dados da Loja')
    }

    try {
        const codLoja = localStorage.getItem('cod_loja')
        const response = await fetch(`${API_URL}/loja/${codLoja}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message)
        }
        
        mostrarModalFinalizado()
        await completeInformations()
        setTimeout(async () => {
            await alternadorRelatorios()
        }, 1000)
    } catch (error) {
        console.error('Erro ao atualizar Loja: ', error.stack)
        alert('Erro ao enviar dados, tente novamente mais tarde.')
    }
}

// completar informações
async function completeInformations() {
    await fetchLoja()

    // Cria o card
    const floatingCard = document.createElement('div');
    floatingCard.id = 'floating-card';

    const title = document.createElement('h3');
    title.textContent = 'Complete as informações';
    floatingCard.appendChild(title);

    // Lista de tarefas incompletas
    const taskList = document.createElement('ul');
    floatingCard.appendChild(taskList);

    // Verifica as condições e adiciona as tarefas
    const incompleteTasks = [];

    const userProfileFields = ['nome', 'email', 'workplace'];
    const storeProfileFields = ['nome_loja', 'endereco_loja', 'telefone', 'estoque_minimo'];
    
    const isFieldIncomplete = (field) => !field || field === 'null';

    const userProfileIncomplete = userProfileFields.some(field => isFieldIncomplete(localStorage.getItem(field)));
    const storeProfileIncomplete = storeProfileFields.some(field => isFieldIncomplete(loja[field]));

    if (userProfileIncomplete) {
        incompleteTasks.push('Complete seu perfil');
    }

    if (storeProfileIncomplete) {
        incompleteTasks.push('Complete as informações da Loja');
    }

    if (incompleteTasks.length > 0) {
        incompleteTasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.textContent = task;
            taskList.appendChild(listItem);
        });

        floatingCard.style.display = 'block';
        document.body.appendChild(floatingCard);
    }
}

export { completeInformations, carregarDadosLoja, salvarLoja, fetchLoja, loja }
