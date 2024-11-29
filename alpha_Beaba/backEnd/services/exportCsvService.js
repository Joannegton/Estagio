const axios = require('axios')

class exportCsvService {
    async exportCsv(dados, nomeArquivo) {
        try {
            const response = await axios.post('http://localhost:5000/exportarExcel', {
                dados,
                nomeArquivo
            }, {
                responseType: 'arraybuffer'
            });

            return response.data;
        } catch (error) {
            console.error('Erro ao exportar dados:', error);
            throw new Error('Erro ao exportar dados');
        }
    }
}

module.exports = new exportCsvService()