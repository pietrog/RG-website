export class Goal {
    _id: number;
    name: string;
    number_of_points: number;
    code: string;
    compteur: number;

    constructor(name: string, number_of_points: number, compteur: number) {
	this.name = name;
	this.number_of_points = number_of_points;
	this.compteur = compteur;
    }
    
}
