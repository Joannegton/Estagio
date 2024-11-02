const usuarioService = require('../services/usuarioService')

class UsuarioController {
    async getUsers(req, res) {
        try {
            const usuarios = await usuarioService.getUsers()
            usuarios ? res.status(200).json(usuarios) : res.status(404).send('Usuários não encontrados')
        } catch (error) {
            console.error('Erro ao buscar os usuários:', error.stack)
            res.status(500).send('Erro ao buscar os usuários')
        }
    }

    async createUser(req, res) {
        const { matricula, nome, tipoUsuario, loja } = req.body

        if (!matricula || !tipoUsuario) {
            return res.status(400).send('Matrícula e tipo de usuário são obrigatórios')
        }
        try {
            const result = await usuarioService.createUser(matricula, nome, tipoUsuario, loja)
            result ? res.status(201).send('Usuário cadastrado com sucesso') : res.status(400).send('Erro ao cadastrar usuário')
        } catch (error) {
            console.error('Erro ao criar usuario:', error.stack)
            res.status(500).send('Erro ao criar usuario')
        }
    }

    async getUserById(req, res) {
        const { matricula } = req.params
        try {
            const usuario = await usuarioService.getUserById(matricula)
            usuario ? res.status(200).json(usuario) : res.status(404).send('Usuário não encontrado')
        } catch (error) {
            console.error('Erro ao buscar o usuário:', error.stack)
            res.status(500).send('Erro ao buscar o usuário')
        }
    }

    async updateUser(req, res) {
    const { matricula } = req.params
    const updates = req.body

    try {
        const result = await usuarioService.updateUser(matricula, updates)
        result ? res.status(200).send('Usuário atualizado com sucesso') : res.status(404).send('Usuário não encontrado')
    } catch (error) {
        console.error('Erro ao atualizar usuario:', error.stack)
        res.status(500).send('Erro ao atualizar usuario')
    }
}

    async deleteUser(req, res) {
        const { matricula } = req.params
        try {
            const result = await usuarioService.deleteUser(matricula)
            result ? res.status(200).send('Usuário deletado com sucesso') : res.status(404).send('Usuário não encontrado')
        } catch (error) {
            console.error('Erro ao deletar usuario:', error.stack)
            res.status(500).send('Erro ao deletar usuario')
        }
    }
}

module.exports = new UsuarioController()