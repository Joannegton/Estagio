import { dados } from './data.js'
import { Dados } from './dados.js'

export class Vendedor {
    static ultimoId(){
        if(dados.vendedor.length === 0) return 0
        return Math.max(...dados.vendedor.map(vendedor => vendedor.id))
    }

    constructor(nome, matricula) {
        this.id = Vendedor.ultimoId() + 1
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
        Dados.carregarDados()
        alert('Vendedor cadastrado com sucesso')
    }

    static listarVendedores() {
        let tabela = document.getElementById('vendedores')
        tabela.innerHTML = ''
        dados.vendedor.forEach(vendedor => {
            let tr = document.createElement('tr')
            tr.innerHTML = `
                <td>${vendedor.id}</td>
                <td>${vendedor.nome}</td>
                <td>${vendedor.matricula}</td>
                <td><button onclick="deletarVendedor(${vendedor.id})">Excluir</button></td>
            `
            tabela.appendChild(tr)
        })
    }

    deletarVendedor(id) {
        let vendedor = dados.vendedor.find(vendedor => vendedor.id === id)
        if (vendedor) {
            let index = dados.vendedor.indexOf(vendedor)
            dados.vendedor.splice(index, 1)
            Dados.salvarDados()
            alert('Vendedor deletado com sucesso')
        }
    }
}
