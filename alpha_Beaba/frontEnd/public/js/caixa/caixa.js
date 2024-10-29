import { esconderElementos } from "../../utils.js"

function mostrarPerfilUsuario(){
    document.getElementById('perfilUsuario').style.display = 'block'
    esconderElementos(['saidaTaloes'])
}


function mostrarEnvioTaloes(){
    document.getElementById('saidaTaloes').style.display = 'block'
    esconderElementos(['perfilUsuario'])
}

function saidaTalao(e){
    const data = new FormData(e.target)
    const talao = data.get('numeroTalao')
    console.log(talao)
    alert('Talão enviado com sucesso!')
}

export { mostrarPerfilUsuario, mostrarEnvioTaloes, saidaTalao }