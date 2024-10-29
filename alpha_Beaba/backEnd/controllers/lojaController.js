const {cadastrarLoja, getLojas} = require('../services/lojaService')

async function cadastrarLojaHandle(req, res){
    const { nomeLoja, endereco, telefoneLoja } = req.body

    try {
        await cadastrarLoja(nomeLoja, endereco, telefoneLoja)
        res.status(200).send('Loja cadastrada com sucesso')
    } catch (error) {
        console.error('Erro ao executar a query:', error.stack)
        res.status(500).send('Erro ao executar a query')
    }
}

async function getLojasHandler(req, res){
    try {
        const lojas = await getLojas()
        res.status(200).json(lojas)
    } catch (error) {
        console.error('Erro ao buscar as lojas:', error.stack)
        res.status(500).send('Erro ao buscar as lojas')
    }
}


module.exports = {
    cadastrarLojaHandle,
    getLojasHandler
}