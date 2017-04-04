import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { ListPartiesComponent } from './party/list-parties.component';
import { PartyComponent } from './party/party.component';
import { ListPlayersComponent } from './player/list-players.component';

const routes: Routes = [
    { path: 'party/detail/:id', component: PartyComponent},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'party/list', component: ListPartiesComponent },
    { path: 'player/list', component: ListPlayersComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
