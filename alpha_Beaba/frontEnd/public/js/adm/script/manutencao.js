import { carregarCardUsuario, esconderModalCarregamento, mostrarModalCarregamento, verificarPermissao } from "../../utils.js"
import { exportarManutencao, fetchEnvioTaloes, filtarLojaManutencao, filtarStatusManutencao, filtrarNomeLojaManutencao } from "../controller/manutencaoController.js"

verificarPermissao('Todas')

document.addEventListener('DOMContentLoaded', () => {
        
    // Manutenção
    document.getElementById('filtroManutencaoNomeLoja').addEventListener('input', filtrarNomeLojaManutencao)

    document.getElementById('filtroLojaManutencao').addEventListener('change', filtarLojaManutencao)

    document.getElementById('filtroStatusManutencao').addEventListener('change', filtarStatusManutencao)

    document.getElementById('exportarManutencao').addEventListener('click', exportarManutencao)

    window.onload = async () => {
        mostrarModalCarregamento()
        try {
            carregarCardUsuario()
            await fetchEnvioTaloes()
        } finally {
            esconderModalCarregamento()
        }
    }
})