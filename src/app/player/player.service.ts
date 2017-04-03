import { Injectable } from '@angular/core';
import { Player } from './player';

import { Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class PlayerService {

    private playerUrl = "api/parties";
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor( private http: Http ) {}

    getListOfUsers() : Promise<Player[]> {
	return this.http.get(this.playerUrl)
	    .toPromise()
	    .then(response => response.json().data as Player[])
	    .catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any>{
	console.error('an error occured', error);
	return Promise.reject(error.message || error);
    }
    
    
}
