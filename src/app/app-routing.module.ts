import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { ListPartiesComponent } from './party/list-parties.component';
import { CreatePartyComponent } from './party/create-party.component';
import { PartyComponent } from './party/party.component';
import { ListPlayersComponent } from './player/list-players.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'party/detail/:id', component: PartyComponent},
    { path: 'party/create', component: CreatePartyComponent },
    { path: 'party/list', component: ListPartiesComponent },
    { path: 'player/list', component: ListPlayersComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
