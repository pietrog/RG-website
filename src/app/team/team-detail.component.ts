import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { Team } from './team';
import { TeamService } from './team.service';

import { PartyService } from '../party/party.service';
import { Party } from '../party/party';

import { Player } from '../player/player';
import { PlayerService } from '../player/player.service';

@Component({
    selector: 'team-detail',
    templateUrl: './team-detail.component.html',
    styleUrls: ['./team-detail.component.css']
})

export class TeamDetail implements OnInit, OnChanges{

    @Input() team: Team;
    parties: Party[];
    selectedParty: Party;
    player_list: Player[];

    constructor(
	private teamService: TeamService,
	private playerService: PlayerService,
	private partyService: PartyService,
	private router: Router,
	private route: ActivatedRoute,
	private location: Location) {}

    onSave(): void {
	this.teamService.addTeamToParty(this.team._id, this.selectedParty._id)
	    .subscribe(team => {
		this.router.navigate(['/dashboard']);
	    });
	
    }

    excludePlayer(player_id: number)
    {
	this.teamService.removePlayerFromTeam(this.team._id, player_id)
	    .subscribe( t => {
		this.teamService.getTeam(this.team._id)
		    .subscribe(t => {
			this.team = t;
			this.playerService.getListOfPlayersWithIds(this.team.user_list)
			    .subscribe(list => this.player_list = list);
		    });
	    });
    }
    
    ngOnInit(): void {
	this.partyService.getListOfParties()
	    .subscribe(parties => this.parties = parties);
    }

    ngOnChanges(): void {
	if (this.team && this.team.user_list){
	    this.playerService.getListOfPlayersWithIds(this.team.user_list)
		.subscribe(list => this.player_list = list);
	}
    }
    
}
