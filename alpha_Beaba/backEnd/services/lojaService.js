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
                    loja.estoque_minimo
                FROM loja
                LEFT JOIN usuario_loja ON loja.cod_loja = usuario_loja.cod_loja AND usuario_loja.is_gerente = true
                LEFT JOIN usuario ON usuario_loja.usuario_matricula = usuario.matricula
                LEFT JOIN estoque_taloes ON loja.cod_loja = estoque_taloes.cod_loja
                ORDER BY loja.cod_loja;
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
                    usuario_loja.usuario_matricula AS "gerente_id",
                    loja.estoque_minimo,
                    loja.endereco_loja,
                    loja.telefone
                FROM loja
                LEFT JOIN usuario_loja ON loja.cod_loja = usuario_loja.cod_loja AND usuario_loja.is_gerente = true
                LEFT JOIN usuario ON usuario_loja.usuario_matricula = usuario.matricula
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
        }
    
        const queryLoja = `UPDATE loja SET ${campos.join(', ')} WHERE cod_loja = $${index}`
        values.push(codLoja)
    
        try {
            await client.query('BEGIN')
    
            if (updates.gerente_id) {  // Verificar gerente atual
                const { rows: currentGerente } = await client.query(
                    `SELECT usuario_matricula FROM usuario_loja WHERE cod_loja = $1 AND is_gerente = true`,
                    [codLoja]
                )
    
                const currentGerenteId = currentGerente[0]?.usuario_matricula
    
                if (currentGerenteId !== updates.gerente_id) {
                    if (currentGerenteId) {
                        await client.query(
                            `UPDATE usuario_loja SET is_gerente = false WHERE usuario_matricula = $1 AND cod_loja = $2`,
                            [currentGerenteId, codLoja]
                        ) // Remove o cargo de gerente do usuário atual
                    }
    
                    await client.query(
                        `UPDATE usuario_loja SET is_gerente = true WHERE usuario_matricula = $1 AND cod_loja = $2`,
                        [updates.gerente_id, codLoja]
                    ) // Define o novo gerente na tabela usuario_loja
    
                    // Se o novo gerente não estiver na tabela usuario_loja, insere um novo registro
                    const { rowCount } = await client.query(
                        `UPDATE usuario_loja SET is_gerente = true WHERE usuario_matricula = $1 AND cod_loja = $2`,
                        [updates.gerente_id, codLoja]
                    )
    
                    if (rowCount === 0) {
                        await client.query(
                            `INSERT INTO usuario_loja (usuario_matricula, cod_loja, is_gerente) VALUES ($1, $2, true)`,
                            [updates.gerente_id, codLoja]
                        )
                    }
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