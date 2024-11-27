import { mostrarMenu } from "../utils.js"

if(window.innerWidth > 768){
    document.getElementById('menu').style.display = 'block'
}

document.getElementById('mostrarGestaoPerfil').addEventListener('click',  () => {
    window.location.href = '/perfilAcessoG'
})

document.getElementById('mostrarGestaoLoja').addEventListener('click',  ()=> {
    window.location.href = '/editarLoja'

})

document.getElementById('mostrarGestaoRelatorio').addEventListener('click',  () => {
    window.location.href = '/relatoriosG'

})

document.getElementById('usuario-info').addEventListener('click', () =>{
    window.location.href = '/perfilUsuarioG'
})

document.getElementById('sair-usuario').addEventListener('click',  async () => {
    mostrarModalCarregamento()
    try{
        await logout()
    } finally{
        esconderModalCarregamento()
    }
})

document.getElementById('menuButton').addEventListener('click', mostrarMenu)
document.getElementById('fechar').addEventListener('click', mostrarMenu)

