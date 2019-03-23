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
const RGTemplates = require('./RGTemplates');

const Player  = require('./model/user');
const Goal    = require('./model/goal');
const Team    = require('./model/team');
const Party    = require('./model/party');
const RGProps    = require('./model/properties');

const util = require('util');

global.App = {
    app : express_app,
    server: http_server,
    mongoose_connection: mongoose.connect(config.database, { }, function(err){
	if (err)
	    console.log("Error while connecting to MongoDB server: " + util.inspect(err));
    }),
    port : tools.normalizePort(process.env.PORT || '3000'),
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

//database connection
console.log("PATH : " + App.front_end);
App.app.set('superSecret', config.secret);


App.app.use(bodyParser.json());
App.app.use(express.static(App.front_end));
//App.app.use("/scripts", express.static(__dirname + "/node_modules/bootstrap/dist/js/"));
App.app.use("/scripts", express.static(__dirname + "/../node_modules/bootstrap/dist/"));

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

    socket.on('start_stop_party', (data) => {
	const party_id = data.party_id;

	Party.findById(party_id, (err, party) => {
	    if (err)
	    {
		return;
	    }
	    else
	    {
		if (party)
		{

		    if (party.started){
			party.stop_game(() => {
			    console.log("stopped");
			    socket.emit('party_status_broadcast', {
				status: 'stop',
				p: party
			    });
			    return;
			});
		    }
		    else
		    {
			party.start_game(() => {
			    console.log("started");
			    socket.broadcast.emit('party_status_broadcast', {
				status: 'start',
				p: party
			    });
			    
			    return;
			});
		    }
		    
		    return;
		}
		return;
	    }
	});
    });
    
    socket.on('goal_scanned', (data) => {
	//const result = Scoring.onGoalScanned(socket, data.player_id, data.scanned_code);

	const player_id = data.player_id;
	const scanned_code = data.scanned_code;
	//console.log("{name: 'Black ', code: '" + scanned_code + "', number_of_points: 500, compteur: 1},");
	console.log("code: " + scanned_code + " player: " + player_id);
	Player.findById(player_id, (err, player) => {

	    if (err)		
	    {
		SocketUtils.ReplyGoalScannedFailed(socket, err.toString());
		return ;
	    }
	    else
	    {
		if (!player)
		{
			    console.log("qsdkjvfhkqsdj : " + player);
		    SocketUtils.ReplyGoalScannedFailed(socket, "Player not found");
		    return ;
		}

		Goal.findOne({ code: scanned_code }, null, function(err, goal){

		    if (err)
		    {
			SocketUtils.ReplyGoalScannedFailed(socket, err.toString());
			return ;
		    }
		    else
		    {
			if (!goal)			 
			{
			    SocketUtils.ReplyGoalScannedFailed(socket, "Cet objectif n'existe pas");
			    return ;
			}
			if (goal.compteur == 0)
			{
			    SocketUtils.ReplyGoalScannedFailed(socket, "Cet objectif est deja validé");
			    return ;
			}
			
			const score = goal.number_of_points;
			const name_target = goal.name;

			if (!player.team)
			{
			    SocketUtils.ReplyGoalScannedFailed(socket, player.name + ", tu n'es dans aucune équipe !");
			    return ;
			}
			
			player.incrementScore(score, function(err) {
			    
			    Team.findById(player.team, null, function(err, team){

				if (!team)
				{
				    SocketUtils.ReplyGoalScannedFailed(socket, "Cette équipe n'existe plus.");
				    return;
				}
				team.incrementScore(score, function(err){
				    goal.validateGoal(() => {
					SocketUtils.ReplyGoalScannedSuccessed(socket,
									      player_id, player.name,
									      team._id, team.name,
									      player.score, team.score, score,
									      name_target);
					//emit message to update validated goals counter
					Goal.count({compteur: 0}, (err, count_) => {					    	
					    socket.emit('validated_goals_count', { count: count_ });
					    socket.broadcast.emit('validated_goals_count', { count: count_ });
					});
					
					return;
				    });
				});
			    });
			    
			});
		    }
		});
	    }
	});

    });

    socket.on('clear_database', () => {
	console.log("clear database");
	Player.remove({}, () => {
	    Goal.remove({}, () => {
		Player.remove({}, () => {
		    Team.remove({}, () => {
			Party.remove(() => {
			    socket.emit('database_cleared');
			    socket.broadcast.emit('database_cleared');
			});
		    });
		});
	    });
	})
    });

    socket.on('get_active_template', () => {
	RGProps.get_active_template((active_template) => {
	    socket.emit('get_active_template', active_template);
	});
    })
    
    socket.on('load_template', (data) => {
	console.log('load template: ' + data);
	if (data.name === "black_shadow")
	{
	    RGTemplates.loadBlackShadow(socket);
	    
	}
	else if (data.name === "jungle")
	{
	    RGTemplates.loadJungle(socket);
	}
	else if (data.name === "fire")
	{
	    RGTemplates.loadFire(socket);
	}
	else if (data.name === "Airsoft League")
	{
	    RGTemplates.loadAirsoftLeague(socket);
	}
	else if (data.name === "Airsoft League Pool 1")
	{
	    RGTemplates.loadPool1(socket);
	}
	else if (data.name === "Airsoft League Pool 2")
	{
	    RGTemplates.loadPool2(socket);
	}
	else
	{
	    console.log("unknown template");
	}
    });
});


module.exports = App;

