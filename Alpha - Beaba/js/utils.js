function mostrarMenu() {
    const nav = document.getElementById('menu');
    if (window.innerWidth <= 768) {
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

export { mostrarMenu, alternador, alternador3, esconderElementos };
