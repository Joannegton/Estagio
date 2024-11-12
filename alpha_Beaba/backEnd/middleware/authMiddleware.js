const jwt = require('jsonwebtoken');
const { conectarDb } = require('../config/conexao');

function autenticadorToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Formato de token inválido' });
    }

    jwt.verify(token, process.env.SECRET_KEY_JWK, async (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido ou expirado' });
        }

        conectarDb(async client => {
            try {
                const result = await client.query('SELECT token FROM usuario WHERE matricula = $1', [user.matricula]);
                if (result.rows.length > 0 && result.rows[0].token === token) {
                    req.user = user;
                    next();
                } else {
                    res.status(403).json({ error: 'Token não corresponde ao usuário' });
                }
            } catch (dbError) {
                res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });
            }
        });
    });
}

module.exports = autenticadorToken;