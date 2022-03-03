//import pg from 'pg'
const { Pool } = require('pg')

// creamos nuestro pool de conexiones
const pool = new Pool({
    user: 'jvalcarcel',
    host: '127.0.0.1',
    database: 'repertorio',
    password: '1234',
    max: 20,
    min: 2,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
})



async function insertar(cancion, artista, tono) {
    const client = await pool.connect()
    // ejemplo de consulta con 2 parámetros
    const res = await client.query(
        "insert into repertorio (cancion, artista, tono) values ($2, $3, $4) returning *",
        [cancion, artista, tono]
    )
    client.release()
}

async function consultar() {
    let client 
    try{
        client = await pool.connect();
    } catch (conn_error) {
        console.log("Client Error")
    }

    let res;
    try{
        res = await client.query({
            text: `select * from repertorio`
        });
    } catch (err) {
        console.log("El error es: " + err)
        return;
    }
    
    client.release()
    return res.rows;
}

async function editar (cancion, artista, tono) {
    const client = await pool.connect()
    // ejemplo de consulta pasándole como parámetro 1 objeto
    const res = await client.query({
        text: "update repertorio set cancion=$2, artista=$3, tono=$4 where id=$1",
        values: [ cancion, artista, tono]
    })

    client.release()
    return res
}

async function eliminar (nombre) {
    const client = await pool.connect()
    // ejemplo de consulta con 2 parámetros
    const res = await client.query(
        "delete from repertorio where id=$1",
        [id]
    )
    client.release()
}


module.exports = {insertar, consultar, editar, eliminar}