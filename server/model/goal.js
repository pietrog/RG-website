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
    validated: {
	type: Boolean,
	require: true,
	default: false
    },
    list_party: [ Schema.Types.ObjectId ]

});


GoalSchema.methods.validateGoal = function(callback)
{
    this.validated = true;
    this.save(callback);
}


GoalSchema.methods.resetGoal = function(callback)
{
    this.validated = false;
    this.save(callback);
}


module.exports = mongoose.model('Goal', GoalSchema);
