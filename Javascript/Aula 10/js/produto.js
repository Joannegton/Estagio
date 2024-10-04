import { Dados } from "./dados.js";
import { dados } from "./data.js";

export class Produto {
    static ultimoId(){
        if(dados.produto.length === 0) return 0
        return Math.max(...dados.produto.map(produto => produto.id))
    }

    constructor(nome, valor, categoria) {
        this.id = Produto.ultimoId() + 1
        this.nome = nome
        this.valor = valor
        this.categoria = categoria
    }

    criarProduto() {
        if (dados.produto.find(prod => prod.nome === this.nome)) {
            alert('Produto já cadastrado')
            return
        }

        dados.produto.push(this)
        Dados.salvarDados()
        Dados.carregarDados()
        alert('Produto cadastrado com sucesso')
    }

    static listarProdutos() {
        let tabela = document.getElementById('produtos')
        tabela.innerHTML = ''
        dados.produto.forEach(produto => {
            let tr = document.createElement('tr')
            tr.innerHTML = `
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>${produto.valor}</td>
                <td>${produto.categoria}</td>
                <td><button onclick="deletarProduto(${produto.id})">Excluir</button></td>
            `
            tabela.appendChild(tr)
        })
    }

    static deletarProduto(id) {
        let produto = dados.produto.find(produto => produto.id === id)
        if (produto) {
            let index = dados.produto.indexOf(produto)
            dados.produto.splice(index, 1)
            Dados.salvarDados()
            Dados.carregarDados()
            alert('Produto deletado com sucesso')
        }
    }
}