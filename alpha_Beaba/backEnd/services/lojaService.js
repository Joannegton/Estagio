const {conectarDb} = require('../config/conexao')

async function cadastrarLoja(nomeLoja, endereco, telefoneLoja){
    return conectarDb(async client => {
        await client.query(`
            INSERT INTO loja (nome_loja, endereco_loja, telefone)
            VALUES ($1, $2, $3)`, 
            [nomeLoja, endereco, telefoneLoja]
        )
    })
}

async function getLojas(){
    const client = await conectarDb()
    try {
        const result = await client.query(`
            SELECT 
                loja.cod_loja, 
                loja.nome_loja, 
                usuario.nome_usuario AS "gerente", 
                loja.estoque_minimo,
                loja.caixas_fisicos
            FROM loja
            LEFT JOIN 
                usuario ON loja.gerente_id = usuario.matricula
            LEFT JOIN 
                estoque_taloes ON loja.cod_loja = estoque_taloes.cod_loja
        `)
        return result.rows
    } catch (error) {
        console.error('Erro ao executar a query:', error.stack)
        throw error
    } finally {
        client.release()
    }
}



module.exports = {
    cadastrarLoja,
    getLojas
}