var express = require('express'),
    router = express.Router(),
    httphandler = require("../http_handlers"),
    Player = require("../model/user");
const Team = require('../model/team');
const Party = require('../model/party');
const Goal = require('../model/goal');
const util = require('util');

router.post('/nameExists', function(req, res){

    let user_name = req.body.user_name;
    console.log("sdkfb: " + user_name);
    Player.findOne({ name: user_name}, null, function(err, player){
	if (player){
	    return httphandler.answerJSonSuccess(res, "");
	}
	else{
	    return httphandler.answerJSonFailure(res, user_name + " n'existe pas.");
	}
    });
});


router.post('/idFromName', function(req, res){

    if (!req.body.user_name)
	return httphandler.answerJSonFailure(res, "Impossible d'identifier un utilisateur inexistant !!");
    
    let user_name = req.body.user_name;
    
    Player.findOne({ name: user_name}, null, function(err, player){
	if (err)
	    return httphandler.answerJSonFailure(res, err.toString());
	else
	{
	    if (!player){
		return httphandler.answerJSonFailure(res, user_name + " n'existe pas");
	    }
	    else{
		var data = {
		    user_id: player._id,
		    user_name: player.name,
		    user_role: player.role,
		    user_score: player.score
		};

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
				    Party.findById(team.party_id, null, (err, party) => {
					if (err)
					{
					    return httphandler.answerJSonFailure(res, err.toString());
					}
					else
					{
					    if (other_team){
						data.other_team_name = other_team.name;
						data.other_team_score = other_team.score;
					    }
					    data.party_name = party.name;
					    return httphandler.answerJSonSuccess(res, data);
					};
				    })
				    
				}
			    })
		    }
		})
	    }
	}
    })
})


module.exports = router;
