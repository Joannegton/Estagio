const taloesService = require("../services/taloesService")

class TaloesController {
    async getTaloes(req, res) {
        try {
            const taloes = await taloesService.getTaloes()
            taloes ? res.status(200).json(taloes) : res.status(404).json({message: 'Remessas não encontradas'})
        } catch (error) {
            console.error('Erro ao buscar remessas')
            res.status(500).json({message: "Erro ao busca remessas"})
        }
    }

    async createTaloes(req, res) {
        const { lojaDestino, dataEnvio, quantidade, recebedor, dataRecebimentoPrevisto } = req.body
        
        if (!lojaDestino || !dataEnvio || !quantidade || !recebedor || !dataRecebimentoPrevisto) {
            return res.status(400).json({message: 'Todos os campos são obrigatórios'})
        }

        try {
            await taloesService.createTaloes(lojaDestino, dataEnvio, quantidade, recebedor, dataRecebimentoPrevisto)
            res.status(200).json({message: 'Talões enviados com sucesso'})
        } catch (error) {
            console.error('Erro ao enviar talões:', error)
            res.status(500).json({message: 'Erro ao enviar talões'})     
        }
    }

    async updateTaloes(req, res){
        const { numeroRemessa} = req.params
        const  updates = req.body

        if (!numeroRemessa || !updates) {
            return res.status(400).json({message: 'Dados incompletos para atualizar os talões'})
        }

        try {
            const result = await taloesService.updateTaloes(numeroRemessa, updates)
            result ? res.status(200).json({message: 'Talões atualizados com sucesso'}) : res.status(404).json({message: 'Erro ao atualizar Remessa'})
        } catch (error) {
            console.error('Erro ao atualizar Remessa', error.stack)
            res.status(500).json({message: 'Erro ao atualizar Remessa'})
        }
    }

    async deleteTaloes(req, res){
        const { numeroRemessa } = req.params

        if (!numeroRemessa) {
            return res.status(400).json({message: 'Número da remessa não informado'})
        }

        try {
            const result = await taloesService.deleteTaloes(numeroRemessa)
            result ? res.status(200).json({message: 'Remessa deletada com sucesso'}) : res.status(404).json({message: 'Remessa não encontrada'})
        } catch (error) {
            console.error('Erro ao deletar remessa:', error.stack)
            res.status(500).json({message: 'Erro ao deletar remessa'})
        }
    }

    async getTaloesPorLoja(req, res) {
        const { lojaDestino } = req.body

        if (!lojaDestino) {
            return res.status(400).json({message: 'Loja não informada'})
        }

        try {
            const taloes = await taloesService.getTaloesPorLoja(lojaDestino)
            res.status(200).json(taloes)
        } catch (error) {
            console.error("Talões não encontrados para essa loja")
            res.status(500).json({message: "Talões não encontrados para essa loja"})
        }
    }

    
}

module.exports = new TaloesController()