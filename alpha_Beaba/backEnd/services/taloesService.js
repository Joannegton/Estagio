const { conectarDb } = require("../config/conexao");

async function getTaloes() {
    const client = await conectarDb()

    try {
        const result = await client.query(`
            SELECT 
                et.numero_remessa,
                et.data_envio,
                l.nome_loja,
                et.quantidade,
                u.nome_usuario,
                et.data_recebimento_previsto,
                et.status
            FROM envio_taloes et
            LEFT JOIN loja l ON et.cod_loja = l.cod_loja
            LEFT JOIN usuario u ON et.id_funcionario_recebimento = u.matricula
        `)
        return result.rows
    } catch (error) {
        console.error('Erro ao executar a query:', error.stack)
        throw error
    }
}

module.exports = getTaloes