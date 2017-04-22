import { Component, OnInit } from '@angular/core';
import {Location } from '@angular/common';

import { Router } from '@angular/router';

import { TeamService } from './team.service';
import { Team } from './team';


@Component({
    selector: 'list-teams',
    templateUrl: './list-teams.component.html',
    styleUrls: ['./list-teams.component.css']
})

export class ListTeamsComponent implements OnInit {


    constructor(
	private router: Router,
	private teamService: TeamService,
	private location: Location) {}

    teams = [];
    team: Team;
    selectedTeam: Team;
    
    getTeams(): void {
	this.teamService.getListOfTeams()
	
	    .subscribe(
		teams => this.teams = teams
	    );
    }

    delete(team: Team){
	this.teamService
	    .delete(team._id)
	    .subscribe(
		() => {
		    this.teams = this.teams.filter(p => p !== team);
		    if (this.selectedTeam === team) { this.selectedTeam = null; }
		}
	    );
    }

    onSelect(team: Team): void {
	this.selectedTeam = team;
    }

    save() {
	this.teamService.saveTeam(this.team)
	    .then(team => {
		this.getTeams();
	    });
    }

    goBack(): void {
	this.location.back();
    }

    
    ngOnInit(): void {
	this.getTeams();
	this.team = new Team("test", 0, []);
    }

    
}

