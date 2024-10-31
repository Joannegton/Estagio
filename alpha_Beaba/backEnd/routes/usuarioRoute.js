const { Router } = require('express');
const { conectarDb } = require('../config/conexao');
const bcrypt = require('bcrypt');
const getUsuariosHandler = require('../controllers/usuarioController');

const usuarioRouter = Router();

usuarioRouter.get('/usuarios', getUsuariosHandler)

usuarioRouter.post('/cadastrarUsuario', (req, res) => {
    const { matricula, tipoUsuario, loja} = req.body

    conectarDb( async client => {
        const senha = await bcrypt.hash('Quero@2024#', 10)
        try {
            const result = await client.query('INSERT INTO usuario (matricula, senha, cod_loja, id_perfil_acesso) VALUES ($1, $2, $3, $4)', [matricula, senha, loja, tipoUsuario])
            result ? res.status(201).send('Usuário cadastrado com sucesso') : res.status(400).send('Erro ao cadastrar usuário')
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            res.status(500).send('Erro ao executar a query')
        }
    })
})



module.exports = usuarioRouter