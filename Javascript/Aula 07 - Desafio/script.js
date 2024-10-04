/*Construa uma solução em JavaScript que permita fazer um levantamento do estoque de vinhos de uma adega. 
Os tipos de vinho são: 'T' para tinto, 'B' para branco e 'R' para rosé. A aplicação deve:
Aceitar entradas dos tipos de vinho.
Armazenar cada entrada em um array.
Exibir a lista atualizada de tipos de vinho e o total de cada tipo após cada entrada.
Calcular e exibir a porcentagem de cada tipo sobre o total de vinhos inseridos.
Permitir alterar o tipo de vinho armazenado em uma determinada posição do array.
Finalizar a inserção de dados quando o usuário digitar 'F'.*/

let vinhos = {
    "Tinto": [],
    "Branco": [],
    "Rosé": []
}

function inserir() {
    let tipo = document.getElementById('tipo').value
        
    let nome = document.getElementById('entradaVinho').value
    let quantidade = parseInt(document.getElementById('quantidade').value)
    let valor = parseFloat(document.getElementById('valor').value)
    
    if (isNaN(quantidade) || quantidade <= 0) {
        alert('Quantidade inválida!')
        return
    }

    if (isNaN(valor) || valor <= 0) {
        alert('Valor inválido!')
        return
    }

    let vinhoObjeto = {nome: nome, valor: valor, quantidade: quantidade}
    
    let vinhoExistente = vinhos[tipo].find(vinho => vinho.nome === nome)
    if (vinhoExistente) {
        vinhoExistente.quantidade += quantidade
    } else {
        vinhos[tipo].push(vinhoObjeto)
    }

    document.getElementById('tipo').value = 'Tinto'
    document.getElementById('entradaVinho').value = ''
    document.getElementById('quantidade').value = ''
    document.getElementById('valor').value = ''

    exibirLista()
    exibirTotaisEPorcentagens()
}

function exibirLista() {
    let corpoTabela = document.getElementById('corpoTabelaLista')
    corpoTabela.innerHTML = ''

    for (let tipo in vinhos) {
        vinhos[tipo].forEach((vinho, index) => {
            let linha = document.createElement('tr')
            linha.innerHTML = `
                <td>${tipo}</td>
                <td>${vinho.nome}</td>
                <td>${vinho.quantidade}</td>
                <td>${vinho.valor}</td>
                <td>
                    <button onclick="alterarTipo('${tipo}', ${index})">Alterar Tipo</button>
                    <button onclick="alterarNome('${tipo}', ${index})">Alterar Nome</button>
                </td>
            `
            corpoTabela.appendChild(linha)
        })
    }
}

function exibirTotaisEPorcentagens() {
    let totalT = vinhos.Tinto.reduce((inicial, vinho) => inicial + vinho.quantidade, 0)
    let totalB = vinhos.Branco.reduce((inicial, vinho) => inicial + vinho.quantidade, 0)
    let totalR = vinhos.Rosé.reduce((inicial, vinho) => inicial + vinho.quantidade, 0)
    let total = totalT + totalB + totalR
    
    document.getElementById('totalTintos').textContent = totalT
    document.getElementById('totalBrancos').textContent = totalB
    document.getElementById('totalRoses').textContent = totalR
    document.getElementById('totalVinhos').textContent = total

    if (total > 0) {
        let percT = (totalT / total) * 100
        let percB = (totalB / total) * 100
        let percR = (totalR / total) * 100
        
        document.getElementById('percTintos').textContent = percT.toFixed(2) + '%'
        document.getElementById('percBrancos').textContent = percB.toFixed(2) + '%'
        document.getElementById('percRoses').textContent = percR.toFixed(2) + '%'
        document.getElementById('percTotal').textContent = '100%'
    }
}

function alterarTipo(tipoAtual, index) {
    let novoTipo = prompt('Digite o novo tipo de vinho (Tinto, Branco, Rosé):')
    if (!['Tinto', 'Branco', 'Rosé'].includes(novoTipo)) {
        alert('Tipo de vinho inválido!')
        return
    }

    let vinho = vinhos[tipoAtual].splice(index, 1)[0]
    vinhos[novoTipo].push(vinho)

    exibirLista()
    exibirTotaisEPorcentagens()
}

function alterarNome(tipo, index) {
    let novoNome = prompt('Digite o novo nome do vinho:')
    if (!novoNome) {
        alert('Nome inválido!')
        return
    }

    vinhos[tipo][index].nome = novoNome

    exibirLista()
    exibirTotaisEPorcentagens()
}
