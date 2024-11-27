const express = require('express')
const path = require('path')
const viewRouter = express.Router()

viewRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/login.html'))
})

viewRouter.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/admin/relatorios.html'))
})

viewRouter.get('/envioTaloes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/admin/envioTaloes.html'))
})

viewRouter.get('/perfilUsuario', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/admin/perfilUsuario.html'))
})

viewRouter.get('/manutencao', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/admin/manutencao.html'))
})

viewRouter.get('/estoque', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/admin/estoqueLojas.html'))
})

viewRouter.get('/lojas', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/admin/lojas.html'))
})

viewRouter.get('/perfilAcesso', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/admin/perfilAcesso.html'))
})

viewRouter.get('/relatorios', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/admin/relatorios.html'))
})





viewRouter.get('/gerente', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/gerente.html'))
})

viewRouter.get('/caixa', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/caixa.html'))
})

module.exports = viewRouter