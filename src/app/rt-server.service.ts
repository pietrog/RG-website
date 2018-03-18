import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import * as io from 'socket.io-client';


import { PlayerService } from './player/player.service';
import { PartyService } from './party/party.service';
import { Player } from './player/player';
import { Party } from './party/party';
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

    //observable for the parties (dashboard)
    private m_list_of_parties_observable;
    private m_list_of_parties_observer;

    private m_active_template_observable;
    private m_active_template_observer;

    constructor(
	private playerService: PlayerService,
	private partyService: PartyService
    )
    {
	this._socket = io();

	this.m_list_of_parties_observable = Observable.create(
	    (observer) => {
		this.m_list_of_parties_observer = observer;
		this.partyService.getListOfStartedParties()
		    .subscribe((parties) => {
			observer.next(parties);
		    });
	    }
	);

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

	this.m_active_template_observable = Observable.create(
	    (observer) => {
		this.m_active_template_observer = observer;
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
		var d = new Date();
		var date = d.getDay()+"/"+d.getMonth()+"/"+d.getFullYear();
		var hour = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() +"sec";

		let desc = data.player_name + " (équipe " + data.team_name + ") a validé l'objectif " + data.name_target + " à " + hour;
		console.log("goal scanned !! : " + hour);
		let rtmess = new RTMessage(date, "Objectif atteint", desc);
		this.m_rt_historic_observer.next(rtmess);
		this.partyService.getListOfStartedParties().subscribe((parties) => {
		    this.m_list_of_parties_observer.next(parties);
		});
	    }
	    else
	    {
		//populate historic
		let desc = "Tentative de validation d'objectif, échouée: "+ data.reason;
		let rtmess = new RTMessage("MMM", "failed_scanned_goal", desc);
		this.m_rt_historic_observer.next(rtmess);
		
	    }
	});

	this._socket.on('party_status_broadcast', (data) => {
	    console.log("received");
	    if (data)
	    {		
		console.log(data.status + ' party : ' + data.p._id);
	    }
	});

	this._socket.on('get_active_template', (data) =>{
	    this.m_active_template_observer.next(data);
	});




    }

    getPlayersObservable(): Observable<Player[]> {
	return this.m_list_of_players;
    }

    getRTMessagesObservable(): Observable<RTMessage> {
	return this.m_rt_historic_observable;
    }

    getListOfPartiesObservable(): Observable<Party[]> {
	return this.m_list_of_parties_observable;
    }


    get_current_template(): Observable<string>
    {
	return this.m_active_template_observable;
    }
    
    //for testing purpose
    scan_goal(_player_id, _scanned_code) {
	this._socket.emit('goal_scanned', { player_id: _player_id, scanned_code: _scanned_code});
    }

    start_stop_party(_party_id) {
	this._socket.emit('start_stop_party', { party_id: _party_id });
    }

    clear_database() {
	this._socket.emit('clear_database', {});
    }

    load_template(template_name) {
	this._socket.emit('load_template', { name: template_name });
    }

    get_active_template() {
	this._socket.emit('get_active_template');
    }

}
