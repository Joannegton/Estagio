const {Router} = require('express');
const {conectarDb} = require('../config/conexao');

const manutencaoRouter = Router();

manutencaoRouter.get('/manutencao', (req, res) => {
    conectarDb(async client => {
        try {
            const result = await client.query(`
                SELECT 
                    et.numero_remessa,
                    et.data_envio,
                    l.nome_loja,
                    et.quantidade,
                    u.nome_usuario,
                    et.data_recebimento_previsto,
                    et.status
                FROM envio_taloes et
                LEFT JOIN loja l ON et.cod_loja = l.cod_loja
                LEFT JOIN usuario u ON et.id_funcionario_recebimento = u.matricula
            `)
            res.status(200).json(result.rows);
        } catch (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query');
        }
    });
});

module.exports = manutencaoRouter;