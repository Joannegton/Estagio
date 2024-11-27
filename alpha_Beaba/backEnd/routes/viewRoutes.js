const express = require('express')
const path = require('path')
const viewRouter = express.Router()

viewRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/login.html'))
})

// Administrador
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

// Gerente
viewRouter.get('/editarLoja', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/gerente/editLoja.html'))
})

viewRouter.get('/perfilAcessoG', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/gerente/perfilAcesso.html'))
})

viewRouter.get('/perfilUsuarioG', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/gerente/perfilUsuario.html'))
})

viewRouter.get('/relatoriosG', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/gerente/relatorios.html'))
})


// Caixa
viewRouter.get('/caixa', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/caixa.html'))
})

module.exports = viewRouter