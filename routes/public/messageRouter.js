/**
 * Created by dsalmeron on 06/05/14.
 */
var express = require('express');
var router = express.Router();

var MessageController = require('./../../controllers/public/MessageController');
var globals = require('./../../global');

router.get('/', function(req, res, next){
   MessageController.findAllMessages(req.body, globals.defaultHttpResponseHandler(res, next));
});

router.post('/', function(req, res, next){
    MessageController.createMessage(req.body, globals.defaultHttpResponseHandler(res, next));
});

module.exports = router;