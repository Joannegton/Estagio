const loginService = require('../services/loginService')

class LoginController {
    async login(req, res) {
        const { matricula, senha } = req.body
        try {
            const { token, user } = await loginService.login(matricula, senha)

             // Configurar o cookie com o token
            res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 9 * 60 * 60 * 1000 }) // 9 horas

            res.status(200).json({
                mensagem: 'Login bem-sucedido',
                token,
                user: {
                    matricula: user.matricula,
                    nome: user.nome_usuario,
                    tipoUsuario: user.id_perfil_acesso,
                    email: user.email,
                    workplace: user.workplace,
                    cod_loja: user.cod_loja
                }
            })
        } catch (err) {
            if(err.code){
                res.status(401).json({ message: err.message, code: err.code })
                return
            }
            res.status(401).json({ message: err.message })
        }
    }

    async recoverPassword(req, res) {
        const { email } = req.body
        try {
            const message = await loginService.recoverPassword(email)
            res.status(200).json({message: message})
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }

    async logout(req, res) {
        const { matricula } = req.body
        try {
            await loginService.logout(matricula)
            res.clearCookie('token')
            res.status(200).json({message: 'Logout realizado com sucesso'})
        } catch (err) {
            res.status(500).json({message: 'Erro ao realizar logout'})
        }
    }


    async changePassword(req, res) {
        const { matricula, senhaAtual, novaSenha } = req.body
        try {
            await loginService.changePassword(matricula, senhaAtual, novaSenha)
            res.status(200).json({message: 'Senha alterada com sucesso'})
        } catch (err) {
            res.status(401).json({message: err.message})
        }
    }


}

module.exports = new LoginController()