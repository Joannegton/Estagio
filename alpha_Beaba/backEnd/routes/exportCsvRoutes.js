const {Router} = require('express')
const exportCsvController = require('../controllers/exportCsvController')

const exportCsvRouter = Router()

exportCsvRouter.post('/exportarExcel', exportCsvController.exportCsv)

module.exports = exportCsvRouter