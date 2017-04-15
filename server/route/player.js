var express = require('express'),
    router = express.Router(),
    httphandler = require("../http_handlers"),
    Player = require("../model/user");
const util = require('util');


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

router.post('/create', function(req, res, next){
    let player = new User({
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
	    httphandler.answerJSonSuccess(res, user);
	}
    });
});

module.exports = router;
