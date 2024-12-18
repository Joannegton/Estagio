const {Router} = require('express')
const taloesController = require('../controllers/taloesController')

const taloesRouter = Router()

taloesRouter.get('/taloes', taloesController.getTaloes)
taloesRouter.get('/taloes/:cod_loja', taloesController.getTaloesPorLoja)
taloesRouter.get('/taloes/saida/:cod_loja', taloesController.getSaidasPorLoja)

taloesRouter.post('/taloes', taloesController.createTaloes)
taloesRouter.post('/taloes/saida', taloesController.createTalao)

taloesRouter.delete('/taloes/:numeroRemessa', taloesController.deleteTaloes)

taloesRouter.put('/taloes/:numeroRemessa', taloesController.updateTaloes)
taloesRouter.put('/taloes/:numeroRemessa/accept', taloesController.acceptTaloes)





module.exports = taloesRouter