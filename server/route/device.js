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
			
			Team.find(
			    {
				party_id: team.party_id,
				_id: { $ne: team._id }
			    } , null, function(err, other_teams) {
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
					    
					    if (other_teams && other_teams.length > 0){
						data.other_teams = [];
						for(i = 0; i < other_teams.length; ++i){
						    data.other_teams.push({name: other_teams[i].name, score: other_teams[i].score});						    
						}						
					    }
					    console.log("teeeams : " +util.inspect(data.other_teams));
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
