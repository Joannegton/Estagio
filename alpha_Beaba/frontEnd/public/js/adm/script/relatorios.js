import { alternadorRelatorios, exportarRelatorios} from '../controller/relatoriosController.js'
import { carregarCardUsuario, checkSession, mostrarModalCarregamento, esconderModalCarregamento, verificarPermissao } from '../../utils.js'
import { fetchCidadesEstados } from '../controller/lojasController.js'


document.addEventListener('DOMContentLoaded', () => {
    // Identificar primeiro Acesso
    if(sessionStorage.getItem('mostrarPerfilUsuario') === 'true') {
        window.location = '/perfilUsuario'
        sessionStorage.removeItem('mostrarPerfilUsuario')
    }

    document.getElementById('exportarRelatorios').addEventListener('click', exportarRelatorios)

    // Carrega funcionalidades de relatórios pois é a página inicial
    window.onload = async () =>{
        verificarPermissao('Todas')
        mostrarModalCarregamento() 
        try {
            checkSession(1)
            carregarCardUsuario()
            await alternadorRelatorios()
            await fetchCidadesEstados()
            esconderModalCarregamento()
        } catch (error) {
            console.error('Erro ao carregar página', error)
            alert('Erro ao carregar página, tente novamente mais tarde')
        } 
    }
})