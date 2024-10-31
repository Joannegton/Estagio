const lojaService = require('../services/lojaService')

class LojaController {
    async createLoja(req, res, next) {
        const { nomeLoja, endereco, telefoneLoja } = req.body

        try {
            await lojaService.createLoja(nomeLoja, endereco, telefoneLoja)
            res.status(200).send('Loja cadastrada com sucesso')
        } catch (error) {
            next(error)
        }
    }

    async getLojas(req, res, next) {
        try {
            const lojas = await lojaService.getLojas()
            res.status(200).json(lojas)
        } catch (error) {
            next(error)
        }
    }

    async getLojaById(req, res, next) {
        const { codLoja } = req.params

        try {
            const loja = await lojaService.getLojaById(codLoja)
            res.status(200).json(loja)
        } catch (error) {
            next(error)
        }
    }

    async updateLoja(req, res, next) {
        const { codLoja } = req.params
        const { nomeLoja, endereco, telefoneLoja } = req.body

        try {
            await lojaService.updateLoja(codLoja, nomeLoja, endereco, telefoneLoja)
            res.status(200).send('Loja atualizada com sucesso')
        } catch (error) {
            next(error)
        }
    }

    async deleteLoja(req, res, next) {
        const { codLoja } = req.params

        try {
            await lojaService.deleteLoja(codLoja)
            res.status(200).send('Loja deletada com sucesso')
        } catch (error) {
            next(error)
        }
    }

    
}



module.exports = new LojaController()