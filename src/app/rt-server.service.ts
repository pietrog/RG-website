import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import * as io from 'socket.io-client';


import { PlayerService } from './player/player.service';
import { Player } from './player/player';
import { RTMessage } from './rt-message';

@Injectable()
export class RTServer {

    private _socket;
    private url = 'http://localhost:3000';

    //observale for list of players
    private m_list_of_players;
    private m_list_of_players_observer;

    //observable for real time server messages
    //private m_rt_historic = [];
    private m_rt_historic_observable;
    private m_rt_historic_observer;


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

	this.m_rt_historic_observable = Observable.create(
	    (observer) => {
		this.m_rt_historic_observer = observer;
	    }
	);
	
	this._socket.on('goal_scanned_answer', (data) => {
	    if (data.status === 'success')
	    {
		this.playerService.getListOfPlayers().subscribe((data) => {
		    this.m_list_of_players_observer.next(data);
		});
	    }
	});

	this._socket.on('goal_scanned_broadcast', (data) => {
	    if (data.status === 'success')
	    {
		//populate historic
		let desc = data.player_name + " (équipe " + data.team_name + ") a validé l'objectif " + data.name_target + " à " + data.time_event;
		let rtmess = new RTMessage("DDD", "scanned_goal", desc);
		this.m_rt_historic_observer.next(rtmess);
	    }
	    else
	    {
		//populate historic
		let desc = "Tentative de validation d'objectif, échouée: "+ data.reason;
		let rtmess = new RTMessage("MMM", "failed_scanned_goal", desc);
		this.m_rt_historic_observer.next(rtmess);
		
	    }
	});
	
    }

    getPlayersObservable(): Observable<Player[]> {
	return this.m_list_of_players;
    }

    getRTMessagesObservable(): Observable<RTMessage> {
	return this.m_rt_historic_observable;
    }

    //for testing purpose
    scan_goal(_player_id, _scanned_code) {
	this._socket.emit('goal_scanned', { player_id: _player_id, scanned_code: _scanned_code});
    }

}
