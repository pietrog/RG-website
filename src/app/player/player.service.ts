import { Injectable } from '@angular/core';
import { Player } from './player';

import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class PlayerService {


    private listPartiesUrl = "/api/player";
    private headers = new Headers(
	{
	    'Content-Type': 'application/json',
	    'Accept': 'application/json'
	}
    );

    constructor(private http: Http)
    {
	this.getListOfPlayers();
    }

    private extractData(res: Response) {
	let body = res.json();
	return body.data || {};
    }

    getListOfPlayers(): Observable<Player[]> {
	const url = `/api/player/all`;

	return this.http.get(url)
	    .map(this.extractData)
	    .catch(this.handleError);
    }

    getListOfPlayersWithIds(player_ids: number[]): Observable<Player[]> {
	const url = `/api/player/allWithIds`;
	let body = { list_ids: player_ids };
	return this.http.post(url, body, {headers: this.headers})
	    .map(this.extractData)
	    .catch(this.handleError);
    }

    
    getPlayer(id: number): Promise<Player> {
	const url = `${this.listPartiesUrl}/${id}`;
	return this.http.get(url)
	    .toPromise()
	    .then(response => response.json().data as Player)
	    .catch(this.handleError);
    }

    savePlayer(player: Player): Promise<Player> {
	const url = '/api/player/create';
	return this.http.post(url, JSON.stringify(player), {headers: this.headers})
	    .toPromise()
	    .then(response => response.json().data as Player)
	    .catch(this.handleError);
    }

    validateGoal(player: Player, scanned_code: string): Observable<any> {
	const url = `/api/device/validateGoal`;
	let body = { player_id: player._id, scanned_code: scanned_code };
	return this.http.post(url, body, {headers: this.headers})
	    .map(this.extractData)
	    .catch(this.handleError);
    }

    healPlayer(player: Player): Observable<any> {
	const url = `/api/device/healPlayer`;
	let body = { player_id: player._id };
	return this.http.post(url, body, {headers: this.headers})
	    .map(this.extractData)
	    .catch(this.handleError);
    }
    
    delete(id: number): Observable<void> {
	const url = `/api/player/${id}`;
	return this.http.delete(url, { headers: this.headers })
	    .map(this.extractData)
	    .catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
	console.error('an error occured', error);
	return Promise.reject(error.message || error);
    }

    
}
