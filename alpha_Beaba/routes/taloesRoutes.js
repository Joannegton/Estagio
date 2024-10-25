const {Router} = require('express');
const {conectarDb} = require('../config/conexao');

const taloesRouter = Router();

taloesRouter.post('/enviarTaloes', (req, res) => {
    const {lojaDestino, dataEnvio, quantidade, recebedor, dataRecebimentoPrevisto} = req.body;

    console.log(req.body);
    conectarDb(async client => {
        try {
            await client.query(`
                INSERT INTO envio_taloes (cod_loja, data_envio, quantidade, id_funcionario_recebimento, data_recebimento_previsto, status)
                VALUES ($1, $2, $3, $4, $5, $6)
            `, [lojaDestino, dataEnvio, quantidade, recebedor, dataRecebimentoPrevisto, 'Enviado']);
            res.status(200).send('Talões enviados com sucesso');
        } catch (err) {
            console.error('Erro ao executar a query:', err.stack);
            res.status(500).send('Erro ao executar a query');
        }
    })
})




taloesRouter.get('/manutencao', (req, res) => {
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

module.exports = taloesRouter;