import { Component } from '@angular/core';

import { OnInit } from '@angular/core';

import { Player } from './player';
import { PlayerService } from './player.service';

@Component({
    selector: 'list-players',
    templateUrl: './list-players.component.html',
    styleUrls: ['./list-players.component.css']
})

export class ListPlayersComponent implements OnInit {


    constructor(private playerService: PlayerService) {}

    players = [];
    selectedPlayer: Player;

    getUsers(): void {
	this.playerService.getListOfUsers().then(players => this.players = players);
    }

    onSelect(player: Player): void {
	this.selectedPlayer = player;
    }
    
    ngOnInit(): void {
	this.getUsers();
    }
    
}
