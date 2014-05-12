/**
 * Created by dsalmeron on 06/05/14.
 */
"use strict";

var Message = require("./../../models/Message");
var GlobalAttributesProvider = require("./../../providers/GlobalAttributesProvider");
var ErrorProvider = require('./../../providers/ErrorProvider');


var PublicInterface = {};
PublicInterface.findAllMessages = function (data, callback) {
    Message.find({},
        'author content likes createdAt',
        function (err, doc) {
            if (err) return callback(ErrorProvider.getDatabaseError());
            return callback(false, doc);
        })
};
PublicInterface.createMessage = function (data, callback) {
    //TODO: Notificar via sockets a todos los conectados +
    if (!data || !data.author || !data.content) return callback(ErrorProvider.getMissingParametersError());
    Message.create(data, function (err, doc) {
        if (err) return callback(ErrorProvider.getDatabaseError());
        GlobalAttributesProvider.io.sockets.emit('newMessage', {author: doc.author, content: doc.content, createdAt: doc.createdAt});
        console.log('recieved message from', doc.author, 'msg', JSON.stringify(doc.content));
        console.log('broadcasting message');
        console.log('payload is', doc.content);
        console.log('broadcast complete');
        return callback(false, doc);
    });
};

PublicInterface.reverseLikeMessage = function (data, callback) {
    if (!data || !data.author || !data._id) return callback(ErrorProvider.getMissingParametersError());
    Message.findOne({_id: data._id}, function (err, message) {
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

module.exports = PublicInterface;