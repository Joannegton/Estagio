import { dados } from "./data.js";

export class Categoria {
    static ultimoId = 0 

    constructor(nome) {
        this.id = ++Categoria.ultimoId
        this.nome = nome
    }

    static criarCategoria(categoria) {
        if (dados.categoria.find(cat => cat.nome === categoria.nome)) {
            alert('Categoria já cadastrada')
            return
        }

        dados.categoria.push(categoria)
        Dados.salvarDados()
        Dados.atualizarOpcoes('categoriaProduto', dados.categoria, 'nome')
        alert('Categoria cadastrada com sucesso')
    }

    deletarCategoria() {
        let nome = document.getElementById('nomeCategoria').value
        let categoria = dados.categoria.find(categoria => categoria.nome === nome)
        if (categoria) {
            let index = dados.categoria.indexOf(categoria)
            dados.categoria.splice(index, 1)
            alert('Categoria deletada com sucesso')
            console.log(dados.categoria)
            Dados.salvarDados()
        }
    }

    atualizarCategoria() {
        let nome = document.getElementById('nomeCategoria').value
        let novaCategoria = { nome: document.getElementById('novoNomeCategoria').value }
        let categoria = dados.categoria.find(categoria => categoria.nome === nome)
        if (categoria) {
            let index = dados.categoria.indexOf(categoria)
            dados.categoria[index] = novaCategoria
            Dados.salvarDados()
            alert('Categoria atualizada com sucesso')
        }
    }
}

export class Vendedor {
    static ultimoId = 0

    constructor(nome, matricula) {
        this.id = ++Vendedor.ultimoId
        this.nome = nome
        this.matricula = matricula
    }

    criarVendedor(vendedor) {
        if (dados.vendedor.find(vend => vend.nome === vendedor.nome)) {
            alert('Vendedor já cadastrado')
            return
        }
        dados.vendedor.push(vendedor)
        Dados.salvarDados()
        alert('Vendedor cadastrado com sucesso')
    }

    deletarVendedor() {
        let matricula = document.getElementById('matricula').value
        let vendedor = dados.vendedor.find(vendedor => vendedor.matricula === matricula)
        if (vendedor) {
            let index = dados.vendedor.indexOf(vendedor)
            dados.vendedor.splice(index, 1)
            Dados.salvarDados()
            alert('Vendedor deletado com sucesso')
        }
    }
}

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
        console.log(dados)
        Dados.salvarDados()
        alert('Produto cadastrado com sucesso')
    }
}

export class Dados {
    static salvarDados() {
        localStorage.setItem('dados', JSON.stringify(dados))
    }

    static carregarDados() {
        let dadosSalvo = localStorage.getItem('dados')
        if (dadosSalvo) {
            Object.assign(dados, JSON.parse(dadosSalvo))
            Dados.atualizarOpcoes('categoriaProduto', dados.categoria, 'nome')
            Dados.atualizarOpcoes('clientePedido', dados.cliente, 'nome')
            Dados.atualizarOpcoes('vendedorPedido', dados.vendedor, 'nome')
            Dados.atualizarOpcoes('produtoPedido', dados.produto, 'nome')
        }
    }

    static atualizarOpcoes(id, lista, atributo) {
        let select = document.getElementById(id)
        if (!select) {
            console.error(`Element with id "${id}" not found`)
            return
        }
        select.innerHTML = '';
        for (let item of lista) {
            let option = document.createElement('option')
            option.value = item[atributo]
            option.innerText = item[atributo]
            select.appendChild(option)
        }
    }
}