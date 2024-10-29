const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'beaba_oferte_ganhe',
    password: '131998Wel@',
    port: 5432
});

async function conectarDb() {
    const client = await pool.connect();
    console.log('Conexão bem-sucedida ao banco de dados');
    return client;
}

module.exports = { conectarDb };