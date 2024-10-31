require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})


async function conectarDb() {
    const client = await pool.connect()
    console.log('Conexão bem-sucedida ao banco de dados')
    return client
}

module.exports = { conectarDb }