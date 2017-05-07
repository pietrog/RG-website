//init express, http server and attaches io socket
const express     = require('express'),
      express_app = express();
const http        = require('http'),
      http_server = http.Server(express_app);
const io          = require('socket.io'),
      io_socket   = io(http_server);

//tools
const env         = process.env.NODE_ENV || 'development',
      bodyParser  = require('body-parser'),
      tools       = require('./tools'),
      path        = require('path'),
      mongoose    = require('mongoose'),
      config      = require('./config/config.js');

//routes 
const r_party   = require('./route/party'),
      r_player    = require('./route/player'),
      r_team      = require('./route/team'),
      r_goal      = require('./route/goal'),
      r_device    = require('./route/device');


global.App = {
    app : express_app,
    server: http_server,
    io: io_socket,
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
	    this.server.listen(this.port);
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

App.app.use('/api/device', r_device);
App.app.use('/api/party', r_party);
App.app.use('/api/player', r_player);
App.app.use('/api/teams', r_team);
App.app.use('/api/goals', r_goal);

// Catch all other routes and return the index file
App.app.get('*', (req, res) => {
    console.log("Not caught by routes ! " + req.url);
  res.sendFile(path.join(App.front_end, 'index.html'));
});

App.io.on('connection', function(socket) {
    console.log("A user is connected ");

    socket.broadcast.emit('b_message', 'A user is connected !!!!');

    socket.on('echoTest', (message) => {
	App.io.emit('echo', {type: 'new-message', text: message});
    });

    
});


module.exports = App;
