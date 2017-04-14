let env         = process.env.NODE_ENV || 'development',
    express     = require('express'),
    bodyParser = require('body-parser'),
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
    front_end: path.join(__dirname, '../dist'),
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
App.app.set('superSecret', config.secret);

//database connection
mongoose.connect(config.database);

App.app.use(bodyParser.json());
App.app.use(express.static(App.front_end));

App.app.use('/api/party', r_party);
//App.app.use('/api/team', r_team);

// Catch all other routes and return the index file
App.app.get('*', (req, res) => {
    console.log("Not caught by routes ! " + req.url);
  res.sendFile(path.join(App.front_end, 'index.html'));
});



module.exports = App;
