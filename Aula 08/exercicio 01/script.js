/* Sistema de Controle de Estoque de Livros 
Construa uma solução em HTML e JavaScript que permita controlar o estoque de uma livraria. Os gêneros de livros são: 'F' para ficção, 'NF' para não-ficção e 'T' para técnico. A aplicação deve:
•	Aceitar entradas dos gêneros de livros.
•	Armazenar cada entrada em um array.
•	Exibir a lista atualizada de gêneros e o total de cada tipo de livro após cada entrada.
•	Calcular e exibir a porcentagem de cada gênero sobre o total de livros inseridos.
•	Permitir alterar o gênero de um livro em uma determinada posição do array.
•	Finalizar a inserção de dados quando o usuário digitar 'F' - Mod(apertar botão de finalizar).
*/

let livros = {
    "Ficcao": [],
    "Nao-Ficcao": [],
    "Tecnico": []
}

function carregarEstado() {
    let estadoSalvo = localStorage.getItem('livros')
    if (estadoSalvo) {
        livros = JSON.parse(estadoSalvo)
        exibirLista()
        exibirTotaisEPorcentagens()
    }
}
window.onload = carregarEstado

function salvarEstado() {
    localStorage.setItem('livros', JSON.stringify(livros))
}

function inserir() {
    let genero = document.getElementById('genero').value
    let titulo = document.getElementById('titulo').value
    let quantidade = parseInt(document.getElementById('quantidade').value)
    
    if (isNaN(quantidade) || quantidade <= 0) {
        alert('Quantidade inválida!')
        return
    }

    let livroObjeto = {titulo: titulo, quantidade: quantidade}
    
    let livroExistente = livros[genero].find(livro => livro.titulo === titulo)
    if (livroExistente) {
        livroExistente.quantidade += quantidade
    } else {
        livros[genero].push(livroObjeto)
    }

    salvarEstado()
    exibirLista()
    exibirTotaisEPorcentagens()
    limparEntradas()
}

function exibirLista() {
    let corpoTabela = document.getElementById('corpoTabelaLista')
    corpoTabela.innerHTML = ''

    for (let genero in livros) {
        livros[genero].forEach((livro, index) => {
            let linha = document.createElement('tr')
            linha.innerHTML = `
                <td>${genero}</td>
                <td>${livro.titulo}</td>
                <td>${livro.quantidade}</td>
                <td>
                    <button onclick="alterarGenero('${genero}', ${index})">Alterar Gênero</button>
                </td>
            `
            corpoTabela.appendChild(linha)
        })
    }
}

function exibirTotaisEPorcentagens() {
    let totalF = livros["Ficcao"].reduce((inicial, livro) => inicial + livro.quantidade, 0)
    let totalNF = livros["Nao-Ficcao"].reduce((inicial, livro) => inicial + livro.quantidade, 0)
    let totalT = livros["Tecnico"].reduce((inicial, livro) => inicial + livro.quantidade, 0)
    let total = totalF + totalNF + totalT
    
    document.getElementById('totalFiccao').textContent = totalF
    document.getElementById('totalNaoFiccao').textContent = totalNF
    document.getElementById('totalTecnico').textContent = totalT
    document.getElementById('totalLivros').textContent = total

    if (total > 0) {
        let percF = (totalF / total) * 100
        let percNF = (totalNF / total) * 100
        let percT = (totalT / total) * 100
        
        document.getElementById('percFiccao').textContent = percF.toFixed(2) + '%'
        document.getElementById('percNaoFiccao').textContent = percNF.toFixed(2) + '%'
        document.getElementById('percTecnico').textContent = percT.toFixed(2) + '%'
        document.getElementById('percTotal').textContent = '100%'
    }
}

function alterarGenero(generoAtual, index) {
    let novoGenero = prompt('Digite o novo gênero do livro (Ficcao, Nao-Ficcao, Tecnico):')
    if (!['Ficcao', 'Nao-Ficcao', 'Tecnico'].includes(novoGenero)) {
        alert('Gênero inválido!')
        return
    }

    let livro = livros[generoAtual].splice(index, 1)[0]
    livros[novoGenero].push(livro)

    salvarEstado()
    exibirLista()
    exibirTotaisEPorcentagens()
}

function limparEntradas() {
    document.getElementById('genero').value = 'Ficcao'
    document.getElementById('titulo').value = ''
    document.getElementById('quantidade').value = ''
}

function finalizarInsercao() {
    window.location.href = '../home.html'
}
