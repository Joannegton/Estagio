import { Dados } from "./dados.js";
import { dados } from "./data.js";

export class Produto {
    static ultimoId = 0

    constructor(nome, valor, categoria) {
        this.id = ++Produto.ultimoId
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
}