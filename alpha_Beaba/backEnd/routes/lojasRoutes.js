const lojaController = require('../controllers/lojaController')
const { Router } = require('express')

const lojasRouter = Router()
 
lojasRouter.get('/loja', lojaController.getLojas)
lojasRouter.get('/loja/:codLoja', lojaController.getLojaById)

lojasRouter.post('/loja', lojaController.createLoja)
lojasRouter.delete('/loja/:codLoja', lojaController.deleteLoja)
lojasRouter.put('/loja/:codLoja', lojaController.updateLoja)



module.exports = lojasRouter