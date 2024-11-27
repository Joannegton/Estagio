import { salvarLoja } from "./loja"

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('formEditarLoja').addEventListener('submit', async (e) => {
        e.preventDefault()
        salvarLoja()
    })
})