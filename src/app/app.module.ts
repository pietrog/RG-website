import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ListPartiesComponent } from './party/list-parties.component';
import { PartyComponent } from './party/party.component';
import { ListPlayersComponent } from './player/list-players.component';
import { ListTeamsComponent } from './team/list-teams.component';
import { TeamDetail } from './team/team-detail.component';

import { ControlPanelComponent } from './control/control-panel.component';

import { ListGoalsComponent } from './goal/list-goals.component';
import { GoalService} from './goal/goal.service';

import { PartyService } from './party/party.service';
import { PlayerService } from './player/player.service';
import { PlayerDetail } from './player/player-detail.component';
import { TeamService } from './team/team.service';
import { RTServer } from './rt-server.service';

@NgModule({
    declarations: [
	AppComponent,
	DashboardComponent,
	ListPartiesComponent,
	ListPlayersComponent,
	ListTeamsComponent,
	ListGoalsComponent,
	PartyComponent,
	TeamDetail,
	PlayerDetail,
	ControlPanelComponent
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
	TeamService,
	GoalService,
	RTServer
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
