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

var httpRedirectMiddleware = require('./middlewares/httpRedirect');
var isAuthenticatedMiddleware = require('./middlewares/isAuthenticated');
var notFoundMiddleware = require('./middlewares/notFoundHandler');
var genericErrorHandlerMiddleware = require('./middlewares/genericErrorHandler');

var globals = require('./global');
var config = require('./local');

function initApp() {

    var app = express();
    //app.use('/', httpRedirectMiddleware);
    app.use('/', bodyParser());
    app.use('/', cors());
    //app.use('/', express.static('assets'));

    //TODO: Migrar logica de seguridad de authRouter a UserController publico
    //TODO: Migrar hooks del modelo User a métodos especificos del UserController publico

    var publicContributorRouter = require('./routes/contributorRouter');
    var publicPostRouter = require('./routes/postRouter');
    var publicEventRouter = require('./routes/eventRouter');
    var publicAuthRouter = require('./routes/authRouter');

    app.use('/contributors', publicContributorRouter);
    app.use('/posts', publicPostRouter);
    app.use('/events', publicEventRouter);
    app.use('/auth', publicAuthRouter);

    //TODO: Actualizar controladores privados para que pasen los errores al errorHandler en vez de resolverlos

    var privateUserRouter = require('./routes/private/userRouter');
    var privatePostRouter = require('./routes/private/postRouter');
    var privateEventRouter = require('./routes/private/eventRouter');
    var privateTemplateRouter = require('./routes/private/templateRouter');

    app.use('/api', isAuthenticatedMiddleware);
    app.use('/api/users', privateUserRouter);
    app.use('/api/posts', privatePostRouter);
    app.use('/api/events', privateEventRouter);
    app.use('/api/templates', privateTemplateRouter);

    app.use('/', notFoundMiddleware);
    app.use('/', genericErrorHandlerMiddleware);

    http.createServer(app).listen(80);
    var server = https.createServer(config.sslCredentials, app).listen(443, function () {
        console.log("HTTPS Server init")
    });
    var io = globals.io = ioModule.listen(server, { log: false });

    io.sockets.on('connection', function (socket) {
        var contributorSocket = require('./sockets/contributorSocket');
        var eventSocket = require('./sockets/eventSocket');
        var postSocket = require('./sockets/postSocket');

        socket.on('/contributors/findAll', contributorSocket.findAll);
        socket.on('/contributors/findById', contributorSocket.findById);
        socket.on('/events/findByPage', eventSocket.findByPage);
        socket.on('/events/findById', eventSocket.findById);
        socket.on('/posts/findByPage', postSocket.findByPage);
        socket.on('/posts/findById', postSocket.findById);
        socket.on('/posts/comment', postSocket.comment);

    });

}

/*
var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");

mongoose.connect('mongodb://localhost/simple')

var personSchema = {
    firstName:String,
    lastName:String,
    email:String
}

var Person = mongoose.model('Person', personSchema, 'people')

var app = express();
app.use(cors());

app.get('/people', function (req, res) {
    Person.find(function (err, doc) {
        res.send(doc);
    })
})
app.get('/daveh', function (req, res){
	res.send("elDaveh");
})

app.listen(3000);

*/