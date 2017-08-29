import { Injectable } from '@angular/core';
import { Goal } from './goal';

import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class GoalService {

    private listTeamsUrl = "/api/goals";
    private headers = new Headers(
	{
	    'Content-Type': 'application/json',
	    'Accept': 'application/json'
	}
    );

    constructor(private http: Http) {}

    private extractData(res: Response) {

	let body = res.json();
	return body.data || {};
    }

    getListOfGoals(): Observable<Goal[]> {
	const url = `/api/goals/all`;
	return this.http.get(url)
	    .map(this.extractData)
	    .catch(this.handleError);
    }

    getGoal(id: number): Observable<Goal> {
	const url = `${this.listTeamsUrl}/byId/${id}`;	
	return this.http.get(url)
	    .map(this.extractData)
	    .catch(this.handleError);
    }

    activateGoal(id: number): Observable<Goal> {
	const url = `${this.listTeamsUrl}/resetGoal/${id}`;	
	return this.http.get(url)
	    .map(this.extractData)
	    .catch(this.handleError);
    }

    
    saveGoal(goal: Goal): Observable<Goal> {
	const url = '/api/goals/create';
	return this.http.post(url, JSON.stringify(goal), {headers: this.headers})
	    .map(this.extractData)
	    .catch(this.handleError);
    }

    delete(id: number): Observable<void> {
	const url = `/api/goals/${id}`;
	return this.http.delete(url, { headers: this.headers })
	    .map(this.extractData)
	    .catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
	//console.error('an error occured', error);
	return Promise.reject(error.message || error);
    }

    
}
