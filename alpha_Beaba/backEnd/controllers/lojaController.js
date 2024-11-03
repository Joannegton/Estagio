const lojaService = require('../services/lojaService')

class LojaController {
    async createLoja(req, res) {
        const { nomeLoja, endereco, telefoneLoja } = req.body

        if (!nomeLoja) {
            return res.status(400).send('Nome da loja é obrigatório')
        }

        try {
            await lojaService.createLoja(nomeLoja, endereco, telefoneLoja)
            res.status(201).send('Loja cadastrada com sucesso')
        } catch (error) {
            console.error('Erro ao cadastrar loja:', error.stack)
            res.status(500).send('Erro ao cadastrar loja')
        }
    }

    async getLojas(req, res) {
        try {
            const lojas = await lojaService.getLojas()
            lojas ? res.status(200).json(lojas) : res.status(404).send("Lojas não encontradas")
        } catch (error) {
            console.error('Erro ao buscar as lojas:', error.stack)
            res.status(500).send('Erro ao buscar as lojas')
        }
    }

    async getLojaById(req, res) {
        const { codLoja } = req.params

        try {
            const loja = await lojaService.getLojaById(codLoja)
            loja ? res.status(200).json(loja) : res.status(404).send("Loja não encontrada")
        } catch (error) {
            console.error('Erro ao buscar a loja:', error.stack)
            res.status(500).send('Erro ao buscar a loja')
        }
    }

    async updateLoja(req, res) {
        const { codLoja } = req.params
        const updates = req.body

        try {
            const result = await lojaService.updateLoja(codLoja, updates)
            result ? res.status(200).send('Loja atualizada com sucesso') : res.status(404).send('Loja não encontrada')
        } catch (error) {
            console.error('Erro ao atualizar a loja:', error.stack)
            res.status(500).send('Erro ao atualizar a loja')
        }
    }

    async deleteLoja(req, res) {
        const { codLoja } = req.params

        try {
            const result = await lojaService.deleteLoja(codLoja)
            result ? res.status(200).send('Loja deletada com sucesso') : res.status(404).send('Loja não encontrada')
        } catch (error) {
            console.error('Erro ao deletar loja: ', error.stack)
            res.status(500).send('Erro ao deletar loja')
        }
    }
    
}



module.exports = new LojaController()