var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GoalSchema = new Schema({
    name: {
	type: String,
	required: true
    },
    code: {
	type: String,
	required: true
    },
    number_of_points: {
	type: Number,
	required: true
    },
    compteur: {
	type: Number,
	required: true,
	default: -1
    },
    label: {
	type: String,
	default: "Divers"	
    },
    list_party: [ Schema.Types.ObjectId ]

});


GoalSchema.methods.validateGoal = function(callback)
{
    if (this.compteur > 0)
    this.compteur -= 1;
    this.save(callback);
}


module.exports = mongoose.model('Goal', GoalSchema);
