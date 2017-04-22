import { Component, Input, OnChanges } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';

import { Party } from './party';
import { PartyService } from './party.service';
import { TeamService } from '../team/team.service'
import { Team } from '../team/team'

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'party-detail',
    templateUrl: './party.component.html',
    styleUrls: ['./party.component.css']
})

export class PartyComponent implements OnChanges {

    constructor(
	private partyService: PartyService,
	private teamService: TeamService,
	private route: ActivatedRoute
    ) {}
    

    @Input() party: Party;
    teams = [];
    selectedTeam: Team;

    onSelect(team: Team): void{
    }

    exclude(team: Team): void {
    }

    ngOnChanges(): void{
	if (this.party){
	    this.teamService.getTeamsById(this.party._id)
		.subscribe(teams => {
		    this.teams = teams;
		});
	}
    }
    
}
