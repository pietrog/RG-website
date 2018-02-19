import { Component } from '@angular/core';

import { Party } from './party';

import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { PartyService } from './party.service';

@Component({
    selector: 'control-panel',
    templateUrl: './.component.html',
    styleUrls: ['./list-parties.component.css']
})

export class ListPartiesComponent implements OnInit{

    constructor(private router: Router, private partyService: PartyService) {}

    party: Party;
    parties = [];
    selectedParty: Party;
    
    getParties(): void {
	this.partyService.getListOfParties()
	    .subscribe(
		parties => this.parties = parties
	    );
    }

    save(): void {
	this.partyService.saveParty(this.party)
	    .then(party => {
		this.getParties();
	    });
    }
    
    delete(party: Party){
	this.partyService
	    .delete(party._id)
	    .subscribe(
		() => {
		    this.parties = this.parties.filter(p => p !== party);
		    if (this.selectedParty === party) { this.selectedParty = null; }
		}
	    );
    }

    onSelect(party: Party): void {
	this.selectedParty = party;	
    }
    
    ngOnInit(): void {
	this.getParties();
	this.party = new Party("", false, [], []);
    }
    
    

}
    
