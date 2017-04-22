import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ListPartiesComponent } from './party/list-parties.component';
import { CreatePartyComponent } from './party/create-party.component';
import { PartyComponent } from './party/party.component';
import { ListPlayersComponent } from './player/list-players.component';
import { ListTeamsComponent } from './team/list-teams.component';
import { TeamDetail } from './team/team-detail.component';


import { PartyService } from './party/party.service';
import { PlayerService } from './player/player.service';
import { PlayerDetail } from './player/player-detail.component';
import { TeamService } from './team/team.service';

@NgModule({
    declarations: [
	AppComponent,
	DashboardComponent,
	ListPartiesComponent,
	ListPlayersComponent,
	ListTeamsComponent,
	PartyComponent,
	CreatePartyComponent,
	TeamDetail,
	PlayerDetail
    ],
    imports: [
	BrowserModule,
	FormsModule,
	HttpModule,
	AppRoutingModule,
    ],
    providers: [
	PartyService,
	PlayerService,
	TeamService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
