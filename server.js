const {consultar, insertar} = require('./db.js')
const express = require('express')
const app = express()
app.use(express.static('static'))


app.get('/canciones', async(req, res) => {
    let canciones = await consultar();
    res.json(canciones);
});

app.post('/cancion', async (req,res) => {
  let body = ""

  req.on("data", (data) => {
    body += data
  });

  req.on("end", async () => {
    const datos = Object.values(JSON.parse(body));
    const newSong = await insertar(datos[0], datos[1], datos[2], datos[3]);

    res.status(201);
    res.send(newSong);
  })
})


app.listen(3000, () => console.log('Servidor en puerto 3000'))