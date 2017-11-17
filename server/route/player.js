var express = require('express'),
    router = express.Router(),
    httphandler = require("../http_handlers"),
    Player = require("../model/user");
const util = require('util');
const RTServer    = require('../RTServer.js');

router.get('/all', function(req, res){
    Player.find({}, null, function(err, players){
	if (err)
	    httphandler.answerJSonFailure(res, err.toString());
	else
	{
	    httphandler.answerJSonSuccess(res, players);
	}
    });
});



router.post('/allWithIds', function(req, res){    
    Player.find({ _id: { $in: req.body.list_ids }}, null, function(err, players){
	if (err)
	    httphandler.answerJSonFailure(res, err.toString());
	else
	{
	    httphandler.answerJSonSuccess(res, players);
	}
    });
});


router.post('/create', function(req, res, next){
    let player = new Player({
	email: req.body.email
    });
    player.save(function(err, player, nb_affected){
	if (err){
	    httphandler.answerJSonFailure(res, err.toString());
	}
	else{
	    httphandler.answerJSonSuccess(res, player);
	}
    });
});

router.delete('/:id', function (req, res){
    Player.remove({_id: req.params.id}, function(err, player){
	if (err){
	    httphandler.answerJSonFailure(res, err.toString());
	}
	else{
	    httphandler.answerJSonSuccess(res, player);
	}
    });
});

module.exports = router;
