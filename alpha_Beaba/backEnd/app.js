const express = require('express')
const viewRouter = require('./routes/viewRoutes')
const loginRouter = require('./routes/loginRoute')
const usuarioRouter = require('./routes/usuarioRoute')
const lojasRouter = require('./routes/lojasRoutes')
const perfisRouter  = require('./routes/perfisRoutes')
const estoqueRouter = require('./routes/estoqueRoutes')
const taloesRouter = require('./routes/taloesRoutes')
const configureMiddlewares = require('./config/middlewares');

const app = express()

// confg middlewares
configureMiddlewares(app)

// Rotas para as páginas HTML
app.use(viewRouter)

app.use('/api', loginRouter)
app.use('/api', estoqueRouter)
app.use('/api', lojasRouter)
app.use('/api', usuarioRouter)
app.use('/api', perfisRouter)
app.use('/api', taloesRouter)

module.exports = app