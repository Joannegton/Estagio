import { carregarCardUsuario, esconderModalCarregamento, mostrarModalCarregamento } from "../../utils.js"
import { exportarEstoque, fetchEstoque, filtrarNomeLoja, ordenarEstoque, ordenarLojaEstoque } from "../controller/estoqueController.js"

document.addEventListener('DOMContentLoaded',  () => {
    
    // Estoque
    document.getElementById('filtrarNomeLoja').addEventListener('input', filtrarNomeLoja)
    
    document.getElementById('filtroLojaEstoque').addEventListener('change', ordenarLojaEstoque)

    document.getElementById('ordenarQntEstoque').addEventListener('change', ordenarEstoque)
    
    document.getElementById('exportarEstoque').addEventListener('click', exportarEstoque)

    window.onload = async () => {
        carregarCardUsuario()
        mostrarModalCarregamento()
        try {
            await fetchEstoque()
        } finally {
            esconderModalCarregamento()
        }
    }
})