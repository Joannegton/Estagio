import { mostrarElemento } from "../utils.js"
import { API_URL } from "../config/config.js"
import { mostrarRelatorios } from "./relatorio.js"

let loja = {}

async function mostrarEditarLoja(){
    await mostrarElemento('editarLoja', 'mostrarGestaoLoja', fetchLoja)
}

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
            throw new Error('Erro ao buscar dados da loja')
        }
        loja = await response.json()
        carregarDadosLoja(loja)
    } catch (error) {
        console.error("Erro ao buscar loja: ", error.stack)
        alert('Erro ao buscar dadosss')
    }
}

function carregarDadosLoja(loja) {
    localStorage.setItem('nome_loja', loja.nome_loja)
    localStorage.setItem('endereco_loja', loja.endereco_loja)
    localStorage.setItem('telefone', loja.telefone)

    document.getElementById('nomeLoja').value = loja.nome_loja
    document.getElementById('enderecoLoja').value = loja.endereco_loja
    document.getElementById('telefone').value = loja.telefone
}

async function salvarLoja(){
    const formulario = document.getElementById('formEditarLoja')
    const formData = new FormData(formulario)

    const data = {
        nome_loja: formData.get('nomeLoja'),
        endereco_loja: formData.get('enderecoLoja'),
        telefone: formData.get('telefone'),
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
            throw new Error('Erro ao atualizar loja.')
        }
        alert("Loja atualizada")
        await mostrarRelatorios()
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
    const storeProfileFields = ['nome_loja', 'endereco_loja', 'telefone'];
    
    const isFieldIncomplete = (field) => !field || field === 'null';

    const userProfileIncomplete = userProfileFields.some(field => isFieldIncomplete(localStorage.getItem(field)));
    const storeProfileIncomplete = storeProfileFields.some(field => isFieldIncomplete(localStorage.getItem(field)));

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

export { completeInformations, mostrarEditarLoja, salvarLoja, fetchLoja }
