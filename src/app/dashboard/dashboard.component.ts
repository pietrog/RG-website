import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { Router } from '@angular/router';

import { RTServer } from '../rt-server.service';
import { RTMessage } from '../rt-message';
import { GoalService } from '../goal/goal.service';

@Component({
    selector: 'main-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})

export class DashboardComponent {
    
    title = 'Dashboard';
    
    messages = [];
    list_of_parties = [];
    m_validated_goals = 0;
    m_total_goals = 0;    
    m_total_players = 0;
    
    constructor(
	private router: Router,
	private rtServer: RTServer,
	private goalService: GoalService,
	private location: Location
    )
    {
	this.goalService.getListOfGoals()
	    .subscribe(
		goals => this.m_total_goals = goals.length
	    );

	this.goalService.getListOfValidatedGoals()
	    .subscribe(
		goals => this.m_validated_goals = goals.length
	    );
    }
    
    ngOnInit(): void {
	
	this.rtServer.getRTMessagesObservable()
	    .subscribe(
		(message) => {		    
		    this.messages.push(message);
		});
	
	this.rtServer.getListOfPartiesObservable()
	    .subscribe(
		(parties) => {
		    this.list_of_parties = parties;
		    this.m_total_players = 0;
		    for(let t of this.list_of_parties[0].teams){
			this.m_total_players += t.players.length;
		    }
		});

	this.rtServer.getCountOfValidatedGoals()
	    .subscribe(
		(count) => {
		    this.m_validated_goals = count;
		}
	    );
    }
    
    
}
