const getTaloes = require("../services/taloesService")

async function getTaloesHandler(req, res) {
    try {
        const taloes = await getTaloes()
        res.status(200).json(taloes)
    } catch (error) {
        console.error('Erro ao buscar os talões:', error.stack)
        res.status(500).send('Erro ao buscar os talões')
    }
}

module.exports = getTaloesHandler