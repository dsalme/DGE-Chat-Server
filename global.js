"use strict";

module.exports = {

    io: {},

    defaultHttpResponseHandler: function (res, next) {
        return function(err, doc){
            if (!err) res.json(doc);
            else next(err);
        };
    },

    defaultSocketResponseHandler: function(callback) {
        return function (err, doc) {
            if (!err) callback(doc);
            else callback({ status: 500, error: 'Ocurrió un error al realizar la consulta' });
        };
    }

};