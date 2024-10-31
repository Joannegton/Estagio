const { conectarDb } = require("../config/conexao")

class LojasService {
    async createLoja(nomeLoja, endereco, telefoneLoja) {
        const client = await conectarDb()
        try {
            await client.query(`
                INSERT INTO loja (nome_loja, endereco_loja, telefone)
                VALUES ($1, $2, $3)
            `, [nomeLoja, endereco, telefoneLoja])
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            throw error
        } finally {
            client.release()
        }
    }

    async getLojas() {
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
                LEFT JOIN usuario ON loja.gerente_id = usuario.matricula
                LEFT JOIN estoque_taloes ON loja.cod_loja = estoque_taloes.cod_loja
            `)
            return result.rows
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            throw error
        } finally {
            client.release()
        }
    }

    async getLojaById(codLoja) {
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
                LEFT JOIN usuario ON loja.gerente_id = usuario.matricula
                WHERE loja.cod_loja = $1
            `, [codLoja])
            return result.rows[0]
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            throw error
        } finally {
            client.release()
        }
    }

    async updateLoja(codLoja, nomeLoja, endereco, telefoneLoja) {
        const client = await conectarDb()
        try {
            await client.query(`
                UPDATE loja
                SET nome_loja = $1, endereco_loja = $2, telefone = $3
                WHERE cod_loja = $4
            `, [nomeLoja, endereco, telefoneLoja, codLoja])
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            throw error
        } finally {
            client.release()
        }
    }

    async deleteLoja(codLoja) {
        const client = await conectarDb()
        try {
            await client.query(`
                DELETE FROM loja
                WHERE cod_loja = $1
            `, [codLoja])
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            throw error
        } finally {
            client.release()
        }
    }

    
}

module.exports = new LojasService()