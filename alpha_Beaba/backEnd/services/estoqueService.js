const {conectarDb} = require('../config/conexao')

class EstoqueService {
    async getEstoque() {
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
                ORDER BY quantidade_disponivel 
            `)
            return result.rows
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            throw error
        } finally {
            client.release()
        }
    }

    async getEstoqueByLoja(codLoja) {
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
                WHERE l.cod_loja = $1
            `, [codLoja])
            return result.rows
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            throw error
        } finally {
            client.release()
        }
    }

    async updateEstoqueByLoja(codLoja, updates){
        const client = await conectarDb()
        const campos = []
        const valores = []
        let index = 1

        for(const [key, value] of Object.entries(updates)){
            campos.push(`${key} = $${index}`)
            valores.push(value) 
            index++
        }

        const query = `UPDATE estoque_taloes SET ${campos.join(', ')} WHERE cod_loja = ${index}`
        valores.push(codLoja)
        try {
            const result = await client.query(query, valores)
            return result.rowCount > 0
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            throw error
        } finally {
            client.release()
        }
    }
}

module.exports = new EstoqueService()