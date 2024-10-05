document.addEventListener('DOMContentLoaded', () => {
    window.mostrarMenu = () => {
        var nav = document.getElementById('menu')
        if (window.innerWidth <= 768) {
            if (nav.style.display === 'block') {
                nav.style.display = 'none'
            } else {
                nav.style.display = 'block'
                console.log(nav.style.display)
            }
        }
    }

    window.mostrarpedidoTaloes = () => {
        document.getElementById('pedidoTaloes').style.display = 'block'
        document.getElementById('recebimentoTaloes').style.display = 'none'
        document.getElementById('estoque').style.display = 'none'
        document.getElementById('relatorios').style.display = 'none'
        mostrarMenu()
    }

    window.mostrarrecebimentoTaloes = () => {
        document.getElementById('pedidoTaloes').style.display = 'none'
        document.getElementById('recebimentoTaloes').style.display = 'block'
        document.getElementById('estoque').style.display = 'none'
        document.getElementById('relatorios').style.display = 'none'
        mostrarMenu()
    }

    window.mostrarEstoque = () => {
        document.getElementById('pedidoTaloes').style.display = 'none'
        document.getElementById('recebimentoTaloes').style.display = 'none'
        document.getElementById('estoque').style.display = 'block'
        document.getElementById('relatorios').style.display = 'none'
        mostrarMenu()
    }

    window.mostrarRelatorios = () => {
        document.getElementById('pedidoTaloes').style.display = 'none'
        document.getElementById('recebimentoTaloes').style.display = 'none'
        document.getElementById('estoque').style.display = 'none'
        document.getElementById('relatorios').style.display = 'block'
        mostrarMenu()
    }

    const entradas = document.getElementById('mostrarEntradas')
    const saidas = document.getElementById('mostrarSaidas')
    const indicador = document.querySelector('.indicador')

    function toggleActive(elementToActivate, elementToDeactivate) {
        elementToActivate.classList.add('ativo')
        elementToActivate.classList.remove('inativo')
        elementToDeactivate.classList.add('inativo')
        elementToDeactivate.classList.remove('ativo')

        if (elementToActivate === entradas) {
            indicador.style.transform = 'translateX(0)'
        } else {
            indicador.style.transform = 'translateX(100%)'
        }
    }

    entradas.addEventListener('click', function() {
        toggleActive(entradas, saidas)
        document.getElementById('entradas').style.display = 'block'
        document.getElementById('saidas').style.display = 'none'
    })

    saidas.addEventListener('click', function() {
        toggleActive(saidas, entradas)
        document.getElementById('saidas').style.display = 'block'
        document.getElementById('entradas').style.display = 'none'
    })

    toggleActive(saidas, entradas)
})