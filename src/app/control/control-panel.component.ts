import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
    selector: 'control-panel',
    templateUrl: './control-panel.component.html'
})

export class ControlPanelComponent implements OnInit{

    constructor(private router: Router) {}

    saveAll() : void
    {
	console.log("Save All !");
    }

    clearAll() : void
    {
	console.log("Clear All !");
    }
    
    
    ngOnInit(): void {
    }
    
    

}
    
