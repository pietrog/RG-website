var express = require('express'),
    router = express.Router(),
    httphandler = require("../http_handlers"),
    Player = require("../model/user");
const Team = require('../model/team');
const Goal = require('../model/goal');
const util = require('util');

router.post('/nameExists', function(req, res){

    let user_name = req.body.user_name;

    Player.findOne({ email: user_name}, null, function(err, player){
	if (player){
	    console.log("checcck ok ");
	    return httphandler.answerJSonSuccess(res, { reason: 'success' });
	}
	else{
	    return httphandler.answerJSonFailure(res, {data: { reason: 'not found' }});
	}
    });
});


router.post('/idFromName', function(req, res){

    let user_name = req.body.user_name;
    Player.findOne({ email: user_name}, null, function(err, player){
	if (err)
	    httphandler.answerJSonFailure(res, { reason: err.toString()});
	else
	{
	    if (!player){
		console.log("pas de joeur: "+ util.inspect(res.body));
		httphandler.answerJSonFailure(res, {data: { reason: 'not exist' }});
	    }
	    else{
		var data = { user_id: player._id, user_name: player.email, user_score: player.score };
		Team.findById(player.team, null, function(err, team) {
		    if (err){
			return httphandler.answerJSonFailure(res, err.toString());
		    }
		    else{
			if (!team){			    
			    return httphandler.answerJSonFailure(res, { reason: "Vous n'avez pas d'equipe !!" });
			}
			data.team_name = team.name;
			data.team_score = team.score;
			
			Team.findOne({ party_id: team.party_id, _id: { $ne: team._id }} , null, function(err, other_team) {
			    if (err){
				return httphandler.answerJSonFailure(res, { reason: err.toString() });
			    }
			    else{
				if (other_team){

				    data.other_team_name = other_team.name;
				    data.other_team_score = other_team.score;
				    console.log("par la: " + util.inspect(data));
				    return httphandler.answerJSonSuccess(res, data);

				}
			    }
			});
		    }
		});
	    }
	}
    });
});



router.post('/validateGoal', function(req, res){

    const id_player = req.body.player_id;
    const scanned_code = req.body.scanned_code;

    Player.findById(id_player, null, function(err, player){
	if (err)
	    return httphandler.answerJSonFailure(res, err.toString());
	else
	{
	    if (!player)
	    {
		return httphandler.answerJSonFailure(res);
	    }

	    //get the objective
	    Goal.findOne({ code: scanned_code }, null, function(err, goal) {
		if (err)
		    return httphandler.answerJSonFailure(res, err.toString());
		else
		{
		    if (!goal)
		    {
			return httphandler.answerJSonFailure(res);
		    }

		    const score = goal.number_of_points;
		    
		    player.incrementScore(score, function(err) {
			if (player.team)
			{
			    Team.findById(player.team, null, function(err, team) {
				team.incrementScore(score, function(err) {				   
				    return httphandler.answerJSonSuccess(res, score);
				});
			    });
			}
			else
			    return httphandler.answerJSonSuccess(res, score );
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
