import { adicionarPaginacao, alternador, carregarDadosSelect, enviarDados, esconderElementos, mostrarElemento, mostrarMenu } from "../../utils.js"

let lojas = []

function alternadorLojas(){
    const lojas = document.getElementById('todasLojas')
    const cadastroLoja = document.getElementById('cadastroLoja')

    lojas.addEventListener('click', () => {
        alternador(lojas, lojas, cadastroLoja, 'seletorLojas', 'seletorCadastroLoja', 'indicadorLojas')
        adicionarPaginacao(lojas, fetchLojas, 'pagAntLojas', 'proxPagLojas', 'Loja')
    })
    cadastroLoja.addEventListener('click', () => {
        alternador(lojas, cadastroLoja, lojas, 'seletorCadastroLoja', 'seletorLojas', 'indicadorLojas')
    })
}

function mostrarLojas(){
    mostrarElemento('lojas', 'mostrarLojas', () =>{
        adicionarPaginacao(lojas, fetchLojas, 'pagAntLojas', 'proxPagLojas', 'Loja')
        alternadorLojas()
    })
}

async function fetchLojas(){
    try {
        const response = await fetch('http://localhost:3000/api/lojas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    
        if (!response.ok) {
            throw new Error('Erro ao buscar lojas')
        }
        
        lojas = await response.json()
        renderizarTabelaLojas(lojas)
    } catch (error) {
        console.error('Erro ao buscar lojas:', error)
    }
}


function renderizarTabelaLojas(listalojas){
    const tbody = document.getElementById('lojas-tbody')
    tbody.innerHTML = ''

    const paginaAtual = 1
    const itensPorPagina = 13

    const inicio = (paginaAtual - 1) * itensPorPagina
    const fim = inicio + itensPorPagina
    const dadosLimitados = listalojas.slice(inicio, fim)

    dadosLimitados.forEach(item => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td data-label="Cód" id="idLoja${item.cod_loja}">${item.cod_loja}</td>
            <td data-label="Loja" id="nomeLoja${item.cod_loja}">${item.nome_loja}</td>
            <td data-label="Gerente" id="nomeGerente${item.cod_loja}">${item.gerente}</td>
                <td data-label="Quantidade Recomendada">${item.estoque_minimo + 50}</td>
                <td data-label="Quantidade Mínima">${item.estoque_minimo}</td>
                <td data-label="Editar" class="acoes">
                <div id="containerBotaoAcaoLoja${item.cod_loja}">
                <a href="#" class="botaoAcao" id="editarLoja${item.cod_loja}" title="Editar"><i class="fas fa-edit"></i></a>
                    <a href="#" class="botaoAcao" id="excluirLoja${item.cod_loja}" title="Exxcluir"><i class="fas fa-trash-alt"></i></a>
                </div>            
                <a href="#" class="botaoAcao" id="salvarEditarLoja${item.cod_loja}" title="Salvar" style="display: none"><i class="fas fa-save"></i></a>
            </td>
        `
        tbody.appendChild(tr)

        //Eventos de click
        document.getElementById(`editarLoja${item.cod_loja}`).addEventListener('click', () => {
            editarLoja(item.cod_loja)
        })
        document.getElementById(`salvarEditarLoja${item.cod_loja}`).addEventListener('click', () => {
            salvarEditarLoja(item.cod_loja)
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

async function salvarLoja(){
    const formulario = document.getElementById('formSalvarLoja')
    const formData = new FormData(formulario)

    const data = {
        nomeLoja: formData.get('novaLoja'),
        endereco: formData.get('enderecoLoja'),
        telefoneLoja: formData.get('telefoneLoja')
    }

    const result = await enviarDados('http://localhost:3000/cadastrarLoja', data)

    if (result.success){
        alert('Loja cadastrada com sucesso')
        formulario.reset()
    } else {
        alert('Erro ao cadastrar loja, consulte o Administrador do sistema')
    }
}

function editarLoja(cod_loja){
    esconderElementos([`containerBotaoAcaoLoja${cod_loja}`])
    document.getElementById(`salvarEditarLoja${cod_loja}`).style.display = 'block'

    const nomeLoja = document.getElementById(`nomeLoja${cod_loja}`)
    let nome = nomeLoja.innerText

    const gerenteLoja = document.getElementById(`nomeGerente${cod_loja}`)
    let gerente = gerenteLoja.innerText

    nomeLoja.innerHTML = `<input type="text" id="input-nomeLoja${cod_loja}" value="${nome}" class="inputsEdicao">`
    
    gerenteLoja.innerHTML = `
        <select id="select-gerente${cod_loja}">
        </select>
    `
    
    carregarDadosSelect(`select-gerente${cod_loja}`, 'http://localhost:3000/api/usuarios', 'matricula', 'nome_usuario').then(() => {
        const selectGerente = document.getElementById(`select-gerente${cod_loja}`)
        for (let i = 0; i < selectGerente.options.length; i++) {
            if (selectGerente.options[i].text === gerente) {
                selectGerente.selectedIndex = i
                break
            }
        }
    })
}

function salvarEditarLoja(cod_loja){
    let inputNome = document.getElementById(`input-nomeLoja${cod_loja}`)
    let newNome = inputNome.value

    const selectGerente = document.getElementById(`select-gerente${cod_loja}`)
    let newGerente = selectGerente.options[selectGerente.selectedIndex].text
    let matricula = selectGerente.value

    document.getElementById(`nomeLoja${cod_loja}`).innerText = newNome
    document.getElementById(`nomeGerente${cod_loja}`).innerText = newGerente

    esconderElementos([`salvarEditarLoja${cod_loja}`])
    document.getElementById(`containerBotaoAcaoLoja${cod_loja}`).style.display = 'block'
    inputNome.remove()
    selectGerente.remove()
}

function excluirLoja(cod_loja){
    alert('Loja', cod_loja, 'Excluido')
}
function ordenarLoja(){
    alert('Ordenar loja')
}

function exportarLojas(){
    alert('Exportar lojas')
}


export {  mostrarLojas, exportarLojas, alternadorLojas, salvarLoja, editarLoja, salvarEditarLoja, ordenarLoja }