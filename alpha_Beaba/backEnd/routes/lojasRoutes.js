const lojaController = require('../controllers/lojaController')
const { Router } = require('express')

const lojasRouter = Router()

lojasRouter.get('/lojas', lojaController.getLojas)
lojasRouter.get('/loja/:codLoja', lojaController.getLojaById)

lojasRouter.post('/cadastrarLoja', lojaController.createLoja)
lojasRouter.delete('/deletarLoja/:codLoja', lojaController.deleteLoja)
lojasRouter.put('/atualizarLoja/:codLoja', lojaController.updateLoja)



module.exports = lojasRouter