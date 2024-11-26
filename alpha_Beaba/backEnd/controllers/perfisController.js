const perfisService = require('../services/perfisService')

class PerfisController {
    async createPerfil(req, res) {
        const { nomePerfil, permissoes } = req.body

        if (!nomePerfil || !Array.isArray(permissoes) || permissoes.length === 0) {
            return res.status(400).json({message: 'Nome do perfil e uma lista de permissões são obrigatórios'})
        }

        try {
            const message = await perfisService.createPerfil(nomePerfil, permissoes)
            res.status(201).json(message)
        } catch (error) {
            console.error('Erro ao cadastrar perfil:', error.stack)
            res.status(500).json({message: 'Erro ao cadastrar perfil'})
        }
    }

    async getPerfis(req, res) {
        try {
            const perfis = await perfisService.getPerfis()
            perfis ? res.status(200).json(perfis) : res.status(404).json({message: "Perfis não encontrados"})
        } catch (error) {
            console.error('Erro ao buscar os perfis:', error.stack)
            res.status(500).json({message: 'Erro ao buscar os perfis'})
        }
    }

    async getPerfilById(req, res) {
        const id = req.params.id

        try {
            const perfil = await perfisService.getPerfilById(id)
            perfil ? res.status(200).json(perfil) : res.status(200).json({message: 'Perfil não encontrado'})
        } catch (error) {
            console.error('Erro ao buscar perfil: ', error.stack)
            res.status(500).json({message: 'Erro ao buscar Perfil'})
        }
    }

    async updatePerfil(req, res) {
        const {id} = req.params
        const { permissoes } = req.body

        if (!id || !Array.isArray(permissoes) || permissoes.length === 0) {
            return res.status(400).json({message: 'Id do perfil e uma lista de permissões são obrigatórios'})
        }

        try {
            const message = await perfisService.updatePerfil(id, permissoes)
            res.status(200).json(message)
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error.stack)
            res.status(500).json({message: 'Erro ao atualizar perfil'})
        }
    }

    async deletePerfil(req, res) {
        const id = req.params.id

        try {
            const message = await perfisService.deletePerfil(id)
            res.status(200).json(message)
        } catch (error) {
            console.error('Erro ao deletar perfil:', error.stack)
            res.status(500).json('Erro ao deletar perfil')
        }
    }

    
}

module.exports = new PerfisController()