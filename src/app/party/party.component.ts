import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';

import { Party } from './party';
import { PartyService } from './party.service';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'party',
    templateUrl: './party.component.html',
    styleUrls: ['./party.component.css']
})

export class PartyComponent implements OnInit{

    constructor(
	private partyService: PartyService,
	private route: ActivatedRoute
    ) {}
    
    party: Party;
    
    ngOnInit(): void {
	this.route.params
	    .switchMap((params: Params) => this.partyService.getParty(+params['id']))
	    .subscribe(party => this.party = party);
    }
}
