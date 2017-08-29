import { Injectable } from '@angular/core';

import { Party } from './party';

import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class PartyService {

    private listPartiesUrl = "/api/party";
    private headers = new Headers(
	{
	    'Content-Type': 'application/json',
	    'Accept': 'application/json'
	}
    );

    constructor(private http: Http) {}

    private extractParties(res: Response) {
	let body = res.json();
	return body.data || {};
    }

    getListOfParties(): Observable<Party[]> {
	const url = `/api/party/all`;
	return this.http.get(url)
	    .map(this.extractParties)
	    .catch(this.handleError);
    }

    getListOfStartedParties(): Observable<Party[]> {
	const url = `/api/party/allStarted`;
	return this.http.get(url)
	    .map(this.extractParties)
	    .catch(this.handleError);
    }


    getParty(id: number): Promise<Party> {
	const url = `${this.listPartiesUrl}/${id}`;
	return this.http.get(url)
	    .toPromise()
	    .then(response => response.json().data as Party)
	    .catch(this.handleError);
    }

    saveParty(party: Party): Promise<Party> {
	const url = '/api/party/create';
	return this.http.post(url, JSON.stringify(party), {headers: this.headers})
	    .toPromise()
	    .then(response => response.json().data as Party)
	    .catch(this.handleError);
    }

    addGoalToParty(party_id: number, goal_id: number): Observable<Party> {
	const url = '/api/party/add-goal';
	const data = { "party_id": party_id, "goal_id": goal_id };
	return this.http.patch(url, data, {headers: this.headers})
	    .map(this.extractParties)
	    .catch(this.handleError);
	
    }

    //Change the status of the party following what the user wants
    startOrStopParty(party: Party): Observable<Party> {
	const url = '/api/party/start-stop';
	const data = { "id": party._id, "started": party.started };
	return this.http.patch(url, data, {headers: this.headers})
	    .map(this.extractParties)
	    .catch(this.handleError);
    }
    
    delete(id: number): Observable<void> {
	const url = `/api/party/${id}`;
	return this.http.delete(url, { headers: this.headers })
	    .map(this.extractParties)
	    .catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
	//console.error('an error occured', error);
	return Promise.reject(error.message || error);
    }

    
}
