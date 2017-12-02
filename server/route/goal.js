const express = require('express'),
    router = express.Router(),
    Goal = require("../model/goal"),
    Player = require("../model/user"),
    httphandler = require('../http_handlers.js');
const util = require('util');

var fs = require('fs');
//var Barc = require('barc');
//var barc = new Barc();

router.get('/all', function(req,res,next) {
    Goal.find({}, null, function(err, goals){
	if (err)
	    httphandler.answerJSonFailure(res, err.toString());
	else
	{
	    httphandler.answerJSonSuccess(res, goals);
	}

    });
});

router.get('/byId/:id', function(req,res,next) {
    Goal.findById(req.params.id, null, function(err, goal){
	if (err)
	    httphandler.answerJSonFailure(res, err.toString());
	else
	{
	    httphandler.answerJSonSuccess(res, goal);
	}

    });
});

router.post('/setGoalCompteur', function(req,res,next) {
    let cpt = req.body.compteur;

    Goal.findByIdAndUpdate(req.body.goal_id, { compteur: cpt }, function(err, goal){
	if (err)
	    httphandler.answerJSonFailure(res, err.toString());
	else
	{
	    httphandler.answerJSonSuccess(res, "");
	}

    });
});


router.post('/create', function(req, res, next) {
    let name = req.body.name;
    let code = req.body.code;
    let nb_pts = req.body.number_of_points;
    let counter = req.body.compteur;

    if (!name || !code || !nb_pts || !counter)
    {
	return httphandler.answerJSonFailure(res, "Expects a name, a code, a number of points and a counter for goal creation");
    }
    
    var goal = new Goal({
	name: name,
	code: code,
	number_of_points: nb_pts,
	compteur: counter
    });
    Goal.findOne({ 'code': code }, null, (err, f_goal) => {
	if (err)
	{
	    return httphandler.answerJSonFailure(res, "Error while getting goal");
	}
	if (!f_goal)
	{
	    goal.save(function(err, goal, nb_affected){
		if (err)
		    httphandler.answerJSonFailure(res, err.toString());
		else
		    httphandler.answerJSonSuccess(res, goal);
	    });
	}
	else{
	    return httphandler.answerJSonFailure(res, "This code already exists: " + f_goal.name);
	}

    });
});

router.delete('/:id', function (req, res){
    Goal.remove({_id: req.params.id}, function(err, goal){
	if (err){
	    httphandler.answerJSonFailure(res, err.toString());
	}
	else{
	    httphandler.answerJSonSuccess(res, goal);
	}
    });
});


module.exports = router;
