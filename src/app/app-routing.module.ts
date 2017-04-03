import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { ListPartiesComponent } from './party/list-parties.component';
import { ListPlayersComponent } from './player/list-players.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'list-parties', component: ListPartiesComponent },
    { path: 'list-players', component: ListPlayersComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
