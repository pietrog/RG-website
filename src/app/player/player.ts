export class Player {
    _id: number;
    email: string;
    score: number;

    constructor(email: string, score: number)
    {
	this.email = email;
	this.score = score;
	this._id = 0;
    }
};
