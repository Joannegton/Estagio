import { adicionarPaginacao, alternador, esconderElementos, mostrarElemento, mostrarMenu } from "../utils.js"

let lojas = []

function alternadorLojas(){
    const lojas = document.getElementById('todasLojas');
    const cadastroLoja = document.getElementById('cadastroLoja');

    lojas.addEventListener('click', () => {
        alternador(lojas, lojas, cadastroLoja, 'seletorLojas', 'seletorCadastroLoja', 'indicadorLojas');
        adicionarPaginacao(lojas, fetchLojas, 'pagAntLojas', 'proxPagLojas', 'Loja');
    })
    cadastroLoja.addEventListener('click', () => {
        alternador(lojas, cadastroLoja, lojas, 'seletorCadastroLoja', 'seletorLojas', 'indicadorLojas');
    })
}

function mostrarLojas(){
    mostrarElemento('lojas', 'mostrarLojas', () =>{
        adicionarPaginacao(lojas, fetchLojas, 'pagAntLojas', 'proxPagLojas', 'Loja');
        alternadorLojas()
    })
}

async function fetchLojas(){
    try {
        const response = await fetch('http://localhost:5000/lojas', {
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
        alert('Erro ao buscar lojas, consulte o Administrador do sistema') 
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
            <td data-label="Cód" id="idLoja${item.id_loja}">${item.id_loja}</td>
            <td data-label="Loja" id="nomeLoja${item.id_loja}">${item.nome_loja}</td>
            <td data-label="Gerente" id="nomeGerente${item.id_loja}">${item.nome_usuario}</td>
                <td data-label="Quantidade Recomendada">${item.estoque_minimo * 1.5}</td>
                <td data-label="Quantidade Mínima">${item.estoque_minimo}</td>
                <td data-label="Nº de Caixas" id="qntCaixas${item.id_loja}">${item.caixas_fisicos}</td>
                <td data-label="Editar" class="acoes">
                <div id="containerBotaoAcaoLoja${item.id_loja}">
                <a href="#" class="botaoAcao" id="editarLoja${item.id_loja}"><i class="fas fa-edit"></i></a>
                    <a href="#" class="botaoAcao" id="excluirLoja${item.id_loja}"><i class="fas fa-trash-alt"></i></a>
                </div>            
                <a href="#" class="botaoAcao" id="salvarEditarLoja${item.id_loja}" style="display: none;"><i class="fas fa-save"></i></a>
            </td>
        `
        tbody.appendChild(tr)

        //Eventos de click
        document.getElementById(`editarLoja${item.id_loja}`).addEventListener('click', () => {
            editarLoja(item.id_loja)
        });
        document.getElementById(`salvarEditarLoja${item.id_loja}`).addEventListener('click', () => {
            salvarEditarLoja(item.id_loja)
        });
        document.getElementById(`excluirLoja${item.id_loja}`).addEventListener('click', () => {
            excluirLoja(item.id_loja)
        });
    })

    //botões paginação
    document.getElementById('pagInfoLojas').textContent = `Página ${paginaAtual} de ${Math.ceil(listalojas.length / itensPorPagina)}`
    document.getElementById('pagAntLojas').disabled = paginaAtual === 1
    document.getElementById('proxPagLojas').disabled =  fim >= listalojas.length

}

function salvarLoja(){
    alert('Salvar loja')
}

function editarLoja(id_loja){
    esconderElementos([`containerBotaoAcaoLoja${id_loja}`])
    document.getElementById(`salvarEditarLoja${id_loja}`).style.display = 'block'

    let nomeLoja = document.getElementById(`nomeLoja${id_loja}`)
    let nome = nomeLoja.innerText

    let qntCaixas = document.getElementById(`qntCaixas${id_loja}`)
    let qnt = parseInt(qntCaixas.innerText)

    nomeLoja.innerHTML = `<input type="text" id="input-nomeLoja${id_loja}" value="' + nome + '">`
    qntCaixas.innerHTML = `<input type="number" id="input-qntCaixas${id_loja}" value="' + qnt + '">`
    
}

function salvarEditarLoja(id_loja){
    let inputNome = document.getElementById(`input-nomeLoja${id_loja}`)
    let newNome = inputNome.value

    let inputQnt = document.getElementById(`input-qntCaixas${id_loja}`)
    let novaQnt = inputQnt.value

    document.getElementById(`nomeLoja${id_loja}`).innerText = newNome
    document.getElementById(`qntCaixas${id_loja}`).innerText = novaQnt

    esconderElementos([`salvarEditarLoja${id_loja}`])
    document.getElementById(`editarLoja${id_loja}`).style.display = 'block'
    inputNome.remove()
    inputQnt.remove()
}

function excluirLoja(id_loja){
    alert('Loja', id_loja, 'Excluido')
}
function ordenarLoja(){
    alert('Ordenar loja')
}

function exportarLojas(){
    alert('Exportar lojas')
}


export {  mostrarLojas, exportarLojas, alternadorLojas, salvarLoja, editarLoja, salvarEditarLoja, ordenarLoja }