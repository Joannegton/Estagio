const { Router } = require('express')
const usuarioController = require('../controllers/usuarioController')

const usuarioRouter = Router()

usuarioRouter.get('/usuarios', usuarioController.getUsers)
usuarioRouter.get('/usuarios/:matricula', usuarioController.getUserById)
usuarioRouter.get('/usuarios/loja/:cod_loja', usuarioController.getUsersByCod_loja)

usuarioRouter.post('/usuarios', usuarioController.createUser)

usuarioRouter.put('/usuarios/:matricula', usuarioController.updateUser)
usuarioRouter.put('/usuarios/:matricula/senha', usuarioController.updatePassword)

usuarioRouter.delete('/usuarios/:matricula', usuarioController.deleteUser)

module.exports = usuarioRouter