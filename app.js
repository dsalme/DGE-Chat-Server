"use strict";

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dgeChat');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', initApp);

var express = require('express');
var ioModule = require('socket.io');
var http = require('http');
var https = require('https');
var bodyParser = require('body-parser');
var cors = require('cors');

/*var httpRedirectMiddleware = require('./middlewares/httpRedirect');
var isAuthenticatedMiddleware = require('./middlewares/isAuthenticated');*/
var notFoundMiddleware = require('./middlewares/notFoundHandler');
var genericErrorHandlerMiddleware = require('./middlewares/genericErrorHandler');

var globals = require('./global');
var config = require('./local');

function initApp() {

    var app = express();
    //app.use('/', httpRedirectMiddleware);

    app.use('/', bodyParser());
    app.use('/', cors());


    var publicMessageRouter = require('./routes/public/messageRouter');
    app.use('/messages', publicMessageRouter);

    app.use('/', notFoundMiddleware);
    app.use('/', genericErrorHandlerMiddleware);
    var server = http.createServer(app).listen(3000);

    var io = globals.io = ioModule.listen(server, { log: 1000 });

    io.sockets.on('connection', function (socket) {
        socket.broadcast.emit('user connected');

        var messageSocket = require('./sockets/messageSocket');

        socket.on('/messages/findAll', messageSocket.findAllMessages);
        socket.on('/messages/create', messageSocket.createMessage);



    });

    /*TODO
    CAMBIAR LA LOGICA DEL GETTER PARA QUE AL CONECTARSE UNICAMENTE SE CONSULTEN LOS MENSAJES DEL DIA ACTUAL
    -
    PASAR A LAS RUTAS PRIVADAS EL GETTER DE TODOS LOS MENSAJES
    -
    TERMINAR DE DEFINIR BIEN LOS SOCKET ON Y EMIT DEL SERVER

     */

}