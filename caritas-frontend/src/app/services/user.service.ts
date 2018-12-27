import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { PageEvent } from '@angular/material';
import { Behaviour } from '../models/behaviour.model';
import { Sex } from '../models/sex.model';
import { UserFilter } from '../models/user-filter.model';
import { FilterResponse } from '../models/filter-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:50180'
  private userApiUrl = this.apiUrl + '/Korisnici'



  constructor(private http: HttpClient) {
  }

  public getAllUsers(pageIndex: number, pageSize: number, sortColumn: string, sortDirection: string): Observable<User[]> {
    let url = this.userApiUrl + "?pageSize=" + pageSize.toString() + "&pageIndex=" + pageIndex.toString()
      + "&sortColumn=" + sortColumn + "&sortOrder=" + sortDirection;

    return this.http.get<Array<User>>(url);
  }

  public getUsersCount(): Observable<number> {
    let url = this.userApiUrl + '/Count';
    return this.http.get<number>(url);
  }

  public insertUser(user: User): Observable<boolean> {
    let url = this.apiUrl + '/Korisnik';
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<boolean>(url, JSON.stringify(user), { headers: headers });
    
  }

  public getFilteredUsers(filter: UserFilter, pageIndex: number, pageSize: number, sortActive: string, sortDirection: string): Observable<FilterResponse> {
    let url = this.apiUrl + '/Korisnici/Filter';
    
    let params: HttpParams = new HttpParams();
    params = params.append("pageIndex", pageIndex.toString());
    params = params.append("pageSize", pageSize.toString());
    params = params.append("sortColumn", sortActive);
    params = params.append("sortOrder", sortDirection);
    params = params.append("name",  filter.name ? filter.name : '');
    params = params.append("surname", filter.surname ? filter.surname : '');
    params = params.append("oib", filter.oib ? filter.oib : '');
    params = params.append("username", filter.username ? filter.username : '');
    params = params.append("email", filter.email ? filter.email : '');
    params = params.append("birthday", filter.birthday ?  filter.birthday.toString() : null);
    params = params.append("sexId", filter.sexId ?  filter.sexId.toString() : null);
    params = params.append("behaviourId", filter.behaviourId ?  filter.behaviourId.toString() : null);

    return this.http.get<FilterResponse>(url, {params: params});
  }

  public deleteData(id: number): Observable<boolean>{
    let url = this.apiUrl +'/Korisnik/' + id.toString();
    return this.http.delete<boolean>(url);
  }

  public getUserForId(id: number): Observable<User>{
    let url = this.apiUrl + 'Korisnik/' + id.toString();
    console.log(url);
    return this.http.get<User>(url);
  }
}
