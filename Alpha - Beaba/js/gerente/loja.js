import { esconderElementos } from "../utils.js";

function mostrarEditarLoja(){
    document.getElementById('editarLoja').style.display = 'block';
    esconderElementos(['estoqueTaloes', 'relatorios', 'perfilAcesso']);
}

export { mostrarEditarLoja };
