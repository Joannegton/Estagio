const estoqueService  = require('../services/estoqueService')

class EstoqueController {
    async  getEstoque(req, res) {
        try {
            const estoque = await estoqueService.getEstoque()
            estoque ? res.status(200).json(estoque) : res.status(404).send('Erro ao buscar estoque.')
        } catch (error) {
            console.error('Erro ao buscar o estoque:', error.stack)
            res.status(500).send('Erro ao buscar o estoque')
        }
    }

    async getEstoqueByLoja(req, res) {
        const {codLoja} = req.params
        try {
            const estoque = await estoqueService.getEstoqueByLoja(codLoja)
            res.status(200).json(estoque)
        } catch (error) {
            console.error('Erro ao buscar o estoque:', error.stack)
            res.status(500).send('Erro ao buscar o estoque')
        }
    }
}


module.exports = new EstoqueController()