var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Team = require('./team');
const Goal = require('./goal');

var Player = new Schema({
    name: {
	type: String,
	require: true,
	validate: NameValidation
    },
    role: {
	type: String,
	require: true
    },
    password: {
	type: String,
	require: true
    },
    token: {
	type: String
    },
    score: {
	type: Number,
	require: true,
	default: 0
    },
    team: {
	type: Schema.Types.ObjectId
    }
    
}, {bufferCommands: false});

function NameValidation(val){
    return val != null;
}


Player.statics.addToTeam = function(id_player, id_team, cb){
    return this.findByIdAndUpdate(id_player, { team: id_team }, cb);
};

Player.methods.excludeFromTeam = function(callback)
{
    this.team = null;
    this.save(callback);
}

Player.methods.incrementScore = function(score, callback)
{
    if(!this.score)
	this.score =0;
    this.score += score;
    this.save(callback);
}

module.exports = mongoose.model('Player', Player);
