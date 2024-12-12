const jwt = require('jsonwebtoken')
const { conectarDb } = require('../config/conexao')

   
function authToken(req, res, next) {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: 'Formato de token inválido' })
    }

    jwt.verify(token, process.env.SECRET_KEY_JWT, async (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido ou expirado' })
        } 

        const client = await conectarDb()
        try {
            const result = await client.query('SELECT token, id_perfil_acesso FROM usuario WHERE matricula = $1', [user.matricula])
            if (result.rows.length > 0 && result.rows[0].token === token) {
                req.user = user
                req.user.id_perfil_acesso = result.rows[0].id_perfil_acesso

                const permissoesResult = await client.query(`
                    SELECT p.modulo, p.tipo_permissao
                    FROM perfil_acesso_permissoes pap
                    JOIN permissoes p ON pap.id_permissao = p.id_permissao
                    WHERE pap.id_perfil_acesso = $1
                `, [req.user.id_perfil_acesso])
                
                //organiza as permissões em um objeto e adiciona na requisição
                req.user.permissoes = permissoesResult.rows.reduce((acc, row) => {
                    if (!acc[row.modulo]) {
                        acc[row.modulo] = []
                    }
                    acc[row.modulo].push(row.tipo_permissao)
                    return acc
                }, {})
                next()
            } else {
                res.status(403).json({ message: 'Token não corresponde ao usuário' })
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao conectar ao banco de dados' })
        } finally {
            client.release()
        }
    })
}
    

module.exports = authToken