const {consultar, insertar} = require('./db.js')
const express = require('express')
const app = express()
app.use(express.static('static'))

const bp = require('body-parser')

app.use(bp.json())

app.get('/canciones', async(req, res) => {
    let canciones = await consultar();
    res.json(canciones);
});





app.listen(3000, () => console.log('Servidor en puerto 3000'))