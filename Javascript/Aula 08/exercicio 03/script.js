/*Controle de Participação em Eventos 
Construa uma solução em HTML e JavaScript que permita registrar as participações em eventos de uma empresa. Os tipos de eventos são: 'S' para seminários, 'W' para workshops e 'C' para conferências. A aplicação deve:
•	Aceitar entradas dos tipos de eventos.
•	Armazenar cada entrada em um array.
•	Exibir a lista atualizada de eventos e o total de cada tipo após cada entrada.
•	Calcular e exibir a porcentagem de cada tipo de evento sobre o total de eventos inseridos.
•	Permitir alterar o tipo de evento armazenado em uma determinada posição do array.
•	Finalizar a inserção de dados quando o usuário digitar 'F'.
*/

let eventos = {
    "Seminario": [],
    "Workshop": [],
    "Conferencia": []
}

function carregarEstado(){
    let estadoSalvo = localStorage.getItem('eventos')
    if (estadoSalvo) {
        livros = JSON.parse(estadoSalvo)
        exibirLista()
        exibirTotaisEPorcentagens()
    }
}
window.onload = carregarEstado

function salvarEstado() {
    localStorage.setItem('eventos', JSON.stringify(eventos))
}

function inserir() {
    let evento = document.getElementById('evento').value.toUpperCase()
    let quantidade = parseInt(document.getElementById('quantidade').value)

    if (isNaN(quantidade) || quantidade <= 0) {
        alert('Quantidade inválida!')
        return
    }

    let eventoNome = evento === 'S' ? 'Seminario' : evento === 'W' ? 'Workshop' : 'Conferencia'
    let eventoExistente = eventos[eventoNome].find(item => item.nome === eventoNome)

    if (eventoExistente) {
        eventoExistente.quantidade += quantidade
    } else {
        eventos[eventoNome].push({ nome: eventoNome, quantidade: quantidade })
    }

    salvarEstado()
    exibirLista()
    exibirTotaisEPorcentagens()
    limparEntradas()
}

function exibirLista() {
    let corpoTabela = document.getElementById('corpoTabelaLista')
    corpoTabela.innerHTML = ''

    for (let evento in eventos) {
        eventos[evento].forEach((item, index) => {
            let linha = document.createElement('tr')
            linha.innerHTML = `
                <td>${evento}</td>
                <td>${item.quantidade}</td>
                <td>
                    <button onclick="alterarEvento('${evento}', ${index})">Alterar</button>
                </td>
            `
            corpoTabela.appendChild(linha)
        })
    }
}

function exibirTotaisEPorcentagens() {
    let totalSeminario = eventos["Seminario"].reduce((inicial, item) => inicial + item.quantidade, 0)
    let totalWorkshop = eventos["Workshop"].reduce((inicial, item) => inicial + item.quantidade, 0)
    let totalConferencia = eventos["Conferencia"].reduce((inicial, item) => inicial + item.quantidade, 0)
    let total = totalSeminario + totalWorkshop + totalConferencia
    
    document.getElementById('totalSeminario').textContent = totalSeminario
    document.getElementById('totalWorkshop').textContent = totalWorkshop
    document.getElementById('totalConferencia').textContent = totalConferencia
    document.getElementById('totalEventos').textContent = total

    if (total > 0) {
        let percSeminario = (totalSeminario / total) * 100
        let percWorkshop = (totalWorkshop / total) * 100
        let percConferencia = (totalConferencia / total) * 100
        
        document.getElementById('percSeminario').textContent = percSeminario.toFixed(2) + '%'
        document.getElementById('percWorkshop').textContent = percWorkshop.toFixed(2) + '%'
        document.getElementById('percConferencia').textContent = percConferencia.toFixed(2) + '%'
        document.getElementById('percTotal').textContent = '100%'
    }
}

function alterarEvento(eventoAtual, index) {
    let novoEvento = prompt('Digite o novo tipo de evento (S para seminário, W para workshop, C para conferência):').toUpperCase()
    if (!['S', 'W', 'C'].includes(novoEvento)) {
        alert('Evento inválido!')
        return
    }

    let novoEventoNome = novoEvento === 'S' ? 'Seminario' : novoEvento === 'W' ? 'Workshop' : 'Conferencia'
    let evento = eventos[eventoAtual].splice(index, 1)[0]
    let eventoExistente = eventos[novoEventoNome].find(item => item.nome === novoEventoNome)

    if (eventoExistente) {
        eventoExistente.quantidade += evento.quantidade
    } else {
        eventos[novoEventoNome].push(evento)
    }

    salvarEstado()
    exibirLista()
    exibirTotaisEPorcentagens()
}

function limparEntradas() {
    document.getElementById('evento').value = 'S'
    document.getElementById('quantidade').value = ''
}

function finalizarInsercao() {
    window.location.href = '../home.html'
}