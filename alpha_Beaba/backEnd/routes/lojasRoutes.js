const {cadastrarLojaHandle, getLojasHandler} = require('../controllers/lojaController')
const { Router } = require('express')

const lojasRouter = Router()

lojasRouter.post('/cadastrarLoja', cadastrarLojaHandle)

lojasRouter.get('/lojas', getLojasHandler)

module.exports = lojasRouter