const { conectarDb } = require("../config/conexao")

class PerfisService {
    async createPerfil(nomePerfil, permissoes) {
        const client = await conectarDb()
        try {
            await client.query('BEGIN')
            const result = await client.query('INSERT INTO perfil_acesso (descricao) VALUES ($1) RETURNING id_perfil_acesso', [nomePerfil])
            const idPerfilAcesso = result.rows[0].id_perfil_acesso

            for (const permissao of permissoes) {
                const [tipoPermissao, descricaoPermissao] = permissao.split('_')
                const resultPermissao = await client.query(
                    'SELECT id_permissao FROM permissoes WHERE modulo = $1 AND tipo_permissao ILIKE $2',
                    [descricaoPermissao, `%${tipoPermissao}%`]
                )
                const idPermissao = resultPermissao.rows[0].id_permissao
                await client.query('INSERT INTO perfil_acesso_permissoes (id_perfil_acesso, id_permissao) VALUES ($1, $2)', [idPerfilAcesso, idPermissao])
            }

            await client.query('COMMIT')
            return 'Perfil cadastrado com sucesso!'
        } catch (error) {
            await client.query('ROLLBACK')
            console.error('Erro ao cadastrar perfil:', error.stack)
            throw error
        } finally {
            client.release()
        }
    }

    async getPerfis() {
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

    async getPerfilById(id) {
        const client = await conectarDb()
        try {
            const result = await client.query('SELECT * FROM perfil_acesso WHERE id = $1', [id])
            return result.rows[0]
        } catch (error) {
            console.error('Erro ao buscar perfil:', error.stack)
            throw error
        } finally {
            client.release()
        }
    }

    async updatePerfil(id, nomePerfil, permissoes) {
        const client = await conectarDb()
        try {
            await client.query('BEGIN')
            await client.query('UPDATE perfil_acesso SET descricao = $1 WHERE id_perfil_acesso = $2', [nomePerfil, id])
            await client.query('DELETE FROM perfil_acesso_permissoes WHERE id_perfil_acesso = $1', [id])

            for (const permissao of permissoes) {
                const [tipoPermissao, descricaoPermissao] = permissao.split('_')
                const resultPermissao = await client.query(
                    'SELECT id_permissao FROM permissoes WHERE modulo = $1 AND tipo_permissao ILIKE $2',
                    [descricaoPermissao, `%${tipoPermissao}%`]
                )
                const idPermissao = resultPermissao.rows[0].id_permissao
                await client.query('INSERT INTO perfil_acesso_permissoes (id_perfil_acesso, id_permissao) VALUES ($1, $2)', [id, idPermissao])
            }

            await client.query('COMMIT')
            return 'Perfil atualizado com sucesso!'
        } catch (error) {
            await client.query('ROLLBACK')
            console.error('Erro ao atualizar perfil:', error.stack)
            throw error
        } finally {
            client.release()
        }
    }

    async deletePerfil(id) {
        const client = await conectarDb()
        try {
            await client.query('DELETE FROM perfil_acesso_permissoes WHERE id_perfil_acesso = $1', [id])
            await client.query('DELETE FROM perfil_acesso WHERE id_perfil_acesso = $1', [id])
            return 'Perfil deletado com sucesso!'
        } catch (error) {
            console.error('Erro ao deletar perfil:', error.stack)
            throw error
        } finally {
            client.release()
        }
    }

    
}

module.exports = new PerfisService()