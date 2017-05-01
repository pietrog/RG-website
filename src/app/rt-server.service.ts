import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';


@Injectable()
export class RTServer {

    private url = 'http://localhost:3000';
    private socket;

    sendEcho(message) {
	this.socket.emit('echoTest', message);
    }

    getEcho() {
	let obs = new Observable(observer => {
	    this.socket = io(this.url);
	    this.socket.on('echo', (data) => {
		observer.next(data);		
	    });
	    return () => {
		this.socket.disconnect();
	    }
	})

	return obs;
    }
    
}
