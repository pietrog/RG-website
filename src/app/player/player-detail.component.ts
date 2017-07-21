import { Component, Input, OnChanges } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { PlayerService } from './player.service';
import { Player } from './player';
import { Team } from '../team/team';
import { TeamService } from '../team/team.service';

import { RTServer } from '../rt-server.service';

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
	private rt: RTServer,
	private location: Location) {}

    addPlayerToParty(): void {
	this.teamService.addPlayerToTeam(this.currentTeam._id, this.player._id)
	    .subscribe(team => {
		this.router.navigate(['/dashboard']);
	    });
	
    }

    validateGoal(): void {
	this.rt.scan_goal(this.player._id, this.scanned_code);
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
