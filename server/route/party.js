var express = require('express'),
    router = express.Router(),
    httphandler = require("../http_handlers"),
    Party = require("../model/party");


router.get('/all', function(req, res){
    console.log("HIPHIPHIP HOURRRRAAAAA");
    const parties = {
	"data": [{
		"name": "p1",
		"id": 12
	}, {
		"name": "p2",
		"id": 13
	}]
    };
    const data = "ahah";
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Accept', 'application/json');
    res.status(200).json(parties);    
    /*httphandler.answerJSonSuccess(res,
				  [
				      { name: "p1", id: 12 },
				      { name: "p2", id: 13 }
				  ]);*/
    /*Party.find({}, null, function(err, parties){
	if (err)
	    httphandler.answerJSonFailure(res, err.toString());
	else
	    httphandler.answerJSonSuccess(res, [{ name: "p1", id: 12 }]);
    });*/
});

router.post('/create', function(req, res, next){
    let party = new Party({
	name: req.body.name,
	started: false
	//timer: req.body.timer
    });

    party.save(function(err, party, nb_affected){
	if (err)
	    httphandler.answerJSonFailure(res, err.toString());
	else
	    httphandler.answerJSonSuccess(res, party);
    });
});

router.post('/start', function(err, res, next){
    console.log("Start party !!");
});

module.exports = router;
