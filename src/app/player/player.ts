export class Player {
    _id: number;
    email: string;
    score: number;

    team: number;
    team_name: string;
    
    constructor(email: string, score: number)
    {
	this.email = email;
	this.score = score;
	this._id = 0;
    }
};
