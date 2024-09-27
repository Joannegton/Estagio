import { dados } from "./data.js"
import { Dados } from "./classe.js"

export class Cliente {
    static ultimoId() {
        if (dados.cliente.length === 0) return 0
        return Math.max(...dados.cliente.map(cliente => cliente.id))
    } 

    constructor(nome, nascimento, cpf, origem, score) {
        this.id = Cliente.ultimoId() + 1,
        this.nome = nome,
        this.nascimento = nascimento,
        this.cpf = cpf,
        this.origem = origem,
        this.score = score
    }

    criarCliente() {
        dados.cliente.push(this)
        Dados.salvarDados()
        alert('Cliente cadastrado com sucesso')
    }

    static listarClientes() {
        let tabela = document.getElementById('tabelaClientes')
        tabela.innerHTML = ''
        dados.cliente.forEach(cliente => {
            let tr = document.createElement('tr')
            tr.innerHTML = `
                <td>${cliente.id}</td>
                <td><a href="#" onclick="mostrarPedidoCliente(${cliente.id})">${cliente.nome}</a></td> <!-- Modificado para usar id -->
                <td>${cliente.nascimento}</td>
                <td>${cliente.cpf}</td>
                <td>${cliente.origem}</td>
                <td>${cliente.score}</td>
                <td><button onclick="deletarCliente(${cliente.id})">Excluir</button></td>
            `
            tabela.appendChild(tr)
        })
    }

    static deletarCliente(id) {
        let cliente = dados.cliente.find(cliente => cliente.id == id)
        if (cliente) {
            let index = dados.cliente.indexOf(cliente)
            dados.cliente.splice(index, 1)
            Dados.salvarDados()
            alert('Cliente deletado com sucesso')
        }
    }
}