const express = require('express') // Corrigido
const cors = require('cors')
const loginRouter = require('./routes/loginRoute')
const usuarioRouter = require('./routes/usuarioRoute')
const lojasRouter = require('./routes/lojasRoutes')
const { perfisRouter } = require('./routes/perfisRoutes')
const estoqueRouter = require('./routes/estoqueRoutes')
const manutencaoRouter = require('./routes/manutencaoRoutes')
const app = express()

app.use(express.json())
app.use(cors())

app.use(loginRouter)
app.use(usuarioRouter)
app.use(lojasRouter)
app.use(perfisRouter)
app.use(estoqueRouter)
app.use(manutencaoRouter)


const port = 5000
app.listen(port, () =>{
    console.log(`Servidor rodando na porta ${port}`)
})

module.exports = app