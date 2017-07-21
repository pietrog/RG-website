import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { Router } from '@angular/router';
import { Player } from './player';
import { PlayerService } from './player.service';

import { RTServer } from '../rt-server.service';


@Component({
    selector: 'list-players',
    templateUrl: './list-players.component.html',
    styleUrls: ['./list-players.component.css']
})

export class ListPlayersComponent implements OnInit {


    constructor(
	private router: Router,
	private playerService: PlayerService,
	private location: Location,
	private rtServer: RTServer
    ) {}

    players = [];
    player: Player;
    selectedPlayer: Player;
    @Input() teamID: number;
    private socket;
    connection;
    messages = [];
    
    getPlayers(): void {
	this.playerService.getListOfPlayers()
	
	    .subscribe(
		players => this.players = players
	    );
    }

    delete(player: Player){
	this.playerService
	    .delete(player._id)
	    .subscribe(
		() => {
		    this.players = this.players.filter(p => p !== player);
		    if (this.selectedPlayer === player) { this.selectedPlayer = null; }
		}
	    );
    }

    onSelect(player: Player): void {
	this.selectedPlayer = player;
    }

    save(): void {
	this.playerService.savePlayer(this.player)
	    .then(party => {
		this.getPlayers();
	    });
    }

    goBack(): void {
	this.location.back();
    }

    sendMessage() {
	//this.rtServer.sendEcho('test ioooooo');
    }
    
    ngOnInit(): void {
	this.getPlayers();
	this.player = new Player("", 0);
	this.messages = this.rtServer.getMessages();
	/*this.connection = this.rtServer.getEcho().subscribe(message => {
	    this.message = message;
	});*/
    }
    
}
