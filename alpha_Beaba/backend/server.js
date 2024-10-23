const express = require('express') // Corrigido
const cors = require('cors')
const loginRouter = require('./routes/loginRoute')

const app = express()

app.use(express.json())
app.use(cors())

app.use(loginRouter)

const port = 5000
app.listen(port, () =>{
    console.log(`Servidor rodando na porta ${port}`)
})

module.exports = app