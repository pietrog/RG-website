var express = require('express'),
    router = express.Router(),
    Team = require("../model/team"),
    httphandler = require('../http_handlers.js');


router.get('/all', function(req,res,next) {
    Team.find({}, null, function(err, teams){
	if (err)
	    httphandler.answerJSonFailure(res, err.toString());
	else
	{
	    httphandler.answerJSonSuccess(res, teams);
	}

    });
});

router.post('/create', function(req, res, next) {
    var team = new Team({
	name: req.body.name,
	score: 0
    });

    team.save(function(err, team, nb_affected){
	if (err)
	    httphandler.answerJSonFailure(res, err.toString());
	else
	    httphandler.answerJSonSuccess(res, team);
    });
});

router.delete('/:id', function (req, res){
    Team.remove({_id: req.params.id}, function(err, team){
	if (err){
	    httphandler.answerJSonFailure(res, err.toString());
	}
	else{
	    httphandler.answerJSonSuccess(res, team);
	}
    });
});


module.exports = router;
