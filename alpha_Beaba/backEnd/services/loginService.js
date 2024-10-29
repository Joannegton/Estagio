const { conectarDb } = require('../config/conexao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET_KEY = '6G>K9(Qk=^1iDx}N6FwAzZ^uwBJpyC'; // secret key para assinar o token JWT

async function login(matricula, senha) {
    const client = await conectarDb();
    try {
        const result = await client.query('SELECT * FROM usuario WHERE matricula = $1', [matricula]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const isPasswordValid = await bcrypt.compare(senha, user.senha);
            if (isPasswordValid) {
                const token = jwt.sign({ matricula: user.matricula, tipoUsuario: user.id_perfil_acesso }, SECRET_KEY, { expiresIn: '1h' });
                await client.query('UPDATE usuario SET token = $1 WHERE matricula = $2', [token, matricula]);
                return { token, user };
            }
        }
        throw new Error('Matricula ou senha inválidos');
    } catch (err) {
        console.error('Erro ao realizar login:', err.stack);
        throw err;
    } finally {
        client.release();
    }
}

module.exports = login;