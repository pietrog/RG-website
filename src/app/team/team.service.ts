import { Injectable } from '@angular/core';
import { Team } from './team';

import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class TeamService {

    private listTeamsUrl = "/api/teams";
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

    getListOfTeams(): Observable<Team[]> {
	const url = `/api/teams/all`;
	return this.http.get(url)
	    .map(this.extractData)
	    .catch(this.handleError);
    }

    getTeam(id: number): Promise<Team> {
	const url = `${this.listTeamsUrl}/${id}`;
	return this.http.get(url)
	    .toPromise()
	    .then(response => response.json().data as Team)
	    .catch(this.handleError);
    }

    saveTeam(team: Team): Promise<Team> {
	const url = '/api/teams/create';
	return this.http.post(url, JSON.stringify(team), {headers: this.headers})
	    .toPromise()
	    .then(response => response.json().data as Team)
	    .catch(this.handleError);
    }

    delete(id: number): Observable<void> {
	const url = `/api/teams/${id}`;
	return this.http.delete(url, { headers: this.headers })
	    .map(this.extractData)
	    .catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
	//console.error('an error occured', error);
	return Promise.reject(error.message || error);
    }

    
}
