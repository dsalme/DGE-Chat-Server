"use strict";

var ErrorProvider = {
    getDatabaseError: function(){
        var error = new Error();
        error.status = 500;
        error.message = 'DB error';
        console.error("DB ERROR: " + JSON.stringify(error));
        return error;
    },
    getMissingParametersError: function(){
        var error = new Error();
        error.status = 400;
        error.message = 'Some parameters are missing';
        console.error("PARAMETERS MISSING: " + JSON.stringify(error));
        return error;
    },
    getLoginError: function(){
        var error = new Error();
        error.status = 401;
        error.message = 'Wrong username or password';
        console.error("WRONG LOGIN: " + JSON.stringify(error));
        return error;
    },
    getSaltError: function(){
        var error = new Error();
        error.status = 500;
        error.message = 'Password encryption error';
        console.error("SALT ERROR: " + JSON.stringify(error));
        return error;
    },
    getGoogleAPIsError: function(){
        var error = new Error();
        error.status = 500;
        error.message = 'Error while using Google APIs';
        console.error("ERROR AT GAPIs: " + JSON.stringify(error));
        return error;
    },
    consoleGoogleAPIsError: function(){
        var error = new Error();
        error.status = 500;
        error.message = 'Error while using Google APIs';
        console.error("ERROR AT GAPIs: " + JSON.stringify(error));
        // No return here
    }
};

module.exports = ErrorProvider;