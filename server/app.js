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
const Party    = require('./model/party');

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

    socket.on('load_template', (data) => {
	console.log('load template: ' + data);
	if (data.name === "black_shadow")
	{
	    Party.create({name: "War Town", started: true}, (err, party) => {
		Player.create({name: 'Billy', role: 'Leader', password: 'leader'},
			      {name: 'John', role: 'Radio', password: 'radio'},
			      {name: 'Rachid', role: 'Hacker', password: 'hacker'},
			      {name: 'Rocco', role: 'Charoniard', password: 'charoniard'},
			      //{name: 'Sean', role: 'Medic', password: 'charoniard'},
			      {name: 'Tresor', role: 'Leader', password: 'leader'},
			      {name: 'Sissoko', role: 'Radio', password: 'radio'},
			      {name: 'Dembele', role: 'Hacker', password: 'hacker'},
			      {name: 'Abdoulaye', role: 'Charoniard', password: 'charoniard'},
			      //{name: 'Cisse', role: 'Medic', password: 'charoniard'},
			      (err, p1, p2, p3, p4, /*p5,*/ p6, p7, p8, p9/*, p10*/) => {
				  Team.create({name: "Sicario",
					       user_list: [p1._id, p2._id, p3._id, p4._id/*, p5._id*/], party_id: party._id}, 
					      {name: "Task Force",
					       user_list: [p6._id, p7._id, p8._id, p9._id/*, p10._id*/], party_id: party._id},
					      (err, t1, t2) => {
						  Player.addToTeam(p1._id, t1._id, ()=>{
						      Player.addToTeam(p2._id, t1._id, ()=>{
							  Player.addToTeam(p3._id, t1._id, ()=>{
							      Player.addToTeam(p4._id, t1._id, ()=>{
								  Player.addToTeam(p6._id, t2._id, ()=>{
								      Player.addToTeam(p7._id, t2._id, ()=>{
									  Player.addToTeam(p8._id, t2._id, ()=>{
									      Player.addToTeam(p9._id, t2._id, ()=>{
									      });
									  });
								      });
								  })
							      })
							  })
						      })
						  })
					      });					      
			      })
	    });
		
	}
	else if (data.name === "jungle")
	{
	    Party.create({name: "Frontline", started: true}, (err, party) => {
		Player.create({name: 'Billy', role: 'Leader', password: 'leader'},
			      {name: 'John', role: 'Radio', password: 'radio'},
			      {name: 'Rachid', role: 'Hacker', password: 'hacker'},
			      {name: 'Rocco', role: 'Charoniard', password: 'charoniard'},
			      //{name: 'Sean', role: 'Medic', password: 'charoniard'},
			      {name: 'Tresor', role: 'Leader', password: 'leader'},
			      {name: 'Sissoko', role: 'Radio', password: 'radio'},
			      {name: 'Dembele', role: 'Hacker', password: 'hacker'},
			      {name: 'Abdoulaye', role: 'Charoniard', password: 'charoniard'},
			      //{name: 'Cisse', role: 'Medic', password: 'charoniard'},
			      (err, p1, p2, p3, p4, /*p5,*/ p6, p7, p8, p9/*, p10*/) => {
				  Team.create({name: "RG Seals",
					       user_list: [p1._id, p2._id, p3._id, p4._id/*, p5._id*/], party_id: party._id}, 
					      {name: "RG Mercenaires",
					       user_list: [p6._id, p7._id, p8._id, p9._id/*, p10._id*/], party_id: party._id},
					      (err, t1, t2) => {
						  Player.addToTeam(p1._id, t1._id, ()=>{
						      Player.addToTeam(p2._id, t1._id, ()=>{
							  Player.addToTeam(p3._id, t1._id, ()=>{
							      Player.addToTeam(p4._id, t1._id, ()=>{
								  Player.addToTeam(p6._id, t2._id, ()=>{
								      Player.addToTeam(p7._id, t2._id, ()=>{
									  Player.addToTeam(p8._id, t2._id, ()=>{
									      Player.addToTeam(p9._id, t2._id, ()=>{
									      });
									  });
								      });
								  })
							      })
							  })
						      })
						  })
					      });
					      
			      })
	    });
	}
	else if (data.name === "fire")
	{
	    Party.create({name: "TSS", started: true}, (err, party) => {
		Player.create({name: 'Billy', role: 'Leader', password: 'leader'},
			      {name: 'John', role: 'Radio', password: 'radio'},
			      {name: 'Rachid', role: 'Hacker', password: 'hacker'},
			      {name: 'Rocco', role: 'Charoniard', password: 'charoniard'},
			      //{name: 'Sean', role: 'Medic', password: 'charoniard'},
			      {name: 'Tresor', role: 'Leader', password: 'leader'},
			      {name: 'Sissoko', role: 'Radio', password: 'radio'},
			      {name: 'Dembele', role: 'Hacker', password: 'hacker'},
			      {name: 'Abdoulaye', role: 'Charoniard', password: 'charoniard'},
			      //{name: 'Cisse', role: 'Medic', password: 'charoniard'},
			      (err, p1, p2, p3, p4, /*p5, */p6, p7, p8, p9/*, p10*/) => {
				  Team.create({name: "Task Force",
					       user_list: [p1._id, p2._id, p3._id, p4._id/*, p5._id*/], party_id: party._id}, 
					      {name: "MI6",
					       user_list: [p6._id, p7._id, p8._id, p9._id/*, p10._id*/], party_id: party._id},
					      (err, t1, t2) => {
						  console.log("player: " + p1._id + " team : " + t1.name + " error: " + err);
						  Player.addToTeam(p1._id, t1._id, ()=>{
						      Player.addToTeam(p2._id, t1._id, ()=>{
							  Player.addToTeam(p3._id, t1._id, ()=>{
							      Player.addToTeam(p4._id, t1._id, ()=>{
								  Player.addToTeam(p6._id, t2._id, ()=>{
								      Player.addToTeam(p7._id, t2._id, ()=>{
									  Player.addToTeam(p8._id, t2._id, ()=>{
									      Player.addToTeam(p9._id, t2._id, ()=>{
									      });
									  });
								      });
								  })
							      })
							  })
						      })
						  })
					      });
					      
			      })
	    });
	}
	else
	{
	    console.log("unknown template");
	}
    });
});


module.exports = App;

