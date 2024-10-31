const { Router } = require('express')
const usuarioController = require('../controllers/usuarioController')

const usuarioRouter = Router()

usuarioRouter.get('/usuarios', (req, res) => usuarioController.getUsers(req, res))
usuarioRouter.get('/usuarios/:matricula', (req, res) => usuarioController.getUserById(req, res))

usuarioRouter.post('/cadastrarUsuario', (req, res) => usuarioController.createUser(req, res))
usuarioRouter.put('/usuarios/:matricula', (req, res) => usuarioController.updateUser(req, res))
usuarioRouter.delete('/usuarios/:matricula', (req, res) => usuarioController.deleteUser(req, res))
module.exports = usuarioRouter