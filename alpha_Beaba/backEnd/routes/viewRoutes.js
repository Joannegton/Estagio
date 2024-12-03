const express = require('express')
const path = require('path')
const checkPermissions = require('../middleware/checkPermission')

const viewRouter = express.Router()

viewRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/login.html'))
})

// Administrador
viewRouter.get('/envioTaloes', checkPermissions('Envio Talões'), (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/admin/envioTaloes.html'))
})

viewRouter.get('/perfilUsuario', checkPermissions('Usuarios'), (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/admin/perfilUsuario.html'))
})

viewRouter.get('/manutencao', checkPermissions('Envio Talões'), (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/admin/manutencao.html'))
})

viewRouter.get('/estoque', checkPermissions('Estoque'), (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/admin/estoqueLojas.html'))
}) 

viewRouter.get('/lojas', checkPermissions('Lojas'), (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/admin/lojas.html'))
})

viewRouter.get('/perfilAcesso', checkPermissions('Todas'), (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/admin/perfilAcesso.html'))
})

viewRouter.get('/relatorios', checkPermissions('Todas'), (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/admin/relatorios.html'))
})

// Gerente
viewRouter.get('/editarLoja', checkPermissions('Lojas'), (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/gerente/editLoja.html'))
})

viewRouter.get('/perfilAcessoG', checkPermissions('Usuarios'), (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/gerente/perfilAcesso.html'))
})

viewRouter.get('/perfilUsuarioG', checkPermissions('Usuarios'), (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/gerente/perfilUsuario.html'))
})

viewRouter.get('/relatoriosG', checkPermissions('Relatorios'), (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/gerente/relatorios.html'))
})

// Caixa
viewRouter.get('/caixa', checkPermissions('Saída Talões'), (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/caixa.html'))
})

// Acesso negado
viewRouter.get('/acessoNegado', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/acessoNegado.html'))
})

module.exports = viewRouter