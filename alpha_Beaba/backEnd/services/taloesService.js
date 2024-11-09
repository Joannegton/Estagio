const { conectarDb } = require("../config/conexao")

class TaloesService {
    async getTaloes() {
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
        } finally {
            client.release()
        }
    }

    async getTaloesPorLoja( codLoja ) {
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
                WHERE et.cod_loja = $1
            `, [codLoja])

            return result.rows
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            throw error
        } finally {
            client.release()
        }
    }

    async getSaidasPorLoja( codLoja ) {
        const client = await conectarDb()

        try {
            const result = await client.query(`
                SELECT id_saida_talao, 
                        codigo_talao, 
                        data_saida,
                        s.matricula,
                        u.nome_usuario
                FROM saida_taloes s
                JOIN usuario u ON u.matricula = s.matricula
                WHERE s.cod_loja = $1
                ORDER BY data_saida DESC
            `, [codLoja])

            return result.rows
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            throw error
        } finally {
            client.release()
        }
    }

    async createTalao(numeroTalao, matricula){
        const client = await conectarDb()
        try {
            const result = await client.query(`INSERT INTO saida_taloes (codigo_talao, matricula) VALUES ($1, $2)`, [numeroTalao, matricula])
            return result.rowCount > 0
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            throw error
        } finally {
            client.release()
        }
    }

    async createTaloes( lojaDestino, dataEnvio, quantidade, recebedor, dataRecebimentoPrevisto ) {
        const client = await conectarDb()

        try {
            const result = await client.query(`
                INSERT INTO envio_taloes (cod_loja, data_envio, quantidade, id_funcionario_recebimento, data_recebimento_previsto, status)
                VALUES ($1, $2, $3, $4, $5, $6)
            `, [lojaDestino, dataEnvio, quantidade, recebedor, dataRecebimentoPrevisto, 'Enviado'])
            return result.rowCount > 0
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            throw error
        } finally {
            client.release()
        }
    }

    async updateTaloes( numeroRemessa, updates ) {
        const client = await conectarDb()
        const campos = []
        const valores = []
        let indice = 1

        for (const [key, value] of Object.entries(updates)) {
            campos.push(`${key} = $${indice}`)
            valores.push(value)
            indice++
        }

        const query = `UPDATE envio_taloes SET ${campos.join(', ')} WHERE numero_remessa = $${indice}`
        valores.push(numeroRemessa)

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

    async acceptRemessa(numeroRemessa) {
        const client = await conectarDb()
        try {
            await client.query('BEGIN')
    
            // Atualiza o status da remessa e retorna a quantidade e o código da loja
            const result = await client.query(`
                UPDATE envio_taloes 
                SET status = 'Recebido' 
                WHERE numero_remessa = $1 
                RETURNING quantidade, cod_loja
            `, [numeroRemessa])
    
            if (result.rowCount > 0) {
                const { quantidade, cod_loja } = result.rows[0]
    
                // Obtém a quantidade atual do estoque
                const estoqueResult = await client.query(`
                    SELECT quantidade_disponivel 
                    FROM estoque_taloes 
                    WHERE cod_loja = $1
                `, [cod_loja])
    
                if (estoqueResult.rowCount > 0) {
                    const quantidadeAtual = estoqueResult.rows[0].quantidade_disponivel
                    const novaQuantidade = quantidadeAtual + quantidade
    
                    // Atualiza a quantidade disponível no estoque
                    const acceptUpdate = await client.query(`
                        UPDATE estoque_taloes 
                        SET quantidade_disponivel = $1 
                        WHERE cod_loja = $2
                    `, [novaQuantidade, cod_loja])
    
                    if (acceptUpdate.rowCount > 0) {
                        await client.query('COMMIT') // Mudança: COMMIT movido para dentro do bloco if
                        return true
                    }
                }
            }
            await client.query('ROLLBACK') 
            return false
        } catch (error) {
            await client.query('ROLLBACK') 
            console.error('Erro ao executar query', error.stack)
            throw error
        } finally {
            client.release()
        }
    }

    async deleteTaloes( numeroRemessa ) {
        const client = await conectarDb()

        try {
            const result= await client.query(`
                DELETE FROM envio_taloes
                WHERE numero_remessa = $1
            `, [numeroRemessa])

            return result.rowCount > 0
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            throw error
        } finally {
            client.release()
        }
    }
}

module.exports = new TaloesService()