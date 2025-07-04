const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'exercicio5',
    password: 'senha',
    port: 5432
})

async function getTabelas() {
    try {
        const client = await pool.connect()
        console.log("Conectado ao banco de dados!")

        const res = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
        const tabelas = res.rows.map(row => row.table_name) // cria uma lista com os nomes das tabelas

        client.release() //libera a conexao

        return tabelas
    } catch (error) {
        console.error("Erro ao buscar tabelas", error)
    }
}

async function getDadosTabelas(tabela) {
    try {
        const client = await pool.connect()
        const res = await client.query(`SELECT * FROM ${tabela}`)
        console.log(`DADOS DA TABELA ${tabela}:`, res.rows)

        client.release()
    } catch (error) {
        console.error(`Erro ao executar consulta na tabela ${tabela}`, error)
        return []
    }
}

async function processarTabelas() {
    const tabelas_nome = await getTabelas() // espera pegar os nomes das tabelas

    for (const tabela of tabelas_nome) { //foreach não funciona, callback de métodos como o forEach não são ideais dentro de uma função assíncrona, pois da loop
        await getDadosTabelas(tabela) // espera pegar os dados da tabela
    }
}

processarTabelas()
