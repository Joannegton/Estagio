const perfisService = require('../services/perfisService')

class PerfisController {
    async createPerfil(req, res, next) {
        const { nomePerfil, permissoes } = req.body

        try {
            const message = await perfisService.createPerfil(nomePerfil, permissoes)
            res.status(201).send(message)
        } catch (error) {
            next(error)
        }
    }

    async getPerfis(req, res) {
        try {
            const perfis = await perfisService.getPerfis()
            res.status(200).json(perfis)
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

    async updatePerfil(req, res, next) {
        const { id, nomePerfil, permissoes } = req.body

        try {
            const message = await perfisService.updatePerfil(id, nomePerfil, permissoes)
            res.status(200).send(message)
        } catch (error) {
            next(error)
        }
    }

    async deletePerfil(req, res, next) {
        const id = req.params.id

        try {
            const message = await perfisService.deletePerfil(id)
            res.status(200).send(message)
        } catch (error) {
            next(error)
        }
    }

    
}

module.exports = new PerfisController()