document.addEventListener('DOMContentLoaded', () => {
    mostrarMenu = () => {
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

    mostrarpedidoTaloes = () => {
        document.getElementById('pedidoTaloes').style.display = 'block'
        document.getElementById('relatorios').style.display = 'none'
        mostrarMenu()
    }

    mostrarRelatorios = () => {
        document.getElementById('pedidoTaloes').style.display = 'none'
        document.getElementById('relatorios').style.display = 'block'
        mostrarMenu()
    }

    abrirModalPedido = () =>{
        document.getElementById('modalPedido').style.display = 'block'
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