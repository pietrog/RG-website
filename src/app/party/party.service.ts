import { Injectable } from '@angular/core';

import { Party } from './party';

import { RequestMethod, RequestOptions, Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

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

    getListOfParties(): Promise<Party[]> {
	const url = `${this.listPartiesUrl}/all`;
	//const url = '/api/party/all';
	return this.http.get(url)
	    .toPromise()
	    .then(function(res){
		console.log(res.toString());
		return res.json().data;
	    })
		//response => response.json().data as Party[])
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
	const url = `${this.listPartiesUrl}/save`;
	return this.http.put(url, JSON.stringify(party), {headers: this.headers})
	    .toPromise()
	    .then(response => response.json() as Party)
	    .catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
	//console.error('an error occured', error);
	return Promise.reject(error.message || error);
    }

    
}
