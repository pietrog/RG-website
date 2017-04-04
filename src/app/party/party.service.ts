import { Injectable } from '@angular/core';

import { Party } from './party';

import { Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class PartyService {

    private listPartiesUrl = "api/parties";
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getListOfParties(): Promise<Party[]> {
	return this.http.get(this.listPartiesUrl)
	    .toPromise()
	    .then(response => response.json().data as Party[])
	    .catch(this.handleError);
    }

    getParty(id: number): Promise<Party> {
	const url = `${this.listPartiesUrl}/${id}`;
	return this.http.get(url)
	    .toPromise()
	    .then(response => response.json().data as Party)
	    .catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any>{
	console.error('an error occured', error);
	return Promise.reject(error.message || error);
    }

    
}
