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


module.exports = mongoose.model('Team', TeamSchema);
