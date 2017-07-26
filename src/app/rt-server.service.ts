import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import * as io from 'socket.io-client';


import { PlayerService } from './player/player.service';
import { Player } from './player/player';


@Injectable()
export class RTServer {

    private _socket;
    private url = 'http://localhost:3000';
    private m_list_of_players;
    private m_list_of_players_observer;
    messages = [];


    constructor(
	private playerService: PlayerService
    )
    {
	this._socket = io();
	this.m_list_of_players = Observable.create(
	    (observer) => {
		this.m_list_of_players_observer = observer;
		this.playerService.getListOfPlayers().subscribe((data) => {
		    observer.next(data);
		});
	    });
	
	this._socket.on('goal_scanned_answer', (data) => {
	    console.log("marqué !! " + data.content);
	    if (data.content === 'success')
	    {

		this.messages.push("jai marque "+ data.data.player_score);
	    }
	});

	this._socket.on('goal_scanned_broadcast', (data) => {
	    this.playerService.getListOfPlayers().subscribe((data) => {
		console.log("refresh " + data[2].score);
		this.m_list_of_players_observer.next(data);
	    });
	});
	
    }

    
    scan_goal(_player_id, _scanned_code) {
	this._socket.emit('goal_scanned', { player_id: _player_id, scanned_code: _scanned_code});
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


    /*getPlayers() : void{
	this.playerService.getListOfPlayers()
	    .subscribe((data) => {
	    this.player_observer.next(data);
	    return;
	});
    }*/

    getPlayersObservable(): Observable<Player[]> {
	return this.m_list_of_players;
    }

}
