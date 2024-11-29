const exportCsvService = require("../services/exportCsvService")

class exportCsvController {
    async exportCsv(req, res) {
        const { dados, nomeArquivo } = req.body

        try {
            const fileData = await exportCsvService.exportCsv(dados, nomeArquivo)

            res.setHeader('Content-Disposition', `attachment; filename=${nomeArquivo}.xlsx`)
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            res.send(fileData)
        } catch (error) {
            res.status(500).send('Erro ao exportar dados')
        }
    }
}

module.exports = new exportCsvController()