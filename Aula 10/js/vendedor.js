import { dados } from './data.js'
import { Dados } from './dados.js'

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
        Dados.carregarDados()
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
