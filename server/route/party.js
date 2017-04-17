var express = require('express'),
    router = express.Router(),
    httphandler = require("../http_handlers"),
    Party = require("../model/party");
const util = require('util');


router.get('/all', function(req, res){
    const parties_ = {
	"data": [{
	    "name": "p1",
	    "_id": 12
	}, {
	    "name": "p2",
	    "_id": 13
	}]
    };
    Party.find({}, null, function(err, parties){
	if (err)
	    httphandler.answerJSonFailure(res, err.toString());
	else
	{
	    httphandler.answerJSonSuccess(res, parties);
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

router.post('/start', function(err, res, next){
    console.log("Start party !!");
});


router.delete('/:id', function (req, res){
    console.log("HOURAA");
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
