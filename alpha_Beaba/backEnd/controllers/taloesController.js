const taloesService = require("../services/taloesService")

//modificar
class TaloesController {
    async getTaloesPorLoja(req, res) {
        const { cod_loja } = req.params

        if (!cod_loja) {
            return res.status(400).json({message: 'Loja não informada'})
        }

        try {
            const taloes = await taloesService.getTaloesPorLoja(cod_loja)
            res.status(200).json(taloes)
        } catch (error) {
            console.error("Talões não encontrados para essa loja")
            res.status(500).json({message: "Talões não encontrados para essa loja"})
        }
    }

    async getTaloes(req, res) {
        try {
            const taloes = await taloesService.getTaloes()
            taloes ? res.status(200).json(taloes) : res.status(404).json({message: 'Remessas não encontradas'})
        } catch (error) {
            console.error('Erro ao buscar remessas')
            res.status(500).json({message: "Erro ao busca remessas"})
        }
    }

    async getSaidasPorLoja(req, res) {
        const { cod_loja } = req.params

        if (!cod_loja) {
            return res.status(400).json({message: 'Loja não informada'})
        }

        try {
            const result = await taloesService.getSaidasPorLoja(cod_loja)
            res.status(200).json(result)
        } catch (error) {
            console.error("Saídas não encontradas para essa loja")
            res.status(500).json({message: "Saídas não encontrados para essa loja"})
        }
    }

    async createTaloes(req, res) {
        const { lojaDestino, dataEnvio, quantidade, recebedor, dataRecebimentoPrevisto } = req.body
        
        if (!lojaDestino || !dataEnvio || !quantidade || !recebedor || !dataRecebimentoPrevisto) {
            return res.status(400).json({message: 'Todos os campos são obrigatórios'})
        }

        try {
            const result = await taloesService.createTaloes(lojaDestino, dataEnvio, quantidade, recebedor, dataRecebimentoPrevisto)
            result ? res.status(200).json({message: 'Talões enviados com sucesso'}): res.status(404).json({message: 'Erro ao enviar talões'})
        } catch (error) {
            console.error('Erro ao enviar talões:', error)
            res.status(500).json({message: 'Erro ao enviar talões'})     
        }
    }

    async createTalao(req, res){
        const {numeroTalao, matricula, cod_loja} = req.body

        if(!numeroTalao){
            return res.status(400).json({message: 'Preencha todos os campos'})
        }

        try {
            const result = await taloesService.createTalao(numeroTalao, matricula, cod_loja)
            result ? res.status(200).json({message: 'Talão enviado com sucesso'}): res.status(404).json({message: 'Erro ao enviar talão'})
        } catch (error) {
            console.error('Erro ao enviar talão:', error)
            res.status(500).json({message: 'Erro ao enviar talão'})  
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

    async acceptTaloes(req, res){
        const {numeroRemessa} = req.params

        try {
            const result = await taloesService.acceptRemessa(numeroRemessa)
            result ? res.status(200).json({message: 'Estoque atualizado'}) : res.status(404).json({message: "Erro ao aceitar remessa"})
        } catch (error) {
            console.error('Erro ao atualizar o estoque: ', error.stack)
            res.status(500).json({message: 'Erro ao atualizar o estoque'})
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
    
}

module.exports = new TaloesController()