const getEstoqueHandler = require('../controllers/estoqueController');
const {Router} = require('express');

const estoqueRouter = Router();

estoqueRouter.get('/estoque', getEstoqueHandler)

module.exports = estoqueRouter;
