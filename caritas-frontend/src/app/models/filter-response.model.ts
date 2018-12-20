import { User } from './user.model';
export class FilterResponse{
    public userData: User[];
    public count: number;

    constructor(userData?: User[], count?: number){
        this.userData = userData;
        this.count = count;
    }
}