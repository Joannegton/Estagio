import { mostrarElemento } from "../../utils.js"
import { mostrarRelatorios } from "./relatorio.js"

let loja = {}

async function mostrarEditarLoja(){
    await mostrarElemento('editarLoja', 'mostrarGestaoLoja', fetchLoja)
}

async function fetchLoja(){
    try {
        const codLoja = localStorage.getItem('cod_loja')
        const response = await fetch(`http://localhost:3000/api/loja/${codLoja}`)
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
    document.getElementById('nomeLoja').value = loja.nome_loja
    document.getElementById('enderecoLoja').value = loja.endereco_loja
    document.getElementById('telefone').value = loja.telefone
    document.getElementById('qntCaixas').value = loja.caixas_fisicos
}

async function salvarLoja(){
    const formulario = document.getElementById('formEditarLoja')
    const formData = new FormData(formulario)

    const data = {
        nome_loja: formData.get('nomeLoja'),
        endereco_loja: formData.get('enderecoLoja'),
        telefone: formData.get('telefone'),
        caixas_fisicos: formData.get('qntCaixas')
    }

    if (!data.nome_loja || !data.endereco_loja || !data.telefone || !data.caixas_fisicos) {
        alert('Por favor, complete os dados da Loja')
    }

    try {
        const codLoja = localStorage.getItem('cod_loja')
        const response = await fetch(`http://localhost:3000/api/loja/${codLoja}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error('Erro ao atualizar loja.')
        }
        alert("Loja atualizada")
        mostrarRelatorios()
    } catch (error) {
        console.error('Erro ao atualizar Loja: ', error.stack)
        alert('Erro ao enviar dados, tente novamente mais tarde.')
    }
}

export { mostrarEditarLoja, salvarLoja }
