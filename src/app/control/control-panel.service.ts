import { Injectable } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ControlService {

    private listPartiesUrl = "/api/control";
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

    getListOfParties(): Observable<Party[]> {
	const url = `/api/control/clearDB`;
	return this.http.get(url)
	    .map(this.extractData)
	    .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
	return Promise.reject(error.message || error);
    }

    
}
