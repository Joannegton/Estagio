const express = require('express')
const path = require('path')
const viewRouter = express.Router()

viewRouter.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/login.html'))
})

viewRouter.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/admin.html'))
})

viewRouter.get('/gerente', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/gerente.html'))
})

viewRouter.get('/caixa', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/views/caixa.html'))
})

module.exports = viewRouter