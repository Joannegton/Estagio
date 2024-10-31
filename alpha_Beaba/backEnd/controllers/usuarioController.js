const usuarioService = require('../services/usuarioService');

class UsuarioController {
    async getUsers(req, res) {
        try {
            const usuarios = await usuarioService.getUsers();
            res.status(200).json(usuarios);
        } catch (error) {
            console.error('Erro ao buscar os usuários:', error.stack);
            res.status(500).send('Erro ao buscar os usuários');
        }
    }

    async createUser(req, res) {
        const { matricula, tipoUsuario, loja } = req.body;
        try {
            const result = await usuarioService.cadastrarUsuario(matricula, tipoUsuario, loja);
            result ? res.status(201).send('Usuário cadastrado com sucesso') : res.status(400).send('Erro ao cadastrar usuário');
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack);
            res.status(500).send('Erro ao executar a query');
        }
    }

    async getUserById(req, res) {
        const { matricula } = req.params;
        try {
            const usuario = await usuarioService.getUserById(matricula);
            usuario ? res.status(200).json(usuario) : res.status(404).send('Usuário não encontrado');
        } catch (error) {
            console.error('Erro ao buscar o usuário:', error.stack);
            res.status(500).send('Erro ao buscar o usuário');
        }
    }

    async updateUser(req, res) {
        const { matricula } = req.params;
        const { tipoUsuario, loja } = req.body;
        try {
            const result = await usuarioService.updateUser(matricula, tipoUsuario, loja);
            result ? res.status(200).send('Usuário atualizado com sucesso') : res.status(404).send('Usuário não encontrado');
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack);
            res.status(500).send('Erro ao executar a query');
        }
    }

    async deleteUser(req, res) {
        const { matricula } = req.params;
        try {
            const result = await usuarioService.deleteUser(matricula);
            result ? res.status(200).send('Usuário deletado com sucesso') : res.status(404).send('Usuário não encontrado');
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack);
            res.status(500).send('Erro ao executar a query');
        }
    }

    
}

module.exports = new UsuarioController();