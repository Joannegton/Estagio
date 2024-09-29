import { dados } from "./data.js"
import { Dados } from "./dados.js"

export class Pedido {
    static ultimoId(){
        if(dados.pedido.length === 0) return 0
        return Math.max(...dados.cliente.map(pedido => pedido.id))
    }

    constructor(cliente, vendedor, produto, quantidade) {
        this.id = Pedido.ultimoId() + 1
        this.cliente = cliente
        this.idCliente = dados.cliente.find(cliente => cliente.nome == this.cliente).id
        this.vendedor = vendedor
        this.data = new Date().toLocaleDateString()
        this.produto = produto
        this.quantidade = quantidade
        this.total = 0
    }


    criarPedido() {
        let valor = dados.produto.find(produto => produto.nome == this.produto).valor
        this.total = valor * this.quantidade
        dados.pedido.push(this)
        Dados.salvarDados()
        Pedido.mostrarPedidos()
        alert('Pedido cadastrado com sucesso')
    }

    static deletarPedido(id) {
        let index = dados.pedido.findIndex(pedido => pedido.id == id)
        if (index !== -1) {
            dados.pedido.splice(index, 1)
            Dados.salvarDados()
            Pedido.mostrarPedidos()
            alert('Pedido deletado com sucesso')
        } else {
            alert('Pedido não encontrado')
        }
    }

    static mostrarPedidos() {
            let pedidos = dados.pedido
            let corpoTabela = document.getElementById('pedidos')
            corpoTabela.innerHTML = ''
            for (let pedido of pedidos) {
                let linha = document.createElement('tr')
                linha.innerHTML = `
                    <td>${pedido.id}</td>
                    <td>${pedido.cliente}</td>
                    <td>${pedido.data}</td>
                    <td>${pedido.produto}</td>
                    <td>${pedido.quantidade}</td>
                    <td>${pedido.total}</td>
                    <td><button onclick="deletarPedido(${pedido.id})">Deletar</button></td>
                `
                corpoTabela.appendChild(linha)
            }
    }

    static mostrarPedidoCliente(idCliente) {
        let listaPedidoCliente = document.getElementById('listaPedidoCliente')
        listaPedidoCliente.style.display = 'block'
        document.getElementById('listaClientes').style.display = 'none'

        let nomeCliente = dados.cliente.find(cliente => cliente.id == idCliente).nome
        if(!document.getElementById('nomeClientePedido').textContent.includes(nomeCliente)){
            document.getElementById('nomeClientePedido').innerHTML += nomeCliente
        }

        document.getElementById('listaClientes').style.display = 'none'
        let pedidos = dados.pedido
        let corpoTabela = document.getElementById('tabelaPedidoCliente')
        corpoTabela.innerHTML = ''

        if(!document.getElementById('voltar')){
            let listsPedidoCliente = document.getElementById('listaPedidoCliente')
            let botaoVoltar = document.createElement('button')
            botaoVoltar.id = 'voltar'
            botaoVoltar.textContent = 'Voltar';
            botaoVoltar.onclick = Pedido.ocultarMostrarPedidoCliente
    
            listsPedidoCliente.appendChild(botaoVoltar)
        }

        let pedidosFiltrados = pedidos.filter(pedido => pedido.idCliente == idCliente)
        pedidosFiltrados.forEach(pedido => {
            let linha = document.createElement('tr')
            linha.innerHTML = `
                <td>${pedido.id}</td>
                <td>${pedido.data}</td>
                <td>${pedido.produto}</td>
                <td>${pedido.quantidade}</td>
                <td>${pedido.total}</td>
                <td><button onclick="deletarPedido(${pedido.id})">Deletar</button></td>
            `
            corpoTabela.appendChild(linha)
        })
    }

    static ocultarMostrarPedidoCliente(){
        document.getElementById('listaClientes').style.display = 'block'
        document.getElementById('listaPedidoCliente').style.display = 'none'
        this.mostrarPedidos()
    }
}