const getPerfis = require("../services/perfisService")

async function getPerfisHandler(req, res) {
    try {
        const perfis = await getPerfis()
        res.status(200).json(perfis)
    } catch (error) {
        console.error('Erro ao buscar os perfis:', error.stack)
        res.status(500).send('Erro ao buscar os perfis')
    }
}

module.exports = getPerfisHandler