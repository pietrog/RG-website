import { Injectable } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


import { RTServer } from '../rt-server.service';
import { RTMessage } from '../rt-message';


@Injectable()
export class ControlService {

    private listPartiesUrl = "/api/control";
    private headers = new Headers(
	{
	    'Content-Type': 'application/json',
	    'Accept': 'application/json'
	}
    );

    constructor(
	private rtServer: RTServer,
	private location: Location)
    {}


    clear_database: void {
	rtServer.clear_database();
    }

    
}
