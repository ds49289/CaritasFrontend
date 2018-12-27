import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  surname = new FormControl('');
  name = new FormControl('');  
  email = new FormControl('');
  username = new FormControl('');
  birthday = new FormControl('');
  oib = new FormControl('');
  sex = new FormControl('');
  behaviour = new FormControl('');
  postalCode = new FormControl('');

  userData: User;
  

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  getDetailsForUser(id: number){
    console.log(id.toString());
    this.userService.getUserForId(id).subscribe(data => this.userData = data);
    console.log(id.toString());
  }
}
