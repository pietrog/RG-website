export class Team {
    name: string;
    score: number;
    _id: number;
    user_list: number[]

    
    constructor(name: string, score: number, user_list: number[])
    {
	this.name = name;
	this.score = score;
	this.user_list = user_list;
    }
}
