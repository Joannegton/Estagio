import { carregarCardUsuario, esconderModalCarregamento, mostrarModalCarregamento } from "../../utils.js"
import { alternadorLojas, exportarLojas, ordenarLoja, salvarLoja, showSuggestions } from "../controller/lojasController.js"

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('filtroLojaLojas').addEventListener('change', ordenarLoja)

    document.getElementById('exportarLojas').addEventListener('click', exportarLojas)

    document.getElementById('formSalvarLoja').addEventListener('submit', async (e) => {
        e.preventDefault()
        mostrarModalCarregamento()
        try{
            await salvarLoja()
        } finally{
            esconderModalCarregamento()
        }
    })   

    document.getElementById('cidadeEstadoLoja').addEventListener('input', showSuggestions)

    window.onload = async () => {
        carregarCardUsuario()
        mostrarModalCarregamento()
        try{
            await alternadorLojas()
        } finally{
            esconderModalCarregamento()
        }
    }
})