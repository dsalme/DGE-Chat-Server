/**
 * Created by dsalmeron on 06/05/14.
 */
var express = require('express');
var router = express.Router();

var MessageController = require('./../../controllers/public/MessageController');
var ResponseHandlerProvider = require('./../../providers/ResponseHandlerProvider');

router.get('/', function(req, res, next){
   MessageController.findAllMessages(req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.put('/', function(req, res, next){
    MessageController.createMessage(req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

router.put('/likeMessage', function(req, res, next){
    MessageController.reverseLikeMessage(req.body, ResponseHandlerProvider.defaultHttpResponseHandler(res, next));
});

module.exports = router;