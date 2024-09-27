/*Gerenciamento de Estoque de Produtos Eletrônicos
Construa uma solução em HTML e JavaScript que permita fazer o controle do estoque de produtos eletrônicos em uma loja. 
Os tipos de produtos são: 'C' para celulares, 'T' para televisores e 'N' para notebooks. A aplicação deve:
•	Aceitar entradas dos tipos de produtos.
•	Armazenar cada entrada em um array.
•	Exibir a lista atualizada de produtos e o total de cada tipo após cada entrada.
•	Calcular e exibir a porcentagem de cada tipo de produto sobre o total de itens inseridos.
•	Permitir alterar o tipo de produto armazenado em uma determinada posição do array.
•	Finalizar a inserção de dados quando o usuário digitar 'F'.*/

let produtos = {
    "Celular": [],
    "Televisao": [],
    "Notebook": []
}

function carregarEstado() {
    let estado = localStorage.getItem('produtos')
    if (estado) {
        produtos = JSON.parse(estado)
        exibirLista()
        exibirTotaisEPorcentagens()
    }
}
window.onload = carregarEstado

function salvarEstado() {
    localStorage.setItem('produtos', JSON.stringify(produtos))
}

function inserir() {
    let produto = document.getElementById('produto').value
    let quantidade = parseInt(document.getElementById('quantidade').value)

    if (isNaN(quantidade) || quantidade <= 0) {
        alert('Quantidade invalida!')
        return
    }

    let nomeProduto = produto === 'C' ? 'Celular' : produto === 'T' ? 'Televisao' : 'Notebook'
    let produtoExistente = produtos[nomeProduto].find(item => item.nome === nomeProduto)

    if (produtoExistente) {
        produtoExistente.quantidade += quantidade
    } else {
        produtos[nomeProduto].push({ nome: nomeProduto, quantidade: quantidade })
    }

    salvarEstado()
    exibirLista()
    exibirTotaisEPorcentagens()
    limparEntradas()
}

function exibirLista() {
    let corpoTabela = document.getElementById('corpoTabelaLista')
    corpoTabela.innerHTML = ''

    for (let produto in produtos) {
        produtos[produto].forEach((item, index) => {
            let linha = document.createElement('tr')
            linha.innerHTML = `
                <td>${produto}</td>
                <td>${item.quantidade}</td>
                <td>
                    <button onclick="alterarProduto('${produto}', ${index})">Alterar</button>
                </td>
            `
            corpoTabela.appendChild(linha)
        })
    }
}

function exibirTotaisEPorcentagens() {
    let totalCelular = produtos["Celular"].reduce((inicial, item) => inicial + item.quantidade, 0)
    let totalTelevisao = produtos["Televisao"].reduce((inicial, item) => inicial + item.quantidade, 0)
    let totalNotebook = produtos["Notebook"].reduce((inicial, item) => inicial + item.quantidade, 0)
    let total = totalCelular + totalNotebook + totalTelevisao

    document.getElementById('totalCelular').textContent = totalCelular
    document.getElementById('totalTelevisao').textContent = totalTelevisao
    document.getElementById('totalNotebook').textContent = totalNotebook
    document.getElementById('totalProdutos').textContent = total

    if (total > 0) {
        let percCelular = (totalCelular / total) * 100
        let percTelevisao = (totalTelevisao / total) * 100
        let percNotebook = (totalNotebook / total) * 100

        document.getElementById('percCelular').textContent = percCelular.toFixed(2) + '%'
        document.getElementById('percTelevisao').textContent = percTelevisao.toFixed(2) + '%'
        document.getElementById('percNotebook').textContent = percNotebook.toFixed(2) + '%'
        document.getElementById('percTotal').textContent = '100%'
    }
}

function alterarProduto(produtoAtual, index) {
    let novoProduto = prompt('Digite o novo tipo de produto (C para Celular, T para Televisão ou N para Notebook)').toUpperCase()
    if (!['C', 'T', 'N'].includes(novoProduto)) {
        alert('Produto invalido!')
        return
    }

    let novoProdutoNome = novoProduto === "C" ? 'Celular' : novoProduto === 'T' ? 'Televisao' : 'Notebook'
    let produto = produtos[produtoAtual].splice(index, 1)[0]
    let produtoExistente = produtos[novoProdutoNome].find(item => item.nome === novoProdutoNome)

    if (produtoExistente) {
        produtoExistente.quantidade += produto.quantidade
    } else {
        produtos[novoProdutoNome].push(produto)
    }

    salvarEstado()
    exibirLista()
    exibirTotaisEPorcentagens()
}

function limparEntradas() {
    document.getElementById('produto').value = 'C'
    document.getElementById('quantidade').value = ''
}

function finalizarInsercao() {
    window.location.href = '../home.html'
}