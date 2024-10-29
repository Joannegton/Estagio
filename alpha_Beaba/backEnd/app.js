const express = require('express')
const path = require('path')
const cors = require('cors')
const viewRouter = require('./routes/viewRoutes')
const loginRouter = require('./routes/loginRoute')
const usuarioRouter = require('./routes/usuarioRoute')
const lojasRouter = require('./routes/lojasRoutes')
const { perfisRouter } = require('./routes/perfisRoutes')
const estoqueRouter = require('./routes/estoqueRoutes')
const taloesRouter = require('./routes/taloesRoutes')

const app = express()
app.use(express.json())
app.use(cors())

// Middleware para servir arquivos estáticos (CSS e JS)
app.use(express.static(path.join(__dirname, '../frontEnd/public')))

// Rotas para as páginas HTML
app.use(viewRouter)

app.use('/api', loginRouter)
app.use('/api', estoqueRouter)
app.use('/api', lojasRouter)
app.use('/api', usuarioRouter)
app.use('/api', perfisRouter)
app.use('/api', taloesRouter)

module.exports = app