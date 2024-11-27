import { carregarCardUsuario, esconderModalCarregamento, mostrarModalCarregamento } from "../../utils.js"
import { carregarSelects, enviarTalao } from "../controller/envioTaloesController.js"

document.addEventListener('DOMContentLoaded',  () => {
        // Envio de talões
    document.getElementById('formEnvioTalao').addEventListener('submit', async (e) =>{
        e.preventDefault()
        mostrarModalCarregamento()
        try {
            await enviarTalao()
        } finally{
            esconderModalCarregamento()
        }
        
    })

    window.onload = async () => {
        carregarCardUsuario()
        await carregarSelects()
    }
})