import {exportarRelatorios, alternadorRelatorios } from '../controller/relatorioController.js'
import { completeInformations} from '../controller/lojaController.js'
import { carregarCardUsuario, checkSession, esconderModalCarregamento, mostrarModalCarregamento } from "../../utils.js"


document.addEventListener('DOMContentLoaded', () => {
    // Identificar primeiro Acesso
    if(sessionStorage.getItem('mostrarPerfilUsuario') === 'true') {
        window.location = '/perfilUsuarioG'
        sessionStorage.removeItem('mostrarPerfilUsuario')
    }
    
    // Ações relacionadas a relatorios
    document.getElementById('exportarRelatorios').addEventListener('click', exportarRelatorios)

    
    //carregamento da sessão inicial que é o Dashboard/relatorios
    window.onload = async () => {
        mostrarModalCarregamento()
        try {
            checkSession(2)
            carregarCardUsuario() 
            await alternadorRelatorios()
            await completeInformations()
        } catch (error) {
            alert("Erro ao carregar dados")
        } finally{
            esconderModalCarregamento()
        }
    }

})


