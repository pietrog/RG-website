export class Goal {
    _id: number;
    name: string;
    number_of_points: number;

    constructor(name: string, number_of_points: number) {
	this.name = name;
	this.number_of_points = number_of_points;
    }
    
}
