const usuarioService = require('../services/usuarioService')

class UsuarioController {
    async getUsers(req, res) {
        try {
            const usuarios = await usuarioService.getUsers()
            usuarios ? res.status(200).json(usuarios) : res.status(404).json({message: 'Usuários não encontrados'})
        } catch (error) {
            console.error('Erro ao buscar os usuários:', error.stack)
            res.status(500).json({message: 'Erro ao buscar os usuários'})
        }
    }

    async createUser(req, res) {
        const { matricula, nome, tipoUsuario, loja } = req.body

        if (!matricula || !tipoUsuario) {
            return res.status(400).json({message: 'Matrícula e tipo de usuário são obrigatórios'})
        }
        try {
            const result = await usuarioService.createUser(matricula, nome, tipoUsuario, loja)
            result ? res.status(201).json({message: 'Usuário cadastrado com sucesso'}) : res.status(400).json({message: 'Erro ao cadastrar usuário'})
        } catch (error) {
            console.error('Erro ao criar usuario:', error.stack)
            res.status(500).json({message: 'Erro ao criar usuario'})
        }
    }

    async getUserById(req, res) {
        const { matricula } = req.params
        try {
            const usuario = await usuarioService.getUserById(matricula)
            usuario ? res.status(200).json(usuario) : res.status(404).json({message: 'Usuário não encontrado'})
        } catch (error) {
            console.error('Erro ao buscar o usuário:', error.stack)
            res.status(500).json({message: 'Erro ao buscar o usuário'})
        }
    }

    async updateUser(req, res) {
        const { matricula } = req.params
        const updates = req.body

        if(!matricula || !updates) {
            return res.status(400).json({message: 'Dados incompletos para atualizar o usuário'})
        }
        try {
            const result = await usuarioService.updateUser(matricula, updates)
            result ? res.status(200).json({message: 'Usuário atualizado com sucesso'}) : res.status(404).json({message: 'Usuário não encontrado'})
        } catch (error) {
            console.error('Erro ao atualizar usuario:', error.stack)
            res.status(500).json({message: 'Erro ao atualizar usuario'})
        }
    }

    async updatePassword(req, res) {
        const { matricula } = req.params
        const { senhaAtual, novaSenha } = req.body

        if (!matricula || !senhaAtual || !novaSenha) {
            return res.status(400).json({message: 'Dados incompletos para atualizar a senha'})
        }
        try {
            const result = await usuarioService.updatePassword(matricula, senhaAtual, novaSenha)
            result ? res.status(200).json({message: 'Senha atualizada com sucesso'}) : res.status(404).json({message: 'Usuário não encontrado'})
        } catch (error) {
            console.error('Erro ao atualizar senha:', error.stack)
            res.status(500).json({message: 'Erro ao atualizar senha'})
        } 

    }


    async deleteUser(req, res) {
        const { matricula } = req.params
        try {
            const result = await usuarioService.deleteUser(matricula)
            result ? res.status(200).json({message: 'Usuário deletado com sucesso'}) : res.status(404).json({message: 'Usuário não encontrado'})
        } catch (error) {
            console.error('Erro ao deletar usuario:', error.stack)
            res.status(500).json({message: 'Erro ao deletar usuario'})
        }
    }
}

module.exports = new UsuarioController()