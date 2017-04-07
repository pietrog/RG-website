var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Goal = new Schema({
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
    is_tagged: {
	type: Boolean,
	require: true
    },
    party = Schema.Types.ObjectId
});

module.exports = mongoose.model('Goal', Goal);
