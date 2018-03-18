var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const util = require('util');

var RGProps = new Schema({
    name: {
	type: String,
	require: true,

    },
    value: {
	type: String,
	require: true
    },
    
}, {bufferCommands: false});

RGProps.statics.set_active_template = function(template_name, cb){

    return this.findOne({ name: 'active_template' }, (err, prop) => {
	if (err)
	{
	    console.log('error while update active template name');	    
	}
	else
	{
	    //if null, create it
	    if (!prop)
	    {
		return  this.create({ name: 'active_template', value: template_name}, (err, prop) => {
		    if (err)
			console.log("prop error: " + err);
		});
	    }
	    else
	    {
		prop.value = template_name;
		prop.save();
	    }
	}
    });
};

RGProps.statics.get_active_template = function(cb){
    this.findOne({name: 'active_template'}, (err, prop) => {
	return cb(prop.value);
    });
}


module.exports = mongoose.model('RGProps', RGProps);
