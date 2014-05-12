/**
 * Created by dsalmeron on 08/05/14.
 */
"use strict";

var fs = require('fs');

var ConfigurationProvider = {};

ConfigurationProvider.jwtSecret = 'gdg';

ConfigurationProvider.google = {
    clientId: '690483847012-a7t3hdmddqio4e53folppsgpstbfccgh.apps.googleusercontent.com',
    secret: 'x9xncg5N9xpPl6u2ym7Gieq3'
};

ConfigurationProvider.sslCredentials = {
    key: fs.readFileSync('sslcert/private.key', 'utf8'),
    cert: fs.readFileSync('sslcert/certificate.crt', 'utf8'),
    requestCert: false,
    rejectUnauthorized: false
};

module.exports = ConfigurationProvider;