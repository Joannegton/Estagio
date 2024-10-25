import { adicionarPaginacao, alternador, enviarDados, esconderElementos, mostrarElemento, mostrarMenu } from "../utils.js"

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
            <td data-label="Gerente" id="nomeGerente${item.cod_loja}">${item.nome_usuario}</td>
                <td data-label="Quantidade Recomendada">${item.estoque_minimo * 1.5}</td>
                <td data-label="Quantidade Mínima">${item.estoque_minimo}</td>
                <td data-label="Nº de Caixas" id="qntCaixas${item.cod_loja}">${item.caixas_fisicos}</td>
                <td data-label="Editar" class="acoes">
                <div id="containerBotaoAcaoLoja${item.cod_loja}">
                <a href="#" class="botaoAcao" id="editarLoja${item.cod_loja}"><i class="fas fa-edit"></i></a>
                    <a href="#" class="botaoAcao" id="excluirLoja${item.cod_loja}"><i class="fas fa-trash-alt"></i></a>
                </div>            
                <a href="#" class="botaoAcao" id="salvarEditarLoja${item.cod_loja}" style="display: none;"><i class="fas fa-save"></i></a>
            </td>
        `
        tbody.appendChild(tr)

        //Eventos de click
        document.getElementById(`editarLoja${item.cod_loja}`).addEventListener('click', () => {
            editarLoja(item.cod_loja)
        });
        document.getElementById(`salvarEditarLoja${item.cod_loja}`).addEventListener('click', () => {
            salvarEditarLoja(item.cod_loja)
        });
        document.getElementById(`excluirLoja${item.cod_loja}`).addEventListener('click', () => {
            excluirLoja(item.cod_loja)
        });
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

    const result = await enviarDados('http://localhost:5000/cadastrarLoja', data)

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

    let nomeLoja = document.getElementById(`nomeLoja${cod_loja}`)
    let nome = nomeLoja.innerText

    let qntCaixas = document.getElementById(`qntCaixas${cod_loja}`)
    let qnt = parseInt(qntCaixas.innerText)

    nomeLoja.innerHTML = `<input type="text" id="input-nomeLoja${cod_loja}" value="' + nome + '">`
    qntCaixas.innerHTML = `<input type="number" id="input-qntCaixas${cod_loja}" value="' + qnt + '">`
    
}

function salvarEditarLoja(cod_loja){
    let inputNome = document.getElementById(`input-nomeLoja${cod_loja}`)
    let newNome = inputNome.value

    let inputQnt = document.getElementById(`input-qntCaixas${cod_loja}`)
    let novaQnt = inputQnt.value

    document.getElementById(`nomeLoja${cod_loja}`).innerText = newNome
    document.getElementById(`qntCaixas${cod_loja}`).innerText = novaQnt

    esconderElementos([`salvarEditarLoja${cod_loja}`])
    document.getElementById(`editarLoja${cod_loja}`).style.display = 'block'
    inputNome.remove()
    inputQnt.remove()
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