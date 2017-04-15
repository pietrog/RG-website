import { Component } from '@angular/core';

import { OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Player } from './player';
import { PlayerService } from './player.service';

@Component({
    selector: 'list-players',
    templateUrl: './list-players.component.html',
    styleUrls: ['./list-players.component.css']
})

export class ListPlayersComponent implements OnInit {


    constructor(private router: Router, private playerService: PlayerService) {}

    players = [];
    selectedPlayer: Player;
    
    getPlayers(): void {
	this.playerService.getListOfPlayers()
	
	    .subscribe(
		players => this.players = players
	    );
    }

    gotoDetails(): void{
	this.router.navigate(['/player/detail', this.selectedPlayer._id]);
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
	this.gotoDetails();
    }
    
    ngOnInit(): void {
	this.getPlayers();
    }

    
}
