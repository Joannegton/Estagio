const {Router} = require('express')
const {conectarDb} = require('../config/conexao')

const loginRouter = Router()

loginRouter.post('/login', (req, res) => {
    const {matricula, senha} = req.body

    conectarDb(client => {
        //O método executa a consulta e chama um callback com os resultados. 
//O callback tem dois argumentos: err e result, sendo err o erro retornado do banco de dados e result o resultado da consulta.
        client.query('SELECT * FROM usuario WHERE matricula = $1 AND senha = $2', [matricula, senha], (err, result) => {
            if (err) {
                console.error('Erro ao executar a query:', err.stack) //stack é uma propriedade que retorna uma string que representa a pilha de chamadas de função que levou à exceção
                res.status(500).send('Erro ao executar a query')
            } else {
                if (result.rows.length > 0) {
                    const user = result.rows[0]
                    res.status(200).json({
                        mensagem: 'Login bem-sucedido',
                        user: { //m odificar por um objeto model
                            matricula: user.matricula,
                            nome: user.nome_usuario,
                            tipoUsuario: user.id_perfil_acesso
                        }
                    })
                } else {
                    res.status(401).send('Matricula ou senha inválidos')
                }
            }
        })
    })
})

module.exports = loginRouter;