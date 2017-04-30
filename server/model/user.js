var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Team = require('./team');
const Goal = require('./goal');

var Player = new Schema({
    email: {
	type: String,
	require: true,
	validate: EMailValidation
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
    
});

function EMailValidation(val){
    return val != null;
}


Player.statics.addToTeam = function(id_player, id_team, cb){
    return this.findByIdAndUpdate(id_player, { team: id_team }, cb);
};

Player.methods.incrementScore = function(score, callback)
{
    if(!this.score)
	this.score =0;
    this.score += score;
    console.log("score " + this.email + " est de " + this.score);
    this.save(callback);
}

module.exports = mongoose.model('Player', Player);
