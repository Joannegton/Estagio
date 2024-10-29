const { Router } = require('express');
const { conectarDb } = require('../config/conexao');
const bcrypt = require('bcrypt');

const usuarioRouter = Router();

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

usuarioRouter.get('/usuarios', (req, res)=> {
    conectarDb(async client => {
        try {
            const result = await client.query(`
                SELECT 
                    usuario.matricula, 
                    usuario.nome_usuario, 
                    p.descricao AS tipo_usuario, 
                    l.nome_loja 
                FROM usuario
                JOIN perfil_acesso p ON usuario.id_perfil_acesso = p.id_perfil_acesso
                LEFT JOIN loja l ON usuario.cod_loja = l.cod_loja
            `
            )
            res.status(200).json(result.rows)
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            res.status(500).send('Erro ao executar a query')
        }
    })
})

module.exports = usuarioRouter