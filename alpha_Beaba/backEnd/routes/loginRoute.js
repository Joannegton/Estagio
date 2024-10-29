const {Router} = require('express')
const loginHandler = require('../controllers/loginController')
const loginRouter = Router()

loginRouter.post('/login', loginHandler);


loginRouter.post('/recuperarSenha', (req, res) => {
    const { email } = req.body;

    // Implement password recovery logic here
    res.status(200).send(`Instruções de recuperação de senha foram enviadas para ${email}`);
});

module.exports = loginRouter;