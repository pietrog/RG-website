import { Component, OnInit } from '@angular/core';
import {Location } from '@angular/common';

import { Router } from '@angular/router';

import { GoalService } from './goal.service';
import { Goal } from './goal';


@Component({
    selector: 'list-goals',
    templateUrl: './list-goals.component.html',
    styleUrls: ['./list-goals.component.css']
})

export class ListGoalsComponent implements OnInit {


    constructor(
	private router: Router,
	private goalService: GoalService,
	private location: Location) {}

    goals = [];
    selectedGoal: Goal;
    goal: Goal;
    
    getGoals(): void {
	this.goalService.getListOfGoals()
	    .subscribe(
		goals => this.goals = goals
	    );
    }

    delete(goal: Goal){
	this.goalService
	    .delete(goal._id)
	    .subscribe(
		() => {
		    this.goals = this.goals.filter(p => p !== goal);
		    if (this.selectedGoal === goal) { this.selectedGoal = null; }
		}
	    );
    }

    activate(goal: Goal){
	this.goalService
	    .activateGoal(goal._id)
	    .subscribe(
		() => {
		    this.getGoals();
		}
	    );
    }

    onSelect(goal: Goal): void {
	this.selectedGoal = goal;
    }

    save() {
	this.goalService.saveGoal(this.goal)
	    .subscribe(goal => {
		this.getGoals();
	    });
    }

    goBack(): void {
	this.location.back();
    }

    
    ngOnInit(): void {
	this.getGoals();
	this.goal = new Goal("", 0);
    }

    
}

