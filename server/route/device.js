var express = require('express'),
    router = express.Router(),
    httphandler = require("../http_handlers"),
    Player = require("../model/user");
const Team = require('../model/team');
const Goal = require('../model/goal');
const util = require('util');


router.post('/validateGoal', function(req, res){
    const id_player = req.body.player_id;
    const scanned_code = req.body.scanned_code;
    
    Player.findById(id_player, null, function(err, player){
	if (err)
	    return httphandler.answerJSonFailure(res, err.toString());
	else
	{
	    //get the objective
	    Goal.findOne({ code: scanned_code }, null, function(err, goal) {
		if (err)
		    return httphandler.answerJSonFailure(res, err.toString());
		else
		{
		    const score = goal.number_of_points;
		    console.log("target score: " + score);
		    player.incrementScore(score, function(err) {
			if (player.team)
			{

			    Team.findById(player.team, null, function(err, team) {
				team.incrementScore(score, function(err) {				   
				    return httphandler.answerJSonSuccess(res, team);
				});
			    });
			}
			else
			    return httphandler.answerJSonSuccess(res, updated_p);
		    });
		}
	    });
	}
    });
});

router.post('/healPlayer', function(req, res){
    const id_player = req.body.player_id;
    const healing_cost = -5;
    
    Player.findById(id_player, null, function(err, player){
	if (err)
	    return httphandler.answerJSonFailure(res, err.toString());
	else
	{
	    const score = healing_cost;
	    player.incrementScore(score, function(err) {
		if (player.team)
		{
		    Team.findById(player.team, null, function(err, team) {
			team.incrementScore(score, function(err) {				   
			    return httphandler.answerJSonSuccess(res, team);
			});
		    });
		}
		else
		    return httphandler.answerJSonSuccess(res, updated_p);
	    });
	}
    });
});


module.exports = router;
