export class Party {
    _id: number;
    name: string;
    started: boolean;
    creation_date: any;
    start_date: any;
    team_list: number[];
    goal_list: number[];

    constructor(name: string, started: boolean, team_list: number[], goal_list: number[])
    {
	this.name = name;
	this.started = true;
	//this.creation_date = creation_date;
	//this.start_date = start_date;
	this.team_list = team_list;
	this.goal_list = goal_list;
    }
};
