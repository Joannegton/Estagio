const {Router} = require('express');
const {conectarDb} = require('../config/conexao');

const estoqueRouter = Router();

estoqueRouter.get('/estoque', (req, res) => {
    conectarDb(async client => {
        try {
            const result = await client.query(`
                SELECT 
                    l.cod_loja,
                    l.nome_loja,
                    et.quantidade_recomendada,
                    l.estoque_minimo,
                    et.quantidade_disponivel
                FROM loja l
                JOIN estoque_taloes et ON l.cod_loja = et.cod_loja
            `);
            res.status(200).json(result.rows);
        } catch (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query');
        }
    });
});

module.exports = estoqueRouter;
