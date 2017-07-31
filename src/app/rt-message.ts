export class RTMessage {
    date: string;
    type_event: string;
    description: string;
    
    constructor(date: string, type_event: string, description: string)
    {
	this.date = date;
	this.type_event = type_event;
	this.description = description;
    }
};
