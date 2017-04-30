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

router.post('/create', function(req, res, next) {
    var goal = new Goal({
	name: req.body.name,
	code: req.body.code,
	number_of_points: req.body.number_of_points
    });

    goal.save(function(err, goal, nb_affected){
	if (err)
	    httphandler.answerJSonFailure(res, err.toString());
	else
	    httphandler.answerJSonSuccess(res, goal);
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
