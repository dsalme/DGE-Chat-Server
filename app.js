"use strict";

var mongoose = require('mongoose');
var connection = mongoose.createConnection('mongodb://localhost/dgeChat');
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', initApp);

var MessageModel = connection.model('Message', require('./schemas/Message'), 'messages');

function initApp() {

    var express = require('express');
    var ioModule = require('socket.io');
    var http = require('http');
    var https = require('https');
    var bodyParser = require('body-parser');
    var cors = require('cors');
    var GlobalAttributesProvider = require('./providers/GlobalAttributesProvider');

    var app = express();
    app.use('/', bodyParser());
    app.use('/', cors());

    app.use('/messages', require('./routes/public/messageRouter')(MessageModel));

    app.use('/', require('./middlewares/notFoundHandler'));
    app.use('/', require('./middlewares/genericErrorHandler'));
    var server = http.createServer(app).listen(3000);

    var io = GlobalAttributesProvider.io = ioModule.listen(server, { log: false });

    var i = 0;
    io.sockets.on('connection', function (socket) {
        //console.log(socket.origin);
        var messageSocket = require('./sockets/messageSocket')(MessageModel);
        socket.emit('connected', {author: 'Server', content: 'Tu nick es anonimo'+i+'.', nickName:'anonimo'+i});
        io.sockets.emit('newUser',{author: 'Server', content: 'El usuario anonimo'+i+' se ha conectado.'});
        i++;

        socket.on('/messages/newMessage', messageSocket.newMessage);
        socket.on('/messages/likeMessage', messageSocket.reverseLikeMessage);

        socket.on('/messages/findAll', messageSocket.findAllMessages);
        socket.on('/messages/newNick', function(data, callback){
            socket.broadcast.emit('newNick', {
                author: 'Server',
                content: "El usuario '" + data.author + "' se ha cambiado el nick a '" + data.content + "'."
            });
        });
    });

}