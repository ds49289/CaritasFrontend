import { Sex } from "./sex.model";
import { Behaviour } from "./behaviour.model";

export class User{
    id: number;
    name: string;
    username: string;
    surname: string;
    oib: string;
    email: string;
    postalCode: number;
    birthday: Date;
    sex: Sex;
    behaviour: Behaviour;

    constructor(id:number,username:string, name: string,surname: string, oib: string, email: string, postalCode: number, birthday: Date,sex: Sex, behaviour: Behaviour) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.surname = surname;
        this.oib = oib;
        this.email = email;
        this.postalCode = postalCode;
        this.birthday = birthday;
        this.sex = sex;
        this.behaviour = behaviour;
        
    }
}