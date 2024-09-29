import { Dados } from "./dados.js";
import { dados } from "./data.js";

export class Categoria {
    static ultimoId(){
        if(dados.categoria.length === 0) return 0
        return Math.max(...dados.categoria.map(categoria => categoria.id))
    }

    constructor(nome) {
        this.id = Categoria.ultimoId() + 1
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