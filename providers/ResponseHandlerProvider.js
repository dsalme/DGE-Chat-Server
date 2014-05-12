"use strict";

var ResponseHandlerProvider = {};

ResponseHandlerProvider.defaultHttpResponseHandler = function (res, next) {
    return function (err, doc) {
        if (err) return next(err);
        return res.json(doc);
    };
};

ResponseHandlerProvider.defaultSocketResponseHandler = function (callback) {
    return function (err, doc) {
        if (err) {
            if(!err.status) err.status = 500;
            if(!err.message) err.message = 'Something blew up';
            return callback({ status: err.status, message: err.message });
        }
        return callback(doc);
    };
};

module.exports = ResponseHandlerProvider;