const { Router } = require('express')
const PerfisController = require('../controllers/perfisController')

const perfisRouter = Router()

perfisRouter.get('/perfis', PerfisController.getPerfis)
perfisRouter.get('/perfil/:id', PerfisController.getPerfilById)

perfisRouter.post('/cadastrarPerfil', PerfisController.createPerfil)
perfisRouter.put('/editarPerfil/:id', PerfisController.updatePerfil)
perfisRouter.delete('/deletarPerfil/:id', PerfisController.deletePerfil)
module.exports = perfisRouter