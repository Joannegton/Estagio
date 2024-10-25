const { Router } = require('express')
const { conectarDb } = require('../config/conexao')

const perfisRouter = Router()

perfisRouter.post('/cadastrarPerfil', (req, res) => {
    const { nomePerfil, permissoes } = req.body
    console.log('data:', nomePerfil, permissoes)
    conectarDb(async client => {
        try {
            await client.query('BEGIN') // Inicia uma transação no banco de dados
            const result = await client.query('INSERT INTO perfil_acesso (descricao) VALUES ($1) RETURNING id_perfil_acesso', [nomePerfil]) // returning id_perfil_acesso: Retorna o id do perfil cadastrado

            const idPerfilAcesso = result.rows[0].id_perfil_acesso

            for (const permissao of permissoes){
                const [tipoPermissao, descricaoPermissao] = permissao.split('_')
                const resultPermissao = await client.query(
                    'SELECT id_permissao FROM permissoes WHERE modulo = $1 AND tipo_permissao ILIKE $2',
                    [descricaoPermissao, `%${tipoPermissao}%`]
                );                
                const idPermissao = resultPermissao.rows[0].id_permissao
                await client.query('INSERT INTO perfil_acesso_permissoes (id_perfil_acesso, id_permissao) VALUES ($1, $2)', [idPerfilAcesso, idPermissao])
            }

            await client.query('COMMIT') // Finaliza a transação no banco de dados

            res.status(201).send('Perfil cadastrado com sucesso!')
        } catch (error) {
            await client.query('ROLLBACK') // Rollback da transação em caso de erro
            console.error('Erro ao cadastrar perfil:', error)
            // Verifica se os cabeçalhos já foram enviados antes de tentar enviar a resposta de erro
            if (!res.headersSent) {
                res.status(500).send('Erro ao cadastrar perfil.');
            }
        }
    })
})

perfisRouter.get('/perfis', (req, res) => {
    conectarDb(async client => {
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