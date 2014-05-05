var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");

//guardo en una la variable express una instancia de la libreria express, un modulo de node


mongoose.connect('mongodb://localhost/simple');

/**
*me conecto a la base de datos simple, en localhost
* mongodb://<servidor>/<nombreBd>
*/

var personSchema = {
    firstName:String,
    lastName:String,
    email:String
}

/**
*creo una variable personSchema, en la que detallo el modelo de el objeto person
*declaro los atributos, y el tipo de dato de cada atributo
*/

var Person = mongoose.model('Person', personSchema, 'people')

/**
*creo mi modelo de personas
* mongoose.model('<nombreModelo>', esquema que le paso como parametro, <coleccion>)
*/

var app = express();
app.use(cors());

//guardo en la variable app el metodo express(), que inicializa mi applicacion

app.get('/people', function (req, res) {
    Person.find(function (err, doc) {
        res.send(doc);
    })
})


/**
*si le pegamos a esta url desde otro puerto o una url que venga desde otro puerto, nos va a dar un error,
* tenemos que agregar la liberia cors (cross origin resourse sharing)
*tengo que agregar la liberia con require, y decirle a mi app que use cors con
* app.use(cors());
* esto me permite acceder a este sitio, o a esta url, desde cualquier puerto o url
*/

/**
*Cuando recibo /people, utilizo el metodo find del modelo Person que cree anteriormante 
*(find es un metodo que tienen todos los modelos)
* find(err, doc) recibe como parametro una funcion, la funcion recibe como primer 
* parametro un manipulador de errores (err)
* y como segundo parametro el resultado de la busqueda (documents)
* res.send(doc) envia como respuesta a la peticion todos los documentos que encuentra
* al hacer Person.find()
* ---------
* el metodo findOne() devuelve un solo registro, si no le pasamos ningun parametro,
* devuelve el primer registro
*/

app.get('/', function (req, res){
	res.send('Lololo');
})

/**
*seteo un getter a la baseUrl para verificar que funciona
*el metodo get recibe dos parametros, la url que recibe por get
* y una funcion, que recibe como parametros req (request) y res (response)
*para empezar lo unico que hacemos es al recibir '/', hacer un
*res.send('cadena'), que envia una cadena de caracteres como respuesta a 
*la peticion get
*/

app.listen(3000);

/**
*le decimos a nuestra aplicacion que escuche el puerto 3000
*/
