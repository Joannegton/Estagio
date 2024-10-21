function mostrarMenu() {
    const nav = document.getElementById('menu');
    if (window.innerWidth <= 1000) {
        nav.style.display = (nav.style.display === 'block') ? 'none' : 'block';
    }
}

// Função para alternar entre elementos
function alternador(elementoAtivo, elementoDesativar, elementoAtivar, ativar, desativar, indicador) {
    elementoDesativar.classList.add('ativo');
    elementoDesativar.classList.remove('inativo');
    elementoAtivar.classList.add('inativo');
    elementoAtivar.classList.remove('ativo');

    document.getElementById(ativar).style.display = 'grid';
    document.getElementById(desativar).style.display = 'none';
    document.getElementById(indicador).style.transform = elementoAtivo === elementoDesativar ? 'translateX(0)' : 'translateX(100%)';
}

function alternador3(elementoAtivo, elementosDesativar, ativar, desativarArr, indicador, posicao) {
    elementosDesativar.forEach((elemento, index) => {
        elemento.classList.add('inativo');
        elemento.classList.remove('ativo');
        document.getElementById(desativarArr[index]).style.display = 'none';
    });

    elementoAtivo.classList.add('ativo');
    elementoAtivo.classList.remove('inativo');
    document.getElementById(ativar).style.display = 'grid';

    document.getElementById(indicador).style.transform = `translateX(${posicao * 100}%)`; 
}

function esconderElementos(ids) {
    ids.forEach(id => {
        document.getElementById(id).style.display = 'none';
    });
}

function identificarBaixoEstoque(){
    const rows = document.querySelectorAll('tr');
    rows.forEach(row => {
        const quantRecomendada = row.querySelector('.quant-minima');
        const quantAtual = row.querySelector('.quant-atual');
        if (quantRecomendada && quantAtual) {
            const recomendadaValue = parseInt(quantRecomendada.textContent, 10);
            const atualValue = parseInt(quantAtual.textContent, 10);
            if (atualValue < recomendadaValue) {
                quantAtual.classList.add('quant-atual-baixa');
            }
        }
    });
}

function adicionarPaginacao(dados, renderizarFunc, pagAntId, proxPagId, tabela) {
    document.getElementById(pagAntId).addEventListener('click', () => {
        if (dados.paginaAtual > 1) {
            dados.paginaAtual--;
            renderizarFunc();
        }
    });

    document.getElementById(proxPagId).addEventListener('click', () => {
        if ((dados.paginaAtual * dados.itensPorPagina) < dados[`dados${tabela}`].length) {
            dados.paginaAtual++;
            renderizarFunc();
        }
    });

    renderizarFunc();
}


function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

export {adicionarPaginacao,  mostrarMenu, alternador, alternador3, esconderElementos, identificarBaixoEstoque, logout};
