import { esconderElementos } from "../utils.js"

function mostrarPerfilUsuario(){
    document.getElementById('perfilUsuario').style.display = 'block'
    esconderElementos(['saidaTaloes'])
}


function mostrarEnvioTaloes(){
    document.getElementById('saidaTaloes').style.display = 'block'
    esconderElementos(['perfilUsuario'])
}

export { mostrarPerfilUsuario, mostrarEnvioTaloes }