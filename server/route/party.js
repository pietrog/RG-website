var express = require('express'),
    router = express.Router(),
    httphandler = require("../http_handlers"),
    Team = require('../model/team'),
    Party = require("../model/party");
const util = require('util');


router.get('/all', function(req, res){
    Party.find({}, null, function(err, parties){
	if (err)
	    httphandler.answerJSonFailure(res, err.toString());
	else
	{
	    httphandler.answerJSonSuccess(res, parties);
	}
    });
});

router.get('/allStarted', function(req, res){
    Party.aggregate([
	{
	    $match: {
		started: true
	    }
	},
	{
	    $lookup: {
		from: "teams",
		localField: "_id",
		foreignField: "party_id",
		as: "team_list"
	    }
	},
	{
	    $unwind: {
		path: '$team_list',
		preserveNullAndEmptyArrays: true
	    }
	},
	{
	    $lookup: {
		from: "players",
		localField: "team_list._id",
		foreignField: "team",
		as: "team_list.players"
	    }
	},
	{
	    $group: {
		_id: "$_id",
		name: { $first: "$name" },
		teams: { $push: "$team_list" }
	    }
	}
    ], function(err, parties){
	if (err)
	{
	    httphandler.answerJSonFailure(res, err.toString());
	}
	else
	{
	    console.log(util.inspect(parties));
	    //console.log("team : " + util.inspect(parties[1].teams[0]));
	    return httphandler.answerJSonSuccess(res, parties);
	}
    });
});


router.post('/create', function(req, res, next){
    let party = new Party({
	name: req.body.name
    });

    party.save(function(err, party, nb_affected){
	if (err){
	    httphandler.answerJSonFailure(res, err.toString());
	}
	else{
	    console.log("voici: "+ nb_affected);
	    httphandler.answerJSonSuccess(res, party);
	}
    });
});

router.patch('/add-goal', function(req, res, next) {
    const party_id = req.body.party_id;
    const goal_id = req.body.goal_id;
    Party.findByIdAndUpdate(party_id, { goal_list: goal_id }, function(err, team){
	if (err)
	    httphandler.answerJSonFailure(res, err.toString());
	else
	{
	    httphandler.answerJSonSuccess(res, team);
	}	
    });
});


router.patch('/start-stop', function(req, res, next) {
    const party_id = req.body.id;
    const started = req.body.started;
    Party.findById(party_id, function(err, party){
	if (err)
	    httphandler.answerJSonFailure(res, err.toString());
	else
	{
	    if (!started){
		party.start_game();
		party.started = true;
	    }
	    else{
		party.stop_game();
		party.started = false;
	    }
	    httphandler.answerJSonSuccess(res, party);
	}	
    });
});



router.delete('/:id', function (req, res){
    Party.remove({_id: req.params.id}, function(err, party){
	if (err){
	    httphandler.answerJSonFailure(res, err.toString());
	}
	else{
	    httphandler.answerJSonSuccess(res, party);
	}
    });
});

module.exports = router;
