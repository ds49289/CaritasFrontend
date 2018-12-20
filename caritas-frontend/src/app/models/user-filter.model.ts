export class UserFilter{
    name: string;
    surname: string;
    username: string;
    oib: string;
    email: string;
    birthday: Date;
    postalCode: number;
    sexId: number;
    behaviourId: number;

    constructor(name?: string, surname?: string, username?: string, oib?: string, email?: string, birthday?: Date, postalCode?: number, sexId?: number, behaviourId?: number){
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.oib = oib;
        this.email = email;
        this.birthday = birthday;
        this.postalCode = postalCode;
        this.sexId = sexId;
        this.behaviourId = behaviourId;
    }
}