const { conectarDb } = require("../config/conexao");

async function getPerfis() {
    const client = await conectarDb()
    try {
        const result = await client.query(`
            SELECT
                u.id_perfil_acesso,
                u.descricao AS perfil_descricao,
                COALESCE(array_agg(DISTINCT p_leitura.modulo) FILTER (WHERE p_leitura.modulo IS NOT NULL), '{}') AS permissoes_leitura,
                COALESCE(array_agg(DISTINCT p_escrita.modulo) FILTER (WHERE p_escrita.modulo IS NOT NULL), '{}') AS permissoes_escrita
            FROM perfil_acesso u
            LEFT JOIN perfil_acesso_permissoes pp_leitura ON u.id_perfil_acesso = pp_leitura.id_perfil_acesso
            LEFT JOIN permissoes p_leitura ON pp_leitura.id_permissao = p_leitura.id_permissao AND p_leitura.tipo_permissao = 'leitura'
            LEFT JOIN perfil_acesso_permissoes pp_escrita ON u.id_perfil_acesso = pp_escrita.id_perfil_acesso
            LEFT JOIN permissoes p_escrita ON pp_escrita.id_permissao = p_escrita.id_permissao AND p_escrita.tipo_permissao = 'escrita'
            GROUP BY u.id_perfil_acesso, u.descricao` //array_agg(p_leitura.descricao): Agrupa as permissões do tipo "leitura" em uma lista.
        )
        return result.rows
    } catch (error) {
        console.error('Erro ao executar a query:', error.stack)
        throw error
    } finally {
        client.release()
    }
}

module.exports = getPerfis