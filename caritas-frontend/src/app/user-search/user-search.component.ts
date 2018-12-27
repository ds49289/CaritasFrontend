import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DropdownService } from '../services/dropdown.service';
import { Sex } from '../models/sex.model';
import { Behaviour } from '../models/behaviour.model';
import { UserService } from '../services/user.service';
import { UserFilter } from '../models/user-filter.model';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  surname = new FormControl('');
  name = new FormControl('');  
  email = new FormControl('', [Validators.email]);
  username = new FormControl('');
  birthday = new FormControl('');
  oib = new FormControl('');
  sex = new FormControl('');
  behaviour = new FormControl('');
  postalCode = new FormControl('');

  sexes: Sex[];
  behaviours: Behaviour[];

  @Output() filterOut = new EventEmitter<UserFilter>();
  @Output() clean = new EventEmitter();
  
  constructor(private dropdownService: DropdownService, private userService: UserService) { }

  ngOnInit() {
    
    this.dropdownService.getAllSexes().subscribe(sex => {
      this.sexes = sex
      console.log(sex);
    });

    this.dropdownService.getAllBehaviours().subscribe(behaviour => {
      this.behaviours = behaviour
      console.log(behaviour);
    });
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a name' : '';
  }
  getErrorMessage() {
    return this.surname.hasError('required') ? 'You must enter a last name' : '';
  }
  getEmailErrorMessage() {
    return this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  getFilteredUsers(){
      var user = new UserFilter();
      if(this.name.touched && this.name.value !== ''){
        user.name = this.name.value;
      }
      if(this.surname.touched && this.surname.value !== ''){
        user.surname = this.surname.value;
      }
      if(this.oib.touched && this.oib.value !== ''){
        user.oib = this.oib.value;
      }
      if(this.postalCode.touched && this.postalCode.value !== ''){
        user.postalCode = this.postalCode.value;
      }
      if(this.birthday.touched && this.birthday.value !== ''){
        user.birthday = this.birthday.value;
      }
      if(this.username.touched && this.username.value !== ''){
        user.username = this.username.value;
      }
      if(this.email.touched && this.email.value !== ''){
        user.email = this.email.value;
      }
      if(this.sex.touched && this.sex.value !== ''){
        user.sexId = this.sexes.find( x => x.name === this.sex.value).id;
      }
      if(this.behaviour.touched && this.behaviour.value !== ''){
        user.behaviourId = this.behaviours.find(x => x.name === this.behaviour.value).id;
      }
      this.filterOut.emit(user);
  }

  cleanFilter(){
    this.name.reset();
    this.surname.reset();
    this.username.reset();
    this.email.reset();
    this.postalCode.reset();
    this.birthday.reset();
    this.sex.reset();
    this.behaviour.reset();
    this.oib.reset();

    this.clean.emit();

  }

}