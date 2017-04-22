import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { PartyService } from './party.service';
import { Party } from './party';

@Component({
    selector: 'create-party',
    templateUrl: './create-party.component.html',
    styleUrls: ['./create-party.component.css']
})

export class CreatePartyComponent {

    constructor(
	private partyService: PartyService,
	private router: Router,
	private route: ActivatedRoute,
	private location: Location
    ) {}

    party: Party;
    
    save(): void {
	this.partyService.saveParty(this.party)
	    .then(party => {
		this.router.navigate['/party/list'];
	    });
    }

    goBack(): void {
	this.location.back();
    }
    

    ngOnInit(): void {
	this.party = new Party(12, "AA", false, []);
    }
}
