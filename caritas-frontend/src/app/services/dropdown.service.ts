import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sex } from '../models/sex.model';
import { Behaviour } from '../models/behaviour.model';


@Injectable({
  providedIn: 'root'
})



export class DropdownService{
    private apiUrl = 'http://localhost:50180';
    private sexApiUrl = this.apiUrl + '/Spolovi'
    private behaviourApiUrl = this.apiUrl + '/Ponasanja'

    constructor(private http: HttpClient){}

    getAllSexes(): Observable<Sex[]>{
        let url = this.sexApiUrl;
        console.log("http request sex");
        return this.http.get<Array<Sex>>(url);
    }

    getAllBehaviours(): Observable<Behaviour[]>{
        let url = this.behaviourApiUrl;
        console.log("http request behaviour");
        return this.http.get<Array<Behaviour>>(url);
    }
}