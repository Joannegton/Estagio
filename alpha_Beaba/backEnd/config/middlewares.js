const express = require('express')
const cors = require('cors')
const path = require('path')
const autenticadorToken = require('../middleware/authMiddleware')

module.exports = (app) => {
    app.use(express.json())
    app.use(cors())

    // Middleware para servir arquivos estáticos (HTML, CSS e JS)
    app.use(express.static(path.join(__dirname, '../../frontEnd/public')))

    // Middleware de autenticação, ignorando certas rotas
    const rotasPublicas = ['/', '/admin', '/gerente', '/caixa', '/recuperar-senha', '/api/login']

    app.use((req, res, next) => {
        if (rotasPublicas.includes(req.path)) {
            return next()
        }
        autenticadorToken(req, res, next)
    })
}