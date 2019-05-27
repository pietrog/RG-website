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
	private location: Location)

    {
	//this.extended=false;
    }

    goals = [];
    selectedGoal: Goal;
    goal: Goal;
    compteurs = [];
    scores = [];
    extended: Boolean = false;
    toggleBtn: String = "Vue etendue";
    
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

    get1() {
	return this.goals.filter(goal => goal.label.indexOf(1) != -1);
    }
    get2() {
	return this.goals.filter(goal => goal.label.indexOf(2) != -1);
    }
    get3() {
	return this.goals.filter(goal => goal.label.indexOf(3) != -1);
    }
    get4() {
	return this.goals.filter(goal => goal.label.indexOf(4) != -1);
    }
    get5() {
	return this.goals.filter(goal => goal.label.indexOf(5) != -1);
    }
    getd() {
	return this.goals.filter(goal => goal.label.indexOf("Divers") != -1);
    }

    

    setGoalCompteur(goal: Goal){
	
	this.goalService
	    .setGoalCompteur(goal._id, this.compteurs[goal._id])
	    .subscribe(
		() => {
		    this.getGoals();
		}
	    );
    }

    setGoalScore(goal: Goal){
	    
	this.goalService
	    .setGoalScore(goal._id, this.scores[goal._id])
	    .subscribe(
		() => {
		    this.getGoals();
		}
	    );
    }

    activateGoal(goal: Goal) {
	this.compteurs[goal._id]  = 1;
	this.setGoalCompteur(goal);
    }

    deactivateGoal(goal: Goal) {
	this.compteurs[goal._id]  = 0;
	this.setGoalCompteur(goal);
    }


    changeCpt(goal: Goal) {
	console.log("coucou" + goal);
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
	this.goal = new Goal("", 0, 5);
    }

    toggleButton(): void {
	this.extended = !this.extended;
	if (this.extended)
	    this.toggleBtn = "Vue compressée";
	else
	    this.toggleBtn = "Vue etendue";
    }
    
}

