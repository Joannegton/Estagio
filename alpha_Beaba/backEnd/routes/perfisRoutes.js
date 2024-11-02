const { Router } = require('express')
const PerfisController = require('../controllers/perfisController')

const perfisRouter = Router()

perfisRouter.get('/perfis', PerfisController.getPerfis)
perfisRouter.get('/perfis/:id', PerfisController.getPerfilById)

perfisRouter.post('/perfis', PerfisController.createPerfil)
perfisRouter.put('/perfis/:id', PerfisController.updatePerfil)
perfisRouter.delete('/perfis/:id', PerfisController.deletePerfil)

module.exports = perfisRouter