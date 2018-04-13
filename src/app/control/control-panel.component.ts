import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

import { RTServer } from '../rt-server.service';

@Component({
    selector: 'control-panel',
    templateUrl: './control-panel.component.html',
    styleUrls: ['control-panel.component.css']
})

export class ControlPanelComponent implements OnInit{

    m_active_template;
    
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

    getClass(name: string): string
    {
	console.log("template : " + this.m_active_template);
	if (name == this.m_active_template)
	    return "active-template";
	else
	    return "";
    }
    
    ngOnInit(): void {

	this.rtServer.get_current_template()
	    .subscribe(
		(message) => {		    
		    this.m_active_template = message;
		});

	this.rtServer.get_active_template();
    }

}
    
