import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {DashboardComponent } from './dashboard/dashboard.component';
import { ListPartiesComponent } from './party/list-parties.component';
import { ListPlayersComponent } from './player/list-players.component';


// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { PartyService } from './party/party.service';
import { PlayerService } from './player/player.service';

@NgModule({
    declarations: [
	AppComponent,
	DashboardComponent,
	ListPartiesComponent,
	ListPlayersComponent
    ],
    imports: [
	BrowserModule,
	FormsModule,
	HttpModule,
	AppRoutingModule,
	InMemoryWebApiModule.forRoot(InMemoryDataService)
    ],
    providers: [
	PartyService,
	PlayerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
