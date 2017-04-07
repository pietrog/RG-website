var expect = require('expect.js');
var config = require('./config/config.js'),
    Team = require('../server/model/team.js'),
    mongoose = require('mongoose'),
    Promise = require('bluebird');

mongoose.Promise = global.Promise;

describe('Team model ', function(){

    var global_team;

    before(function(done) {
	//Another possibility is to check if mongoose.connection.readyState equals 1
	if (mongoose.connection.db)
	    return done();
	mongoose.connect('mongodb://localhost/testDBRG');
	done();

    });

    
    beforeEach(function(done){
	Team.remove({}).then(
	    function(err){
		var team = new Team({
		    name: "REDS",
		    score: 0
		});
		
		Team.create(team, function(err, obj){
		    if (!err){
			global_team = obj;
			done();
		    }
		    else{
			throw err;
		    }
		});

	    });
    })
    
    it('should contain one team', function(done){
	Team.find({name: "REDS"}, function(err, teams){
	    expect(teams.length).to.be(1);
	    expect(teams[0].name).to.be("REDS");
	    expect(teams[0].score).to.be(0);
	    done();
	});
    });





});
