/**
 * Created by dsalmeron on 06/05/14.
 */
"use strict";

//var jwt = require('jsonwebtoken');
//var config = require('./../local');

var MessageController = require('./../controllers/public/MessageController');
var ResponseHandlerProvider = require('./../providers/ResponseHandlerProvider');

var socketRouter = {};

socketRouter.findAllMessages = function (data, callback) {
    MessageController.findAllMessages({}, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
    console.log("Petición findAllMessages del socket " + socket.id);
};

socketRouter.createMessage = function (data, callback) {
    MessageController.createMessage(data, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
};

socketRouter.reverseLikeMessage = function(data, callback){
    MessageController.reverseLikeMessage(data, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
};


module.exports = socketRouter;