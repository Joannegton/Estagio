const { conectarDb } = require('../config/conexao');
const bcrypt = require('bcrypt');

class UsuarioService {
    async getUsers() {
        const client = await conectarDb();
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
            `);
            return result.rows;
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack);
            throw error;
        } finally {
            client.release();
        }
    }

    async createUser(matricula, nome, tipoUsuario, loja) {
        const client = await conectarDb();
        const senha = await bcrypt.hash('Quero@2024#', 10);
        try {
            const result = await client.query(
                'INSERT INTO usuario (matricula, nome_usuario, senha, cod_loja, id_perfil_acesso) VALUES ($1, $2, $3, $4, $5)',
                [matricula, nome, senha, loja, tipoUsuario]
            );
            return result;
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack);
            throw error;
        } finally {
            client.release();
        }
    }

    async getUserById(matricula) {
        const client = await conectarDb();
        try {
            const result = await client.query(
                'SELECT * FROM usuario WHERE matricula = $1',
                [matricula]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack);
            throw error;
        } finally {
            client.release();
        }
    }

    async updateUser(matricula, tipoUsuario, loja) {
        const client = await conectarDb();
        try {
            const result = await client.query(
                'UPDATE usuario SET id_perfil_acesso = $1, cod_loja = $2 WHERE matricula = $3',
                [tipoUsuario, loja, matricula]
            );
            return result;
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack);
            throw error;
        } finally {
            client.release();
        }
    }

    async deleteUser(matricula) {
        const client = await conectarDb();
        try {
            const result = await client.query(
                'DELETE FROM usuario WHERE matricula = $1',
                [matricula]
            );
            return result;
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack);
            throw error;
        } finally {
            client.release();
        }
    }

    


}

module.exports = new UsuarioService();