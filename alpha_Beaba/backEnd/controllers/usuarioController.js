const getUsuarios = require("../services/usuarioService")

async function getUsuariosHandler(req, res) {
    try {
        const usuarios = await getUsuarios()
        res.status(200).json(usuarios)
    } catch (error) {
        console.error('Erro ao buscar os usuários:', error.stack)
        res.status(500).send('Erro ao buscar os usuários') 
        
    }
}

module.exports = getUsuariosHandler