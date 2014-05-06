"use strict";

var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    author: { type: String, required: true, index: true },
    content: { type: String, required: true },
    //tags: [ String ],
    likes: [
        {
            author: { type: String, required: true }
        }
    ],
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema, 'messages');