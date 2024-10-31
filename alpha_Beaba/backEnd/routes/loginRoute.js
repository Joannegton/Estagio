const { Router } = require('express');
const loginController = require('../controllers/loginController');

const loginRouter = Router();

loginRouter.post('/login', loginController.login);

loginRouter.post('/recuperarSenha', loginController.recoverPassword);

loginRouter.post('/logout', loginController.logout);

loginRouter.post('/alterarSenha', loginController.changePassword);


module.exports = loginRouter;