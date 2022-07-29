const express = require("express");
const app = express();
//dotenv nos permite leer las variables de entorno de nuestro .env
const dotenv = require("dotenv");
dotenv.config({path:'./.env'});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//cargamos el archivo de rutas de auth y post
app.use(require('./routes/auth'));
app.use(require('./routes/posts'));
const puerto=process.env.PORT||3300;
app.listen(puerto,() => {
    console.log("Servidor corriendo en el puerto "+puerto);
});

module.exports = app;