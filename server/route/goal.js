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
    Goal.find({},
	      null,
	      {
		  sort: {name: 1}
	      },
	      function(err, goals){
	if (err)
	    httphandler.answerJSonFailure(res, err.toString());
	else
	{
	    httphandler.answerJSonSuccess(res, goals);
	}

    });
});

router.get('/allValidated', function(req,res,next) {
    Goal.find({compteur: 0}, null, function(err, goals){
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

router.post('/setGoalScore', function(req,res,next) {
    let score_ = req.body.score;

    Goal.findByIdAndUpdate(req.body.goal_id, {number_of_points: score_ }, function(err, goal){
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
    let bcode = req.body.code || req.body.code.text;
    let nb_pts = req.body.number_of_points;
    let counter = req.body.compteur || -1;

    //console.log("On est la:  name: " + name + " code: " + _code.text + " pts: "+ nb_pts + " counter: " + counter );
    if (!name || !bcode || !nb_pts || !counter)
    {
	//console.log("On est la:  name: " + name + " code: " + code + " pts: "+ nb_pts + " counter: " + counter );
	return httphandler.answerJSonFailure(res, "Expects a name, a code, a number of points and a counter for goal creation");
    }
    
    var goal = new Goal({
	name: name,
	code: bcode,
	number_of_points: nb_pts,
	compteur: counter
    });
    Goal.findOne({ 'code': goal.code }, null, (err, f_goal) => {
	if (err)
	{
	    //console.log("error in findOne" + err.toString());
	    return httphandler.answerJSonFailure(res, "Error while getting goal");
	}
	if (!f_goal)
	{
	    //console.log("Ajout de l'objectif ! " + goal.name);
	    goal.save(function(err, n_goal, nb_affected){
		if (err)
		{
		    console.log("error while saving goal : " + bcode );
		    return httphandler.answerJSonFailure(res, err.toString());
		}
		else
		    return httphandler.answerJSonSuccess(res, n_goal);
	    });
	}
	else{
	    console.log("goal found !!!");
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
