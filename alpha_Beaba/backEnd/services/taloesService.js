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

    async createTaloes( lojaDestino, dataEnvio, quantidade, recebedor, dataRecebimentoPrevisto ) {
        const client = await conectarDb()

        try {
            client.query(`
                INSERT INTO envio_taloes (cod_loja, data_envio, quantidade, id_funcionario_recebimento, data_recebimento_previsto, status)
                VALUES ($1, $2, $3, $4, $5, $6)
            `, [lojaDestino, dataEnvio, quantidade, recebedor, dataRecebimentoPrevisto, 'Enviado'])
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            throw error
        } finally {
            client.release()
        }
    }

    async updateTaloes( numeroRemessa, dataRecebimento, status ) {
        const client = await conectarDb()

        try {
            client.query(`
                UPDATE envio_taloes
                SET data_recebimento_previsto = $1, status = $2
                WHERE numero_remessa = $3
            `, [dataRecebimento, status, numeroRemessa])

        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            throw error
        } finally {
            client.release()
        }
    }

    async deleteTaloes( numeroRemessa ) {
        const client = await conectarDb()

        try {
            client.query(`
                DELETE FROM envio_taloes
                WHERE numero_remessa = $1
            `, [numeroRemessa])

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
}

module.exports = new TaloesService()