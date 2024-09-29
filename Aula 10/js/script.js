import { Dados } from "./dados.js"
import { Vendedor } from "./vendedor.js"
import { Cliente } from "./cliente.js"
import { Pedido } from "./pedido.js"
import { Categoria } from "./categoria.js"
import { Produto } from "./produto.js"

window.salvarCliente = function(){
    console.log('salvarCliente')
    let nome = document.getElementById('nomeCliente').value
    let cpf = document.getElementById('cpf').value
    let nascimento = document.getElementById('dataNasc').value
    let score = document.getElementById('score').value
    let origem = ''

    if (document.getElementById('origemLoja').checked){
        origem = 'Loja'
    }else if(document.getElementById('origemSite').checked){
        origem = 'Site'
    }

    if (nome == '' || cpf == '' || nascimento == '' || score == '' || origem == ''){
        alert('Preencha todos os campos')
        return
    }

    let cliente = new Cliente(nome, nascimento, cpf, origem, score)
    cliente.criarCliente()

    document.getElementById('nomeCliente').value = ''
    document.getElementById('cpf').value = ''
    document.getElementById('dataNasc').value = ''
    document.getElementById('score').value = ''
    document.getElementById('origemLoja').checked = false
    document.getElementById('origemSite').checked = false

    Dados.salvarDados()
    Dados.carregarDados()
    mostrarRealizarPedido()
}

window.mostrarCadastroCliente = function(){
    document.getElementById('listaClientes').style.display = 'none'
    document.getElementById('cadastroProduto').style.display = 'none'
    document.getElementById('cadastroVendedor').style.display = 'none'
    document.getElementById('cadastroCategoria').style.display = 'none'
    document.getElementById('cadastroCliente').style.display = 'block'
    document.getElementById('realizarPedido').style.display = 'none'
    document.getElementById('tabelaPedidos').style.display = 'none'
    document.getElementById('listaPedidoCliente').style.display = 'none'

}

window.mostrarCliente = function(){
    document.getElementById('listaClientes').style.display = 'block'
    document.getElementById('cadastroProduto').style.display = 'none'
    document.getElementById('cadastroVendedor').style.display = 'none'
    document.getElementById('cadastroCategoria').style.display = 'none'
    document.getElementById('cadastroCliente').style.display = 'none'
    document.getElementById('realizarPedido').style.display = 'none'
    document.getElementById('tabelaPedidos').style.display = 'none'
    document.getElementById('listaPedidoCliente').style.display = 'none'
}

window.deletarCliente = function(id){
    Cliente.deletarCliente(id)
    Cliente.listarClientes()
}

window.salvarCategoria = function () {
    let nomeCategoria = document.getElementById('nomeCategoria').value
    let categoriaObj = new Categoria(nomeCategoria)
    Categoria.criarCategoria(categoriaObj)
    document.getElementById('nomeCategoria').value = ''
}

window.mostrarCategoria = function(){
    document.getElementById('cadastroCategoria').style.display = 'block'
    document.getElementById('listaClientes').style.display = 'none'
    document.getElementById('cadastroProduto').style.display = 'none'
    document.getElementById('cadastroVendedor').style.display = 'none'
    document.getElementById('cadastroCliente').style.display = 'none'
    document.getElementById('realizarPedido').style.display = 'none'
    document.getElementById('tabelaPedidos').style.display = 'none'
    document.getElementById('listaPedidoCliente').style.display = 'none'
}

window.salvarProduto = function(){
    let nome = document.getElementById('nomeProduto').value
    let preco = parseFloat(document.getElementById('valorProduto').value)
    let categoria = document.getElementById('categoriaProduto').value

    if (isNaN(preco) || preco <= 0){
        alert('Preço inválido')
        return
    }

    let produto = new Produto(nome, preco, categoria)
    produto.criarProduto()

    document.getElementById('nomeProduto').value = ''
    document.getElementById('valorProduto').value = ''
    document.getElementById('categoriaProduto').value = ''

}

window.mostrarProduto = function(){
    document.getElementById('cadastroProduto').style.display = 'block'
    document.getElementById('cadastroCategoria').style.display = 'none'
    document.getElementById('listaClientes').style.display = 'none'
    document.getElementById('cadastroVendedor').style.display = 'none'
    document.getElementById('cadastroCliente').style.display = 'none'
    document.getElementById('realizarPedido').style.display = 'none' 
    document.getElementById('tabelaPedidos').style.display = 'none'  
    document.getElementById('listaPedidoCliente').style.display = 'none' 
}

window.salvarVendedor = function(){
    let nome = document.getElementById('nomeVendedor').value
    let matricula = document.getElementById('matriculaVendedor').value

    let vendedor = new Vendedor(nome, matricula)
    vendedor.criarVendedor(vendedor)

    document.getElementById('nomeVendedor').value = ''
    document.getElementById('matriculaVendedor').value = ''
}

window.mostrarVendedor = function(){
    document.getElementById('cadastroVendedor').style.display = 'block'
    document.getElementById('cadastroCategoria').style.display = 'none'
    document.getElementById('listaClientes').style.display = 'none'
    document.getElementById('cadastroProduto').style.display = 'none'
    document.getElementById('cadastroCliente').style.display = 'none'
    document.getElementById('realizarPedido').style.display = 'none'
    document.getElementById('tabelaPedidos').style.display = 'none'
    document.getElementById('listaPedidoCliente').style.display = 'none'
}

window.salvarPedido = function(){
    let cliente = document.getElementById('clientePedido').value
    let vendedor = document.getElementById('vendedorPedido').value
    let produto = document.getElementById('produtoPedido').value
    let quantidade = parseInt(document.getElementById('quantidadePedido').value)

    if (isNaN(quantidade) || quantidade <= 0){
        alert('Quantidade inválida')
        return
    }

    let pedido = new Pedido(cliente, vendedor, produto, quantidade)
    pedido.criarPedido(pedido)
}

window.mostrarRealizarPedido = function(){
    document.getElementById('cadastroCategoria').style.display = 'none'
    document.getElementById('listaClientes').style.display = 'none'
    document.getElementById('cadastroProduto').style.display = 'none'
    document.getElementById('cadastroVendedor').style.display = 'none'
    document.getElementById('cadastroCliente').style.display = 'none'
    document.getElementById('realizarPedido').style.display = 'block'
    document.getElementById('tabelaPedidos').style.display = 'none'
    document.getElementById('listaPedidoCliente').style.display = 'none'
}

window.mostrarTabelaPedidos = function(){
    document.getElementById('cadastroCategoria').style.display = 'none'
    document.getElementById('listaClientes').style.display = 'none'
    document.getElementById('cadastroProduto').style.display = 'none'
    document.getElementById('cadastroVendedor').style.display = 'none'
    document.getElementById('cadastroCliente').style.display = 'none'
    document.getElementById('realizarPedido').style.display = 'none'
    document.getElementById('tabelaPedidos').style.display = 'block'
    document.getElementById('listaPedidoCliente').style.display = 'none'
}

window.mostrarPedidoCliente = function(id){
    Pedido.mostrarPedidoCliente(id)
}

window.ocultarMostrarPedidoCliente = function(){
    Pedido.ocultarMostrarPedidoCliente()
}

window.deletarPedido = function(id){
    Pedido.deletarPedido(id)
}

window.onload = function () {
    Dados.carregarDados()
    Pedido.mostrarPedidos()
    Cliente.listarClientes()
}

