//init express, http server and attaches io socket
const express     = require('express'),
      express_app = express();
const http        = require('http'),
      http_server = http.Server(express_app);
const RTServer    = require('./RTServer.js')

const server_io = require('socket.io');

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

const SocketUtils = require('./SocketUtils');

const Player  = require('./model/user');
const Goal    = require('./model/goal');
const Team    = require('./model/team');

const util = require('util');

global.App = {
    app : express_app,
    server: http_server,
    mongoose_connection: mongoose.connect(config.database, { useMongoClient: true }, function(err){
	if (err)
	    console.log("Error while connecting to MongoDB server: " + util.inspect(err));
    }),
    //io_server: new RTServer(http_server),
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


var io = new server_io(http_server);
io.on('connection', (socket) => {
    console.log("New client connected !!");
    
    socket.on('disconnect', (reason) => {
	console.log("Client disconected: "+ reason);
    });

    socket.on('goal_scanned', (data) => {
	//const result = Scoring.onGoalScanned(socket, data.player_id, data.scanned_code);

	const player_id = data.player_id;
	const scanned_code = data.scanned_code;
	
	Player.findById(player_id, (err, player) => {

	    if (err)
	    {
		SocketUtils.AnswerGoalScannedFailed(socket, "Error while loading the player");
		return SocketUtils.ReturnError();
	    }
	    else
	    {
		Goal.findOne({ code: scanned_code }, null, function(err, goal){

		    if (err)
		    {
			SocketUtils.AnswerGoalScannedFailed(socket, "Error while taking the target");
			return SocketUtils.ReturnError();
		    }
		    else
		    {
			if (!goal)			 
			{
			    SocketUtils.AnswerGoalScannedFailed(socket, "Target does not exist");
			    return SocketUtils.ReturnError();
			}

			const score = goal.number_of_points;
			console.log('goal found '+ util.inspect(player));

			if (!player.team)
			{
			    SocketUtils.AnswerGoalScannedFailed(socket, player.email + " not in a team");
			    return SocketUtils.ReturnError();
			}
			
			player.incrementScore(score, function(err) {
			    Team.findById(player.team, null, function(err, team){
				team.incrementScore(score, function(err){
				    SocketUtils.ReplyGoalScannedSuccessed(socket, score, team.score, team._id);
				    //return SocketUtils.ReturnSuccess({team_id: team._id, team_score: team.score});
				});
			    });
			    
			});
		    }
		});
	    }
	});

	/*if (result.result !== 'failed')
	{
	    SocketUtils.BroadcastGoalScannedSuccessed(socket, result.team_id, result.team_score);
	}
	else
	{
	    SocketUtils.AnswerGoalScannedFailed(socket, "wtf");
	}*/
    });

    
    socket.on('goal_scanned', function(data){
	
	//const result = Scoring.onGoalScanned(socket, data.player_id, data.scanned_code);
	/*if (result.result !== 'failed')
	{
	    SocketUtils.BroadcastGoalScannedSuccessed(socket, result.team_id, result.team_score);
	}
	else
	{
	    SocketUtils.AnswerGoalScannedFailed(socket, "wtf");
	}*/
    });

});


module.exports = App;
