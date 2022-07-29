const express = require("express");
const app = express();
const uuid = require("uuid");
//conexión con la base de datos
const {connection} = require("../config.db");
const login = (request, response) => {
    const {correo,password} = request.body;
    connection.query("SELECT id,nombre,apellido,correo FROM users WHERE correo=? AND  password=MD5(?)", 
    [correo,password],
    (error, results) => {
        if(error)
            throw error;
            response.status(200).json(results);
    });
};

//ruta
app.route("/auth/login")
.post(login);

const  register= (request, response) => {
    const {nombre,apellido,correo,password} = request.body;
    connection.query("INSERT INTO users(nombre,apellido,correo,password) VALUES (?,?,?,MD5(?)) ", 
    [nombre,apellido,correo,password],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({
            "result": results.affectedRows,
            "msg":results.affectedRows != 0 ? "Usuario añadido correctamente":""
        });
    });
};

//ruta
app.route("/auth/register")
.post(register);

const  forgot_passwordCodeReseteo= (request, response) => {
    var id = request.body.id;
    if(isNaN(id)==false){
        id=parseInt(id);
    }
    else
    {
        id=0;
    }
    let codeReseteo =uuid.v4();
    connection.query("UPDATE users SET  codeReseteo=? WHERE id=?", 
    [codeReseteo,id],
    (error, results) => {
        if(error)
            throw error;
            response.status(201).json({
                "result": results.affectedRows,
                "msg":results.affectedRows != 0 ? "Codigo de reseteo de contraseña generado correctamente":""
            });
    });
};

//ruta
app.route("/auth/forgot_password/request")
.post(forgot_passwordCodeReseteo);

const  forgot_passwordChange= (request, response) => {
    const {password,codeReseteo} = request.body;
    connection.query("UPDATE users SET  password=MD5(?), codeReseteo=NULL  WHERE codeReseteo=? AND codeReseteo IS NOT NULL", 
    [password,codeReseteo],
    (error, results) => {
        if(error)
            throw error;
            response.status(201).json({
                "result": results.affectedRows,
                "msg":results.affectedRows != 0 ? "La contraseña ha sido cambiada correctamente":""
            });
    });
};

//ruta
app.route("/auth/forgot_password/new")
.post(forgot_passwordChange);

module.exports = app;