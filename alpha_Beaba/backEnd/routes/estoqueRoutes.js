const estoqueController = require('../controllers/estoqueController')
const {Router} = require('express')

const estoqueRouter = Router()

estoqueRouter.get('/estoque', estoqueController.getEstoque)
estoqueRouter.get('/estoque/:codLoja', estoqueController.getEstoqueByLoja)

module.exports = estoqueRouter
