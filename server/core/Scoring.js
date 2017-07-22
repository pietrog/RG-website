const Team = require('../model/team');
const Goal = require('../model/goal');
const Player = require('../model/user');

const util = require('util');
const SocketUtils = require('../SocketUtils');

const       mongoose    = require('mongoose');

global.Scoring =
{

    onGoalScanned: function(socket, player_id, scanned_code)
    {
	Player.findById(player_id, (err, player) => {
	    console.log("player found");
	    if (err)
	    {
		SocketUtils.AnswerGoalScannedFailed(socket, "Error while loading the player");
		return SocketUtils.ReturnError();
	    }
	    else
	    {
		Goal.findOne({ code: scanned_code }, null, function(err, goal){
		    if (err)
		    {
			SocketUtils.AnswerGoalScannedFailed(socket, "Error while taking the target");
			return SocketUtils.ReturnError();
		    }
		    else
		    {
			if (!goal)			 
			{
			    SocketUtils.AnswerGoalScannedFailed(socket, "Target does not exist");
			    return SocketUtils.ReturnError();
			}

			const score = goal.number_of_points;

			if (!player.team)
			{
			    SocketUtils.AnswerGoalScannedFailed(socket, player.email + " not in a team");
			    return SocketUtils.ReturnError();
			}
			
			player.incrementScore(score, function(err) {
			    Team.findById(player.team, null, function(err, team){
				team.incrementScore(score, function(err){
				    SocketUtils.AnswerGoalScanSuccessed(score, team.score);
				    return SocketUtils.ReturnSuccess({team_id: team._id, team_score: team.score});
				});
			    });
			    
			});
		    }
		});
	    }
	});
    }
    
}


module.exports = Scoring;
