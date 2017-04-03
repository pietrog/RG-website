import { Component } from '@angular/core';

import { Party } from './party';

import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { PartyService } from './party.service';

@Component({
    selector: 'list-parties',
    templateUrl: './list-parties.component.html',
    styleUrls: ['./list-parties.component.css']
})

export class ListPartiesComponent implements OnInit{

    constructor(private router: Router, private partyService: PartyService) {}

    parties = [];
    selectedParty: Party;
    
    getParties(): void {
	this.partyService.getListOfParties().then(parties => this.parties = parties);
    }


    onSelect(party: Party): void {
	this.selectedParty = party;
    }
    
    ngOnInit(): void {
	this.getParties();
    }
    
}
    
