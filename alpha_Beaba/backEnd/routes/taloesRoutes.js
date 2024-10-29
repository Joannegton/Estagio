const {Router} = require('express');
const {conectarDb} = require('../config/conexao');
const getTaloesHandler = require('../controllers/taloesController');

const taloesRouter = Router();

taloesRouter.get('/taloes', getTaloesHandler)

taloesRouter.post('/enviarTaloes', (req, res) => {
    const {lojaDestino, dataEnvio, quantidade, recebedor, dataRecebimentoPrevisto} = req.body;

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





module.exports = taloesRouter;