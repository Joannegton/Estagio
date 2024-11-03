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

    async updateTaloes(req, res){
        const { numeroRemessa} = req.params
        const  updates = req.body

        if (!numeroRemessa || !updates) {
            return res.status(400).send('Dados incompletos para atualizar os talões')
        }

        try {
            const result = await taloesService.updateTaloes(numeroRemessa, updates)
            result ? res.status(200).send('Talões atualizados com sucesso') : res.status(404).send('Erro ao atualizar Remessa')
        } catch (error) {
            console.error('Erro ao atualizar Remessa', error.stack)
            res.status(500).send('Erro ao atualizar Remessa')
        }
    }

    async deleteTaloes(req, res){
        const { numeroRemessa } = req.params

        if (!numeroRemessa) {
            return res.status(400).send('Número da remessa não informado')
        }

        try {
            const result = await taloesService.deleteTaloes(numeroRemessa)
            result ? res.status(200).send('Remessa deletada com sucesso') : res.status(404).send('Remessa não encontrada')
        } catch (error) {
            console.error('Erro ao deletar remessa:', error.stack)
            res.status(500).send('Erro ao deletar remessa')
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