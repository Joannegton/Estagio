const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'projetoBeaba',
    password: '131998Wel@',
    port: 5432
})

