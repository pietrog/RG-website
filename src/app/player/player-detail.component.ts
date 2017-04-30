import { Component, Input, OnChanges } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { PlayerService } from './player.service';
import { Player } from './player';
import { Team } from '../team/team';
import { TeamService } from '../team/team.service';

@Component({
    selector: 'player-detail',
    templateUrl: './player-detail.component.html',
    styleUrls: ['./player-detail.component.css']
})

export class PlayerDetail implements OnChanges{

    @Input() player: Player;
    teams: Team[];
    currentTeam: Team;
    error: any;
    message: any;
    scanned_code: string;

    constructor(
	private teamService: TeamService,
	private playerService: PlayerService,
	private router: Router,
	private route: ActivatedRoute,
	private location: Location) {}

    addPlayerToParty(): void {
	this.teamService.addPlayerToTeam(this.currentTeam._id, this.player._id)
	    .subscribe(team => {
		this.router.navigate(['/dashboard']);
	    });
	
    }

    validateGoal(): void {
	this.playerService.validateGoal(this.player, this.scanned_code)
	    .subscribe(
		result => this.message = result,
		error => this.error = error
	    );
    }

    healPlayer(): void {
	this.playerService.healPlayer(this.player)
	    .subscribe(
		result => this.message = result,
		error => this.error = error
	    );
    }
    
    ngOnChanges(): void {
	this.error = null;
	this.teams = null;
	if(this.player){
	    if (this.player.team){
		this.teamService.getTeam(this.player.team)
		    .subscribe(
			team => {
			    this.currentTeam = team;
			},
			error => this.error = error
		    );
	    }
	    else{
		this.currentTeam = null;
		this.teamService.getListOfTeams()
		    .subscribe(teams => this.teams = teams);
	    }
	}
    }

}
