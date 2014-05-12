"use strict";

var ErrorProvider = {};

ErrorProvider.getDatabaseError = function () {
    var error = new Error();
    error.status = 500;
    error.message = 'DB error';
    console.error("DB ERROR: " + JSON.stringify(error));
    return error;
};

ErrorProvider.getMissingParametersError = function () {
    var error = new Error();
    error.status = 400;
    error.message = 'Some parameters are missing';
    console.error("PARAMETERS MISSING: " + JSON.stringify(error));
    return error;
};

ErrorProvider.getLoginError = function () {
    var error = new Error();
    error.status = 401;
    error.message = 'Wrong username or password';
    console.error("WRONG LOGIN: " + JSON.stringify(error));
    return error;
};

ErrorProvider.getSaltError = function () {
    var error = new Error();
    error.status = 500;
    error.message = 'Password encryption error';
    console.error("SALT ERROR: " + JSON.stringify(error));
    return error;
};

ErrorProvider.getGoogleAPIsError = function () {
    var error = new Error();
    error.status = 500;
    error.message = 'Error while using Google APIs';
    console.error("ERROR AT GAPIs: " + JSON.stringify(error));
    return error;
};

ErrorProvider.consoleGoogleAPIsError = function () {
    var error = new Error();
    error.status = 500;
    error.message = 'Error while using Google APIs';
    console.error("ERROR AT GAPIs: " + JSON.stringify(error));
    // No return here
};

ErrorProvider.getTokenError = function () {
    var error = new Error();
    error.status = 401;
    error.message = 'Invalid token';
    console.error("GetToken ERROR: " + JSON.stringify(error));
    return error;
};

ErrorProvider.getWrongAuthFormatError = function () {
    var error = new Error();
    error.status = 401;
    error.message = 'Wrong auth format: Bearer [token]';
    console.error("Wrong auth format: " + JSON.stringify(error));
    return error;
};

ErrorProvider.getNotAuthBearerError = function () {
    var error = new Error();
    error.status = 401;
    error.message = '1st Auth parameter is not Bearer';
    console.error('getNotAuthBearerError: ' + JSON.stringify(error));
    return error;
};

ErrorProvider.getWrongAuthParametersError = function () {
    var error = new Error();
    error.status = 401;
    error.message = 'No auth header or authorization was found';
    console.log('getWrongAuthParametersError: ' + JSON.stringify(error));
    return error;
};

ErrorProvider.getNotFoundError = function () {
    var error = new Error();
    error.status = 404;
    error.message = 'Not Found';
    console.log('Not found: ' + JSON.stringify(error));
    return error;
};

module.exports = ErrorProvider;