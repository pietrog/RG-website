var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
    name: {
	type: String,
	require: true
    },
    score: {
	type: Number,
	require: true
    }
});


module.exports = mongoose.model('Team', TeamSchema);
