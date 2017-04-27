import { Component, Input, OnChanges } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';

import { Party } from './party';
import { PartyService } from './party.service';
import { TeamService } from '../team/team.service'
import { Team } from '../team/team'

import { Goal } from '../goal/goal';
import { GoalService } from '../goal/goal.service';


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
	private route: ActivatedRoute,
	private goalService: GoalService
    ) {}
    

    @Input() party: Party;
    teams = [];
    selectedTeam: Team;

    goals = [];
    selectedGoal: Goal;
    goalsInParty = [];

    onSelect(team: Team): void{
    }

    exclude(team: Team): void {
    }

    addGoal(): void {
	this.partyService.addGoalToParty(this.party._id, this.selectedGoal._id)
	    .subscribe(() => {});
	
    }

    startStopParty(): void {
	this.partyService.startOrStopParty(this.party)
	    .subscribe(party => {
		this.party = party;
	    });
	
    }
    
    ngOnChanges(): void{
	if (this.party){
	    this.teamService.getTeamsById(this.party._id)
		.subscribe(teams => {
		    this.teams = teams;
		    this.goalService.getListOfGoals()
			.subscribe(goals => {
			    this.goals = goals;
			    this.goalsInParty = [];
			    for (const goal of this.goals){
				for (const id of this.party.goal_list){
				    if (id === goal._id)
				    {
					this.goalsInParty.push(goal);
				    }
				}
			    }
			});
		});
	}
    }   
}
