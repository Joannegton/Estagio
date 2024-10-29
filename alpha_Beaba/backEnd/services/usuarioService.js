const { conectarDb } = require("../config/conexao");

async function getUsuarios() {
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
        `)
        return result.rows
    } catch (error) {
        console.error('Erro ao executar a query:', error.stack)
        throw error
    } finally {
        client.release()
    }
}

module.exports = getUsuarios