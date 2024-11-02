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
                    l.nome_loja 
                FROM usuario
                JOIN perfil_acesso p ON usuario.id_perfil_acesso = p.id_perfil_acesso
                LEFT JOIN loja l ON usuario.cod_loja = l.cod_loja
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
    
    async createUser(matricula, nome, tipoUsuario, loja) {
        const client = await conectarDb()
        const senha = await bcrypt.hash('Quero@2024#', 10)
        try {
            await client.query('BEGIN')

            const result = await client.query(
                'INSERT INTO usuario (matricula, nome_usuario, senha, cod_loja, id_perfil_acesso) VALUES ($1, $2, $3, $4, $5)',
                [matricula, nome, senha, loja, tipoUsuario]
            )
            if (result.rowCount > 0 && loja) {
                const updateResult = await client.query(
                    'UPDATE loja SET gerente_id = $1 WHERE cod_loja = $2',
                    [matricula, loja]
                );
        
                if (updateResult.rowCount > 0) {
                    await client.query('COMMIT');
                    return true;
                } else {
                    await client.query('ROLLBACK');
                    return false;
                }
            } else if (result.rowCount > 0) {
                await client.query('COMMIT');
                return true;
            } else {
                await client.query('ROLLBACK');
                return false;
            }
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Erro ao criar usuário e atualizar loja: ', error);
            return false;
        } finally {
            client.release();
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