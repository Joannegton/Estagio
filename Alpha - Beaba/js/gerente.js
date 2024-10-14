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
        document.getElementById('perfilAcesso').style.display = 'none'
        mostrarMenu()
    }

    mostrarRelatorios = () => {
        document.getElementById('pedidoTaloes').style.display = 'none'
        document.getElementById('relatorios').style.display = 'block'
        document.getElementById('perfilAcesso').style.display = 'none'
        mostrarMenu()
    }

    mostrarPerfilAcesso = () => {
        document.getElementById('perfilAcesso').style.display = 'block'
        document.getElementById('pedidoTaloes').style.display = 'none'
        document.getElementById('relatorios').style.display = 'none'
        mostrarMenu()
    }

    abrirModalPedido = () =>{
        document.getElementById('modalPedido').style.display = 'block'
    }

    // Perfis de acesso
    const perfil = document.getElementById('mostrarPerfis')
    const cadastroPerfil = document.getElementById('mostrarCadastro')

    perfil.addEventListener('click', () => {
        alternador(perfil, perfil, cadastroPerfil, 'seletorPerfis', 'seletorCadastro', 'indicadorPerfil')
    })

    cadastroPerfil.addEventListener('click', ()=> {
        alternador(cadastroPerfil, perfil, cadastroPerfil, 'seletorCadastro', 'seletorPerfis', 'indicadorPerfil')
    })

    // Relatórios
    const saidas = document.getElementById('mostrarSaidas')
    const entradas = document.getElementById('mostrarEntradas')

    saidas.addEventListener('click', function() {
        alternador(saidas, saidas, entradas, 'saidas', 'entradas', 'indicador')
    })

    entradas.addEventListener('click', function() {
        alternador(entradas, saidas, entradas, 'entradas', 'saidas', 'indicador')
    })




    // geral
    function alternador(elementoAtivo, elementoDesativar, elementoAtivar, ativar, desativar, indicador) {
        elementoDesativar.classList.add('ativo')
        elementoDesativar.classList.remove('inativo')
        elementoAtivar.classList.add('inativo')
        elementoAtivar.classList.remove('ativo')

        if (elementoDesativar === elementoAtivo) {
            document.getElementById(indicador).style.transform = 'translateX(0)'
        } else {
            document.getElementById(indicador).style.transform = 'translateX(100%)'
        }
        document.getElementById(ativar).style.display = 'grid'
        document.getElementById(desativar).style.display = 'none'
    }
})