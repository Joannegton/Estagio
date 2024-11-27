import { alternador, ativarBotao, carregarDadosSelect, desativarBotao, esconderElementos, exportCsv, getWorkplaceLink,  mostrarModalFinalizado, ordenarArray } from "../../utils.js"
import { API_URL } from "../../config/config.js"
import { usuarios } from "./usuariosController.js"

let lojas = [] 

async function alternadorLojas(){
    const lojas = document.getElementById('todasLojas')
    const cadastroLoja = document.getElementById('cadastroLoja')

    await fetchLojas()
    lojas.addEventListener('click', async () => {
        alternador(lojas, lojas, cadastroLoja, 'seletorLojas', 'seletorCadastroLoja', 'indicadorLojas')
        await fetchLojas()
    })
    cadastroLoja.addEventListener('click', () => {
        alternador(lojas, cadastroLoja, lojas, 'seletorCadastroLoja', 'seletorLojas', 'indicadorLojas')
    })
}


async function fetchLojas(){
    try {
        const response = await fetch(`${API_URL}/loja`, {
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
        
        lojas = await response.json()
        renderizarTabelaLojas(lojas)
    } catch (error) {
        console.error('Erro ao buscar lojas:', error)
        alert('Erro ao buscar os dados das lojas, tente novamente mais tarde.')
    }
}

function renderizarTabelaLojas(listalojas){
    let paginaAtual = 1
    const itensPorPagina = 10
    const tbody = document.getElementById('lojas-tbody')

    function paginarLojas(){
        const inicio = (paginaAtual - 1) * itensPorPagina
        const fim = inicio + itensPorPagina
        const dadosLimitados = listalojas.slice(inicio, fim)
        tbody.innerHTML = ''

        console.log(usuarios)

        dadosLimitados.forEach(item => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td data-label="Cód" id="idLoja${item.cod_loja}">${item.cod_loja}</td>
                <td data-label="Loja" id="nomeLoja${item.cod_loja}">${item.nome_loja}</td>
                <td data-label="Gerente" id="nomeGerente${item.cod_loja}" class="tooltip">
                    ${item.gerente}
                    <span class="tooltiptext">
                        <a href="${getWorkplaceLink(item.matricula, usuarios)}" target="_blank" class="botaoAcao">
                            <i class="fas fa-comments"></i>
                        </a>
                    </span>
                </td>   
                    <td data-label="Quantidade Recomendada">${item.estoque_minimo + 50}</td>
                    <td data-label="Quantidade Mínima">${item.estoque_minimo}</td>
                    <td data-label="Editar" class="acoes">
                    <div id="containerBotaoAcaoLoja${item.cod_loja}">
                        <a href="#" class="botaoAcao" id="editarLoja${item.cod_loja}" title="Editar"><i class="fas fa-edit"></i></a>
                        <a href="#" class="botaoAcao" id="excluirLoja${item.cod_loja}" title="Exxcluir"><i class="fas fa-trash-alt"></i></a>
                    </div>  
                    <div id="containerEditarBotaoAcaoLoja${item.cod_loja}" style="display: none;">
                        <a href="#" class="botaoAcao" id="salvarEditarLoja${item.cod_loja}" title="Salvar"><i class="fas fa-save"></i></a>
                        <a href="#" class="botaoAcao" id="cancelarEditarLoja${item.cod_loja}" title="Cancelar"><i class="fas fa-times"></i></a>
                    </div>
                    
                </td>
            `
            tbody.appendChild(tr)

            //Eventos de click
            document.getElementById(`editarLoja${item.cod_loja}`).addEventListener('click', async () => {
                await editarLoja(item.cod_loja)
            })

            document.getElementById(`salvarEditarLoja${item.cod_loja}`).addEventListener('click', () =>{
                salvarEditarLoja(item.cod_loja)
            })

            document.getElementById(`cancelarEditarLoja${item.cod_loja}`).addEventListener('click', () => {
                cancelarEdicao(item.cod_loja)
            })
            document.getElementById(`excluirLoja${item.cod_loja}`).addEventListener('click', () => {
                excluirLoja(item.cod_loja)
            })
        })

        //botões paginação
        document.getElementById('pagInfoLojas').textContent = `Página ${paginaAtual} de ${Math.ceil(listalojas.length / itensPorPagina)}`
        document.getElementById('pagAntLojas').disabled = paginaAtual === 1
        document.getElementById('proxPagLojas').disabled =  fim >= listalojas.length

    }

    //eventos de click dos botões de paginação
    document.getElementById('proxPagLojas').addEventListener('click', () => {
        if((paginaAtual * itensPorPagina) < listalojas.length) {
            paginaAtual++
            paginarLojas()
        }
    })
    document.getElementById('pagAntLojas').addEventListener('click', () => {
        if(paginaAtual > 1) {
            paginaAtual--
            paginarLojas()
        }
    })

    paginarLojas()
}


// funções de salvar, editar e exluir
async function salvarLoja(){
    desativarBotao('submitButtonLoja')
    const formulario = document.getElementById('formSalvarLoja')
    const formData = new FormData(formulario)

    const rua = formData.get('enderecoLoja')
    const cep = formData.get('cepLoja')
    const cidade = formData.get('cidadeEstadoLoja')

    const endereco = `${rua}- ${cep}- ${cidade}`

    const data = {
        nomeLoja: formData.get('novaLoja'),
        endereco: endereco,
        telefoneLoja: formData.get('telefoneLoja')
    }

    if(!data.nomeLoja){
        alert('Nome da loja é obrigatório')
        return
    }
    try {
        const response = await fetch(`${API_URL}/loja`, {
            method: 'POST',
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
        formulario.reset()
    } catch (error) {
        console.error('Erro ao cadastrar loja: ', error)
        alert('Erro ao cadastrar loja. Por favor, tente novamente mais tarde.')

    } finally {
        ativarBotao('submitButtonLoja')
    }
}

async function editarLoja(cod_loja) {
    esconderElementos([`containerBotaoAcaoLoja${cod_loja}`])
    document.getElementById(`containerEditarBotaoAcaoLoja${cod_loja}`).style.display = 'block'

    const nomeLoja = document.getElementById(`nomeLoja${cod_loja}`)
    let loja = nomeLoja.innerText
    nomeLoja.setAttribute('data-original-value', loja)     // Armazena os valores originais
    nomeLoja.innerHTML = `<input type="text" id="input-nomeLoja${cod_loja}" value="${loja}" class="inputsEdicao">`

    const gerenteLoja = document.getElementById(`nomeGerente${cod_loja}`)
    let gerente = gerenteLoja.innerText
    gerenteLoja.setAttribute('data-original-value', gerente)     // Armazena os valores originais
    gerenteLoja.innerHTML = `    
        <select id="select-gerente${cod_loja}">
            <option>${gerente}</option>
        </select>
    `

    try {
        await carregarDadosSelect(`select-gerente${cod_loja}`, `${API_URL}/usuarios`, 'matricula', 'nome_usuario')
        const selectGerente = document.getElementById(`select-gerente${cod_loja}`)
        for (let i = 0; i < selectGerente.options.length; i++) {
            if (selectGerente.options[i].text === gerente) {
                selectGerente.selectedIndex = i
                break
            }
        }
    } catch (error) {
        console.error('Erro ao carregar os dados do select:', error)
        alert('Erro ao carregar os dados do select. Por favor, tente novamente mais tarde.')
    }
}

async function salvarEditarLoja(cod_loja){
    desativarBotao(`salvarEditarLoja${cod_loja}`)
    let inputNome = document.getElementById(`input-nomeLoja${cod_loja}`)
    let newNome = inputNome.value

    const selectGerente = document.getElementById(`select-gerente${cod_loja}`)
    let newGerente = selectGerente.options[selectGerente.selectedIndex].text
    let matricula = selectGerente.value

    document.getElementById(`nomeLoja${cod_loja}`).innerText = newNome
    document.getElementById(`nomeGerente${cod_loja}`).innerText = newGerente 

    const data = {
        nome_loja: newNome,
        gerente_id: matricula
    }

    try {
        const response = await fetch(`${API_URL}/loja/${cod_loja}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        })

        if(!response.ok){
            const errorData = await response.json()
            throw new Error(errorData.message)
        }

        mostrarModalFinalizado()
        inputNome.remove()
        selectGerente.remove()
        esconderElementos([`containerEditarBotaoAcaoLoja${cod_loja}`])
        document.getElementById(`containerBotaoAcaoLoja${cod_loja}`).style.display = 'block'
    } catch (error) {
        console.error('Erro ao atualizar loja: ', error)
        alert('Erro ao atualizar loja. Por favor, tente novamente mais tarde.')
    } finally {
        ativarBotao(`salvarEditarLoja${cod_loja}`)
    }
}

function cancelarEdicao(codLoja) {
    const nomeLoja = document.getElementById(`nomeLoja${codLoja}`)
    const nomeGerente = document.getElementById(`nomeGerente${codLoja}`)

    // Restaura os valores originais
    nomeLoja.innerText = nomeLoja.getAttribute('data-original-value')
    nomeGerente.innerText = nomeGerente.getAttribute('data-original-value')

    esconderElementos([`containerEditarBotaoAcaoLoja${codLoja}`])
    document.getElementById(`containerBotaoAcaoLoja${codLoja}`).style.display = 'block'
}

async function excluirLoja(cod_loja){
    const confirmacao = confirm(`Deseja realmente excluir a loja ${cod_loja}?`)
    desativarBotao(`excluirLoja${cod_loja}`)
    if (confirmacao) {
        try {
            const response = await fetch(`${API_URL}/loja/${cod_loja}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message)
            }
            mostrarModalFinalizado()
            await fetchLojas()
        } catch (error) {
            console.error('Erro ao deletar loja:', error)
            alert('Erro ao deletar loja. Por favor, tente novamente mais tarde.')
        } finally {
            ativarBotao(`excluirLoja${cod_loja}`)
        }
    }
}


// funções de filtro e ordenação
function ordenarLoja(event){
    const ordenarPor = event.target.value
    ordenarArray(lojas, 'nome_loja', ordenarPor)
    renderizarTabelaLojas(lojas)
}

// carregar cidade/uf
let cidadesEstados = []

async function fetchCidadesEstados() {
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
    const data = await response.json()
    cidadesEstados = data.map(municipio => ({
      cidade: municipio.nome,
      estado: municipio.microrregiao.mesorregiao.UF.sigla
    }))
}

function showSuggestions(event) {
    const value = event.target.value
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';
    if (value.length === 0) {
      return;
    }
  
    const filtered = cidadesEstados.filter(ce => ce.cidade.toLowerCase().startsWith(value.toLowerCase()));
    filtered.forEach(ce => {
      const div = document.createElement('div');
      div.textContent = `${ce.cidade}/${ce.estado}`;
      div.onclick = () => {
        document.getElementById('cidadeEstadoLoja').value = `${ce.cidade}/${ce.estado}`;
        suggestions.innerHTML = '';
      };
      suggestions.appendChild(div);
    });
}

function exportarLojas(){
    exportCsv(lojas, 'lojas')
}


export { fetchCidadesEstados, showSuggestions, exportarLojas, alternadorLojas, salvarLoja, editarLoja, salvarEditarLoja, ordenarLoja }