import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

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
	private location: Location
    ) {}

    party: Party;
    
    save(): void {
	//this.partyService.saveParty(this.party)
	  //  .then()
    }

    goBack(): void {
	this.location.back();
    }
    

    ngOnInit(): void {
	this.party = { name: "test", id: 18 };
    }
}
