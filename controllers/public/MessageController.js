/**
 * Created by dsalmeron on 06/05/14.
 */
"use strict";

var Message = require("./../../models/Message");
var globals = require("./../../global");

var PublicInterface = {
    findAllMessages: function (data, callback) {
        Message.find({}, function (err, doc) {
            callback(err, doc);
        })
    },
    createMessage: function (data, callback) {
        //TODO: Notificar via sockets a todos los conectados
        if (data.author && data.content) {
            Message.create(data, function (err, doc) {
                if (!err) {
                    //TODO: Verificar que funcione y optimizar para no floodear a clientes
                    globals.io.sockets.emit('newMessage', {author: data.author, content: data.content});
                    console.log('recieved message from', data.author, 'msg', JSON.stringify(data.content));

                    console.log('broadcasting message');
                    console.log('payload is', data.content);

                    console.log('broadcast complete');
                    callback(err, doc);
                }
            });
        } else {
            return callback(true)
        }
    }/*,
    findMessagesByDate: function(){
        Message.find({createdAt: Date.now()}, function(err, doc){

        })
    }*/


/*,
 comment: function (data, callback) {
 if (data.id && data.author && data.content) {
 Post.findOne({ _id: data.id, active: true },
 'title author content cover tags comments createdAt modifiedAt',
 function (err, doc) {
 if (!err) {
 doc.comments.push({ author: data.author, content: data.content });
 doc.save(function (err, doc) {
 if(!err){
 //TODO: Verificar que funcione y optimizar para no floodear a clientes
 globals.io.sockets.emit('new comment', {id: data.id, author: data.author, content: data.content});
 }
 return callback(!err);
 });
 } else return callback(true);
 }
 );
 } else return callback(true);
 }*/
};

module.exports = PublicInterface;