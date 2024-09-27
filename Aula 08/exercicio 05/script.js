/*Sistema de Controle de Vagas de Estacionamento 
Construa uma solução em HTML e JavaScript que permita gerenciar o uso das vagas de um estacionamento. As vagas podem ser: 'C' para carros, 'M' para motos e 'B' para bicicletas. A aplicação deve:
•	Aceitar entradas dos tipos de veículos que ocupam as vagas.
•	Armazenar cada entrada em um array.
•	Exibir a lista atualizada de tipos de veículos e o total de cada tipo após cada entrada.
•	Calcular e exibir a porcentagem de cada tipo de veículo sobre o total de vagas ocupadas.
•	Permitir alterar o tipo de veículo armazenado em uma determinada posição do array.
•	Finalizar a inserção de dados quando o usuário digitar 'F'.
*/
let vagas = {
    "Carro": [],
    "Moto": [],
    "Bicicleta": []
}

function carregarEstado() {a
    let estado = localStorage.getItem('vagas')
    if (estado) {
        vagas = JSON.parse(estado)
        exibirLista()
        exibirTotaisEPorcentagens()
    }
}
window.onload = carregarEstado

function salvarEstado() {
    localStorage.setItem('vagas', JSON.stringify(vagas))
}

function inserir() {
    let veiculo = document.getElementById('veiculo').value
    let quantidade = parseInt(document.getElementById('quantidade').value)

    if (!['C', 'M', 'B'].includes(veiculo) || isNaN(quantidade) || quantidade <= 0) {
        alert('Entrada inválida!')
        return
    }

    let tipoVeiculo = veiculo === 'C' ? 'Carro' : veiculo === 'M' ? 'Moto' : 'Bicicleta'
    let veiculoExistente = vagas[tipoVeiculo].find(item => item.tipo === tipoVeiculo)

    if (veiculoExistente) {
        veiculoExistente.quantidade += quantidade
    } else {
        vagas[tipoVeiculo].push({ tipo: tipoVeiculo, quantidade: quantidade })
    }

    salvarEstado()
    exibirLista()
    exibirTotaisEPorcentagens()
    limparEntradas()
}

function exibirLista() {
    let corpoTabela = document.getElementById('corpoTabelaLista')
    corpoTabela.innerHTML = ''

    for (let tipo in vagas) {
        vagas[tipo].forEach((item, index) => {
            let linha = document.createElement('tr')
            linha.innerHTML = `
                <td>${tipo}</td>
                <td>${item.quantidade}</td>
                <td>
                    <button onclick="alterarVeiculo('${tipo}', ${index})">Alterar</button>
                </td>
            `
            corpoTabela.appendChild(linha)
        })
    }
}

function exibirTotaisEPorcentagens() {
    let totalCarros = vagas["Carro"].reduce((inicial, item) => inicial + item.quantidade, 0)
    let totalMotos = vagas["Moto"].reduce((inicial, item) => inicial + item.quantidade, 0)
    let totalBicicletas = vagas["Bicicleta"].reduce((inicial, item) => inicial + item.quantidade, 0)
    let total = totalCarros + totalMotos + totalBicicletas

    document.getElementById('totalCarros').textContent = totalCarros
    document.getElementById('totalMotos').textContent = totalMotos
    document.getElementById('totalBicicletas').textContent = totalBicicletas
    document.getElementById('totalVagas').textContent = total

    if (total > 0) {
        let percCarros = (totalCarros / total) * 100
        let percMotos = (totalMotos / total) * 100
        let percBicicletas = (totalBicicletas / total) * 100

        document.getElementById('percCarros').textContent = percCarros.toFixed(2) + '%'
        document.getElementById('percMotos').textContent = percMotos.toFixed(2) + '%'
        document.getElementById('percBicicletas').textContent = percBicicletas.toFixed(2) + '%'
        document.getElementById('percTotal').textContent = '100%'
    }
}

function alterarVeiculo(tipoAtual, index) {
    let novoVeiculo = prompt('Digite o novo tipo de veículo (C para Carro, M para Moto, B para Bicicleta)').toUpperCase()
    if (!['C', 'M', 'B'].includes(novoVeiculo)) {
        alert('Veículo inválido!')
        return
    }

    let novoTipoVeiculo = novoVeiculo === "C" ? 'Carro' : novoVeiculo === 'M' ? 'Moto' : 'Bicicleta'
    let veiculo = vagas[tipoAtual].splice(index, 1)[0]
    let veiculoExistente = vagas[novoTipoVeiculo].find(item => item.tipo === novoTipoVeiculo)

    if (veiculoExistente) {
        veiculoExistente.quantidade += veiculo.quantidade
    } else {
        vagas[novoTipoVeiculo].push(veiculo)
    }

    salvarEstado()
    exibirLista()
    exibirTotaisEPorcentagens()
}

function limparEntradas() {
    document.getElementById('veiculo').value = 'C'
    document.getElementById('quantidade').value = ''
}

function finalizarInsercao() {
    window.location.href = '../home.html'
}