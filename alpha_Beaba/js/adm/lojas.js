import { adicionarPaginacao, alternador, esconderElementos, mostrarElemento, mostrarMenu } from "../utils.js"

function alternadorLojas(){
    const lojas = document.getElementById('todasLojas');
    const cadastroLoja = document.getElementById('cadastroLoja');

    lojas.addEventListener('click', () => {
        alternador(lojas, lojas, cadastroLoja, 'seletorLojas', 'seletorCadastroLoja', 'indicadorLojas');
    })
    cadastroLoja.addEventListener('click', () => {
        alternador(lojas, cadastroLoja, lojas, 'seletorCadastroLoja', 'seletorLojas', 'indicadorLojas');
    })
}

function mostrarLojas(){
    mostrarElemento('lojas', 'mostrarLojas', () =>{
        adicionarPaginacao(dadosLojaGeral, renderizarTabelaLojas, 'pagAntLojas', 'proxPagLojas', 'Loja');
        alternadorLojas()
    })
}

const dadosLojaGeral = {
    paginaAtual: 1,
    itensPorPagina: 13,
    dadosLoja: [
        { id_loja: 1, loja: 'Loja 01', qntRecomend: 25, qntMinima: 15, numCaixas: 3, gerente: 'Carlos Almeida' },
        { id_loja: 2, loja: 'Loja 02', qntRecomend: 30, qntMinima: 20, numCaixas: 4, gerente: 'Fernanda Silva' },
        { id_loja: 3, loja: 'Loja 03', qntRecomend: 50, qntMinima: 30, numCaixas: 6, gerente: 'Paulo Roberto' },
        { id_loja: 4, loja: 'Loja 04', qntRecomend: 40, qntMinima: 25, numCaixas: 5, gerente: 'Ana Carolina' },
        { id_loja: 5, loja: 'Loja 05', qntRecomend: 60, qntMinima: 35, numCaixas: 8, gerente: 'Marcelo Souza' },
        { id_loja: 6, loja: 'Loja 06', qntRecomend: 45, qntMinima: 28, numCaixas: 7, gerente: 'Juliana Ferreira' },
        { id_loja: 7, loja: 'Loja 07', qntRecomend: 20, qntMinima: 12, numCaixas: 2, gerente: 'Lucas Oliveira' },
        { id_loja: 8, loja: 'Loja 08', qntRecomend: 35, qntMinima: 22, numCaixas: 4, gerente: 'Renata Costa' },
        { id_loja: 9, loja: 'Loja 09', qntRecomend: 55, qntMinima: 32, numCaixas: 6, gerente: 'Rafael Nunes' },
        { id_loja: 10, loja: 'Loja 10', qntRecomend: 70, qntMinima: 40, numCaixas: 9, gerente: 'Mariana Ramos' },
        { id_loja: 11, loja: 'Loja 11', qntRecomend: 25, qntMinima: 18, numCaixas: 3, gerente: 'Gustavo Vieira' },
        { id_loja: 12, loja: 'Loja 12', qntRecomend: 65, qntMinima: 38, numCaixas: 7, gerente: 'Patrícia Moreira' },
        { id_loja: 13, loja: 'Loja 13', qntRecomend: 80, qntMinima: 45, numCaixas: 10, gerente: 'Cláudio Lima' },
        { id_loja: 14, loja: 'Loja 14', qntRecomend: 90, qntMinima: 50, numCaixas: 12, gerente: 'Simone Alves' },
        { id_loja: 15, loja: 'Loja 15', qntRecomend: 100, qntMinima: 55, numCaixas: 15, gerente: 'Eduardo Martins' }
    ]
}

function renderizarTabelaLojas(){
    const tbody = document.getElementById('lojas-tbody')
    tbody.innerHTML = ''

    const inicio = (dadosLojaGeral.paginaAtual - 1) * dadosLojaGeral.itensPorPagina
    const fim = inicio + dadosLojaGeral.itensPorPagina
    const dadosLimitados = dadosLojaGeral.dadosLoja.slice(inicio, fim)

    dadosLimitados.forEach(item => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td data-label="Loja" id="nomeLoja${item.id_loja}">${item.loja}</td>
            <td data-label="Gerente" id="nomeGerente${item.id_loja}">${item.gerente}</td>
                <td data-label="Quantidade Recomendada">${item.qntRecomend}</td>
                <td data-label="Quantidade Mínima">${item.qntMinima}</td>
                <td data-label="Nº de Caixas" id="qntCaixas${item.id_loja}">${item.numCaixas}</td>
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
    document.getElementById('pagInfoLojas').textContent = `Página ${dadosLojaGeral.paginaAtual} de ${Math.ceil(dadosLojaGeral.dadosLoja.length / dadosLojaGeral.itensPorPagina)}`
    document.getElementById('pagAntLojas').disabled = dadosLojaGeral.paginaAtual === 1
    document.getElementById('proxPagLojas').disabled =  fim >= dadosLojaGeral.dadosLoja.length

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


export { mostrarLojas, exportarLojas, alternadorLojas, salvarLoja, editarLoja, salvarEditarLoja, ordenarLoja }