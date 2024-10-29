const login = require('../services/loginService');

async function loginHandler(req, res) {
    const { matricula, senha } = req.body;
    try {
        const { token, user } = await login(matricula, senha);
        res.status(200).json({
            mensagem: 'Login bem-sucedido',
            token,
            user: {
                matricula: user.matricula,
                nome: user.nome_usuario,
                tipoUsuario: user.id_perfil_acesso
            }
        });
    } catch (err) {
        res.status(401).send(err.message);
    }
}

module.exports = loginHandler;