import { esconderElementos } from "../utils.js";
import { mostrarEnvioTaloes, mostrarPerfilUsuario } from "./caixa.js"

document.addEventListener('DOMContentLoaded',() => {
    // Verifica se é o 1º acesso
    if (sessionStorage.getItem('mostrarPerfilUsuario') === 'true') {
        //esconderElementos(['relatorios'])
        mostrarPerfilUsuario()
        sessionStorage.removeItem('mostrarPerfilUsuario')
    }

    document.getElementById('mostrarEnvioTaloes').addEventListener('click', mostrarEnvioTaloes)
    document.getElementById('mostrarPerfilUsuario').addEventListener('click', mostrarPerfilUsuario)

    

})