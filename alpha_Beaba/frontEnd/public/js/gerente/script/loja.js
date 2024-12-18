import { carregarCardUsuario, esconderModalCarregamento, mostrarModalCarregamento } from "../../utils.js"
import { carregarDadosLoja, fetchLoja, loja, salvarLoja } from "../controller/lojaController.js"

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('formEditarLoja').addEventListener('submit', async (e) => {
        e.preventDefault()
        salvarLoja()
    })

    window.onload = async () => {
        mostrarModalCarregamento()
        carregarCardUsuario()
        try {
            await fetchLoja()
            carregarDadosLoja(loja)
        }finally{
            esconderModalCarregamento()
        }
    }
})