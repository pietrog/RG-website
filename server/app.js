var env         = process.env.NODE_ENV || 'development',
    express     = require('express'),
    tools       = require('./tools'),
    path        = require('path'),
    mongoose    = require('mongoose'),
    config      = require('./config/config.js'),
    r_party     = require('./route/party'),
    r_team      = require('./route/team');

global.App = {
    app : express(),
    port : tools.normalizePort(process.env.PORT || '3000'),
    //version : packageJson.version,
    root : path.join(__dirname, '..'),
    front_end: path.join(__dirname, '../src'),
    appPath : function(path){
	return this.root + '/' + path;
    },
    require : function(path){
	return require(this.appPath(path));
    },
    env : env,
    start : function(){
	if (!this.started){
	    this.started = true;
	    this.app.listen(this.port);
	    console.log('Running node server version ' + this.version + ' on port ' + this.port + ' in env ' + this.env ); 
	}
    }
}

console.log("PATH : " + App.front_end);

//database connection
mongoose.connect(config.database);
App.app.set('superSecret', config.secret);

App.app.use('/party', r_party);
App.app.use('/team', r_team);

App.app.use(express.static(App.front_end));


module.exports = App;
