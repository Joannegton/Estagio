const {Router} = require('express');
const taloesController = require('../controllers/taloesController');

const taloesRouter = Router();

taloesRouter.get('/taloes', taloesController.getTaloes)
taloesRouter.get('/taloesPorLoja', taloesController.getTaloesPorLoja)

taloesRouter.post('/enviarTaloes', taloesController.createTaloes)
taloesRouter.delete('/deletarTaloes', taloesController.deleteTaloes)
taloesRouter.put('/atualizarTaloes', taloesController.updateTaloes)






module.exports = taloesRouter;