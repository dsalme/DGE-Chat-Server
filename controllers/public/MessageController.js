"use strict";
module.exports = function (MessageModel) {

    var GlobalAttributesProvider = require("./../../providers/GlobalAttributesProvider");
    var ErrorProvider = require('./../../providers/ErrorProvider');
    var PublicInterface = {};
    PublicInterface.findAllMessages = function (data, callback) {
        MessageModel.find({}).
            select('author content likes createdAt')
            .exec(function (err, doc) {
                if (err) return callback(ErrorProvider.getDatabaseError());
                return callback(false, doc);
            })
    };
    PublicInterface.newMessage = function (data, callback) {
        //TODO: Notificar via sockets a todos los conectados +
        if (!data || !data.author || !data.content) return callback(ErrorProvider.getMissingParametersError());
        MessageModel.create(data, function (err, doc) {
            if (err) return callback(ErrorProvider.getDatabaseError());
            GlobalAttributesProvider.io.sockets.emit('newMessage', {author: doc.author, content: doc.content, createdAt: doc.createdAt});
            return callback(false, doc);
        });
    };
    PublicInterface.reverseLikeMessage = function (data, callback) {
        if (!data || !data.author || !data._id) return callback(ErrorProvider.getMissingParametersError());
        MessageModel.findOne({_id: data._id}, function (err, message) {
            if (err) return callback(ErrorProvider.getDatabaseError());
            if (message.likes.length > 0) {
                var igual = false;
                for (var i = 0; i < message.likes.length; i++) {
                    if (message.likes[i].author == data.author) {
                        message.likes.splice(i, 1);
                        i = message.likes.length;
                        igual = true;
                    }
                }
                if (!igual) {
                    message.likes.push({author: data.author});
                }
            } else {
                message.likes.push({author: data.author});
            }
            message.save(function (err, doc) {
                if (err) return callback(ErrorProvider.getDatabaseError());
                GlobalAttributesProvider.io.sockets.emit('someOneLikesAMessage', {message: message, author: data.author});
                return callback(false, doc);
            });
        });
    };

    return PublicInterface;

}