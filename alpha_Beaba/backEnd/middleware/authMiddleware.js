const jwt = require('jsonwebtoken')
const { conectarDb } = require('../config/conexao')
const SECRET_KEY = '6G>K9(Qk=^1iDx}N6FwAzZ^uwBJpyC'

function autenticadorToken(req, res, next) {
    const token = req.headers['authorization']
    if (!token) return res.sendStatus(401)

    jwt.verify(token, SECRET_KEY, async (err, user) => {
        if (err) return res.sendStatus(403)

        conectarDb(async client => {
            const result = await client.query('SELECT token FROM usuario WHERE matricula = $1', [user.matricula])
            if (result.rows.length > 0 && result.rows[0].token === token) {
                req.user = user
                next()
            } else {
                res.sendStatus(403)
            }
        })
    })
}

module.exports = autenticadorToken
