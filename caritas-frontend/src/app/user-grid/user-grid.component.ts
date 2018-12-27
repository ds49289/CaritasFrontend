import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { User } from '../models/user.model';
import { Sex } from '../models/sex.model';
import { Behaviour } from '../models/behaviour.model';
import { MatSort, MatPaginator, PageEvent, MatSnackBar } from '@angular/material';
import { UserService } from '../services/user.service';
import { DropdownService } from '../services/dropdown.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { UserFilter } from '../models/user-filter.model';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})
export class UserGridComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  userForId: User;
  resultsLength: number;
  pageEvent: PageEvent;
  dataSource: User[];
  pageIndex: number;
  pageSize: number;
  sortDirection: string;
  sortActive: string;

  sex = new FormControl('');


  // dataSource: User[] = [new User(1,'username123','dorotea','simunovic','03842482911',
  //                      'd@fer.hr','24444',new Date(1997,4,3),new Sex(2,'Zensko',true),
  //                      new Behaviour(1,'Lose',true)),
  //                      new User(2,'username234','doro','siic','0384346711',
  //                      'ddd@fer.hr','10000',new Date(1996,4,3),new Sex(2,'Zensko',false),
  //                      new Behaviour(2,'Gucci',true))];



  displayedColumns = ['username', 'name', 'surname', 'oib', 'email', 'postalcode', 'birthday', 'sex', 'behaviour', 'actions'];
  constructor(private userService: UserService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.sortActive = "oib";
    this.sortDirection = "asc";
    this.userService.getUsersCount().subscribe(x => this.resultsLength = x);
    this.userService.getAllUsers(this.pageIndex, this.pageSize, this.sortActive, this.sortDirection).subscribe(data => this.dataSource = data);



  }

  getServerData(event: PageEvent) {
    this.userService.getAllUsers(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction).subscribe(data => this.dataSource = data);
  }

  sortData(event: any) {
    this.paginator.pageIndex = 0;
    this.userService.getAllUsers(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction).subscribe(data => this.dataSource = data);
  }

  getFilteredUsers(userFilter: UserFilter) {
    console.log(JSON.stringify(userFilter));
    this.userService.getFilteredUsers(userFilter, 0, this.paginator.pageSize, this.sort.active, this.sort.direction).subscribe(response => {
      this.dataSource = response.userData;
      this.resultsLength = response.count;
    });
  }

  resetGrid() {
    this.paginator.pageIndex = 0;
    this.userService.getAllUsers(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction).subscribe(data => this.dataSource = data);
  }

  deleteData(id: number) {
    this.userService.deleteData(id).subscribe(
      response => {
        if(response){
          this.snackBar.open('Korisnik uspješno obrisan.', 'Zatvori',
            { duration: 2000, panelClass: ['snackbar-added'] });
            this.userService.getAllUsers(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction).subscribe(data => this.dataSource = data);

        }
        else{
          this.snackBar.open('Korisnik neuspješno izbrisan.', 'Zatvori',
          { duration: 2000, panelClass: ['snackbar-error'] })
        }
      }
    )
  }


  // dataDetails(id: number){
  //   // this.router.navigateByUrl('/updateUser');
  // }

  getUserForId(id:number){
    this.userService.getUserForId(id);
  }
}
