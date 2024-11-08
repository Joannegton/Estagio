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
    try {
        const client = await pool.connect()
        return client
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error.stack)
        throw error
    }
}

module.exports = { conectarDb }