var expect = require('expect.js');
var config = require('./config/config.js'),
    Team = require('../server/model/team.js'),
    Party = require('../server/model/party.js'),
    mongoose = require('mongoose'),
    Promise = require('bluebird');

mongoose.Promise = global.Promise;


describe('Party model ', function(){

    var global_team;

    before(function(done) {
	//Another possibility is to check if mongoose.connection.readyState equals 1
	if (mongoose.connection.db) return done();
	mongoose.connect('mongodb://localhost/testDBRG');
	done();

    });

    
    beforeEach(function(done){
	Party.remove({}).then(
	    function(err){
		var team_1 = new Team({
		    name: "REDS",
		    score: 0
		});

		var team_2 = new Team({
		    name: "BLUES",
		    score: 0
		});
		let p = new Party({ name: "BlueSkins" });
		
		Team.create(team_1, function(err, obj){
		    if (!err){
			Team.create(team_2, function(err, obj){
			    Party.create(p, function(err, obj){
				done();
			    });
			});
		    }
		    else{
			throw err;
		    }
		});

	    });
    })
    
    it('should be empty', function(done){
	Party.find({}, function(err, parties){
	    expect(parties.length).to.be(1);
	    done();
	});
    });

    it('should create an empty party', function(done){
	let p = new Party({ name: "RedBull" });
	Party.create(p, function(err, obj){
	    Party.find({}, function(err, parties){
		expect(parties.length).to.be(2);
		expect(parties[1].name).to.be("RedBull");
		expect(parties[1].started).to.be(false);
		done();
	    });
	});
    });


    it('should add a team to existing party', function(done){
	Team.findOne({name: "REDS"}, function(err, reds_party){
	    Party.findOne({name: "BlueSkins"}, function(err, party){
		party.add_team(reds_party._id, function(err){
		    expect(party.team_list.length).to.be(1);
		    party.add_team(reds_party._id, function(err){
			expect(party.team_list.length).to.be(2);
			done();
		    });
		});
	    });
	});
    });


});
