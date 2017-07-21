import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';


@Injectable()
export class RTServer {

    private url = 'http://localhost:3000';
    private socket;

    messages = [];

    constructor()
    {
	this.socket = io();
	this.socket.on('goal_scanned_answer', (data) => {
	    if (data.content === 'success')
	    {
		this.messages.push("jai marque "+ data.data.player_score);
	    }
	});
	this.socket.on('goal_scanned_broadcast', (data) => {
	    this.messages.push(data.data.team_id + " -- " + data.data.team_score);
	});
    }

    
    scan_goal(_player_id, _scanned_code) {
	this.socket.emit('goal_scanned', { player_id: _player_id, scanned_code: _scanned_code});
    }

    getMessages() {
	return this.messages;
	/*let obs = new Observable(observer => {
	    //this.socket = io(this.url);
	    this.socket.on('echo', (data) => {
		observer.next(data);		
	    });
	    this.socket.on('update', (data) => {
		observer.next(data);
	    });
	    return () => {
		this.socket.disconnect();
	    }
	    })*/
	

	//return obs;
    }

}
