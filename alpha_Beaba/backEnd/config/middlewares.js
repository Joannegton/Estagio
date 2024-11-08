const express = require('express')
const cors = require('cors')
const path = require('path')

module.exports = (app) => {
    app.use(express.json())
    app.use(cors())

    // Middleware para servir arquivos estáticos (HTML, CSS e JS)
    app.use(express.static(path.join(__dirname, '../../frontEnd/public')))

    // Middleware de tratamento de erros
    app.use((err, req, res, next) => {
        console.error(err.stack)
        res.status(500).json({message: 'Algo deu errado!'})
    })
}