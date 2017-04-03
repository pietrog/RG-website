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
	AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
