/**
 * Created by dsalmeron on 06/05/14.
 */
"use strict";

//var jwt = require('jsonwebtoken');
var config = require('./../local');

var MessageController = require('./../controllers/public/MessageController');
var globals = require('./../global');

var socketRouter = {

    findAllMessages: function (id, callback) {
        MessageController.findAllMessages({}, globals.defaultSocketResponseHandler(callback));
        console.log("Petición findAllMessages del socket " + socket.id);
    },

    //createMessage: function (data, callback) {
    createMessage: function (data, callback) {
        MessageController.createMessage({author: data.author, content: data.content}, globals.defaultSocketResponseHandler(callback));
        console.log('recieved message from', data.author, 'msg', JSON.stringify(data.content));

        console.log('broadcasting message');
        console.log('payload is', data.content);

        console.log('broadcast complete');

    }

    //


};

module.exports = socketRouter;