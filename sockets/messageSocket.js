"use strict";

module.exports = function (MessageModel) {

    var MessageController = require('./../controllers/public/MessageController')(MessageModel);
    var ResponseHandlerProvider = require('./../providers/ResponseHandlerProvider');
    var GlobalAttributesProvider = require("./../providers/GlobalAttributesProvider");
    var socketRouter = {};

    socketRouter.findAllMessages = function (data, callback) {
        MessageController.findAllMessages({}, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
        console.log("Petición findAllMessages del socket " + socket.id);
    };

    socketRouter.newMessage = function (data, callback) {
        MessageController.newMessage(data, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
    };

    socketRouter.reverseLikeMessage = function (data, callback) {
        MessageController.reverseLikeMessage(data, ResponseHandlerProvider.defaultSocketResponseHandler(callback));
    };

    /*socketRouter.newNick = function (data, callback) {
        GlobalAttributesProvider.io.sockets.emit('newNick', {
            author: 'Server',
            content: "El usuario '" + data.author + "' se ha cambiado el nick a '" + data.content + "'."
        });
    };*/

    return socketRouter;
};