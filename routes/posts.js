const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config({path:'./.env'});

//conexión con la base de datos
const {connection} = require("../config.db");
let numRegPage=process.env.NUMREGPAGE|| "10";
numRegPage=parseInt(numRegPage);

/*
const getPosts = (request, response) => {
    const page = request.query.page||1;  
    connection.query("SELECT id,titulo,descripcion,fecha FROM posts ORDER BY fecha DESC", 
    (error, results) => {
        if(error)
            throw error;
        // Codigo para generar la paginacion 
        let rows=results.length;
        let numPageDec=rows/numRegPage;
        let numPageInt=parseInt(numPageDec);
        if(numPageDec!=numPageInt){
            numPageInt++;
        }
        let numPage=numPageInt;
        let data=[];
        var initIndex=(page*numRegPage) - numRegPage;
        var stopIndex=page*numRegPage
        for(var i=initIndex ;i<stopIndex;i++ ){
            if(i<rows){
                data.push(results[i]);
            }
        }
        let datos={
            pagination:{
                numPage:numPage, // numero de paginas
                rows:rows, // filas 
                regPage:numRegPage, // cantidad de registros por pagina
                page:page // numero de pagina que se solicito
            },
            data:data // los registros de la pagina solicitada
        };
        response.status(200).json(datos);
    });
};

//ruta
app.route("/posts")
.get(getPosts);
*/
const getPosts = (request, response) => {
    const page = request.query.page||1;  
    connection.query("SELECT COUNT(*) AS filas FROM posts ORDER BY fecha DESC", 
    (error, counts) => {
        if(error)
            throw error;
        const rows=counts[0].filas;
        let numPageDec=rows/numRegPage;
        let numPageInt=parseInt(numPageDec);
        if(numPageDec!=numPageInt){
            numPageInt++;
        }
        let numPage=numPageInt;
        var offset=(page*numRegPage) - numRegPage;
        connection.query("SELECT id,titulo,descripcion,fecha FROM posts ORDER BY fecha DESC LIMIT "+offset+","+numRegPage , 
            (error, results) => {
                if(error)
                    throw error;
                let datos={
                    pagination:{
                        numPage:numPage, // numero de paginas
                        rows:rows, // filas 
                        regPage:numRegPage, // cantidad de registros por pagina
                        page:page // numero de pagina que se solicito
                    },
                    data:results // los registros de la pagina solicitada
                };
                response.status(200).json(datos);
            }
        );
    });
    
};

//ruta
app.route("/posts")
.get(getPosts);

const createPosts = (request, response) => {
    const {titulo,descripcion,fecha} = request.body;
    connection.query("INSERT INTO posts(titulo,descripcion,fecha) VALUES (?,?,?) ", 
    [titulo,descripcion,fecha],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({
            "result": results.affectedRows,
              "msg":results.affectedRows != 0 ? "Post añadido correctamente":""
        });
    });
};

//ruta
app.route("/posts/new")
.post(createPosts);
module.exports = app;