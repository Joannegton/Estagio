const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'beaba_ofete_ganhe',
    password: '131998Wel@',
    port: 5432
});

function conectarDb(callback) {
    pool.connect((err, client, release) => { // Se uma conexão estiver disponível, ela será fornecida ao callback, se não ele aguarda uma conexão
        if (err) {
            return console.error('Erro ao conectar ao banco de dados:', err.stack);
        }
        console.log('Conexão bem-sucedida ao banco de dados');
        
        // função a ser executada apos a conexão
        callback(client);

        // Libera o cliente e desconecta
        release();
    });
}

module.exports = { pool, conectarDb };