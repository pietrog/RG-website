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
    },
    user_list: [ Schema.Types.ObjectId ],
    party_id: {
	type: Schema.Types.ObjectId
    }
});

TeamSchema.methods.incrementScore = function(score, callback)
{
    if(!this.score)
	this.score =0;
    this.score += score;
    this.save(callback);
}


module.exports = mongoose.model('Team', TeamSchema);
