"use strict";

var jwt = require('jsonwebtoken');
var config = require('./../local');

module.exports = function (req, res, next) {
    var token = false;
    var error = false;
    if (req.headers && req.headers.authorization) {
        var parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {
            var scheme = parts[0], credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        } else {
            error = new Error('Wrong auth format: Bearer [token]');
            error['status'] = 401;
            return next(error);
        }
    } else {
        error = new Error('No auth header was found');
        error['status'] = 401;
        return next(error);
    }

    jwt.verify(token, config.jwtSecret, function (err, decoded) {
        if (!err) {
            req.user = decoded;
            return next();
        } else {
            error = new Error('Invalid token');
            error['status'] = 401;
            return next(error);
        }
    });
};