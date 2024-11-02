const perfisService = require('../services/perfisService')

class PerfisController {
    async createPerfil(req, res) {
        const { nomePerfil, permissoes } = req.body

        if (!nomePerfil || !Array.isArray(permissoes) || permissoes.length === 0) {
            return res.status(400).send('Nome do perfil e uma lista de permissões são obrigatórios')
        }

        try {
            const message = await perfisService.createPerfil(nomePerfil, permissoes)
            res.status(201).send(message)
        } catch (error) {
            console.error('Erro ao cadastrar perfil:', error.stack)
            res.status(500).send('Erro ao cadastrar perfil')
        }
    }

    async getPerfis(req, res) {
        try {
            const perfis = await perfisService.getPerfis()
            perfis ? res.status(200).json(perfis) : res.status(404).send("Perfis não encontrados")
        } catch (error) {
            console.error('Erro ao buscar os perfis:', error.stack)
            res.status(500).send('Erro ao buscar os perfis')
        }
    }

    async getPerfilById(req, res, next) {
        const id = req.params.id

        try {
            const perfil = await perfisService.getPerfilById(id)
            res.status(200).json(perfil)
        } catch (error) {
            next(error)
        }
    }

    async updatePerfil(req, res) {
        const {id} = req.params
        const { permissoes } = req.body

        if (!id || !Array.isArray(permissoes) || permissoes.length === 0) {
            return res.status(400).send('Id do perfil e uma lista de permissões são obrigatórios')
        }

        try {
            const message = await perfisService.updatePerfil(id, permissoes)
            res.status(200).send(message)
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error.stack)
            res.status(500).send('Erro ao atualizar perfil')
        }
    }

    async deletePerfil(req, res) {
        const id = req.params.id

        try {
            const message = await perfisService.deletePerfil(id)
            res.status(200).send(message)
        } catch (error) {
            console.error('Erro ao deletar perfil:', error.stack)
            res.status(500).send('Erro ao deletar perfil')
        }
    }

    
}

module.exports = new PerfisController()