'use strict';

const server_io = require('socket.io');
const util = require('util');
const Scoring = require('./core/Scoring');
const SocketUtils = require('./SocketUtils');

class RTServer
{

    constructor(http_server){
	this.server = new server_io(http_server);
	this.server.on('connection', this.onNewClientConnection);
	this.server.on('disconnect', this.onClientDisconnect);
    }

    onNewClientConnection(socket)
    {
	console.log("Socket created => New client connected to server");

	socket.on('goal_scanned', function(data){
	    const result = Scoring.onGoalScanned(socket, data.player_id, data.scanned_code);
	    if (result.result !== 'failed')
	    {
		SocketUtils.BroadcastGoalScannedSuccessed(socket, result.team_id, result.team_score);
	    }
	    else
	    {
		SocketUtils.AnswerGoalScannedFailed(socket, "wtf");
	    }
	});
    }

    onClientDisconnect(socket)
    {
	console.log("A client has been disconnected");
    }

    static broadcastTargetReachedByPlayer()
    {
	socket.broadcast.emit('update', "AHAHAHAHAHAH");
    }

    static onEchoRec(message)
    {
	util.inspect(socket);
	RTServer.broadcastTargetReachedByPlayer();
    }

};


module.exports = RTServer;
