import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

import { RTServer } from '../rt-server.service';

@Component({
    selector: 'control-panel',
    templateUrl: './control-panel.component.html'
})

export class ControlPanelComponent implements OnInit{

    constructor(private router: Router,
		private rtServer: RTServer) {}

    saveAll() : void
    {
	console.log("Save All !");
    }

    clear_database() : void {
	this.rtServer.clear_database();
    }

    load_template(tname: string) : void {
	this.rtServer.load_template(tname);
    }
    
    ngOnInit(): void {
    }
    
    

}
    
