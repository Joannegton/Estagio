const getEstoque  = require('../services/estoqueService')

async function getEstoqueHandler(req, res) {
    try {
        const estoque = await getEstoque()
        res.status(200).json(estoque)
    } catch (error) {
        console.error('Erro ao buscar o estoque:', error.stack)
        res.status(500).send('Erro ao buscar o estoque')
    }
}

module.exports = getEstoqueHandler