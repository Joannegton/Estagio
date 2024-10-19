import { esconderElementos, mostrarMenu } from "../utils.js";

const dados = {
    paginaAtual: 1,
    itensPorPagina: 15,
    dadosEstoque: [
        { loja: 'Loja 1', quantRecomendada: 100, quantMinima: 50, quantAtual: 49 },
        { loja: 'Loja 2', quantRecomendada: 150, quantMinima: 40, quantAtual: 90 },
        { loja: 'Loja 3', quantRecomendada: 200, quantMinima: 60, quantAtual: 160 },
        { loja: 'Loja 3', quantRecomendada: 200, quantMinima: 60, quantAtual: 160 },
        { loja: 'Loja 3', quantRecomendada: 200, quantMinima: 60, quantAtual: 160 },
        { loja: 'Loja 3', quantRecomendada: 200, quantMinima: 60, quantAtual: 160 },
        { loja: 'Loja 3', quantRecomendada: 200, quantMinima: 60, quantAtual: 160 },
        { loja: 'Loja 3', quantRecomendada: 200, quantMinima: 60, quantAtual: 160 },
        { loja: 'Loja 3', quantRecomendada: 200, quantMinima: 60, quantAtual: 160 },
        { loja: 'Loja 3', quantRecomendada: 200, quantMinima: 60, quantAtual: 160 },
        { loja: 'Loja 3', quantRecomendada: 200, quantMinima: 60, quantAtual: 160 },
        { loja: 'Loja 3', quantRecomendada: 200, quantMinima: 60, quantAtual: 160 },
        { loja: 'Loja 3', quantRecomendada: 200, quantMinima: 60, quantAtual: 160 },
        { loja: 'Loja 3', quantRecomendada: 200, quantMinima: 60, quantAtual: 160 },
        { loja: 'Loja 3', quantRecomendada: 200, quantMinima: 60, quantAtual: 160 },
        { loja: 'Loja 3', quantRecomendada: 200, quantMinima: 60, quantAtual: 160 },
        { loja: 'Loja 3', quantRecomendada: 200, quantMinima: 60, quantAtual: 160 },
        { loja: 'Loja 3', quantRecomendada: 200, quantMinima: 60, quantAtual: 160 },
        { loja: 'Loja 3', quantRecomendada: 200, quantMinima: 60, quantAtual: 160 },
        // Adicione mais dados conforme necessário
    ]
};

function renderizarTabela() {
    const tbody = document.getElementById('estoque-tbody');
    tbody.innerHTML = '';

    const inicio = (dados.paginaAtual - 1) * dados.itensPorPagina;
    const fim = inicio + dados.itensPorPagina;
    const paginaDados = dados.dadosEstoque.slice(inicio, fim);

    paginaDados.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td data-label="Loja">${item.loja}</td>
            <td data-label="Quantidade Recomendada" class="quant-recomendada">${item.quantRecomendada}</td>
            <td data-label="Quantidade Mínima" class="quant-minima">${item.quantMinima}</td>
            <td data-label="Quantidade Atual" class="quant-atual">${item.quantAtual}</td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('pagInfo').textContent = `Página ${dados.paginaAtual} de ${Math.ceil(dados.dadosEstoque.length / dados.itensPorPagina)}`;
    document.getElementById('pagAnt').disabled = dados.paginaAtual === 1;
    document.getElementById('proxPag').disabled = fim >= dados.dadosEstoque.length;
}

function mostrarEstoque() {
    document.getElementById('estoque').style.display = 'block';
    esconderElementos(['relatorios', 'envioTaloes', 'perfil', 'manutencao', 'lojas', 'perfilUsuario']);
    mostrarMenu();
    renderizarTabela();
}

function filtrarLoja() {
    alert('filtrando loja');
}

function exportarEstoque() {
    alert('exportando estoque');
}

export { dados, renderizarTabela, mostrarEstoque, filtrarLoja, exportarEstoque };