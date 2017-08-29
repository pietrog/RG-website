import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { Router } from '@angular/router';

import { RTServer } from '../rt-server.service';
import { RTMessage } from '../rt-message';

@Component({
    selector: 'main-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})

export class DashboardComponent {
    
    title = 'Dashboard';
    
    messages = [];
    list_of_parties = [];
    
    constructor(
	private router: Router,
	private rtServer: RTServer,
	private location: Location
    ){}
    
    ngOnInit(): void {
	this.rtServer.getRTMessagesObservable()
	    .subscribe(
		(message) => {		    
		    this.messages.push(message);
		});
	
	this.rtServer.getListOfPartiesObservable()
	    .subscribe(
		(parties) => {
		    this.list_of_parties = parties;
		});
    }
    
    
}
