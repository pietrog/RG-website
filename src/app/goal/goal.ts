export class Goal {
    _id: number;
    name: string;
    number_of_points: number;
    code: string;
    validated: boolean;

    constructor(name: string, number_of_points: number) {
	this.name = name;
	this.number_of_points = number_of_points;
    }
    
}
