const {Router} = require('express')
const {conectarDb} = require('../config/conexao')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const loginRouter = Router()
const SECRET_KEY = '6G>K9(Qk=^1iDx}N6FwAzZ^uwBJpyC'; // secret key para assinar o token JWT


loginRouter.post('/login', (req, res) => {
    const { matricula, senha } = req.body;

    conectarDb(async client => {
        try {
            const result = await client.query('SELECT * FROM usuario WHERE matricula = $1', [matricula]);
//O método query executa a consulta e chama um callback com os resultados. 
//O callback tem dois argumentos: err e result, sendo err o erro retornado do banco de dados e result o resultado da consulta.
            if (result.rows.length > 0) {
                const user = result.rows[0];
                const isPasswordValid = await bcrypt.compare(senha, user.senha);
                if (isPasswordValid) {
                    const token = jwt.sign({ matricula: user.matricula, tipoUsuario: user.id_perfil_acesso }, SECRET_KEY, { expiresIn: '1h' });
                    
                    // Atualize o token no usuario
                    await client.query('UPDATE usuario SET token = $1 WHERE matricula = $2', [token, matricula]);
                    
                    res.status(200).json({
                        mensagem: 'Login bem-sucedido',
                        token,
                        user: {
                            matricula: user.matricula,
                            nome: user.nome_usuario,
                            tipoUsuario: user.id_perfil_acesso
                        }
                    });
                } else {
                    res.status(401).send('Matricula ou senha inválidos');
                }
            } else {
                res.status(401).send('Matricula ou senha inválidos');
            }
        } catch (err) {
            console.error('Erro ao executar a query:', err.stack); //stack é uma propriedade que retorna uma string que representa a pilha de chamadas de função que levou à exceção
            res.status(500).send('Erro ao executar a query');
        }
    });
});

loginRouter.post('/recuperarSenha', (req, res) => {
    const { email } = req.body;

    // Implement password recovery logic here
    res.status(200).send(`Instruções de recuperação de senha foram enviadas para ${email}`);
});

module.exports = loginRouter;