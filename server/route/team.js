var express = require('express'),
    router = express.Router(),
    Team = require("../model/team"),
    Player = require("../model/user"),
    httphandler = require('../http_handlers.js');
const util = require('util');
const       mongoose    = require('mongoose');

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

router.get('/byId/:id', function(req,res,next) {
    Team.findById(req.params.id, null, function(err, team){
	if (err)
	    httphandler.answerJSonFailure(res, err.toString());
	else
	{
	    httphandler.answerJSonSuccess(res, team);
	}

    });
});


router.get('/allByParty/:id', function(req,res,next) {
    Team.find({ party_id: req.params.id }, null, function(err, teams){
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

router.patch('/add_to_party', function(req, res, next) {    
    Team.findByIdAndUpdate(req.body.id, { party_id: req.body.party_id }, function(err, team){
	if (err)
	    httphandler.answerJSonFailure(res, err.toString());
	else
	{
	    httphandler.answerJSonSuccess(res, team);
	}	
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

router.patch('/add-player', function(req, res, next) {
    //console.log("body: " + util.inspect(req.body));
    const id_team = req.body.id_team;
    const id_player = req.body.id_player;
    Team.findById(id_team, function(err, team, nb_affected){
	if (err)
	    httphandler.answerJSonFailure(res, err.toString());
	else{
	    let list_players;
	    if (team.user_list)
		list_players = team.user_list;
	    else
		list_players = [];
	    list_players.push(id_player);
	    team.update({ user_list: list_players }, function(err, raw){
		Player.addToTeam(id_player, id_team, function(err, doc){
		    httphandler.answerJSonSuccess(res, doc);
		});
	    });	    	
	}
    });
});



module.exports = router;
