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
	    return httphandler.answerJSonSuccess(res, "");
	}
	else{
	    return httphandler.answerJSonFailure(res, user_name + " n'existe pas.");
	}
    });
});


router.post('/idFromName', function(req, res){

    let user_name = req.body.user_name;
    Player.findOne({ email: user_name}, null, function(err, player){
	if (err)
	    return httphandler.answerJSonFailure(res, err.toString());
	else
	{
	    if (!player){
		return httphandler.answerJSonFailure(res, user_name + " n'existe pas");
	    }
	    else{
		var data = { user_id: player._id, user_name: player.email, user_score: player.score };
		Team.findById(player.team, null, function(err, team) {
		    if (err){
			return httphandler.answerJSonFailure(res, err.toString());
		    }
		    else{
			if (!team){			    
			    return httphandler.answerJSonFailure(res, { reason: "Vous n'avez pas d'equipe !" });
			}
			data.team_name = team.name;
			data.team_score = team.score;
			
			Team.findOne(
			    {
				party_id: team.party_id,
				_id: { $ne: team._id }
			    } , null, function(err, other_team) {
				if (err){
				    return httphandler.answerJSonFailure(res, err.toString());
				}
				else{
				    if (other_teams){
					//data.others = [];
					data.other_team_name = other_team.name;
					data.other_team_score = other_team.score;
					return httphandler.answerJSonSuccess(res, data);
				    }
				    else
				    {
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


module.exports = router;
