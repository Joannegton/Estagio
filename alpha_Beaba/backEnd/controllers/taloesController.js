const taloesService = require("../services/taloesService")

class TaloesController {
    async getTaloes(req, res, next) {
        try {
            const taloes = await taloesService.getTaloes()
            res.status(200).json(taloes)
        } catch (error) {
            next(error)
        }
    }

    async createTaloes(req, res) {
        const { lojaDestino, dataEnvio, quantidade, recebedor, dataRecebimentoPrevisto } = req.body
        
        if (!lojaDestino || !dataEnvio || !quantidade || !recebedor || !dataRecebimentoPrevisto) {
            return res.status(400).send('Todos os campos são obrigatórios');
        }

        try {
            await taloesService.createTaloes(lojaDestino, dataEnvio, quantidade, recebedor, dataRecebimentoPrevisto)
            res.status(200).send('Talões enviados com sucesso')
        } catch (error) {
            console.error('Erro ao enviar talões:', error)
            res.status(500).send('Erro ao enviar talões')     
        }
    }

    async updateTaloes(req, res, next){
        const { numeroRemessa, dataRecebimento, status} = req.body

        if (!numeroRemessa || !dataRecebimento || !status) {
            return res.status(400).send('Dados incompletos para atualizar os talões')
        }

        try {
            await taloesService.updateTaloes(numeroRemessa, dataRecebimento, status)
            res.status(200).send('Talões atualizados com sucesso')
        } catch (error) {
            next(error)
        }
    }

    async deleteTaloes(req, res, next){
        const { numeroRemessa } = req.body

        if (!numeroRemessa) {
            return res.status(400).send('Número da remessa não informado')
        }

        try {
            await taloesService.deleteTaloes(numeroRemessa)
            res.status(200).send('Talões deletados com sucesso')
        } catch (error) {
            next(error)
        }
    }

    async getTaloesPorLoja(req, res, next) {
        const { lojaDestino } = req.body

        if (!lojaDestino) {
            return res.status(400).send('Loja não informada')
        }

        try {
            const taloes = await taloesService.getTaloesPorLoja(lojaDestino)
            res.status(200).json(taloes)
        } catch (error) {
            next(error)
        }
    }

    
}

module.exports = new TaloesController()