export class Party {
    _id: number;
    name: string;
    started: boolean;
    creation_date: any;
    start_date: any;
    team_list: number[];

    constructor(_id: number, name: string, started: boolean, team_list: number[])
    {
	this._id = _id;
	this.name = name;
	this.started = true;
	//this.creation_date = creation_date;
	//this.start_date = start_date;
	this.team_list = team_list;
    }
};
