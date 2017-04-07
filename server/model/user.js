var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    email: {
	type: String,
	require: true,
	validate: EMailValidation
    },
    password: {
	type: String,
	require: true
    },
    team: {
	type: Schema.types.ObjectId
    },
    token: {
	type: String
    }
    score: {
	type: Number,
	require: true,
	default: 0
    }
    
});

module.exports = mongoose.model('User', User);



function EMailValidation(val){
    return val != null;
}
