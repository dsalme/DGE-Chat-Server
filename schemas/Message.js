"use strict";

var Schema = require('mongoose').Schema;

var MessageSchema = new Schema({
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

module.exports = MessageSchema;