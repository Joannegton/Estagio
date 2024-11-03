const {Router} = require('express');
const taloesController = require('../controllers/taloesController');

const taloesRouter = Router();

taloesRouter.get('/taloes', taloesController.getTaloes)
taloesRouter.get('/taloes/:cod_loja', taloesController.getTaloesPorLoja)

taloesRouter.post('/enviarTaloes', taloesController.createTaloes)
taloesRouter.delete('/taloes/:numeroRemessa', taloesController.deleteTaloes)
taloesRouter.put('/taloes/:numeroRemessa', taloesController.updateTaloes)






module.exports = taloesRouter;