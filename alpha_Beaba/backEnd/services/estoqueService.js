const {conectarDb} = require('../config/conexao')

async function getEstoque() {
    const client = await conectarDb()
    try {
        const result = await client.query(`
            SELECT 
                l.cod_loja,
                l.nome_loja,
                et.quantidade_recomendada,
                l.estoque_minimo,
                et.quantidade_disponivel
            FROM loja l
            JOIN estoque_taloes et ON l.cod_loja = et.cod_loja
        `)
        return result.rows
    } catch (error) {
        console.error('Erro ao executar a query:', error.stack)
        throw error
    } finally {
        client.release()
    }
}

module.exports = getEstoque