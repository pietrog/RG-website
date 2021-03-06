import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { ListPartiesComponent } from './party/list-parties.component';
import { PartyComponent } from './party/party.component';
import { ListPlayersComponent } from './player/list-players.component';
import { ListTeamsComponent } from './team/list-teams.component';
import { ListGoalsComponent } from './goal/list-goals.component';
import { ControlPanelComponent } from './control/control-panel.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'control', component: ControlPanelComponent },
    { path: 'party/detail/:id', component: PartyComponent},
    { path: 'party/list', component: ListPartiesComponent },
    { path: 'player/list', component: ListPlayersComponent },
    { path: 'team/list', component: ListTeamsComponent },
    { path: 'goal/list', component: ListGoalsComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
