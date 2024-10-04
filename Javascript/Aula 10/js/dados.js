import { dados } from "./data.js";

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