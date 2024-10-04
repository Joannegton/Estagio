let dados = {
    cliente: [],
    categoria: [],
    produto: [],
    vendedor: [],
    pedido: []
}

function salvarDados() {
    window.localStorage.setItem('dados', JSON.stringify(dados))
}

function carregarDados() {
    let dadosSalvo = window.localStorage.getItem('dados')
    if (dadosSalvo) {
        dados = JSON.parse(dadosSalvo)
        atualizarOpcoes('clientePedido', dados.cliente, 'nome')
        atualizarOpcoes('categoriaProduto', dados.categoria, 'nome')
        atualizarOpcoes('produtoPedido', dados.produto, 'nome')
        atualizarOpcoes('vendedorPedido', dados.vendedor, 'nome')
    }
    mostrarPedido()
}
window.onload = carregarDados

function salvarCliente() {
    let origem = []
    if (document.getElementById('origemLoja').checked) {
        origem.push('Loja')
    }
    if (document.getElementById('origemSite').checked) {
        origem.push('Site')
    }

    let cliente = {
        nome: document.getElementById('nomeCliente').value,
        nascimento: document.getElementById('dataNasc').value,
        cpf: document.getElementById('cpf').value,
        origem: origem.join(', '),
        score: document.getElementById('score').value
    }
    dados.cliente.push(cliente)
    alert('Cliente cadastrado com sucesso')

    console.log(cliente)
    salvarDados()
    atualizarOpcoes('clientePedido', dados.cliente, 'nome')
}

function salvarCategoria() {
    let categoria = {
        nome: document.getElementById('nomeCategoria').value
    }
    dados.categoria.push(categoria)
    alert('Categoria salva com sucesso!')
    salvarDados()
    atualizarOpcoes('categoriaProduto', dados.categoria, 'nome')
}

function salvarProduto() {
    let produto = {
        nome: document.getElementById('nomeProduto').value,
        valor: document.getElementById('valorProduto').value,
        categoria: document.getElementById('categoriaProduto').value
    }
    dados.produto.push(produto)
    alert('Produto criado com sucesso!')
    salvarDados()
    atualizarOpcoes('produtoPedido', dados.produto, 'nome')
}

function salvarVendedor() {
    let vendedor = {
        nome: document.getElementById('nomeVendedor').value,
        matricula: document.getElementById('matriculaVendedor').value
    }
    dados.vendedor.push(vendedor)
    alert('Vendedor salvo com sucesso!')
    salvarDados()
    atualizarOpcoes('vendedorPedido', dados.vendedor, 'nome')
}

function salvarPedido() {
    console.log("Função salvarPedido chamada")

    let cliente = document.getElementById('clientePedido').value
    let dataCriacao = new Date();
    let vendedor = document.getElementById('vendedorPedido').value
    let produto = document.getElementById('produtoPedido').value
    let quantidade = parseInt(document.getElementById('quantidadePedido').value)
    let produtoEncontrado = dados.produto.find(prod => prod.nome === produto)
    
    if (!produtoEncontrado) {
        alert('Produto não encontrado!')
        return
    }

    let valorProduto = produtoEncontrado.valor
    let valorTotal = quantidade * valorProduto

    if (!dados || !dados.pedido) {
        console.error("Objeto 'dados' ou 'dados.pedido' não está definido")
        return
    }

    let pedido = {
        cliente: cliente,
        data: dataCriacao,
        vendedor: vendedor,
        produto: produto,
        quantidade: quantidade,
        valor: valorTotal
    }

    dados.pedido.push(pedido)
    salvarDados()
    alert('Pedido criado com sucesso!')
    mostrarPedido()
}

function mostrarPedido() {
    console.log("Função mostrarPedido")
    let corpoTabela = document.getElementById('pedidos')
    corpoTabela.innerHTML = ''

    dados.pedido.forEach(pedido => {
        let linha = document.createElement('tr')
        let colunaCliente = document.createElement('td')
        let colunaData = document.createElement('td')
        let colunaVendedor = document.createElement('td')
        let colunaProduto = document.createElement('td')
        let colunaQuantidade = document.createElement('td')
        let colunaValor = document.createElement('td')

        colunaCliente.innerText = pedido.cliente
        colunaData.innerText = new Date(pedido.data).toLocaleDateString()
        colunaVendedor.innerText = pedido.vendedor
        colunaProduto.innerText = pedido.produto
        colunaQuantidade.innerText = pedido.quantidade
        colunaValor.innerText = pedido.valor ? pedido.valor.toFixed(2) : '0.00'

        linha.appendChild(colunaCliente)
        linha.appendChild(colunaData)
        linha.appendChild(colunaVendedor)
        linha.appendChild(colunaProduto)
        linha.appendChild(colunaQuantidade)
        linha.appendChild(colunaValor)

        corpoTabela.appendChild(linha)
    });
}

function atualizarOpcoes(elementoId, dados, propriedade) {
    let select = document.getElementById(elementoId)
    select.innerHTML = ''
    dados.forEach(item => {
        let option = document.createElement('option')
        option.text = item[propriedade]
        select.appendChild(option)
    })
}