let frutas = {
    "Maca": [],
    "Banana": [],
    "Laranja": []
};

function carregarEstado() {
    let estadoSalvo = localStorage.getItem('frutas')
    if (estadoSalvo) {
        frutas = JSON.parse(estadoSalvo)
        exibirLista()
        exibirTotaisEPorcentagens()
    }
}
window.onload = carregarEstado

function salvarEstado() {
    localStorage.setItem('frutas', JSON.stringify(frutas))
}

function inserir() {
    let fruta = document.getElementById('fruta').value.toUpperCase();
    let quantidade = parseInt(document.getElementById('quantidade').value);

    if (isNaN(quantidade) || quantidade <= 0) {
        alert('Quantidade inválida!');
        return;
    }

    let frutaNome = fruta === 'M' ? 'Maca' : fruta === 'B' ? 'Banana' : 'Laranja';
    let frutaExistente = frutas[frutaNome].find(item => item.nome === frutaNome);

    if (frutaExistente) {
        frutaExistente.quantidade += quantidade;
    } else {
        frutas[frutaNome].push({ nome: frutaNome, quantidade: quantidade });
    }

    salvarEstado()
    exibirLista();
    exibirTotaisEPorcentagens();
    limparEntradas();
}

function exibirLista() {
    let corpoTabela = document.getElementById('corpoTabelaLista');
    corpoTabela.innerHTML = '';

    for (let fruta in frutas) {
        frutas[fruta].forEach((item, index) => {
            let linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${fruta}</td>
                <td>${item.quantidade}</td>
                <td>
                    <button onclick="alterarFruta('${fruta}', ${index})">Alterar</button>
                </td>
            `;
            corpoTabela.appendChild(linha);
        });
    }
}

function exibirTotaisEPorcentagens() {
    let totalMaca = frutas["Maca"].reduce((inicial, item) => inicial + item.quantidade, 0);
    let totalBanana = frutas["Banana"].reduce((inicial, item) => inicial + item.quantidade, 0);
    let totalLaranja = frutas["Laranja"].reduce((inicial, item) => inicial + item.quantidade, 0);
    let total = totalMaca + totalBanana + totalLaranja;
    
    document.getElementById('totalMaca').textContent = totalMaca;
    document.getElementById('totalBanana').textContent = totalBanana;
    document.getElementById('totalLaranja').textContent = totalLaranja;
    document.getElementById('totalFrutas').textContent = total;

    if (total > 0) {
        let percMaca = (totalMaca / total) * 100;
        let percBanana = (totalBanana / total) * 100;
        let percLaranja = (totalLaranja / total) * 100;
        
        document.getElementById('percMaca').textContent = percMaca.toFixed(2) + '%';
        document.getElementById('percBanana').textContent = percBanana.toFixed(2) + '%';
        document.getElementById('percLaranja').textContent = percLaranja.toFixed(2) + '%';
        document.getElementById('percTotal').textContent = '100%';
    }
}

function alterarFruta(frutaAtual, index) {
    let novaFruta = prompt('Digite a nova fruta (M para maçã, B para banana, L para laranja):').toUpperCase();
    if (!['M', 'B', 'L'].includes(novaFruta)) {
        alert('Fruta inválida!');
        return;
    }

    let novaFrutaNome = novaFruta === 'M' ? 'Maca' : novaFruta === 'B' ? 'Banana' : 'Laranja';
    let fruta = frutas[frutaAtual].splice(index, 1)[0];
    let frutaExistente = frutas[novaFrutaNome].find(item => item.nome === novaFrutaNome);

    if (frutaExistente) {
        frutaExistente.quantidade += fruta.quantidade;
    } else {
        frutas[novaFrutaNome].push(fruta);
    }

    salvarEstado()
    exibirLista();
    exibirTotaisEPorcentagens();
}

function limparEntradas() {
    document.getElementById('fruta').value = 'M';
    document.getElementById('quantidade').value = '';
}

function finalizarInsercao() {
    window.location.href = '../home.html'    
}