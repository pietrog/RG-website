import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';


@Injectable()
export class RTServer {

    private url = 'http://localhost:3000';
    private socket;

    messages = [];

    constructor()
    {
	this.socket = io();
	this.socket.on('echo', (data) => {
	    this.messages.push(data);
	});
	this.socket.on('update', (data) => {
	    this.messages.push(data);
	});

    }
    
    sendEcho(message) {
	this.socket.emit('echoTest', message);
    }

    getMessages() {
	return this.messages;
	/*let obs = new Observable(observer => {
	    //this.socket = io(this.url);
	    this.socket.on('echo', (data) => {
		observer.next(data);		
	    });
	    this.socket.on('update', (data) => {
		observer.next(data);
	    });
	    return () => {
		this.socket.disconnect();
	    }
	    })*/
	

	//return obs;
    }

}
