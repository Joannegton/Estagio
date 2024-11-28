const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const authToken = require('../middleware/authMiddleware')
 
module.exports = (app) => {
    app.use(express.json())
    app.use(cookieParser()) 

    // cors com suporte para cookies
    app.use(cors({origin: process.env.FRONTEND_URL, credentials: true })) // Permite envio de cookies

    // Middleware para servir arquivos estáticos (HTML, CSS e JS)
    app.use(express.static(path.join(__dirname, '../../frontEnd/public')))

    // Middleware de autenticação, ignorando certas rotas
    const rotasPublicas = ['/', '/recuperar-senha', '/api/login', '/api/logout']

    app.use((req, res, next) => {
        if (rotasPublicas.includes(req.path)) {
            return next()
        }
        authToken(req, res, next)
    })


    // Middleware para tratar erros
    app.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            res.status(401).json({ error: 'Não autorizado' })
        } else if (err.message === 'Not allowed by CORS') {
            res.status(403).json({ error: 'Origem não permitida pelo CORS' })
        } else {
            res.status(500).json({ error: 'Erro interno no servidor' })
        }
    })


}