/**
 * Created by dsalmeron on 06/05/14.
 */
var router = require('express').Router();
module.exports = function (MessageModel) {

    var MessageController = require('./../../controllers/public/MessageController')(MessageModel);
    var ResponseHandlerProvider = require('./../../providers/ResponseHandlerProvider');

    router.get('/', function (req, res, next) {
        MessageController.findAllMessages(req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
    });

    router.put('/', function (req, res, next) {
        MessageController.newMessage(req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
    });

    router.put('/likeMessage', function (req, res, next) {
        MessageController.reverseLikeMessage(req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
    });

    return router;
}