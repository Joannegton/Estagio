const { conectarDb } = require("../config/conexao")

class LojasService {
    async createLoja(nomeLoja, endereco, telefoneLoja) {
        const client = await conectarDb()
        try {
            await client.query('BEGIN')

            const result = await client.query(`
                INSERT INTO loja (nome_loja, endereco_loja, telefone)
                VALUES ($1, $2, $3) RETURNING cod_loja`, [nomeLoja, endereco, telefoneLoja])
            const codLoja = result.rows[0].cod_loja

            if (codLoja) {
                const estoqueResult = await client.query(`INSERT INTO estoque_taloes (cod_loja) VALUES ($1)`, [codLoja])
                if (estoqueResult.rowCount > 0) {
                    await client.query('COMMIT')
                    return true
                }  else{
                    await client.query('ROLLBACK')
                    return false
                }
            } else {
                await client.query('ROLLBACK')
                return false
            }
        } catch (error) {
            await client.query('ROLLBACK')
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
                ORDER BY loja.cod_loja
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
                    loja.gerente_id,
                    loja.estoque_minimo,
                    loja.caixas_fisicos,
                    loja.endereco_loja,
                    loja.telefone
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

    async updateLoja(codLoja, updates) {
        const client = await conectarDb()
        const campos = []
        const values = []
        let index = 1
    
        for (const [key, value] of Object.entries(updates)) {
            campos.push(`${key} = $${index}`)
            values.push(value)
            index++
    
            if (key === 'caixas_fisicos') {
                const qntCaixas = updates.caixas_fisicos * 50
                campos.push(`estoque_minimo = $${index}`)
                values.push(qntCaixas)
                index++
            }
        }
    
        const queryLoja = `UPDATE loja SET ${campos.join(', ')} WHERE cod_loja = $${index}`
        values.push(codLoja)
    
        try {
            await client.query('BEGIN') 
    
            if (updates.gerente_id) {  // Verificar gerente atual
                const { rows: currentGerente } = await client.query(
                    `SELECT gerente_id FROM loja WHERE cod_loja = $1`,
                    [codLoja]
                )
    
                const currentGerenteId = currentGerente[0]?.gerente_id
    
                if (currentGerenteId !== updates.gerente_id) {
                    await client.query(
                        `UPDATE usuario SET id_perfil_acesso = NULL WHERE matricula = $1`,
                        [currentGerenteId]
                    ) // Remove o cargo de gerente do usuário atual
    
                    
                    await client.query(
                        `UPDATE usuario SET id_perfil_acesso = (SELECT id_perfil_acesso FROM perfil_acesso WHERE descricao = 'Gerente') WHERE matricula = $1`,
                        [updates.gerente_id]
                    ) // Atualiza novo gerente na tabela usuario
    
                    await client.query(
                        `UPDATE loja SET gerente_id = $1 WHERE cod_loja = $2`,
                        [updates.gerente_id, codLoja]
                    ) // Atualiza gerente_id na loja

                }
            }
    
            const resultLoja = await client.query(queryLoja, values)
    
            await client.query('COMMIT')
            return resultLoja.rowCount > 0
        } catch (error) {
            await client.query('ROLLBACK')
            console.error('Erro ao executar a query:', error.stack)
            throw error
        } finally {
            client.release()
        }
    }
    

    async deleteLoja(codLoja) {
        const client = await conectarDb()
        try {
            const result = await client.query(`
                DELETE FROM loja WHERE cod_loja = $1`, 
                [codLoja]
            )
            return result.rowCount > 0
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            throw error
        } finally {
            client.release()
        }
    }

    
}

module.exports = new LojasService()