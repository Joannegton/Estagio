const { Router } = require('express')
const { conectarDb } = require('../config/conexao')
const getPerfisHandler = require('../controllers/perfisController')

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

perfisRouter.get('/perfis', getPerfisHandler)

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