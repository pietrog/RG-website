var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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


module.exports = mongoose.model('Player', Player);
