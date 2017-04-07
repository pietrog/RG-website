var db = require('./models');
var express = require('express');
var router = express.Router(),
    Goal = require('../model/goal.js'),
    http_hdl = require('../http_handlers.js');
var fs = require('fs');
var Barc = require('barc');
var barc = new Barc();

// middleware that is specific to this router
router.use(['/mark'], json, function(req,res,next) {
    next();
});
router.get('/', function(req,res,next) {
    db.Goal.findAll().then(function(goals){console.log(goals); res.status(200).send({goals: goals});})
    Goal.find({}, function(err, goals){
	return http_handlers.answerJSonSuccess(res, goals);
    });
});


router.post('/', function(req, res, next) {
    
    var code = Math.floor(Math.random() * (9999999999999 - 1000000000000) + 1000000000000);
    code = code.toString();
    code = code.slice(0, code.length-1); // respect 128
    
    var buf = barc.code128(code, 300, 200);

    Goal.findOne({ name: req.body.name }, function(err, found){
	if (!found)
	{
	    fs.writeFile(req.body.name, buf, function() {
		res.status(200).send({goal: goal});
	    });
	}
	else
	    return http_handlers.answerJSonSuccess(res, "Name already created");
    });
    
});

router.post('/mark/team/:id', json, function(req, res, next) {
    Goal.findOne({ code: req.body.code }, function(err, found){
	//update user and team score
	console.log("CODE FOUND !!!");
	http_handlers.answerJSonSuccess(res, "FOUUUUUUND");
    });
});

module.exports = router;
