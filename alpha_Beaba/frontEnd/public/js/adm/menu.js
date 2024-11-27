import { mostrarMenu, logout, mostrarFiltros, carregarCardUsuario } from '../utils.js'

// Menu navigation
if (window.innerWidth > 768) {
    document.getElementById('menu').style.display = 'block'
}

document.getElementById('mostrarEnvioTaloes').addEventListener('click', () => {
    window.location = '/envioTaloes'
})

document.getElementById('mostrarEstoque').addEventListener('click', () => {
    window.location = '/estoque'
})

document.getElementById('mostrarManutencao').addEventListener('click', () => {
    window.location = '/manutencao'
})

document.getElementById('mostrarPerfil').addEventListener('click', () => {
    window.location = '/perfilAcesso'
})

document.getElementById('mostrarLojas').addEventListener('click', () => {
    window.location = '/lojas'
})

document.getElementById('mostrarRelatorio').addEventListener('click', () => {
        window.location = '/relatorios'
})

// Card Usuario
document.getElementById('usuario-info').addEventListener('click', () => {
    window.location = '/perfilUsuario'
})

document.getElementById('sair-usuario').addEventListener('click', logout)

// Mostrar menu e filtros para mobile
document.getElementById('menuButton').addEventListener('click', mostrarMenu)
document.getElementById('fechar').addEventListener('click', mostrarMenu)

window.mostrarFiltros = mostrarFiltros // função usada no html


