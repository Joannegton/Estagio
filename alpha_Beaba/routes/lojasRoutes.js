const { Router } = require('express')
const { conectarDb } = require('../config/conexao')

const lojasRouter = Router()

lojasRouter.post('/cadastrarLoja', (req, res) => {
    const { nomeLoja, endereco, telefoneLoja } = req.body

    conectarDb(async client => {
        try {
            await client.query(`
                INSERT INTO loja (nome_loja, endereco_loja, telefone)
                VALUES ($1, $2, $3)
            `, [nomeLoja, endereco, telefoneLoja])
            res.status(200).send('Loja cadastrada com sucesso')
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            res.status(500).send('Erro ao executar a query')
        }
    })
})

lojasRouter.get('/lojas', (req, res) => {
    conectarDb(async client => {
        try {
            const result = await client.query(`
                SELECT 
                    loja.cod_loja, 
                    loja.nome_loja, 
                    usuario.nome_usuario AS "gerente", 
                    loja.estoque_minimo,
                    loja.caixas_fisicos
                FROM loja
                LEFT JOIN 
                    usuario ON loja.gerente_id = usuario.matricula
                LEFT JOIN 
                    estoque_taloes ON loja.cod_loja = estoque_taloes.cod_loja
            `)
            res.status(200).json(result.rows)
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            res.status(500).send('Erro ao executar a query')
        }
    })
})

module.exports = lojasRouter