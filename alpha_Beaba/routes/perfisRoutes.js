const { Router } = require('express')
const { conectarDb } = require('../config/conexao')

const perfisRouter = Router()

perfisRouter.get('/perfis', (req, res) => {
    conectarDb(async client => {
        try {
            const result = await client.query(`
                SELECT
                    u.id_perfil_acesso,
                    u.descricao AS perfil_descricao,
                    COALESCE(array_agg(DISTINCT p_leitura.descricao) FILTER (WHERE p_leitura.descricao IS NOT NULL), '{}') AS permissoes_leitura,
                    COALESCE(array_agg(DISTINCT p_escrita.descricao) FILTER (WHERE p_escrita.descricao IS NOT NULL), '{}') AS permissoes_escrita
                FROM perfil_acesso u
                LEFT JOIN perfil_acesso_permissoes pp_leitura ON u.id_perfil_acesso = pp_leitura.id_perfil_acesso
                LEFT JOIN permissoes p_leitura ON pp_leitura.id_permissao = p_leitura.id_permissao AND p_leitura.tipo_permissao = 'leitura'
                LEFT JOIN perfil_acesso_permissoes pp_escrita ON u.id_perfil_acesso = pp_escrita.id_perfil_acesso
                LEFT JOIN permissoes p_escrita ON pp_escrita.id_permissao = p_escrita.id_permissao AND p_escrita.tipo_permissao = 'escrita'
                GROUP BY u.id_perfil_acesso, u.descricao
            `) //array_agg(p_leitura.descricao): Agrupa as permissões do tipo "leitura" em uma lista.
            res.status(200).json(result.rows)
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            res.status(500).send('Erro ao executar a query')
        }
    })
})

perfisRouter.get('/perfil/:id', (req, res) => {
    const id = req.params.id
    conectarDb(async client => {
        try {
            const result = await client.query('SELECT * FROM perfil_acesso WHERE id = $1', [id])
            res.status(200).json(result.rows)
        } catch (error) {
            console.error('Erro ao executar a query:', error.stack)
            res.status(500).send('Erro ao executar a query')
        }
    })
})

exports.perfisRouter = perfisRouter