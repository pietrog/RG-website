var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Team = require('./team.js');

const Promise = require('bluebird');

mongoose.Promise = global.Promise;

var Party = new Schema({
    name: {
	type: String,
	require: true
    },
    started: {
	type: Boolean,
	require: true,
	default: false
    },
    team_list: [ Schema.Types.ObjectId ],
    goal_list: [ Schema.Types.ObjectId ],
    creation_date: {
	type: Date,
	require: true,
	default: Date.now
    },
    start_date: {
	type: Date
    }
});

Party.methods.add_team = function(team_id, callback){
    if (!this.team_list)
    {
	this.team_list = [team_id];
    }
    else
    {
	this.team_list.push(team_id);
    }
    this.save(callback);
};

Party.methods.add_goal = function(goal_id, callback){
    if (!this.team_list)
    {
	this.goal_list = [goal_id];
    }
    else
    {
	this.goal_list.push(goal_id);
    }
    this.save(callback);
};

Party.methods.start_game = function(callback){
    this.started = true;
    this.save(callback);
};

Party.methods.stop_game = function(callback){
    this.started = false;
    this.save(callback);
};


module.exports = mongoose.model('Party', Party);
