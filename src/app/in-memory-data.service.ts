import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

    createDb() {
	let parties = [
		{ id: 11, name: 'Guerre de secession'},
		{ id: 12, name: 'Guerre indepedenza'},
		{ id: 13, name: 'Guerre martiale'}	  
	];
	return {parties};
    }
    
}
