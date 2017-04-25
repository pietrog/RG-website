var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GoalSchema = new Schema({
    name: {
	type: String,
	required: true
    },
    value: {
	type: Number
    },
    code: {
	type: String,
	required: true
    },
    number_of_points: {
	type: Number,
	require: true
    },
    list_party: [ Schema.Types.ObjectId ]

});

module.exports = mongoose.model('Goal', GoalSchema);
