const { conectarDb } = require('../config/conexao')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const { v4: uuidv4 } = require('uuid') // gera identificadores únicos

const SECRET_KEY = process.env.SECRET_KEY_JWT //assinar o token JWT

class LoginService {
    async login(matricula, senha) {
        const client = await conectarDb()
        try {
            const result = await client.query(`
                SELECT * FROM usuario
                JOIN usuario_loja ON usuario.matricula = usuario_loja.usuario_matricula 
                WHERE matricula = $1`, [matricula])
            if (result.rows.length > 0) {
                const user = result.rows[0]
                const isPasswordValid = await bcrypt.compare(senha, user.senha)
                if (isPasswordValid) {
                    // Verificar se há um token válido
                    const tokenResult = await client.query('SELECT token FROM usuario WHERE matricula = $1 AND token IS NOT NULL', [matricula])    
                    if(tokenResult.rows.length > 0){
                        const token = tokenResult.rows[0].token
                        try {
                            jwt.verify(token, SECRET_KEY)
                            const error = new Error('Número máximo de sessões atingido')
                            error.code = 'MAX_SESSIONS'
                            throw error
                        } catch (err) {
                            if (err.code === 'MAX_SESSIONS') {
                                throw err
                            } else {
                                await client.query('UPDATE usuario SET token = NULL WHERE matricula = $1', [matricula])
                            }
                        }
                    }
    
                    const sessionId = uuidv4() // Gerar um identificador único para a sessão
                    const newToken = jwt.sign({ matricula: user.matricula, tipoUsuario: user.id_perfil_acesso, sessionId }, SECRET_KEY, { expiresIn: '1h' })
                    await client.query('UPDATE usuario SET token = $1 WHERE matricula = $2', [newToken, matricula])
                    return { token: newToken, user }
                } else {
                    throw new Error('Matricula ou senha inválidos')
                }
            } else {
                throw new Error('Matricula ou senha inválidos')
            }
        } catch (err) {
            console.error('Erro ao realizar login:', err.stack)
            throw err
        } finally {
            client.release()
        }
    }

    async recoverPassword(email) {
        // Gmail para teste - nodemailer (retirar do package.json)

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER, 
                pass: process.env.GMAIL_PASS  
            }
        })

        let mailOptions = {
            from: process.env.GMAIL_USER,
            to: email, 
            subject: 'Recuperação de acesso', 
            text: '',
            html: `
                <p>Seu acesso foi redefinido e a nova senha é <b>Quero@2024#</b>
                    <br>Realize o acesso e altere a senha.
                </p>
            `
        }

        await transporter.sendMail(mailOptions)

        return `Password recovery instructions have been sent to ${email}`
    }

    async logout(matricula) {
        const client = await conectarDb()
        try {
            await client.query('UPDATE usuario SET token = null WHERE matricula = $1', [matricula])
        } catch (err) {
            console.error('Erro ao realizar logout:', err.stack)
            throw err
        } finally {
            client.release()
        }
    }


    async changePassword(matricula, senhaAntiga, novaSenha) {
        const client = await conectarDb()
        try {
            const result = await client.query('SELECT * FROM usuario WHERE matricula = $1', [matricula])
            if (result.rows.length > 0) {
                const user = result.rows[0]
                const isPasswordValid = await bcrypt.compare(senhaAntiga, user.senha)
                if (isPasswordValid) {
                    const hashedPassword = await bcrypt.hash(novaSenha, 10)
                    await client.query('UPDATE usuario SET senha = $1 WHERE matricula = $2', [hashedPassword, matricula])
                    return 'Senha alterada com sucesso'
                }
            }
            throw new Error('Matricula ou senha inválidos')
        } catch (err) {
            console.error('Erro ao alterar senha:', err.stack)
            throw err
        } finally {
            client.release()
        }
    }


}

module.exports = new LoginService()