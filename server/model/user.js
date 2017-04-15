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
    }
    
});

module.exports = mongoose.model('Player', Player);



function EMailValidation(val){
    return val != null;
}
