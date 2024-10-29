const getPerfis = require("../services/perfisService")

async function getPerfisHandler() {
    try {
        const perfis = await getPerfis()
    } catch (error) {
        console.error('Erro ao buscar os perfis:', error.stack)
        res.status(500).send('Erro ao buscar os perfis')
    }
}

module.exports = getPerfisHandler