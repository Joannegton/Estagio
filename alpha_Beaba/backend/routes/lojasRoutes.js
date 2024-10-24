const { Router } = require('express')
const { conectarDb } = require('../config/conexao')

const lojasRouter = Router()

lojasRouter.get('/lojas', (req, res) => {
    conectarDb(async client => {
        try {
            const result = await client.query('SELECT * FROM loja')
            res.status(200).json(result.rows)
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            res.status(500).send('Erro ao executar a query')
        }
    })
})

module.exports = lojasRouter