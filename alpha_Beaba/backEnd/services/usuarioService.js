const { conectarDb } = require('../config/conexao')
const bcrypt = require('bcrypt')
 
class UsuarioService {
    async getUsers() {
        const client = await conectarDb()
        try {
            const result = await client.query(`
                SELECT 
                    usuario.matricula, 
                    usuario.nome_usuario, 
                    p.descricao AS tipo_usuario, 
                    l.nome_loja,
                    usuario.workplace
                FROM usuario
                JOIN perfil_acesso p ON usuario.id_perfil_acesso = p.id_perfil_acesso
                LEFT JOIN usuario_loja ul ON usuario.matricula = ul.usuario_matricula
                LEFT JOIN loja l ON ul.cod_loja = l.cod_loja
                ORDER BY usuario.nome_usuario ASC
            `)
            return result.rows
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            throw error
        } finally {
            client.release()
        }
    }

    async getUserById(matricula) {
        const client = await conectarDb()
        
        try {
            const result = await client.query(
                'SELECT * FROM usuario WHERE matricula = $1',
                [matricula]
            )
            return result.rows[0]
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            throw error
        } finally {
            client.release()
        }
    }

    async getUsersByCod_loja(cod_loja){
        const client = await conectarDb()
        try {
            const result = await client.query(`
                SELECT usuario.matricula, usuario.nome_usuario 
                FROM usuario
                JOIN usuario_loja ul ON usuario.matricula = ul.usuario_matricula
                WHERE ul.cod_loja = $1
            `, [cod_loja])
            return result.rows
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            throw error
        } finally {
            client.release()
        }
    }
    
    async createUser(matricula, nome, tipoUsuario, loja) {
        const client = await conectarDb()
        const senha = await bcrypt.hash('Quero@2024#', 10)
        
        try {
            await client.query('BEGIN')
    
            const result = await client.query(
                'INSERT INTO usuario (matricula, nome_usuario, senha, id_perfil_acesso) VALUES ($1, $2, $3, $4)',
                [matricula, nome, senha, tipoUsuario]
            )
    
            if (result.rowCount > 0) {
                let isGerente = false
                if (tipoUsuario == 2) { // verifica se é gerente
                    isGerente = true
                }
    
                const { rowCount } = await client.query(
                    'INSERT INTO usuario_loja (usuario_matricula, cod_loja, is_gerente) VALUES ($1, $2, $3)',
                    [matricula, loja, isGerente]
                )
    
                if (rowCount > 0) {
                    await client.query('COMMIT')
                    return true
                } else {
                    await client.query('ROLLBACK')
                    return false
                }
            } else {
                await client.query('ROLLBACK')
                return false
            }
        } catch (error) {
            await client.query('ROLLBACK')
            console.error('Erro ao executar a query: ', error)
            throw error
        } finally {
            client.release()
        }
    }

    async updateUser(matricula, updates) {
        const client = await conectarDb()
        const fields = [] 
        const values = []
        let index = 1
    
        //observar no front: as key tem que ser igual ao nome do campo no banco
        for (const [key, value] of Object.entries(updates)) {
            fields.push(`${key} = $${index}`)  // nome = $1, tipoUsuario = $2
            values.push(value)
            index++
        }
    
        const query = `UPDATE usuario SET ${fields.join(', ')} WHERE matricula = $${index}`
        values.push(matricula)
    
        try {
            const result = await client.query(query, values)
            return result.rowCount > 0
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            throw error
        } finally {
            client.release()
        }
    }

    async updatePassword(matricula, senhaAtual, novaSenha) {
        const client = await conectarDb()
        try {
            await client.query('BEGIN')
            const result = await client.query(
                'SELECT senha FROM usuario WHERE matricula = $1',
                [matricula]
            )
            if (result.rows.length === 0) {
                return false
            }
            const senha = result.rows[0].senha
            const match = await bcrypt.compare(senhaAtual, senha)
            if (!match) {
                return false
            }
            const novaSenhaHash = await bcrypt.hash(novaSenha, 10)
            const updateResult = await client.query(
                'UPDATE usuario SET senha = $1 WHERE matricula = $2',
                [novaSenhaHash, matricula]
            )
            if (updateResult.rowCount > 0) {
                await client.query('COMMIT')
                return true
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

    async deleteUser(matricula) {
        const client = await conectarDb()
        try {
            const result = await client.query(
                'DELETE FROM usuario WHERE matricula = $1',
                [matricula]
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

module.exports = new UsuarioService()